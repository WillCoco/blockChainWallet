/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconnew = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1626 1024" width={size} height={size} {...rest}>
      <Path
        d="M1193.020235 0H504.048941C265.155765 0 70.716235 200.583529 70.716235 447.066353L0 1020.626824l342.919529-126.494118h850.100706c238.893176 0 433.332706-200.643765 433.332706-447.066353C1626.352941 200.583529 1431.913412 0 1193.020235 0z"
        fill={getIconColor(color, 0, '#FF730A')}
      />
      <Path
        d="M329.968941 272.263529h69.150118l127.698823 245.880471V272.263529h63.789177v351.232H521.456941L393.758118 377.675294v251.78353H330.029176v-357.195295z m574.403765 64.39153h-170.164706v76.077176h159.503059v58.548706H734.268235V565.007059h175.465412v64.451765h-244.615529V278.046118h234.014117l5.300706 58.548706z m122.277647-64.451765l42.586353 204.920471 10.661647 58.548706 10.601412-52.645647 37.225411-204.920471h69.150118l37.225412 204.920471 10.661647 58.548705 10.601412-52.705882 42.586353-204.920471h69.150117l-90.413176 351.292236h-63.849412l-37.225412-204.920471-15.962353-76.137412-10.601411 70.294589-42.586353 204.860235h-63.849412l-90.352941-351.232h74.450823V272.263529z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

Iconnew.defaultProps = {
  size: 18,
};

export default Iconnew;