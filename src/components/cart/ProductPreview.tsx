import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { Cart, useCartContext } from '../../context/CartContext';
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
    fontSize: textSize.md,
    color: colors.gray[800],
    marginBottom: 3,
  },
  description: {
    fontSize: textSize.sm,
    color: colors.gray[500],
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

type Props = {
  id: string;
};

export const ProductPreview: React.FC<Props> = ({ id }) => {
  const { cart, setCart, products } = useCartContext();

  const data = products[id];
  const amount = cart[id] ?? 0;

  const handleAmount = (amount: number) => {
    // @ts-ignore
    setCart((state: Cart) => ({ ...state, [id]: amount }));
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: 'https://www.mixlabcocktails.com/images/cocktail-image/image-placeholder@3x.png' }}
      />
      <View style={styles.left}>
        <View style={styles.flex}>
          <View>
            <Text style={styles.title}>{data.name}</Text>
            <Text style={styles.description}>{data.flavor}</Text>
          </View>
          <Text style={styles.price}>CZK {data.currentCost}</Text>
        </View>
        <Counter amount={amount} max={data.count} handleAmount={handleAmount} />
      </View>
    </View>
  );
};
