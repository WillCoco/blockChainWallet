/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconquerenmima = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M798.5 361.4v-80.9C791.8 128.1 666.4 8.1 513.9 8.1S236 128.1 229.2 280.5v80.9c-84.1-0.8-153.4 65.8-156.2 149.9v354.1c2.9 85.4 74.2 152.4 159.6 149.8h562.5c85.4 2.6 156.7-64.5 159.6-149.8V511.2c-2.7-84-72.1-150.5-156.2-149.8z m-499.8-80.9c3.6-116.3 99-208.7 215.2-208.7 116.4 0 211.7 92.4 215.2 208.7V360H298.7v-79.5z m586.4 584.8c-1.2 48.7-41.6 87.3-90.3 86.3h-562c-48.7 1-89.2-37.6-90.3-86.3V511.2c1.2-48.7 41.6-87.4 90.3-86.3h-0.5l66-1.4 430.6 1.4h66c48.7-1 89.1 37.6 90.3 86.3v354.1z m0 0"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M471.9 808.5L450.6 786c-8.6-9-8.2-23.2 0.8-31.8l198.9-188.6c9-8.6 23.2-8.2 31.8 0.8l21.3 22.5c8.6 9 8.2 23.2-0.8 31.8l-199 188.7c-9 8.6-23.2 8.2-31.7-0.9z m0 0"
        fill={getIconColor(color, 1, '#2171DE')}
      />
      <Path
        d="M345.2 649.7l21.9-21.9c8.8-8.8 23-8.8 31.8 0l127.5 127.6c8.8 8.8 8.8 23 0 31.8L504.6 809c-8.8 8.8-23 8.8-31.8 0L345.2 681.5c-8.7-8.9-8.7-23 0-31.8z m0 0"
        fill={getIconColor(color, 2, '#2171DE')}
      />
    </Svg>
  );
};

Iconquerenmima.defaultProps = {
  size: 18,
};

export default Iconquerenmima;
