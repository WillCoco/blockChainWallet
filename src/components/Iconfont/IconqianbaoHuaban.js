/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const IconqianbaoHuaban = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M864 160H160c-17.67 0-32 14.33-32 32v640c0 17.67 14.33 32 32 32h704c17.67 0 32-14.33 32-32V192c0-17.67-14.33-32-32-32z m-32 416H608c-35.29 0-64-28.71-64-64s28.71-64 64-64h224v128zM608 384c-70.69 0-128 57.31-128 128s57.31 128 128 128h224v160H192V224h640v160H608z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M624 512m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconqianbaoHuaban.defaultProps = {
  size: 18,
};

export default IconqianbaoHuaban;
