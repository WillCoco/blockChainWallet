/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icongengxin = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M876.169014 897.802817"
        fill={getIconColor(color, 0, '#0F6EFF')}
      />
      <Path
        d="M512 915.830986c-223.549296 0-407.43662-180.28169-407.43662-407.43662C104.56338 288.450704 288.450704 104.56338 512 104.56338c223.549296 0 407.43662 180.28169 407.43662 407.43662C915.830986 735.549296 735.549296 915.830986 512 915.830986L512 915.830986zM512 39.661972C252.394366 39.661972 39.661972 252.394366 39.661972 512c0 259.605634 212.732394 472.338028 472.338028 472.338028 259.605634 0 472.338028-212.732394 472.338028-472.338028C980.732394 252.394366 771.605634 39.661972 512 39.661972L512 39.661972zM512 39.661972"
        fill={getIconColor(color, 1, '#0F6EFF')}
      />
      <Path
        d="M569.690141 284.84507c0-14.422535 10.816901-25.239437 25.239437-25.239437l25.239437 0c14.422535 0 21.633803 10.816901 25.239437 21.633803l129.802817 133.408451c10.816901 10.816901 10.816901 25.239437 0 32.450704L753.577465 468.732394c-10.816901 10.816901-25.239437 10.816901-32.450704 0l-75.71831-79.323944 0 328.112676c0 14.422535-10.816901 25.239437-25.239437 25.239437l-25.239437 0c-14.422535 0-25.239437-10.816901-25.239437-25.239437L569.690141 310.084507 569.690141 284.84507 569.690141 284.84507 569.690141 284.84507zM450.704225 739.15493c0 14.422535-10.816901 25.239437-25.239437 25.239437l-25.239437 0c-14.422535 0-21.633803-10.816901-25.239437-21.633803L252.394366 605.746479c-10.816901-10.816901-10.816901-25.239437 0-32.450704l18.028169-18.028169c10.816901-10.816901 25.239437-10.816901 32.450704 0l75.71831 79.323944L378.591549 306.478873c0-14.422535 10.816901-25.239437 25.239437-25.239437l25.239437 0c14.422535 0 25.239437 10.816901 25.239437 25.239437l0 407.43662L454.309859 739.15493 450.704225 739.15493 450.704225 739.15493zM450.704225 739.15493"
        fill={getIconColor(color, 2, '#0F6EFF')}
      />
    </Svg>
  );
};

Icongengxin.defaultProps = {
  size: 18,
};

export default Icongengxin;