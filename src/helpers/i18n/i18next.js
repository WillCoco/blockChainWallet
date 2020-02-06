import i18next from 'i18next';
import en from './locales/en';
import ch from './locales/ch';

// 初始化
i18next.init(
  {
    lng: 'ch',
    debug: false,
    resources: {
      ch: {translation: ch},
      en: {translation: en},
    },
    fallbackLng: 'ch',
  },
  function(err) {
    // initialized and ready to go!
    if (err) {
      console.log(`i18next init error: ${err}`);
    } else {
      console.log('i18next init success!');
    }
  },
);

export default i18next;
