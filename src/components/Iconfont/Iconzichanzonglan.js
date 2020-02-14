/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconzichanzonglan = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M547.84 257.024c0-18.432-14.848-33.28-33.28-33.28S481.28 238.592 481.28 257.024v78.336h66.56V257.024zM481.28 766.976c0 18.432 14.848 33.28 33.28 33.28s33.28-14.848 33.28-33.28v-79.36H481.28v79.36z"
        fill={getIconColor(color, 0, '#FA7268')}
      />
      <Path
        d="M574.464 478.72H457.728c-20.992 0-38.4-16.896-38.4-38.4s16.896-38.4 38.4-38.4h174.08c18.432 0 33.28-14.848 33.28-33.28s-14.848-33.28-33.28-33.28H458.24C399.872 335.36 353.28 382.464 353.28 440.32s47.104 104.96 104.96 104.96H571.392c20.992 0 38.4 16.896 38.4 38.4s-16.896 38.4-38.4 38.4h-174.08c-18.432 0-33.28 14.848-33.28 33.28s14.848 33.28 33.28 33.28h173.568c57.856 0 104.96-47.104 104.96-104.96 0-57.344-45.568-103.424-101.376-104.96z"
        fill={getIconColor(color, 1, '#3E3A39')}
      />
      <Path
        d="M819.2 74.752H209.92c-48.128 0-87.04 38.912-87.04 87.04v700.416c0 48.128 38.912 87.04 87.04 87.04h609.28c48.128 0 87.04-38.912 87.04-87.04V161.28c0-47.616-38.912-86.528-87.04-86.528z m20.48 786.944c0 11.264-9.216 20.48-20.48 20.48H209.92c-11.264 0-20.48-9.216-20.48-20.48V161.28c0-11.264 9.216-20.48 20.48-20.48h609.28c11.264 0 20.48 9.216 20.48 20.48v700.416z"
        fill={getIconColor(color, 2, '#3E3A39')}
      />
    </Svg>
  );
};

Iconzichanzonglan.defaultProps = {
  size: 18,
};

export default Iconzichanzonglan;
