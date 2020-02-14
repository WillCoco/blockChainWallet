/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconjiantou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1000 1000" width={size} height={size} {...rest}>
      <Path
        d="M227.986 584.688l257.492 257.492c20.11 20.11 52.709 20.11 72.819 0l257.492-257.492c20.11-20.11 20.11-52.709 0-72.819s-52.709-20.11-72.819 0l-169.585 169.585v-493.664c0-28.453-23.046-51.499-51.499-51.499s-51.499 23.046-51.499 51.499v493.664l-169.585-169.585c-10.042-10.043-23.226-15.089-36.41-15.089s-26.367 5.021-36.41 15.089c-20.11 20.11-20.11 52.709 0 72.819z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconjiantou.defaultProps = {
  size: 18,
};

export default Iconjiantou;
