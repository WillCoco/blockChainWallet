# UTC Wallet

## 一. 工程目录

	├── index.js 入口文件
	|
	├── scripts 脚本目录
	|   ├── setEnv 设置包环境、network
	|   └── genLibs 生成用于webview lib的umd模块
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
	|   |	
	|   ├── images 图片资源、图片读取器
	|   |
	|   ├── redux 
    |   |      |── action
    |   |      |── reducers
    |   |      └── store
	|   |
    |   ├── helpers
    |   |      ├── axios 请求库
    |   |      ├── i18n 国际化
    |   |      └── utils 工具函数
    |   |
    |   ├── config 配置文件
    |   |      ├── updateConfig react-native-update更新配置
    |   |      ├── dapps 内置h5 dapps
    |   |      ├── chainInfo 链信息
    |   |      └── env 不同环境下的请求地址，network
    |   |
	|   └── utils 工具函数
	|
	|
	└── package.json
	
## 二. 钱包核心架构

&emsp;&emsp;本钱包所使用到的加密库、钱包基础库在RN中没有现成的支持，而在browser和node环境上都由较好支持。本钱包在运行时在对应android、ios中启动WebView，webview中跑本地钱包基础支持库, 通过和webview的通讯来调用运行在web环境的这些基础库。
    
### 2.1 钱包基础库调用流程

![Alt text](./1582702918899.jpg)

### 2.2 WalletWebView lib接口

	2.2.1 创建钱包 CREATE_WALLET
		
	2.2.2 恢复钱包 RECOVER_WALLET_FROM_MNEMONIC
	
	2.2.3 校验助记词合法性 VALID_MNEMONIC

	2.2.4 AES加密 AES_ENCRYPT

	2.2.5 AES加密 AES_DECRYPT
	
	2.2.6 SHA_256 SHA_256


### 2.3 WalletWebView lib接口调用示例
	import {WVEvent, eventTypes} from 'src/helpers/eventEmmiter';

	// 创建钱包:
	WVEvent.emitEvent(eventTypes.POST_WEB_VIEW, [
      {
        payload: {
          action: eventTypes.CREATE_WALLET,
          name: '我的钱包1',
          password: '12345678',
        },
        callback: v => {
          console.log('创建的钱包:', v)
        },
      },
    ]);

	

### 2.4 存储安全

2.4.1 用户密码:
 sha256后存储, 用于用户再次输入后的密码校验

2.4.2 私钥和助记词: 
AES加密后存储, 在用户需要进行签署、导出等操作时, 输入密码AES解密后获得私钥和助记词

2.4.3 加密持久化存储流程
![Alt text](./1582707350539.jpg)

### 2.4 本地基础库html位置:
android: android/app/src/main/assets/walletBackground/index.html
ios : src/components/WalletWebView/index.html

### 2.5 基础库依赖和转换脚本
基础库依赖: crypto-js、 @33cn/wallet-base、bip39, 这些npm包都是commonjs规范的, 在这需要使用umd的方式, 并且兼容到较老的浏览器(android兼容性). 所以利用browserify 和 babelify写了转换脚本:
				
		yarn genLibs

## 三. dapps内置方案

### 3.1 承载方式
webview窗体加载部署在线h5地址;

### 3.2 和普通页面的层级关系
考虑到dapps以后可能支持最小化,并在全局所有页面内以小窗在局部显示的可能性.加载dapps的webview被设计成独立于页面路由之外、页面层级之上.

### 3.3 窗体基础状态

	3.2.1 预加载: actionTypes.PRELOAD:
	 
	3.2.2 打开: actionTypes.OPEN

	3.2.3 关闭: actionTypes.CLOSE

	3.2.4 最小化: actionTypes.MIN

### 3.4 窗体调用示例

	import {
	  dappDispatch,
	  VIEW_STATUS,
	  actionTypes,
	} from '../../components/DappsWebview';

	// 打开
	dappDispatch({
      type: actionTypes.OPEN,
      payload: {uri: 'https://www.baidu.com'},
    });
    
	// 关闭
	dappDispatch({type: actionTypes.CLOSE});
	
### 3.5 钱包提供给dapp h5的接口
在启动h5时会对h5注入 ```window.callWallet``` 方法, 即可调用到钱包已约定的接口. 注意每次调用需要请求标```callId```

3.5.1 创建并发送交易

	let callId = 0;
	
	const data = {
      action: 'DAPP_QUICK_SEND',
      callId: ++callId,
      payload: {
        to: 'address', // 对方地址
        amount: 1000000, // 发送金额 * 10e+8
        note: 'note', // 备注
        isToken: false, // 是否token
        isWithdraw: false, // 是否提现
        tokenSymbol: '', // 是token则填写symbol
        execer: 'coins', // token则填 token
      },
    };

    window.callWallet(JSON.stringify(data))
      .then(res => {
        console.log(res, 'DAPP_QUICK_SEND')
      })
      .catch(console.error)
    
	
	
	
## 四. 更新、热更新方案

### 4.1 react-native-update
使用了rn中文网的服务, 请查看[热更新文档](https://reactnativecn.github.io/react-native-pushy/#/)

### 4.2 测试、正式更新配置切换
发正式版本bundle前都需要在测试账号上测试, 在src/config/updateConfig.js中配置了测试、正式两套环境.切换流程:
	
4.2.1 登录对应环境账号:

	pushy login 
	
4.2.2 切换到正式环境

	// 默认正式网
	yarn setProd
	
4.2.3 切换到测试环境

	// 切换到测试环境正式网
	env=mainnet yarn setProd 

	// 切换到测试环境测试网
	env=testnet yarn setProd


## 五. 图标方案

### 5.1 内置图标

[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

### 5.2 自定义图标
读取阿里巴巴项目中的symbol 远程图标资源地址, 并在项目中生成对应组件. 此方案优势是支持多彩图标、支持图标热更新.

步骤:

1. 在[阿里巴巴素材库](https://www.iconfont.cn/)中添加icon, 并修改好颜色, 生成最新图标url.
2. 执行自动生成图标组件脚本: 

		yarn genIcons

## 六、Modal管理模块

模块位置:  /src/components/Mask/Overlay

### 6.1 目的
在ios中多Modal会发生卡死现象, 而Dialog、Overlay等社区组件都使用了Modal来实现. 因此设计了Modal管理模块来统一管理Modal, 实现弹窗队列、保证各个Modal的互斥性、Modal层级之上显示js Toast等

### 6.2 常用方法

	6.2.1 push: 队列尾部添加一个弹窗
	
	6.2.2 remove: 移除单个或多个弹窗
	
	6.2.3 removeAll: 清除队列中所有弹窗
	
	6.2.4 unshift: 队列头部添加一个弹窗(更新弹窗等权重高的)
	
	6.2.5 setPause: 暂停或恢复弹窗显示, 不操作弹窗队列.需要显示页面内容时临时关闭弹窗显示, 并在适时恢复.

### 6.3 使用示例

	// 打开钱包快速管理
    Overlay.push(Overlay.contentTypes.WALLET_QUICK_MANAGER, options);

	// 关闭所有弹窗
	Overlay.removeAll()

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

## Toast方案

[Toast](https://github.com/mochixuan/react-native-smart-tip)

## 字体管理方案

[react-native-normalization-text](https://github.com/WillCoco/react-native-normalization-text)



