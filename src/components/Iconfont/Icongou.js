/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icongou = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M940.8 169.6c-12.8 0-25.6 6.4-35.2 16l-534.4 544-249.6-256c-9.6-9.6-22.4-16-38.4-16-28.8 0-51.2 22.4-51.2 51.2 0 16 6.4 28.8 16 38.4l284.8 291.2c9.6 9.6 22.4 16 35.2 16 12.8 0 25.6-6.4 35.2-16L976 259.2c9.6-9.6 16-22.4 16-38.4 0-28.8-22.4-51.2-51.2-51.2z"
        fill={getIconColor(color, 0, '#0F6EFF')}
      />
    </Svg>
  );
};

Icongou.defaultProps = {
  size: 18,
};

export default Icongou;
