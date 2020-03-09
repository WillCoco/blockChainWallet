/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icondizhi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M893.44 397.482667C893.44 178.574222 722.090667 1.137778 510.691556 1.137778 299.320889 1.137778 128 178.545778 128 397.482667c0 108.032 41.898667 205.852444 109.568 277.447111h-0.142222l1.507555 1.621333 2.332445 2.389333 216.462222 207.473778a73.102222 73.102222 0 0 0 105.955556 0l216.462222-207.473778 2.275555-2.389333 1.564445-1.621333h-0.142222c70.257778-73.955556 109.653333-173.624889 109.596444-277.447111z m-159.544889 231.025777l-170.723555 161.28c-52.394667 54.300444-52.451556 54.471111-104.96 0l-170.695112-161.28a330.894222 330.894222 0 0 1-92.615111-230.456888c0-180.622222 141.397333-327.054222 315.733334-327.054223 174.421333 0 315.790222 146.432 315.790222 327.111111a330.638222 330.638222 0 0 1-92.529778 230.4zM170.581333 937.614222h681.159111c28.387556 0 42.581333 14.193778 42.581334 42.552889 0 28.387556-14.222222 42.581333-42.581334 42.581333H170.581333C142.193778 1022.748444 128 1008.554667 128 980.195556c0-28.359111 14.193778-42.552889 42.581333-42.552889z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M525.368889 199.68c52.622222-0.056889 103.139556 22.357333 140.401778 62.293333 37.262222 39.907556 58.225778 94.122667 58.254222 150.584889 0 117.475556-88.917333 212.849778-198.684445 212.849778-109.738667 0-198.656-95.345778-198.656-212.878222 0.056889-56.462222 20.992-110.677333 58.254223-150.556445 37.262222-39.936 87.751111-62.350222 140.401777-62.293333z m0 354.759111v0.028445c35.100444 0.028444 68.750222-14.876444 93.582222-41.528889 24.860444-26.567111 38.826667-62.72 38.855111-100.380445-0.056889-78.449778-59.363556-141.994667-132.465778-141.909333-73.102222-0.056889-132.380444 63.488-132.437333 141.937778 0.113778 78.392889 59.392 141.937778 132.437333 141.852444z"
        fill={getIconColor(color, 1, '#2171DE')}
      />
    </Svg>
  );
};

Icondizhi.defaultProps = {
  size: 18,
};

export default Icondizhi;