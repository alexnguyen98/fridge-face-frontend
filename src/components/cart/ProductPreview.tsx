import React, { Dispatch } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Cart } from '../../context/CartContext';
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

type Props = {
  data: any;
  setCart: Dispatch<Cart>;
};

export const ProductPreview: React.FC<Props> = ({ data, setCart }) => {
  const handleAmount = (amount: number) => {
    setCart((state: Cart) => ({
      ...state,
      [data.id]: {
        ...state[data.id],
        amount,
      },
    }));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} resizeMode="cover" source={{ uri: data.img }} />
      <View style={styles.left}>
        <View style={styles.flex}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.price}>${data.price}</Text>
        </View>
        <Counter amount={data.amount} max={data.max} handleAmount={handleAmount} />
      </View>
    </View>
  );
};
