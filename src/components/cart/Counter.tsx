import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    alignSelf: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.gray[200],
    borderRadius: borderRadius.full,
  },
  amount: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    fontSize: textSize.xl,
    fontWeight: textWeight.medium,
    color: colors.gray[800],
  },
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  counterText: {
    lineHeight: 35,
    fontSize: textSize['3xl'],
    fontWeight: textWeight.bold,
    color: colors.gray[500],
  },
});

type Props = {};

export const Counter: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} style={styles.counter}>
        <Text style={styles.counterText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.amount}>1</Text>
      <TouchableOpacity activeOpacity={0.8} style={styles.counter}>
        <Text style={styles.counterText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};
