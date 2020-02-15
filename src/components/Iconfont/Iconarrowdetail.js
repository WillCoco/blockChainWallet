/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconarrowdetail = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M699.712 512l-256 256L384 708.288 580.28799999 512 384 315.712l59.712-59.712z"
        fill={getIconColor(color, 0, '#A09DA0')}
      />
    </Svg>
  );
};

Iconarrowdetail.defaultProps = {
  size: 18,
};

export default Iconarrowdetail;
