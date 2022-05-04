import React, { useState } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { borderRadius, colors, textSize, textWeight } from '../../types/theme';
import { useCartContext } from '../../context/CartContext';
import { Input } from '../../components/common/Input';
import { Spacer } from '../../components/common/Spacer';
import { Search } from '../../components/icons/Search';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
  },
  body: {
    flex: 1,
  },
});

export const CartSearch = () => {
  const [input, setInput] = useState('');
  const { cart } = useCartContext();

  const headerHeight = useHeaderHeight() + 20;

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.body}>
        <Input icon={Search} value={input} onChangeText={setInput} />
        <Spacer />
      </View>
    </KeyboardAvoidingView>
  );
};
