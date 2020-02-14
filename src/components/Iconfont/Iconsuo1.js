/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconsuo1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M829.6 960.6h-634c-35.9 0-65.8-23.9-65.8-65.8V434.2c0-35.9 29.9-65.8 65.8-65.8h634c35.9 0 65.8 29.9 65.8 65.8v460.5c6 41.9-23.9 65.9-65.8 65.9z m-634-532.3c-5.9 0-5.9 5.9 0 0l-6 466.5c0 6 0 6 6 6h634c6 0 6 0 6-6V434.2c0-6 0-6-6-6h-634z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M590.4 589.8c0-41.9-41.9-77.8-77.8-77.8-41.9 0-71.8 41.9-71.8 77.8 0 29.9 17.9 59.8 47.8 65.8v107.7c0 12 6 17.9 17.9 17.9h23.9c12 0 17.9-6 17.9-17.9V655.5c24.1-5.9 42.1-35.8 42.1-65.7zM763.8 392.4H704v-89.7c0-101.7-83.7-179.4-179.4-179.4-101.7 0-179.4 83.7-179.4 179.4v89.7h-59.8v-89.7c0-131.6 107.7-239.2 239.2-239.2s239.2 107.7 239.2 239.2v89.7z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Iconsuo1.defaultProps = {
  size: 18,
};

export default Iconsuo1;
