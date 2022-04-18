import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';

const styles = StyleSheet.create({
  button: {
    width: '100%',
    padding: 15,
    borderRadius: borderRadius.md,
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
    activeOpacity={0.8}
    style={[styles.button, { backgroundColor: disabled ? colors.primary[400] : colors.primary[700] }]}
    disabled={disabled}
    {...props}
  >
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);
