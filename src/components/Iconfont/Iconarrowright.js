/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconarrowright = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1365 1024" width={size} height={size} {...rest}>
      <Path
        d="M169.813333 455.253333h889.6L757.333333 152.96c-22.186667-22.186667-22.186667-58.453333 0-80.853333s58.453333-22.4 80.64 0l399.573334 399.786666c22.186667 22.186667 22.186667 58.453333 0 80.853334L838.186667 952.533333c-11.093333 11.093333-25.813333 16.64-40.32 16.64-14.506667 0-29.226667-5.546667-40.32-16.853333-22.186667-22.186667-22.186667-58.453333 0-80.64l302.08-302.293333h-889.6c-31.573333 0-57.173333-25.6-57.173334-57.173334 0-31.36 25.386667-56.96 56.96-56.96z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </Svg>
  );
};

Iconarrowright.defaultProps = {
  size: 18,
};

export default Iconarrowright;
