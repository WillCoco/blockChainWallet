/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icongouxuanzhong = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0s512 230.4 512 512-230.4 512-512 512z m-64-364.8L723.2 416c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L435.2 588.8l-89.6-96c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l108.8 121.6c6.4 6.4 12.8 12.8 25.6 12.8 0-6.4 6.4-12.8 12.8-12.8z"
        fill={getIconColor(color, 0, '#DBDBDB')}
      />
    </Svg>
  );
};

Icongouxuanzhong.defaultProps = {
  size: 18,
};

export default Icongouxuanzhong;
