/**
 * @author: Xu Ke
 * @date: 2019/9/30 2:41 PM
 * @Description: 重新env.json文件
 * build之前，写入服务url等打包环境、热更新appId
 * 参数：
 *  服务环境：
 *    env enum[test, production]
 */
const path = require('path');
const {exec} = require('child_process');
const chalk = require('chalk');
const fs = require('fs-extra');
const config = require('../src/config');

// update配置
const {
  updateConfig, // 热更配置
  env: network, // 区块链网络
} = config;

const currentUpdateConfig = require('../update.json');

// network路径
const networkPath = path.join(__dirname, '../src/config/env.json');

// updateConfig路径
const updateConfigPath = path.join(__dirname, '../update.json');

// env参数
const envs = {
  test: 'test',
  production: 'production',
};

setEnv();

async function setEnv() {
  /**
   * 检查路径是否存在
   */
  if (!checkConfigPath()) {
    return;
  }

  const {env} = getArgs();
  console.log(chalk.green('\n目标环境：' + env + '\n'));

  /**
   * 设置netwrok
   */
  setNetwork(env);

  /**
   * 检查pushy登录、切换两个(正式、测试)update信息
   */
  checkLoggedPushy(env);
}

/**
 * 检查路径是否存在
 */
function checkConfigPath() {
  if (!fs.existsSync(networkPath)) {
    console.log(
      chalk.red(
        `
          文件路径："${networkPath}"不存在！
          请检查network配置路径${networkPath}
    `,
      ),
    );
    return false;
  }

  if (!fs.existsSync(updateConfigPath)) {
    console.log(
      chalk.red(
        `
          文件路径："${updateConfigPath}"不存在！
          请检查rn-update配置路径${updateConfigPath}
        `,
      ),
    );
    return false;
  }
  return true;
}

/**
 * 检查pushy登录
 */
function checkLoggedPushy(env) {
  exec('pushy me', function(error, stdout) {
    if (error) {
      console.log('error', error);
      return;
    }

    let id;
    try {
      id = stdout.split('\n')[0].split(': ')[1];
    } catch (err) {
      console.log(chalk.red('解析当前pushy登录账号信息失败'));
    }
    const loginProduction = +id === +updateConfig.production.account.id;
    const loginTest = +id === +updateConfig.test.account.id;
    let pushyAccountEnv; // 当前pushy登录账号环境

    let info = stdout;

    if (loginProduction) {
      info = 'pushy当前登录production账户：\n' + stdout;
      pushyAccountEnv = envs.production;
    } else if (loginTest) {
      info = 'pushy当前登录test账户：\n' + stdout;
      pushyAccountEnv = envs.test;
    } else {
      info = 'pushy当前登录未知账户：\n' + stdout;
    }

    // pushy登录账号 与 目标环境不一致
    if (env !== pushyAccountEnv) {
      info = info + chalk.red(`\n请切换${env}账号后再试`);
      console.log(info);
    } else {
      console.log(info);
      modifyPushyInfo(env);
    }
  });
}

/**
 * 拷贝信息到update配置文件
 */
function modifyPushyInfo(env) {
  const targetApp = updateConfig[env];
  const needModify =
    targetApp.android.appId !== currentUpdateConfig.android.appId ||
    targetApp.ios.appId !== currentUpdateConfig.ios.appId;

  if (needModify) {
    const targetJson = {
      android: {
        appId: targetApp.android.appId,
        appKey: targetApp.android.appKey,
      },
      ios: {
        appId: targetApp.ios.appId,
        appKey: targetApp.ios.appKey,
      },
    };

    writeJSON(updateConfigPath, targetJson);
  } else {
    console.log(`update.json信息一致，无需写入\n`);
  }
}

/**
 * 设置网络
 */
function setNetwork(env) {
  const targetNetwork =
    env === envs.production ? {serverEnv: 'mainnet'} : {serverEnv: 'testnet'};

  const needModify = network !== targetNetwork.serverEnv;

  if (needModify) {
    writeJSON(networkPath, targetNetwork);
  } else {
    console.log(`config/env信息一致，无需写入\n`);
  }
}

/**
 * 读取json
 * parmas {string} path - json路径
 * returns {object} json - json对象
 */
function readJSON(path) {
  let json;
  try {
    let s = fs.readFileSync(path).toString();
    s = s.replace(/[/][*](\s|.)*?[*][/]/g, '');
    json = JSON.parse(s);
  } catch (err) {
    console.log(
      chalk.red(
        `
          \n
          读取失败！！！
          当前读取路径：${path}
          错误日志：${err}
        `,
      ),
    );
  }
  return json;
}

function writeJSON(path, json) {
  fs.writeJson(path, json, {spaces: 2})
    .then(() => {
      console.log(
        chalk.green(`写入${path}成功：\n${JSON.stringify(json, null, 4)}\n`),
      );
    })
    .catch(err => {
      console.log(
        chalk.red(
          `
            \n
            修改${path}文件失败,
            错误日志：${err}
          `,
        ),
      );
    });
}

/**
 * 读取cli参数
 * returns {object} result - 参数对象
 */

function getArgs() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    return {};
  }
  const result = {};
  args.forEach(arg => {
    const a = arg.split('=');
    if (a[0] && a[1]) {
      result[a[0]] = a[1];
    }
  });
  return result;
}
