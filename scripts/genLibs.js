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
let stream = require('stream');
let util = require('util');

// 转换html
function TransformStream() {
  stream.Transform.call(this);
}

util.inherits(TransformStream, stream.Transform);

let data = '';
TransformStream.prototype._transform = function(chunk, encode, cb) {
  data += chunk;
  cb();
};

TransformStream.prototype._flush = function(cb) {
  this.push(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Title</title>
        <script src="http://wechatfe.github.io/vconsole/lib/vconsole.min.js?v=3.3.0"></script>
        <script>new VConsole()</script>
    </head>
    <body>
        <p>WebView Wallet Helper</p>
    </body>
    <script>
`);
  this.push(data);
  this.push(`
    </script>
  </html>`);
  cb();
};

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
  //   ignore: ['bitcoinjs-lib'],
  // },
  // {
  //   in: '../node_modules/crypto-js/index.js',
  //   out: '../basicLibs/cryptoJs.js',
  //   name: 'cryptoJs',
  // },
  {
    in: '../basicLibs/src/index.js',
    out: '../basicLibs/dist/index.html',
    name: 'chain33Wallet',
    global: true,
    // external: 'bitcoinjs-lib',
    require: 'bitcoinjs-lib',
  },
];

transformAll(list);

/**
 * 转换多个文件
 */
function transformAll(list) {
  list.forEach(item => {
    transform({
      ...item,
      input: item.in,
      output: item.out,
      name: item.name,
      ignore: item.ignore || [],
      external: item.external,
    });
  });
}

/**
 * 转换单个文件
 */

function transform(opts) {
  browserify(path.join(__dirname, opts.input), {
    standalone: opts.name,
  })
    // .require(path.join(__dirname, '../node_modules', opts.require), {expose: 'bitcoinjs-lib'}) // 剥离依赖 todo module. default
    .transform('babelify', {
      global: opts.global, // node_modules 也转换
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
    .pipe(new TransformStream())
    .pipe(fs.createWriteStream(path.join(__dirname, opts.output)));
}
