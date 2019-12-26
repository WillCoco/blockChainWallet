/**
 * react-native-normalization-text 配置文件
 */

const config = {
  /**
   * scale 为字体缩放方法
   */
  // scale: (size) => (),
  /**
   * scalableItems Array<string>
   * 接受scale方法缩放的样式属性
   */
  // scalableItems: ['fontSize', 'lineHeight'],
  /**
   *  sizes中定义的尺寸可在Text组件中使用该props：
   *  <Text size="large"></Text.H1>
   *  <Text.H1 size="small"></Text.H1>
   */
  /*
  sizes: {
    large: 26,
    normal: 14,
    small: 12
  },
  */
  /**
   *  colors字段中定义的颜色可在Text组件中使用该props：
   *  <Text color="dark"></Text.H1>
   *  <Text.H1 color="error"></Text.H1>
   */
  /*
  colors: {
    dark: '#333',
    grey: '#999,
    error: '#ff0'
  },
  */
  /**
   *  categories 下定义H1、H2，及可在书写组件时使用H1、H2
   */
  /*
  categories: {
    H1: {
      props: {},
      style: {}
    },
    H2: {
      props: {},
      style: {}
    }
  }*/
};

export default config;
