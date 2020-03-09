/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

// If you don't like lots of icon files in your project,
// try to set generate_mode to "all-in-one" in root file "iconfont.json".
// And then regenerate icons by using cli command.
export const Iconshouxufei = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1026 1024" width={size} height={size} {...rest}>
      <Path
        d="M947.484324 868.527297H763.514451l-144.491359 144.412403a37.346674 37.346674 0 0 1-52.901208 0A57.243845 57.243845 0 0 1 552.699189 947.484324l157.914054-157.914054h213.183973a23.687108 23.687108 0 0 0 23.687108-23.687108V102.644135a23.687108 23.687108 0 0 0-23.687108-23.687108H102.644135a23.687108 23.687108 0 0 0-23.687108 23.687108v663.239027a23.687108 23.687108 0 0 0 23.687108 23.687108H315.828108v78.957027H78.957027a78.957027 78.957027 0 0 1-78.957027-78.957027V78.957027a78.957027 78.957027 0 0 1 78.957027-78.957027h868.527297a78.957027 78.957027 0 0 1 78.957027 78.957027v710.613243a78.957027 78.957027 0 0 1-78.957027 78.957027zM396.364276 300.036703l-64.744763-64.981634a45.874033 45.874033 0 1 1 64.744763-64.981633l64.744762 64.981633a45.874033 45.874033 0 1 1-64.744762 64.981634z m112.118978 59.691512a38.846857 38.846857 0 0 1 0-55.822618l111.329408-111.645236a39.478514 39.478514 0 0 1 56.059489 0 38.846857 38.846857 0 0 1 0 55.822618L564.542743 359.728215a39.478514 39.478514 0 0 1-56.059489 0.394785zM355.306622 552.699189H473.742162V473.742162H355.306622a39.478514 39.478514 0 0 1 0-78.957027h315.828108a39.478514 39.478514 0 0 1 0 78.957027H552.699189v78.957027h118.435541a39.478514 39.478514 0 0 1 0 78.957027H552.699189v118.435541a39.478514 39.478514 0 0 1-78.957027 0V631.656216H355.306622a39.478514 39.478514 0 0 1 0-78.957027z"
        fill={getIconColor(color, 0, '#919191')}
      />
    </Svg>
  );
};

Iconshouxufei.defaultProps = {
  size: 18,
};

export default Iconshouxufei;
