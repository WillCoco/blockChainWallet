/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconshoukuan2 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M704 96a96 96 0 0 1 96 96v352.64h-2.528v32H768a32 32 0 0 1-32-32V192a32 32 0 0 0-32-32H320a32 32 0 0 0-32 32v352.64a32 32 0 0 1-32 32H163.744l368.224 294.368-6.944 8.704 22.816 28.64-15.904 12.672a32 32 0 0 1-39.904 0L88.16 598.112a48 48 0 0 1 29.952-85.504H224V192a96 96 0 0 1 96-96z m-70.464 194.304a32 32 0 0 1-3.936 45.056l-70.4 59.04 49.024 0.032a32 32 0 0 1 31.776 28.256l0.224 3.744a32 32 0 0 1-28.288 31.776l-3.712 0.224H544v51.264l64 0.032a32 32 0 0 1 31.776 28.288l0.224 3.712a32 32 0 0 1-28.256 31.776L608 573.76h-64v134.336a32 32 0 0 1-28.256 31.776l-3.744 0.224a32 32 0 0 1-31.776-28.288L480 708.064v-134.368l-64 0.032a32 32 0 0 1-31.776-28.256L384 541.728a32 32 0 0 1 28.256-31.776l3.744-0.224h64v-51.328l-63.776 0.032a32 32 0 0 1-31.776-28.256l-0.224-3.744a32 32 0 0 1 28.256-31.776l3.744-0.224h48.544l-70.368-59.072a32 32 0 0 1-6.336-41.824l2.4-3.232a32 32 0 0 1 41.856-6.336l3.2 2.368L512 350.496l76.48-64.16a32 32 0 0 1 45.056 3.968z"
        fill={getIconColor(color, 0, '#1C1C1E')}
      />
      <Path
        d="M492.064 870.976a32 32 0 0 0 39.872 50.048L936.96 598.176a48 48 0 0 0-29.92-85.536H768a32 32 0 1 0 0 64h93.28l-369.216 294.336z"
        fill={getIconColor(color, 1, '#FAAC08')}
      />
    </Svg>
  );
};

Iconshoukuan2.defaultProps = {
  size: 18,
};

export default Iconshoukuan2;
