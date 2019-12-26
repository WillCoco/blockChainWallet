/**
 * @author: Xu Ke
 * @date: 2019/12/19 6:46 PM
 * @Description: 国际化hook
 * useIi8n：
 *  语言变换后改变t方法
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
import React, {useEffect} from 'react';
import i18n from '../helpers/i18n';

export default () => {
  const [language, setLanguage] = React.useState(i18n.language);

  const changeLanguage = lang => {
    i18n.changeLanguage(lang, function() {
      console.log('切换语言：', i18n.language);
      setLanguage(i18n.language);
    });
  };

  return {
    language,
    changeLanguage,
    t: key => i18n.t(key),
  };
};
