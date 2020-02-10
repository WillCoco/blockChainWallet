# rn脚手架

## 工程目录约定

	├── index.js 入口文件
	|
	├── scripts 脚本目录
	|   ├── setEnv
	|   └── 
	|
    ├── ios ios工程目录
    |
    ├── android android工程目录
	|
	├── src（工程目录）
	|   |
	|   ├── router 路由
	|   |
	|   ├── components 组件
	|   |      ├── basic 基础组件
	|   |      └── 业务组件、供能模块
	|   |
	|   ├── pages 页面容器
	|   |
	|   ├── redux 
    |   |      |── action
    |   |      |── reducers
    |   |      └── store
	|   |
    |   ├── helpers
    |   |      ├── axios 请求库
    |   |      └── i18n 国际化
    |   |
    |   ├── config 配置文件
    |   |      ├── rem 字体适配方案
    |   |      └── env 不同环境下的请求地址，下载注册地址
    |   |
	|   └── utils 工具函数
	|
	|
	└── package.json
	
## 路由方案

[react-navigation](https://reactnavigation.org/docs/zh-Hans/stack-navigator.html)

[react-navigation-hooks](http://npm.taobao.org/package/react-navigation-hooks)

## 数据管理方案

[react-redux](https://github.com/reduxjs/redux)

## 本地存储方案

[redux-persist](https://github.com/rt2zz/redux-persist)

## 请求方案

[axios](https://github.com/rt2zz/redux-persist)

## 国际化方案

[i18next](https://www.i18next.com/overview/getting-started)

自定义hook: useI18next

## Toast方案

[Toast](https://github.com/mochixuan/react-native-smart-tip)

## 弹窗方案

## 字体管理方案

[react-native-normalization-text](https://github.com/WillCoco/react-native-normalization-text)

## 图标库
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## 自定义图标
[react-native-iconfont-cli](https://github.com/iconfont-cli/react-native-iconfont-cli)
[阿里巴巴素材库](https://www.iconfont.cn/)


## app全局通用store状态

    1. 网络状态
        1.1 离线
            store.networkStatus = 'offline'
            
        1.2 在线
            1.2.1 wifi在线
            
            1.2.2 运营商移动在线
            
    2. app状态
        1.1 前台运行
        1.2 后台运行
    
