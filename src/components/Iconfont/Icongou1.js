/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icongou1 = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M771.584 342.528a40.96 40.96 0 0 0-27.136-10.752 39.424 39.424 0 0 0-32.256 16.896l-270.336 285.184L307.2 490.496a38.912 38.912 0 0 0-29.184-13.312 40.96 40.96 0 0 0-30.72 14.848 51.2 51.2 0 0 0 0 63.488l165.376 178.688a41.472 41.472 0 0 0 29.184 12.8h2.56a39.936 39.936 0 0 0 30.208-16.896l299.52-324.096a51.2 51.2 0 0 0-5.632-63.488z"
        fill={getIconColor(color, 0, '#51A9FF')}
      />
      <Path
        d="M983.552 312.832A512 512 0 0 0 711.168 40.448a512 512 0 0 0-398.336 0A512 512 0 0 0 40.448 312.832a512 512 0 0 0 0 398.336 512 512 0 0 0 272.384 272.384 512 512 0 0 0 398.336 0 512 512 0 0 0 272.384-272.384 512 512 0 0 0 0-398.336z m-167.936 502.784A430.08 430.08 0 1 1 941.056 512a427.52 427.52 0 0 1-125.44 303.616z"
        fill={getIconColor(color, 1, '#51A9FF')}
      />
    </Svg>
  );
};

Icongou1.defaultProps = {
  size: 18,
};

export default Icongou1;
