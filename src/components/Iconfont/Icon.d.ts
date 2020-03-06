/* eslint-disable */

import { FunctionComponent } from 'react';
// Don't forget to install package: @types/react-native
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';

interface Props extends GProps, ViewProps {
  name: 'gengxin' | 'file' | 'icon--' | 'daochu' | 'yingwen' | 'zhongwen' | 'shouxufei' | 'gouxuanzhong' | 'gou' | 'shuliang' | 'wode-guanyuwomen' | 'jiaoyijilu' | 'Tokens' | 'yuyanshezhi' | 'token' | 'beizhu' | 'mima' | 'querenmima' | 'qukuai' | 'gou1' | 'gouxuanzhong1' | 'qianbao3' | 'jine' | 'dizhi' | 'shouxufeishuai' | 'ku' | 'smile' | 'ku1' | 'ku2' | 'fabuguanggao' | 'zhangfu1' | 'chengjiaoliang1' | 'jiage4' | 'new' | 'jiazai' | 'browser' | 'eyeopen' | 'arrowdetail' | 'closecircle' | 'arrowright' | 'close' | 'serviceshandiantuikuan' | 'liulanqi' | 'shandian' | 'qianbao2' | 'jiantou' | 'unlock' | 'wode' | 'question' | 'question-copy' | 'question-red-copy' | 'walletblue-copy' | 'zichanbaoguanli' | 'suo' | 'qianbao' | 'suo1' | 'qianbao1' | 'zichanzonglan' | 'xinxi' | 'huabanfuben' | 'in' | 'out' | 'jiesuo' | 'daoru' | 'eyeclose' | 'saoyisao' | 'shoukuan2' | 'zhuanzhang' | 'qianbao_huaban' | 'liaotianzhuanzhang' | 'exchange' | 'shoukuan' | 'scan';
  size?: number;
  color?: string | string[];
}

export declare const Icon: FunctionComponent<Props>;

export default Icon;
