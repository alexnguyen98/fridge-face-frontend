import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as Analytics from 'expo-firebase-analytics';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { CartStackProps, CartStackRoutes } from '../../types/navigation';
import { useCartContext, Cart } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/common/Button';
import { BarcodeCamera } from '../../components/utils/BarcodeCamera';
import { ProductPreview } from '../../components/cart/ProductPreview';
import { Logout } from '../../components/icons/Logout';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 1,
  },
  icon: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    padding: 8,
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
  const { setUser } = useUserContext();
  const { cart, setCart } = useCartContext();
  const { searchProduct } = useProducts();

  const activeAmount = preview && cart[preview].amount;

  useEffect(() => {
    if (activeAmount) {
      const timer = setTimeout(() => setPreview(null), 10000);
      return () => clearTimeout(timer);
    }
  }, [preview, activeAmount]);

  const handleLogout = () => {
    setCart({});
    setUser({
      token: '',
      info: null,
    });

    Analytics.logEvent('logout', {
      screen: CartStackRoutes.CartCamera,
    });

    navigation.popToTop();
  };

  const handleProductPreview = () => {
    if (!preview) return;

    Analytics.logEvent('product_preview', {
      screen: CartStackRoutes.CartCamera,
      item: preview,
    });

    navigation.navigate(CartStackRoutes.CartProduct, {
      preview,
    });
  };

  const handleCheckout = () => {
    Analytics.logEvent('screen_view', {
      screen: CartStackRoutes.CartCheckout,
    });

    navigation.navigate(CartStackRoutes.CartCheckout);
  };

  const handleBarcode = async (barcode: string) => {
    const product: any = searchProduct(barcode);

    if (product) {
      setCart((state: Cart) => ({ ...state, [product.id]: { ...product, amount: 1 } }));
      setPreview(product.id);

      Analytics.logEvent('add_cart', {
        screen: CartStackRoutes.CartCamera,
        product: product.id,
      });
    } else {
      Alert.alert('No product found');
    }
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera cameraDirection="back" onChange={handleBarcode} />
      <View style={styles.iconWrapper}>
        <TouchableOpacity style={styles.icon} onPress={handleLogout}>
          <Logout fill="#64748b" />
        </TouchableOpacity>
      </View>
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
    </View>
  );
};
