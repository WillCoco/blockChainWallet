/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconicon = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M478.72 709.12c5.12 5.12 12.8 7.68 20.48 7.68 7.68 0 15.36-2.56 20.48-7.68l125.44-153.6c10.24-10.24 10.24-25.6 0-35.84-10.24-10.24-25.6-10.24-35.84 0l-84.48 102.4V230.4c0-15.36-10.24-25.6-25.6-25.6s-25.6 10.24-25.6 25.6v391.68l-84.48-102.4c-10.24-10.24-25.6-10.24-35.84 0-10.24 10.24-10.24 25.6 0 35.84l125.44 153.6zM806.4 102.4h-614.4c-56.32 0-102.4 46.08-102.4 102.4v614.4c0 56.32 46.08 102.4 102.4 102.4h614.4c56.32 0 102.4-46.08 102.4-102.4V204.8c0-56.32-46.08-102.4-102.4-102.4z m51.2 716.8c0 28.16-23.04 51.2-51.2 51.2h-614.4c-28.16 0-51.2-23.04-51.2-51.2V204.8c0-28.16 23.04-51.2 51.2-51.2h614.4c28.16 0 51.2 23.04 51.2 51.2v614.4z m-128-51.2h-460.8c-15.36 0-25.6 10.24-25.6 25.6s10.24 25.6 25.6 25.6h460.8c15.36 0 25.6-10.24 25.6-25.6 0-12.8-10.24-25.6-25.6-25.6z"
        fill={getIconColor(color, 0, '#0F6EFF')}
      />
    </Svg>
  );
};

Iconicon.defaultProps = {
  size: 18,
};

export default Iconicon;
