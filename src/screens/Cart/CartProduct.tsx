import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { RootStackNavigationProps, RootStackRoutes } from '../../types/navigation';
import { useCartContext } from '../../context/CartContext';

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

type Props = RootStackNavigationProps<RootStackRoutes.CartProduct>;

export const CartProduct: React.FC<Props> = ({ route }) => {
  const { products } = useCartContext();

  const { product } = route.params;
  const data = products[product];

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{
            uri: 'https://www.mixlabcocktails.com/images/cocktail-image/image-placeholder@3x.png',
          }}
        />
      </View>
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.price}>CZK {data.currentCost}</Text>
      <Text style={styles.description}>{data.flavor}</Text>
    </View>
  );
};
