import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { Cart } from '../../context/CartContext';
import { useUserContext } from '../../context/UserContext';
import { useProducts } from '../../hooks/useProducts';
import { Button } from '../../components/common/Button';
import { BarcodeCamera } from '../../components/utils/BarcodeCamera';
import { ProductPreview } from '../../components/cart/ProductPreview';
import { useAnalytics } from '../../hooks/useAnalytics';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconWrapper: {
    position: 'absolute',
    top: 60,
    right: 20,
    zIndex: 1,
  },
  icon: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.full,
    padding: 10,
    marginBottom: 20,
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

type Props = RootStackNavigationProps<RootStackRoutes.RegistrationWalkthrough>;

export const CartCamera: React.FC<Props> = ({ navigation }) => {
  const [preview, setPreview] = useState<string | null>(null);

  const { logEvent } = useAnalytics();
  const { setUser } = useUserContext();
  const { cart, setCart, searchProduct } = useProducts();

  const activeAmount = preview && cart[preview];

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

    logEvent('logout', {
      screen: RootStackRoutes.CartCamera,
    });

    navigation.popToTop();
  };

  const handleProductPreview = () => {
    if (!preview) return;

    logEvent('product_preview', {
      screen: RootStackRoutes.CartCamera,
      product: preview,
    });

    navigation.navigate(RootStackRoutes.CartProduct, {
      product: preview,
    });
  };

  const handleCheckout = () => {
    logEvent('screen_view', {
      screen: RootStackRoutes.CartCheckout,
    });

    navigation.navigate(RootStackRoutes.CartCheckout);
  };

  const handleSearch = () => {
    logEvent('screen_view', {
      screen: RootStackRoutes.CartSearch,
    });

    navigation.navigate(RootStackRoutes.CartSearch);
  };

  const handleUserProfile = () => {
    logEvent('screen_view', {
      screen: RootStackRoutes.UserProfile,
    });

    navigation.navigate(RootStackRoutes.UserProfile);
  };

  const handleBarcode = async (barcode: string) => {
    const product: any = searchProduct(barcode);

    if (product) {
      // @ts-ignore
      setCart((state: Cart) => ({ ...state, [product.id]: 1 }));
      setPreview(product.id);

      logEvent('add_cart', {
        screen: RootStackRoutes.CartCamera,
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
          <AntDesign name="logout" size={30} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleUserProfile}>
          <AntDesign name="user" size={30} color="#64748b" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.icon} onPress={handleSearch}>
          <AntDesign name="search1" size={30} color="#64748b" />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text}>Scan a product from the back camera</Text>
        </View>
        <View style={styles.footer}>
          {preview && (
            <TouchableOpacity onPress={handleProductPreview} activeOpacity={0.8}>
              <ProductPreview id={preview} />
            </TouchableOpacity>
          )}
          <Button onPress={handleCheckout}>Cart</Button>
        </View>
      </View>
    </View>
  );
};
