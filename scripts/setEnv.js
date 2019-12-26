/**
 * @author: Xu Ke
 * @date: 2019/9/30 2:41 PM
 * @Description: 重新env.json文件
 * build之前，写入分发平台、服务url等打包环境
 * 参数：
 *  服务环境：
 *    distribute enum[test, bp, production]
 *    缩写别名 env
 */
const path = require('path');
const chalk = require('react-dev-utils/chalk');
const fs = require('fs-extra');
const env = require('./src/config/env.json');

// const defaultDistribute = env.distribute;
const defaultServerEnv = env.serverEnv;

// 读取配置
const originPath = path.join(__dirname, './src/config/env.json');

setEnv();

async function setEnv() {
  /**
   * 检查路径是否存在
   */
  if (!fs.existsSync(originPath)) {
    console.log(
      chalk.red(
        `
          文件路径："${originPath}"不存在！
          请检查src/config/env.json
        `,
      ),
    );
    return;
  }

  /**
   * 读取参数
   */
  const {serverEnv, env} = getArgs();

  /**
   * 改写manifest.json
   */
  let oldConfig = readJSON(originPath);

  if (!oldConfig) {
    console.log(chalk.red('文件路径："${originPath}"不存在！\n'));
    return;
  }

  const newConfig = {
    ...oldConfig,
    serverEnv: serverEnv || env || defaultServerEnv,
  };

  // 写入新json
  writeJSON(originPath, newConfig);
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
  fs.writeJson(path, json, {spaces: '\t'})
    .then(() => {
      console.log(
        chalk.green(`写入env.json成功～\n${JSON.stringify(json, null, 4)}`),
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
