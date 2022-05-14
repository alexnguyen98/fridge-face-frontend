import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { borderRadius, colors } from '../../types/theme';

const styles = StyleSheet.create({
  input: {
    padding: 10,
    borderWidth: 1,
    borderRadius: borderRadius.md,
    borderColor: colors.gray[300],
    backgroundColor: colors.white,
  },
  iconWrapper: {
    flexDirection: 'row',
  },
  iconInput: {
    flex: 1,
    paddingLeft: 10,
  },
});

type Props = {
  value?: string;
  placeholder?: string;
  icon?: string;
  onChangeText?: (text: string) => void;
};

export const Input: React.FC<Props> = ({ icon, ...props }) => {
  if (icon) {
    return (
      <View style={[styles.iconWrapper, styles.input]}>
        <AntDesign name={icon as any} size={22} color={colors.gray[400]} />
        <TextInput style={styles.iconInput} {...props} placeholderTextColor={colors.gray[400]} />
      </View>
    );
  }

  return <TextInput style={styles.input} {...props} />;
};
