import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Button } from '../../components/common/Button';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
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
  const handleLogout = () => {
    navigation.popToTop();
  };

  const handleProductPreview = () => {
    navigation.navigate(CartStackRoutes.CartProduct);
  };

  const handleCheckout = () => {
    navigation.navigate(CartStackRoutes.CartCheckout);
  };

  return (
    <View style={styles.container}>
      <BarcodeCamera cameraDirection="back" />
      <View style={styles.wrapper}>
        <View style={styles.notice}>
          <Text style={styles.text}>Scan a product</Text>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleProductPreview} activeOpacity={0.8}>
            <ProductPreview />
          </TouchableOpacity>
          <Button onPress={handleCheckout}>Cart</Button>
        </View>
      </View>
      {/* <Button onPress={handleLogout}>Logout</Button> */}
    </View>
  );
};
