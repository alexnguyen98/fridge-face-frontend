import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { Counter } from './Counter';

const styles = StyleSheet.create({
  container: {
    padding: 13,
    marginBottom: 10,
    borderRadius: borderRadius.md,
    backgroundColor: colors.white,
    flexDirection: 'row',
  },
  image: {
    marginRight: 10,
    width: 100,
    height: 100,
  },
  left: {
    flex: 1,
  },
  title: {
    fontSize: textSize.sm,
    color: colors.gray[800],
  },
  price: {
    marginLeft: 'auto',
    fontSize: textSize.sm,
    fontWeight: textWeight.medium,
    color: colors.gray[800],
  },
  flex: {
    flexDirection: 'row',
  },
});

type Props = {};

export const ProductPreview: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{
          uri: 'https://storage.googleapis.com/images-sof-prd-9fa6b8b.sof.prd.v8.commerce.mi9cloud.com/product-images/zoom/00059600060211.jpg',
        }}
      />
      <View style={styles.left}>
        <View style={styles.flex}>
          <Text style={styles.title}>Pomeranc</Text>
          <Text style={styles.price}>$10</Text>
        </View>
        <Counter />
      </View>
    </View>
  );
};
