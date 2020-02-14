/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconqianbao2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M928 96H96a32 32 0 0 0-32 32v768a32 32 0 0 0 32 32h832a32 32 0 0 0 32-32V128a32 32 0 0 0-32-32zM128 864V160h768v192H608a160 160 0 0 0 0 320h288v192z m768-448v192H608a96 96 0 0 1 0-192z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M608 512m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M928 96H96a32 32 0 0 0-32 32v768a32 32 0 0 0 32 32h832a32 32 0 0 0 32-32V128a32 32 0 0 0-32-32zM128 864V160h768v192H608a160 160 0 0 0 0 320h288v192z m768-448v192H608a96 96 0 0 1 0-192z"
        fill={getIconColor(color, 2, '#333333')}
      />
      <Path
        d="M608 512m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 3, '#333333')}
      />
    </Svg>
  );
};

Iconqianbao2.defaultProps = {
  size: 18,
};

export default Iconqianbao2;
