/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconqukuai = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M375.46496 68.26496h-204.8c-56.5504 0-102.4 45.8496-102.4 102.4v204.8c0 56.5504 45.8496 102.4 102.4 102.4h204.8c56.5504 0 102.4-45.8496 102.4-102.4v-204.8c0-56.5504-45.8496-102.4-102.4-102.4z m0 477.86496h-204.8c-56.5504 0-102.4 45.8496-102.4 102.4v204.8c0 56.55552 45.8496 102.4 102.4 102.4h204.8c56.5504 0 102.4-45.84448 102.4-102.4v-204.8c0-56.5504-45.8496-102.4-102.4-102.4z m477.86496 0h-204.8c-56.5504 0-102.4 45.8496-102.4 102.4v204.8c0 56.55552 45.8496 102.4 102.4 102.4h204.8c56.55552 0 102.4-45.84448 102.4-102.4v-204.8c0-56.5504-45.84448-102.4-102.4-102.4z m0-477.86496h-204.8c-56.5504 0-102.4 45.8496-102.4 102.4v204.79488c0 56.5504 45.8496 102.39488 102.4 102.39488h204.8c56.55552 0 102.4-45.84448 102.4-102.39488V170.66496c0-56.5504-45.84448-102.4-102.4-102.4zM170.66496 414.72c-21.64736 0-39.25504-17.60768-39.25504-39.25504v-204.8c0-21.64736 17.60768-39.25504 39.25504-39.25504h204.8c21.64736 0 39.25504 17.60768 39.25504 39.25504v204.8C414.72 397.11232 397.11232 414.72 375.46496 414.72h-204.8z m0 477.87008c-21.64736 0-39.25504-17.60768-39.25504-39.26016v-204.8c0-21.64736 17.60768-39.24992 39.25504-39.24992h204.8c21.64736 0 39.25504 17.60256 39.25504 39.24992v204.8c0 21.65248-17.60768 39.26016-39.25504 39.26016h-204.8z m477.86496 0c-21.64736-0.00512-39.24992-17.61792-39.24992-39.26016v-204.8c0-21.64736 17.60256-39.24992 39.24992-39.24992h204.8c21.63712 0 39.24992 17.60256 39.26016 39.2448v204.80512c-0.01024 21.64736-17.62304 39.25504-39.26016 39.26016h-204.8z m-0.01024-477.88032c-21.64736 0-39.24992-17.60768-39.24992-39.24992V170.66496c0-21.64224 17.60256-39.25504 39.24992-39.25504h204.8c21.64224 0 39.24992 17.6128 39.25504 39.25504v204.79488c-0.00512 21.64224-17.6128 39.24992-39.25504 39.24992h-204.8z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
    </Svg>
  );
};

Iconqukuai.defaultProps = {
  size: 18,
};

export default Iconqukuai;