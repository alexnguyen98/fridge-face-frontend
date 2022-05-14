import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { colors, textSize, textWeight } from '../../types/theme';
import { SERVER_URL } from '../../constants';
import { useAnalytics } from '../../hooks/useAnalytics';
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

type Props = RootStackNavigationProps<RootStackRoutes.RegistrationWalkthrough>;

export const CartCheckout: React.FC<Props> = ({ navigation }) => {
  const { logEvent } = useAnalytics();
  const { cart, setCart, products } = useCartContext();
  const { user } = useUserContext();

  const items = Object.keys(cart);
  const total = items?.reduce((prev, cur) => products[cur].currentCost * cart[cur] + prev, 0);

  const handleProductPreview = (product: string) => {
    logEvent('product_preview', {
      screen: RootStackRoutes.CartCheckout,
      item: product,
    });

    navigation.navigate(RootStackRoutes.CartProduct, {
      product,
    });
  };

  const handlePurchase = async () => {
    let products: any = {};
    Object.keys(cart).forEach((i) => {
      if (cart[i]) {
        products[i] = cart[i];
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

      logEvent('confirm_purchase', {
        products,
      });
      Alert.alert('Product purchased');

      setCart({});
      navigation.popToTop();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {items
          ?.filter((i) => cart[i])
          .map((i) => (
            <TouchableOpacity key={i} onPress={() => handleProductPreview(i)} activeOpacity={0.8}>
              <ProductPreview id={i} />
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
