/* eslint-disable */

import React from 'react';

import Iconarrowright from './Iconarrowright';
import Iconclose from './Iconclose';
import Iconserviceshandiantuikuan from './Iconserviceshandiantuikuan';
import Iconliulanqi from './Iconliulanqi';
import Iconshandian from './Iconshandian';
import Iconqianbao2 from './Iconqianbao2';
import Iconjiantou from './Iconjiantou';
import Iconunlock from './Iconunlock';
import Iconwode from './Iconwode';
import Iconquestion from './Iconquestion';
import Iconzichanbaoguanli from './Iconzichanbaoguanli';
import Iconsuo from './Iconsuo';
import Iconqianbao from './Iconqianbao';
import Iconsuo1 from './Iconsuo1';
import Iconqianbao1 from './Iconqianbao1';
import Iconzichanzonglan from './Iconzichanzonglan';
import Iconxinxi from './Iconxinxi';
import IconHuabanfuben from './IconHuabanfuben';
import Iconin from './Iconin';
import Iconout from './Iconout';
import Iconjiesuo from './Iconjiesuo';
import Icondaoru from './Icondaoru';
import IconyanjingBiyan from './IconyanjingBiyan';
import Iconsaoyisao from './Iconsaoyisao';
import Iconshoukuan2 from './Iconshoukuan2';
import Iconzhuanzhang from './Iconzhuanzhang';
import IconqianbaoHuaban from './IconqianbaoHuaban';
import Iconliaotianzhuanzhang from './Iconliaotianzhuanzhang';
import Iconshoukuan1 from './Iconshoukuan1';
import Iconexchange from './Iconexchange';
import Iconshoukuan from './Iconshoukuan';
import Iconscan from './Iconscan';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Icon = ({ color, name, size, ...rest }) => {
  switch (name) {
    case 'arrowright':
      return <Iconarrowright size={size} color={color} {...rest} />;
    case 'close':
      return <Iconclose size={size} color={color} {...rest} />;
    case 'serviceshandiantuikuan':
      return <Iconserviceshandiantuikuan size={size} color={color} {...rest} />;
    case 'liulanqi':
      return <Iconliulanqi size={size} color={color} {...rest} />;
    case 'shandian':
      return <Iconshandian size={size} color={color} {...rest} />;
    case 'qianbao2':
      return <Iconqianbao2 size={size} color={color} {...rest} />;
    case 'jiantou':
      return <Iconjiantou size={size} color={color} {...rest} />;
    case 'unlock':
      return <Iconunlock size={size} color={color} {...rest} />;
    case 'wode':
      return <Iconwode size={size} color={color} {...rest} />;
    case 'question':
      return <Iconquestion size={size} color={color} {...rest} />;
    case 'zichanbaoguanli':
      return <Iconzichanbaoguanli size={size} color={color} {...rest} />;
    case 'suo':
      return <Iconsuo size={size} color={color} {...rest} />;
    case 'qianbao':
      return <Iconqianbao size={size} color={color} {...rest} />;
    case 'suo1':
      return <Iconsuo1 size={size} color={color} {...rest} />;
    case 'qianbao1':
      return <Iconqianbao1 size={size} color={color} {...rest} />;
    case 'zichanzonglan':
      return <Iconzichanzonglan size={size} color={color} {...rest} />;
    case 'xinxi':
      return <Iconxinxi size={size} color={color} {...rest} />;
    case 'huabanfuben':
      return <IconHuabanfuben size={size} color={color} {...rest} />;
    case 'in':
      return <Iconin size={size} color={color} {...rest} />;
    case 'out':
      return <Iconout size={size} color={color} {...rest} />;
    case 'jiesuo':
      return <Iconjiesuo size={size} color={color} {...rest} />;
    case 'daoru':
      return <Icondaoru size={size} color={color} {...rest} />;
    case 'yanjing-biyan':
      return <IconyanjingBiyan size={size} color={color} {...rest} />;
    case 'saoyisao':
      return <Iconsaoyisao size={size} color={color} {...rest} />;
    case 'shoukuan2':
      return <Iconshoukuan2 size={size} color={color} {...rest} />;
    case 'zhuanzhang':
      return <Iconzhuanzhang size={size} color={color} {...rest} />;
    case 'qianbao_huaban':
      return <IconqianbaoHuaban size={size} color={color} {...rest} />;
    case 'liaotianzhuanzhang':
      return <Iconliaotianzhuanzhang size={size} color={color} {...rest} />;
    case 'shoukuan1':
      return <Iconshoukuan1 size={size} color={color} {...rest} />;
    case 'exchange':
      return <Iconexchange size={size} color={color} {...rest} />;
    case 'shoukuan':
      return <Iconshoukuan size={size} color={color} {...rest} />;
    case 'scan':
      return <Iconscan size={size} color={color} {...rest} />;

  }

  return null;
};

Icon.defaultProps = {
  size: 18,
};

export default Icon;
