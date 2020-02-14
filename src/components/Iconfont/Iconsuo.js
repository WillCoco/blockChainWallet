/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconsuo = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M829.4 1024H194.6c-60.3 0-109.3-49-109.3-109.3v-464c0-60.3 49-109.3 109.3-109.3h634.7c60.3 0 109.3 49 109.3 109.3v464c0.1 60.3-49 109.3-109.2 109.3zM194.6 426.7c-13.2 0-24 10.8-24 24v464c0 13.2 10.8 24 24 24h634.7c13.2 0 24-10.8 24-24v-464c0-13.2-10.8-24-24-24H194.6z"
        fill={getIconColor(color, 0, '#3688FF')}
      />
      <Path
        d="M725.3 426.7c-23.6 0-42.7-19.1-42.7-42.7V256c0-94.1-76.6-170.7-170.7-170.7S341.3 161.9 341.3 256v128c0 23.6-19.1 42.7-42.7 42.7S256 407.6 256 384V256C256 114.8 370.8 0 512 0s256 114.8 256 256v128c0 23.6-19.1 42.7-42.7 42.7zM512 810.7c-23.6 0-42.7-19.1-42.7-42.7V597.3c0-23.6 19.1-42.7 42.7-42.7s42.7 19.1 42.7 42.7V768c0 23.6-19.1 42.7-42.7 42.7z"
        fill={getIconColor(color, 1, '#5F6379')}
      />
    </Svg>
  );
};

Iconsuo.defaultProps = {
  size: 18,
};

export default Iconsuo;
