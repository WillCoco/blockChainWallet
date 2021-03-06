/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icondaoru = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1280 1024" width={size} height={size} {...rest}>
      <Path
        d="M394 376V230.8c0-19.2 15.6-34.8 34.8-34.8h477.4c19.2 0 34.8 15.6 34.8 34.8v477.4c0 19.2-15.6 34.8-34.8 34.8H761c-18.8 0-34 15.2-34 34s15.2 34 34 34h178.9c38.2 0 69.1-31 69.1-69.1V197.1c0-38.2-31-69.1-69.1-69.1H395.1c-38.2 0-69.1 31-69.1 69.1V376c0 18.8 15.2 34 34 34s34-15.2 34-34z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M678.9 618.8l-0.1-0.1L545.1 485c-13.3-13.3-34.8-13.3-48.1 0-13.3 13.3-13.3 34.8 0 48.1l75.9 75.9H360c-18.8 0-34 15.2-34 34s15.2 34 34 34h212.7L497 752.7c-13.3 13.3-13.3 34.8 0 48.1 13.3 13.3 34.8 13.3 48.1 0l131.6-131.6c7.5-6.2 12.3-15.6 12.3-26.1 0-9.6-3.9-18.1-10.1-24.3z"
        fill={getIconColor(color, 1, '#00F1A3')}
      />
    </Svg>
  );
};

Icondaoru.defaultProps = {
  size: 18,
};

export default Icondaoru;
