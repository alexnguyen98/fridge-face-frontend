import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
  },
});

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
};

export const Input: React.FC<Props> = (props) => {
  return <TextInput style={styles.input} {...props} />;
};
