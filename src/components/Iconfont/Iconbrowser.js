/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconbrowser = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#2264E9')}
      />
      <Path
        d="M512 512m-256 0a256 256 0 1 0 512 0 256 256 0 1 0-512 0Z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M364.922 364.922l217.082 77.074 77.074 217.082-217.082-77.074z"
        fill={getIconColor(color, 2, '#F3F5F6')}
      />
      <Path
        d="M582.464 442.457L659.54 659.54l-217.082-77.075z"
        fill={getIconColor(color, 3, '#E1E8F3')}
      />
      <Path
        d="M364.46 364.46l217.083 77.076-140.007 140.007z"
        fill={getIconColor(color, 4, '#C4CFE2')}
      />
      <Path
        d="M512 512m-48 0a48 48 0 1 0 96 0 48 48 0 1 0-96 0Z"
        fill={getIconColor(color, 5, '#FFFFFF')}
      />
    </Svg>
  );
};

Iconbrowser.defaultProps = {
  size: 18,
};

export default Iconbrowser;
