import React, { useState, useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  text: {
    marginVertical: 20,
    fontWeight: textWeight.bold,
    fontSize: textSize['4xl'],
    color: colors.gray[500],
  },
});

type Props = {
  start: number;
  onFinish: () => void;
};

export const Countdown: React.FC<Props> = ({ start, onFinish }) => {
  const [counter, setCounter] = useState(start);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter((state) => state - 1), 1000);

    if (!counter) onFinish();

    return () => clearInterval(timer as any);
  }, [counter]);

  return <Text style={styles.text}>{counter}</Text>;
};
