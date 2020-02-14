/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconzichanbaoguanli = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M872.984564 907.044288 95.92063 907.044288c-51.750641 0-93.852528-43.444465-93.852528-96.842629L2.068102 98.889241c0-53.399187 42.101887-96.842629 93.852528-96.842629l777.063935 0c51.750641 0 93.853551 43.443441 93.853551 96.842629l0 127.916345c0 18.821671-15.257495 34.079166-34.079166 34.079166s-34.079166-15.257495-34.079166-34.079166L898.679783 98.889241c0-15.817244-11.526521-28.684296-25.695219-28.684296L95.92063 70.204945c-14.167674 0-25.695219 12.867052-25.695219 28.684296l0 711.312418c0 15.817244 11.526521 28.685319 25.695219 28.685319l777.063935 0c14.167674 0 25.695219-12.867052 25.695219-28.685319L898.679783 683.078377c0-18.820648 15.257495-34.079166 34.079166-34.079166s34.079166 15.258519 34.079166 34.079166l0 127.122259C966.838116 863.599823 924.735206 907.044288 872.984564 907.044288z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M950.857143 378.37463l0 141.747351L578.714448 520.121981 578.714448 378.37463 950.857143 378.37463M1019.015476 310.217321 510.557138 310.217321l0 278.062993 508.458337 0L1019.015476 310.217321 1019.015476 310.217321z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M764.782214 417.470043l127.115096 0 0 63.557548-127.115096 0 0-63.557548Z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

Iconzichanbaoguanli.defaultProps = {
  size: 18,
};

export default Iconzichanbaoguanli;
