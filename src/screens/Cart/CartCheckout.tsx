import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { ProductPreview } from '../../components/cart/ProductPreview';
import { Button } from '../../components/common/Button';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';

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
  return (
    <View style={styles.container}>
      <ScrollView>
        <ProductPreview />
        <ProductPreview />
        <ProductPreview />
        <ProductPreview />
        <ProductPreview />
        <ProductPreview />
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.total}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>$200</Text>
        </View>
        <Button>Complete purchase</Button>
      </View>
    </View>
  );
};
