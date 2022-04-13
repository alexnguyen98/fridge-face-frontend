import React from 'react';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

export const DismissKeyboard: React.FC = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);
