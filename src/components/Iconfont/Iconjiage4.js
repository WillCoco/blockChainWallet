/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconjiage4 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 1024C229.2224 1024 0 794.7776 0 512S229.2224 0 512 0s512 229.2224 512 512-229.2224 512-512 512z m153.6-307.2v-64.768H459.9296c33.28-18.5344 49.8688-45.6704 49.8688-81.408v-26.5216h86.4768V485.5808h-86.528V438.784c0-44.6976 20.1216-67.072 60.2624-67.072 23.1936 0 45.4144 6.0416 66.6624 18.176v-69.12A198.9632 198.9632 0 0 0 562.944 307.2c-42.752 0-77.0048 11.3664-102.912 34.048-25.856 22.7328-38.7584 52.6336-38.7584 89.7536v54.5792H365.2096v58.5216h56.064v34.816c0 41.472-20.992 67.1232-62.8736 77.0048V716.8h307.2z m-153.6 256a460.8 460.8 0 1 0 0-921.6 460.8 460.8 0 0 0 0 921.6z m0-51.2a409.6 409.6 0 1 1 0-819.2 409.6 409.6 0 0 1 0 819.2z"
        fill={getIconColor(color, 0, '#F66D57')}
      />
    </Svg>
  );
};

Iconjiage4.defaultProps = {
  size: 18,
};

export default Iconjiage4;
