import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageWrapper: {
    padding: 15,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    overflow: 'hidden',
    borderRadius: borderRadius.lg,
  },
  title: {
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: textSize.xl,
    fontWeight: textWeight.medium,
  },
  price: {
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: textSize['3xl'],
    fontWeight: textWeight.bold,
  },
  description: {
    padding: 15,
    backgroundColor: colors.white,
    fontSize: textSize.md,
  },
});

type Props = {};

export const CartProduct: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/zoom/00059600060211.jpg',
          }}
        />
      </View>
      <Text style={styles.title}>Pomeranc</Text>
      <Text style={styles.price}>$10</Text>
      <Text style={styles.description}>Pomeranc neni ovoce, change my mind</Text>
    </View>
  );
};
