/* eslint-disable */

import React from 'react';

import Iconshoukuan from './Iconshoukuan';
import Iconscan from './Iconscan';
import Iconliaotianzhuanzhang from './Iconliaotianzhuanzhang';
import Iconshoukuan1 from './Iconshoukuan1';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icon = ({ color, name, size, ...rest }) => {
  switch (name) {
    case 'shoukuan':
      return <Iconshoukuan size={size} color={color} {...rest} />;
    case 'scan':
      return <Iconscan size={size} color={color} {...rest} />;
    case 'liaotianzhuanzhang':
      return <Iconliaotianzhuanzhang size={size} color={color} {...rest} />;
    case 'shoukuan1':
      return <Iconshoukuan1 size={size} color={color} {...rest} />;

  }

  return null;
};

Icon.defaultProps = {
  size: 18,
};

export default Icon;
