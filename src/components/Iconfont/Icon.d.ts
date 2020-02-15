/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'arrowright' | 'close' | 'serviceshandiantuikuan' | 'liulanqi' | 'shandian' | 'qianbao2' | 'jiantou' | 'unlock' | 'wode' | 'question' | 'zichanbaoguanli' | 'suo' | 'qianbao' | 'suo1' | 'qianbao1' | 'zichanzonglan' | 'xinxi' | 'huabanfuben' | 'in' | 'out' | 'jiesuo' | 'daoru' | 'yanjing-biyan' | 'saoyisao' | 'shoukuan2' | 'zhuanzhang' | 'qianbao_huaban' | 'liaotianzhuanzhang' | 'shoukuan1' | 'exchange' | 'shoukuan' | 'scan';
  size?: number;
  color?: string | string[];
}

export declare const Icon: FunctionComponent<Props>;

export default Icon;
