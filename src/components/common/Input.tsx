import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { borderRadius, colors } from '../../types/theme';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    borderColor: colors.gray[300],
    backgroundColor: colors.white,
  },
});

type Props = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  icon?: React.FC;
};

export const Input: React.FC<Props> = ({ icon, ...props }) => {
  // if (icon) {
  //   const Icon = icon;

  //   return (
  //     <View>
  //       <Icon />
  //       <TextInput style={styles.input} {...props} />;
  //     </View>
  //   );
  // }
  return <TextInput style={styles.input} {...props} />;
};
