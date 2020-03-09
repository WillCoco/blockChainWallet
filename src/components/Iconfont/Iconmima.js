/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconmima = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M861.52533333 900.36148148a38.83614815 38.83614815 0 0 0 38.83614815-38.83614815V473.16385185a38.83614815 38.83614815 0 0 0-38.83614815-38.83614815H162.47466667a38.83614815 38.83614815 0 0 0-38.83614815 38.83614815v388.36148148a38.83614815 38.83614815 0 0 0 38.83614815 38.83614815z m0 77.6722963H162.47466667a116.50844445 116.50844445 0 0 1-116.50844445-116.50844445V473.16385185a116.50844445 116.50844445 0 0 1 116.50844445-116.50844444h699.05066666a116.50844445 116.50844445 0 0 1 116.50844445 116.50844444v388.36148148a116.50844445 116.50844445 0 0 1-116.50844445 116.50844445z"
        fill={getIconColor(color, 0, '#2171DE')}
      />
      <Path
        d="M473.16385185 589.6722963a38.83614815 38.83614815 0 0 1 77.6722963 0v155.34459259a38.83614815 38.83614815 0 0 1-77.6722963 0zM317.81925925 395.49155555a38.83614815 38.83614815 0 0 1-77.67229628 0v-116.50844444a271.85303703 271.85303703 0 0 1 543.70607406 0v116.50844444a38.83614815 38.83614815 0 0 1-77.67229628 0v-116.50844444a194.18074075 194.18074075 0 0 0-388.3614815 0z"
        fill={getIconColor(color, 1, '#2171DE')}
      />
    </Svg>
  );
};

Iconmima.defaultProps = {
  size: 18,
};

export default Iconmima;