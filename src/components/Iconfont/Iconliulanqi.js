/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconliulanqi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 42.666667c259.2 0 469.333333 210.133333 469.333333 469.333333s-210.133333 469.333333-469.333333 469.333333S42.666667 771.2 42.666667 512 252.8 42.666667 512 42.666667z m0 64C288.149333 106.666667 106.666667 288.149333 106.666667 512s181.482667 405.333333 405.333333 405.333333 405.333333-181.482667 405.333333-405.333333S735.850667 106.666667 512 106.666667z m180.202667 264.426666l-64 234.666667a32 32 0 0 1-22.442667 22.442667l-234.666667 64a32 32 0 0 1-39.296-39.296l64-234.666667a32 32 0 0 1 22.442667-22.442667l234.666667-64a32 32 0 0 1 39.296 39.296z m-76.48 37.184l-162.986667 44.458667-44.458667 162.986667 162.986667-44.458667 44.458667-162.986667z"
        fill={getIconColor(color, 0, '#4E4E4E')}
      />
    </Svg>
  );
};

Iconliulanqi.defaultProps = {
  size: 18,
};

export default Iconliulanqi;
