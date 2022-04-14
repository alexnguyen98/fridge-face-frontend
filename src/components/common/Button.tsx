import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: borderRadius.sm,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: textWeight.medium,
    fontSize: textSize.md,
    color: colors.white,
  },
});

type Props = {
  disabled?: boolean;
  onPress?: (e: any) => void;
};

export const Button: React.FC<Props> = ({ children, disabled, ...props }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: disabled ? colors.primary[400] : colors.primary[700] }]}
    disabled={disabled}
    {...props}
  >
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);
