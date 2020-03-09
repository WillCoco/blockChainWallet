/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconfile = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M642 673.1H301.6c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9H642c9.9 0 17.9 8 17.9 17.9s-8 17.9-17.9 17.9zM642 511.8H301.6c-9.9 0-17.9-8-17.9-17.9 0-9.9 8-17.9 17.9-17.9H642c9.9 0 17.9 8 17.9 17.9 0 9.9-8 17.9-17.9 17.9zM480.7 350.6H301.6c-9.9 0-17.9-8-17.9-17.9s8-17.9 17.9-17.9h179.2c9.9 0 17.9 8 17.9 17.9s-8.1 17.9-18 17.9zM874.9 350.6H695.7c-49.4 0-89.6-40.2-89.6-89.6V81.9c0-9.9 8-17.9 17.9-17.9 9.9 0 17.9 8 17.9 17.9V261c0 29.6 24.1 53.7 53.7 53.7h179.2c9.9 0 17.9 8 17.9 17.9s-7.9 18-17.8 18z"
        fill={getIconColor(color, 0, '#0F6EFF')}
      />
      <Path
        d="M794.3 959.7H221c-49.4 0-89.6-40.2-89.6-89.6V153.5c0-49.4 40.2-89.6 89.6-89.6h403.1c4.8 0 9.3 1.9 12.7 5.2L887.6 320c3.4 3.4 5.2 7.9 5.2 12.7v537.5c0 52.7-51.9 89.5-98.5 89.5zM221 99.8c-29.6 0-53.7 24.1-53.7 53.7v716.6c0 29.6 24.1 53.7 53.7 53.7h573.3c29 0 62.7-23.5 62.7-53.7v-530L616.7 99.8H221z"
        fill={getIconColor(color, 1, '#0F6EFF')}
      />
    </Svg>
  );
};

Iconfile.defaultProps = {
  size: 18,
};

export default Iconfile;
