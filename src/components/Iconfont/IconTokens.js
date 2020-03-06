/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const IconTokens = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M510.7 869.5c-88.4 0-171.5-34.4-234.1-96.9-62.5-62.5-96.9-145.6-96.9-234.1s34.4-171.5 96.9-234.1 145.6-96.9 234.1-96.9 171.5 34.4 234.1 96.9c62.5 62.5 96.9 145.6 96.9 234.1S807.3 710 744.8 772.6c-62.6 62.5-145.7 96.9-234.1 96.9z m0-632c-166 0-301 135-301 301s135 301 301 301 301-135 301-301-135.1-301-301-301z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M586.2 503.2c5.6-7.3 10.8-13.2 12.8-21 9-35-14.9-63.9-53.5-65.7-10.6-0.5-23.9 6.5-30.7-0.9-6.7-7.3-6.7-20.6-9.7-31.3-0.2-0.8-0.4-1.6-0.5-2.4-1.1-8.4-4.7-10-13.1-7.4-18.7 5.8-18.9 5.2-13.9 24.3 1.4 5.2 2.3 10.5 4.3 15.4 3.8 9.5 2 13.9-9 16.3-8.8 1.9-11.9 0.6-13.1-8-0.7-5.2-2.8-10.3-4.2-15.4-6-22.5-5.9-22.2-28.7-15.2-5.5 1.7-6.1 3.2-4.6 8.4 3.4 11 5.5 22.3 9 33.3 1.8 5.8 0.7 7.8-5.2 9.1-13.2 3.1-26 7.9-39.2 10.4-9.9 1.9-11.6 5.2-8.5 14.7 5.7 17.9 5 18 23.1 14.1 9.8-2.1 20.2-2.5 23.5 9.4 11.6 41.5 22.3 83.2 33.3 124.9 2.3 8.6-1.5 13.1-9.4 15.7-19 6.1-18.9 6.2-16.6 26.1 0.6 4.8 1 9.7 1.6 15.4 10.9-2.9 21.1-5.7 31.4-8.5 26.1-7 26.1-7 33.2 19.5 6 22.2 5.9 21.9 28.2 14.7 5.4-1.8 6.2-4.2 5-8.9-2.7-9.9-4.5-20.1-8.2-29.6-3.3-8.5-0.4-10.9 7.3-13.6 10.1-3.5 14.8-1.2 16.1 9.6 0.6 5.2 2.7 10.3 4.1 15.4 5.3 19.6 5.2 19.3 25.4 13.8 7-1.9 9.3-4.5 6.7-11.7-3.4-9.7-5.4-19.8-8.5-29.6-2.2-6.9-0.5-10.4 6.7-12.3 6.7-1.8 13.2-4.6 19.4-7.7 14.1-7.1 27-16.1 35-30.1 22.8-39.6-1.6-85.4-49.5-91.2z m-101.1 13.7c-3.7-14.7-7.8-29.2-11.8-43.8-1.3-4.6-0.9-7.5 4.7-9 12.2-3.3 24.4-7.1 37.2-7.3 16.6-0.2 27.4 6.2 31.2 18.6 3.9 12.6-1.2 23.1-16 32.4-11.6 7.3-24.8 10.4-37.8 13.8-5 1.3-6.4-0.3-7.5-4.7z m89.2 72.7c-16.9 14.3-37.8 18.9-58.2 24.7-3.8 1.1-5.1-1-6-4.2-4.6-17.4-9.1-34.9-14-52.2-1.4-4.9 0.2-6.3 4.7-7.6 15.8-4.5 31.5-9.1 48.1-9.2 21 0.1 33.2 8.2 35.2 23.3 1.3 10.3-2 18.6-9.8 25.2z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

IconTokens.defaultProps = {
  size: 18,
};

export default IconTokens;
