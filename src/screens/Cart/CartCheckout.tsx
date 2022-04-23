import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useCartContext } from '../../context/CartContext';
import { ProductPreview } from '../../components/cart/ProductPreview';
import { Button } from '../../components/common/Button';
import { colors, textSize, textWeight } from '../../types/theme';

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

export const CartCheckout = () => {
  const { cart, setCart } = useCartContext();

  const items = Object.values(cart);

  const total = items?.reduce((prev, cur) => cur.price * cur.amount + prev, 0);

  return (
    <View style={styles.container}>
      <ScrollView>
        {items?.map((i) => (
          <ProductPreview key={i.id} data={i} setCart={setCart} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${total}</Text>
        </View>
        <Button>Complete purchase</Button>
      </View>
    </View>
  );
};
