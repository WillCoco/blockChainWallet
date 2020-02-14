/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconquestion = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 127.9c51.9 0 102.2 10.1 149.5 30.2 45.7 19.3 86.8 47 122.1 82.3s63 76.4 82.3 122.1c20 47.3 30.2 97.6 30.2 149.5S886 614.2 865.9 661.5c-19.3 45.7-47 86.8-82.3 122.1s-76.4 63-122.1 82.3c-47.3 20-97.6 30.2-149.5 30.2S409.8 886 362.5 865.9c-45.7-19.3-86.8-47-122.1-82.3s-63-76.4-82.3-122.1c-20-47.3-30.2-97.6-30.2-149.5s10.1-102.2 30.2-149.5c19.3-45.7 47-86.8 82.3-122.1s76.4-63 122.1-82.3c47.3-20 97.6-30.2 149.5-30.2m0-64C264.5 63.9 63.9 264.5 63.9 512S264.5 960.1 512 960.1 960.1 759.5 960.1 512 759.5 63.9 512 63.9z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
      <Path
        d="M480 736h64v64h-64zM476.9 686.3c-0.3-9.3-0.4-42.2-0.4-46.8 0-27.3 3.9-50.8 11.6-70.6 5.7-14.9 14.8-30 27.4-45.1 9.3-11.1 25.9-27.2 50-48.4 24-21.2 39.7-38.1 46.9-50.7s10.8-26.4 10.8-41.3c0-27-10.5-50.7-31.6-71.2-21.1-20.4-46.9-30.7-77.5-30.7-29.6 0-54.3 9.3-74.1 27.8-19.8 18.5-32.8 47.4-39 86.8l-71.4-8.5c6.4-52.7 25.5-93.1 57.3-121.1s73.7-42 125.9-42c55.3 0 99.4 15 132.3 45.1 32.9 30.1 49.4 66.5 49.4 109.2 0 24.7-5.8 47.4-17.4 68.3s-34.2 46.2-67.9 76c-22.6 20.1-37.4 34.8-44.4 44.4-6.9 9.5-12.1 20.4-15.4 32.8-3.3 12.3-5.3 58.4-5.8 86.2h-66.7v-0.2z"
        fill={getIconColor(color, 1, '#ffffff')}
      />
    </Svg>
  );
};

Iconquestion.defaultProps = {
  size: 18,
};

export default Iconquestion;
