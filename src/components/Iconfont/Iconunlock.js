/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconunlock = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M948.57 424.58L532.7 71.75a32 32 0 0 0-41.4 0L75.43 424.58a32 32 0 0 0 41.4 48.8L127.9 464v454a41.91 41.91 0 0 0 41.86 41.86h684.53A41.91 41.91 0 0 0 896.15 918V464l11 9.34a32 32 0 0 0 41.4-48.8z m-116.42-14.37v485.64H191.9V410.21v-0.5L512 138.12l320.16 271.63c0 0.15-0.01 0.3-0.01 0.46z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M255.85 735.78m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 1, '#2171DE')}
      />
      <Path
        d="M447.89 735.78m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 2, '#2171DE')}
      />
      <Path
        d="M255.85 607.94m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 3, '#2171DE')}
      />
      <Path
        d="M255.85 480.46m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 4, '#2171DE')}
      />
      <Path
        d="M447.89 607.94m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 5, '#2171DE')}
      />
      <Path
        d="M639.92 735.78m12 0l72 0q12 0 12 12l0 72q0 12-12 12l-72 0q-12 0-12-12l0-72q0-12 12-12Z"
        fill={getIconColor(color, 6, '#2171DE')}
      />
    </Svg>
  );
};

Iconunlock.defaultProps = {
  size: 18,
};

export default Iconunlock;
