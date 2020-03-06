/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconshuliang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M588.221 586.553l-150.15-212.111v212.3h-64.072V286.445h64.072v0.034h0.039l150.111 212.055V286.445h64.073v300.297h-62.329l-0.936 0.769-0.657-0.769h-0.151z"
        fill={getIconColor(color, 0, '#0F6EFF')}
      />
      <Path
        d="M654.303 792.758l-103.451 103.45c-19.598 19.598-51.374 19.598-70.972 0l-103.447-103.45a50.182 50.182 0 0 0-35.486-14.699H150.423c-27.716 0-50.184-22.468-50.184-50.184V148.943c0-27.716 22.468-50.184 50.184-50.184h729.889c27.716 0 50.184 22.468 50.184 50.184v578.931c0 27.716-22.468 50.184-50.184 50.184H689.788a50.186 50.186 0 0 0-35.485 14.7z m159.47-627.083h-596.81c-27.716 0-50.184 22.468-50.184 50.184v451.199c0 27.716 22.468 50.184 50.184 50.184H368.74a50.184 50.184 0 0 1 35.787 15.003l75.051 76.344c19.665 20.004 51.909 20.004 71.574 0.001l75.055-76.345a50.185 50.185 0 0 1 35.787-15.002h151.777c27.716 0 50.184-22.468 50.184-50.184v-451.2c0.002-27.716-22.466-50.184-50.182-50.184z"
        fill={getIconColor(color, 1, '#0F6EFF')}
      />
    </Svg>
  );
};

Iconshuliang.defaultProps = {
  size: 18,
};

export default Iconshuliang;
