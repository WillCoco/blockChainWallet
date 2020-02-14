/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconexchange = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 908.8c220.16 0 396.8-176.64 396.8-396.8S732.16 115.2 512 115.2 115.2 291.84 115.2 512 291.84 908.8 512 908.8z m0 38.4c-240.64 0-435.2-194.56-435.2-435.2S271.36 76.8 512 76.8s435.2 194.56 435.2 435.2-194.56 435.2-435.2 435.2z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M284.16 478.72c-2.56-2.56-2.56-7.68 0-10.24L419.84 332.8c5.12-2.56 10.24 0 10.24 5.12v74.24h263.68c17.92 0 30.72 15.36 30.72 30.72s-15.36 30.72-30.72 30.72l-409.6 5.12z"
        fill={getIconColor(color, 1, '#2171DE')}
      />
      <Path
        d="M721.92 524.1088c2.56 2.56 2.56 7.68 0 10.24l-135.68 135.68c-5.12 2.56-10.24 0-10.24-5.12V585.5488H312.32C296.96 585.5488 281.6 572.7488 281.6 554.8288s15.36-30.72 30.72-30.72h409.6z"
        fill={getIconColor(color, 2, '#2171DE')}
      />
    </Svg>
  );
};

Iconexchange.defaultProps = {
  size: 18,
};

export default Iconexchange;
