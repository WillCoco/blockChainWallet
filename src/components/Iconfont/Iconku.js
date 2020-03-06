/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconku = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0zM256 405.3c0-35.3 28.7-64 64-64s64 28.7 64 64-28.7 64-64 64-64-28.6-64-64z m452.1 351.6c-18.6 14.5-45.4 11.2-59.9-7.4-32.6-41.8-81.7-65.8-134.6-65.8-53.7 0-103.2 24.5-135.8 67.4-8.4 11-21.1 16.8-34 16.8-9 0-18.1-2.8-25.8-8.7-18.8-14.3-22.4-41-8.1-59.8 48.9-64.2 123.2-101 203.7-101 79.4 0 153 35.9 201.9 98.6 14.5 18.6 11.2 45.4-7.4 59.9zM704 469.3c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconku.defaultProps = {
  size: 18,
};

export default Iconku;
