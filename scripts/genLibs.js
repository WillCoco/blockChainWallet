/**
 * @author: Xu Ke
 * @date: 2020/2/21 3:50 PM
 * @Description: browserify & babelify 基础库
 * @lastModificationBy:
 * @lastModification:
 * @lastModificationDate:
 */
let fs = require('fs');
let browserify = require('browserify');
let path = require('path');

const list = [
  // {
  //   in: '../node_modules/core-js/index.js',
  //   out: '../basicLibs/coreJs.js',
  // },
  // {
  //   in: '../node_modules/regenerator-runtime/runtime',
  //   out: '../basicLibs/regeneratorRuntime.js',
  // },
  // {
  //   in: '../node_modules/bip39/src/index.js',
  //   out: '../basicLibs/bip39.js',
  //   name: 'bip39',
  // },
  // {
  //   in: '../node_modules/@33cn/wallet-base/dist/index.js',
  //   out: '../basicLibs/chain33Wallet.js',
  //   name: 'chain33Wallet',
  // },
  {
    in: '../node_modules/crypto-js/index.js',
    out: '../basicLibs/cryptoJs.js',
    name: 'cryptoJs',
  },
];

transformAll(list);

/**
 * 转换多个文件
 */
function transformAll(list) {
  list.forEach(item => {
    transform({input: item.in, output: item.out, name: item.name});
  });
}

/**
 * 转换单个文件
 */
function transform(opts) {
  browserify(path.join(__dirname, opts.input), {
    standalone: opts.name,
  })
    .transform('babelify', {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: '> 0.25%, not dead',
          },
        ],
      ],
    })
    .bundle()
    .pipe(fs.createWriteStream(path.join(__dirname, opts.output)));
}
