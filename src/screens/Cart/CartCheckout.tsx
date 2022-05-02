import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import axios from 'axios';
import { CartStackProps, CartStackRoutes } from '../../types/navigation';
import { colors, textSize, textWeight } from '../../types/theme';
import { SERVER_URL } from '../../constants';
import { useUserContext } from '../../context/UserContext';
import { useCartContext } from '../../context/CartContext';
import { ProductPreview } from '../../components/cart/ProductPreview';
import { Button } from '../../components/common/Button';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    backgroundColor: colors.white,
    padding: 15,
  },
  total: {
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalText: {
    fontSize: textSize.xl,
    fontWeight: textWeight.medium,
  },
});

type Props = CartStackProps<CartStackRoutes.CartCheckout>;

export const CartCheckout: React.FC<Props> = ({ navigation }) => {
  const { cart, setCart } = useCartContext();
  const { user, setUser } = useUserContext();

  const items = Object.values(cart);

  const total = items?.reduce((prev, cur) => cur.currentCost * cur.amount + prev, 0);

  const handleProductPreview = (preview: string) => {
    Analytics.logEvent('product_preview', {
      screen: CartStackRoutes.CartCheckout,
      item: preview,
    });

    navigation.navigate(CartStackRoutes.CartProduct, {
      preview,
    });
  };

  const confirmPurchase = async () => {
    let products: any = {};
    Object.values(cart).forEach((i) => {
      if (i.amount) {
        products[i.id] = i.amount;
      }
    });

    try {
      await axios.post(
        SERVER_URL + '/product/purchase',
        {
          products,
        },
        {
          headers: {
            token: user.token,
          },
        }
      );

      setCart({});
      setUser({
        token: '',
        info: null,
      });

      Analytics.logEvent('confirm_purchase', {
        products,
      });

      navigation.popToTop();
      navigation.goBack();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePurchase = () => {
    Alert.alert(
      'Are you sure buddy?',
      '',
      [
        { text: 'Yes buddy', onPress: confirmPurchase },
        { text: 'Nope', style: 'cancel' },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items
          ?.filter((i) => i.amount)
          .map((i) => (
            <TouchableOpacity key={i.id} onPress={() => handleProductPreview(i.id)} activeOpacity={0.8}>
              <ProductPreview data={i} setCart={setCart} />
            </TouchableOpacity>
          ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>CZK {total}</Text>
        </View>
        <Button onPress={handlePurchase}>Complete purchase</Button>
      </View>
    </View>
  );
};
