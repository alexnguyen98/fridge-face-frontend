import React from 'react';
import { View } from 'react-native';

type Props = {
  horizontal?: boolean;
  size?: 10 | 20 | 30;
};

export const Spacer: React.FC<Props> = ({ horizontal, size = 10 }) => (
  <View
    style={{
      [horizontal ? 'paddingHorizontal' : 'paddingVertical']: size,
    }}
  />
);
