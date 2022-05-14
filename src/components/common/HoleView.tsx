import React from 'react';
import { Svg, Defs, Rect, Mask, Circle } from 'react-native-svg';

export const HoleView = () => (
  <Svg
    height="100%"
    width="100%"
    style={{
      position: 'absolute',
    }}
  >
    <Defs>
      <Mask id="mask" x="0" y="0" height="100%" width="100%">
        <Rect height="100%" width="100%" fill="#fff" />
        <Circle r="33%" cx="50%" cy="45%" fill="black" />
      </Mask>
    </Defs>
    <Rect height="100%" width="100%" fill="white" mask="url(#mask)" fill-opacity="0" />
    <Circle r="33%" cx="50%" cy="45%" fill="none" stroke="#41b0e4" strokeWidth="5" />
    <Circle r="35%" cx="50%" cy="45%" fill="none" stroke="#85cff1" strokeWidth="8" strokeDasharray="3" />
  </Svg>
);
