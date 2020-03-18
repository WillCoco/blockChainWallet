/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const IconscanBlue = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M693.333333 170.666667a32 32 0 0 1 0-64h149.333334a74.666667 74.666667 0 0 1 74.666666 74.666666v149.333334a32 32 0 0 1-64 0V181.333333a10.666667 10.666667 0 0 0-10.666666-10.666666H693.333333z m160 522.666666a32 32 0 0 1 64 0v149.333334a74.666667 74.666667 0 0 1-74.666666 74.666666H693.333333a32 32 0 0 1 0-64h149.333334a10.666667 10.666667 0 0 0 10.666666-10.666666V693.333333zM330.666667 853.333333a32 32 0 0 1 0 64H181.333333a74.666667 74.666667 0 0 1-74.666666-74.666666V693.333333a32 32 0 0 1 64 0v149.333334a10.666667 10.666667 0 0 0 10.666666 10.666666h149.333334zM170.666667 330.666667a32 32 0 0 1-64 0V181.333333a74.666667 74.666667 0 0 1 74.666666-74.666666h149.333334a32 32 0 0 1 0 64H181.333333a10.666667 10.666667 0 0 0-10.666666 10.666666v149.333334z m629.333333 149.333333a32 32 0 0 1 0 64H224a32 32 0 0 1 0-64h576z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
    </Svg>
  );
};

IconscanBlue.defaultProps = {
  size: 18,
};

export default IconscanBlue;
