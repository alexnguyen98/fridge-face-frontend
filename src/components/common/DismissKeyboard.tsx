import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export const DismissKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
