/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconyuyanshezhi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M803.84 181.056H79.552A34.816 34.816 0 0 0 44.8 215.808v724.288a34.816 34.816 0 0 0 34.752 34.752H803.84a34.816 34.816 0 0 0 34.752-34.752V215.808a34.816 34.816 0 0 0-34.752-34.752z m-34.752 724.288H114.304V250.56h654.784z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M944 41.984H279.296a34.752 34.752 0 1 0 0 69.504h630.016v630.08a34.752 34.752 0 0 0 69.44 0V76.8a34.752 34.752 0 0 0-34.752-34.816zM348.16 676.544h187.136l43.776 115.52h75.648L483.52 362.048H399.872l-171.2 430.016h73.664zM441.6 427.712l75.776 203.072h-153.6z"
        fill={getIconColor(color, 1, '#2171DE')}
      />
    </Svg>
  );
};

Iconyuyanshezhi.defaultProps = {
  size: 18,
};

export default Iconyuyanshezhi;
