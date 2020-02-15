/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconclosecircle = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M872.608199 150.326145C674.239679-49.59213 348.791325-49.59213 150.422804 150.326145c-199.918275 199.918275-199.918275 523.816875 0 723.735149 199.918275 199.918275 523.816875 199.918275 723.735149 0 198.368521-199.918275 198.368521-525.366629-1.549754-723.735149z m-40.293605 681.891789c-176.671964 176.671964-466.475974 176.671964-643.147938 0-176.671964-176.671964-176.671964-464.92622 0-643.147938C365.838619 12.398033 655.64263 12.398033 832.314594 189.069996c178.221718 178.221718 178.221718 466.475974 0 643.147938zM712.98353 309.950813c-10.848278-10.848278-29.445327-10.848278-40.293605 0L511.515502 471.125236 350.341079 309.950813c-10.848278-10.848278-29.445327-10.848278-40.293606 0-10.848278 10.848278-10.848278 29.445327 0 40.293606L471.221896 511.418842 310.047473 672.593265c-10.848278 10.848278-10.848278 29.445327 0 40.293606 10.848278 10.848278 29.445327 10.848278 40.293606 0L511.515502 551.712448 672.689925 712.886871c10.848278 10.848278 29.445327 10.848278 40.293605 0 10.848278-10.848278 10.848278-29.445327 0-40.293606L551.809107 511.418842 712.98353 350.244419c10.848278-10.848278 10.848278-27.895573 0-40.293606z"
        fill={getIconColor(color, 0, '#ffffff')}
      />
    </Svg>
  );
};

Iconclosecircle.defaultProps = {
  size: 18,
};

export default Iconclosecircle;
