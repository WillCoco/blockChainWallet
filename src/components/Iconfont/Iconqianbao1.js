/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconqianbao1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M858.624 226.304h-57.856v-32.256c0-60.416-49.152-91.648-96.256-91.648h-542.72c-52.736 0-88.576 44.544-88.576 91.648V303.104h0.512V824.32c0 53.76 44.032 97.792 97.792 97.792h687.616c53.76 0 97.792-43.52 97.792-97.792V324.096c-0.512-54.272-44.544-97.792-98.304-97.792zM168.448 161.792h535.552c20.48 0 34.816 14.336 34.816 32.256v32.256H168.448c-20.48 0-34.816-14.336-34.816-32.256 0.512-17.92 14.848-32.256 34.816-32.256z m726.016 270.848V809.984c0 27.136-22.016 48.64-48.64 48.64H183.808c-27.136 0-48.64-22.016-48.64-48.64V288.768h710.656c27.136 0 48.64 22.016 48.64 48.64v95.232z"
        fill={getIconColor(color, 0, '#2E77ED')}
      />
      <Path
        d="M578.56 496.64v140.288c0 45.568 22.016 62.464 48.64 62.464h267.264v-62.464h-253.44V510.464h253.44V447.488h-267.264c-27.136 0-48.64 22.016-48.64 49.152z"
        fill={getIconColor(color, 1, '#FFBB12')}
      />
    </Svg>
  );
};

Iconqianbao1.defaultProps = {
  size: 18,
};

export default Iconqianbao1;
