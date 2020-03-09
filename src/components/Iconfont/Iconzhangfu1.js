/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconzhangfu1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 38.912C250.88 38.912 38.912 250.88 38.912 512c0 87.04 23.552 168.96 65.536 239.616l184.32-184.32c11.264-11.264 30.72-11.264 41.984 0l102.4 102.4 246.784-246.784H571.392c-16.384 0-29.696-13.312-29.696-29.696 0-16.384 13.312-29.696 29.696-29.696h178.176c16.384 0 29.696 13.312 29.696 29.696v177.152c0 16.384-13.312 29.696-29.696 29.696-16.384 0-29.696-13.312-29.696-29.696V464.896L452.608 732.16c-5.12 5.12-13.312 8.192-20.48 8.192-8.192 0-15.36-3.072-20.48-8.192l-102.4-102.4-171.008 172.032C224.256 913.408 359.424 985.088 512 985.088c261.12 0 473.088-211.968 473.088-473.088C985.088 250.88 773.12 38.912 512 38.912z m0 0"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconzhangfu1.defaultProps = {
  size: 18,
};

export default Iconzhangfu1;
