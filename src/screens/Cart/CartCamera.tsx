import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useCartContext, Cart } from '../../context/CartContext';
import { SERVER_URL } from '../../constants';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { Button } from '../../components/common/Button';
import { CartStackProps, CartStackRoutes } from '../../types/navigation';
import { BarcodeCamera } from '../../components/utils/BarcodeCamera';
import { ProductPreview } from '../../components/cart/ProductPreview';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
    padding: 15,
  },
  notice: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: colors.gray[800],
    borderRadius: borderRadius.md,
  },
  text: {
    fontWeight: textWeight.md,
    fontSize: textSize.sm,
    color: colors.gray[200],
  },
  footer: {
    width: '100%',
  },
});

type Props = CartStackProps<CartStackRoutes.CartCamera>;

export const CartCamera: React.FC<Props> = ({ navigation }) => {
  const [preview, setPreview] = useState(null);
  const { cart, setCart } = useCartContext();

  const activeAmount = preview && cart[preview].amount;

  useEffect(() => {
    if (activeAmount) {
      const timer = setTimeout(() => setPreview(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [preview, activeAmount]);

  const handleLogout = () => {
    navigation.popToTop();
  };

  const handleProductPreview = () => {
    navigation.navigate(CartStackRoutes.CartProduct);
  };

  const handleCheckout = () => {
    navigation.navigate(CartStackRoutes.CartCheckout);
  };

  const handleBarcode = async (barcode: string) => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/product/${barcode}`);
      setCart((state: Cart) => ({ ...state, [data.id]: { ...data, amount: 1 } }));
      setPreview(data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera cameraDirection="back" onChange={handleBarcode} />
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text}>Scan a product</Text>
        </View>
        <View style={styles.footer}>
          {preview && cart[preview] && (
            <TouchableOpacity onPress={handleProductPreview} activeOpacity={0.8}>
              <ProductPreview data={cart[preview]} setCart={setCart} />
            </TouchableOpacity>
          )}
          <Button onPress={handleCheckout}>Cart</Button>
        </View>
      </View>
      {/* <Button onPress={handleLogout}>Logout</Button> */}
    </View>
  );
};
