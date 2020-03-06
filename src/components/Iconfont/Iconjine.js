/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconjine = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 0c282.770286 0 512 229.229714 512 512S794.770286 1024 512 1024 0 794.770286 0 512 229.229714 0 512 0z m0 73.142857C269.622857 73.142857 73.142857 269.622857 73.142857 512s196.48 438.857143 438.857143 438.857143 438.857143-196.48 438.857143-438.857143S754.377143 73.142857 512 73.142857z m-98.998857 233.270857l98.980571 98.998857 96.804572-96.768a36.571429 36.571429 0 1 1 51.712 51.712L600.265143 420.571429H658.285714a36.571429 36.571429 0 1 1 0 73.142857h-109.732571v36.571428H603.428571a36.571429 36.571429 0 1 1 0 73.142857h-54.875428L548.571429 713.142857a36.571429 36.571429 0 1 1-73.142858 0l-0.018285-109.714286H420.571429a36.571429 36.571429 0 1 1 0-73.142857h54.838857v-36.571428H365.714286a36.571429 36.571429 0 1 1 0-73.142857h58.002285l-62.445714-62.427429a36.571429 36.571429 0 1 1 51.730286-51.730286z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
    </Svg>
  );
};

Iconjine.defaultProps = {
  size: 18,
};

export default Iconjine;
