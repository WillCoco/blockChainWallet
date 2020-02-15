/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconclose = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M790.663 140.998l90.213 90.212-630.082 630.082-90.212-90.213z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
      <Path
        d="M880.872 771.083l-90.212 90.213-630.082-630.082 90.213-90.212z"
        fill={getIconColor(color, 1, '#ffffff')}
      />
    </Svg>
  );
};

Iconclose.defaultProps = {
  size: 18,
};

export default Iconclose;
