/* eslint-disable */
require('./check-versions')();
const utils = require('./utils');
const config = require(utils.cwdPath('config'));
const https = require('https');
const fs = require('fs');

const { APP_CONFIG_FILE = 'standard.dev' } = process.env;

const [host, env] = APP_CONFIG_FILE.split('.');

const PORT_TYPE = process.env.PORT_TYPE === '运营后台' ? 'op' : 'sp';

const proxyMap = {
  standard: {

    dev: {
      op: 'http://op-base-op.yzwdev.cn',
      sp: 'http://op-base-sp.yzwdev.cn',
      openUrl: 'http://op-base-${PORT_TYPE}-local.yzwdev.cn',
      static: 'https://op-base-static.yzwdev.cn/private-mro/dev',
    },
    qa: {
      op: 'http://op-base-op.yzwqa.cn',
      sp: 'http://op-base-sp.yzwqa.cn',
      openUrl: 'http://op-base-${PORT_TYPE}-local.yzwqa.cn',
      static: 'https://op-base-static.yzwqa.cn/private-mro/qa',
    },
    stg: {
      op: 'https://op-base-op-stg.yzw.cn',
      sp: 'https://op-base-sp-stg.yzw.cn',
      openUrl: 'http://op-base-${PORT_TYPE}-local.yzw.cn',
      static: 'https://op-base-static-stg.yzw.cn/private-mro/stg',
    },
    prd: {
      op: 'https://op-base-op.yzw.cn',
      sp: 'https://op-base-sp.yzw.cn',
      openUrl: 'http://op-base-${PORT_TYPE}-local.yzw.cn',
      static: 'http://op-base-static.yzw.cn/private-mro/prd',
    },
  },
  cscec8: {
    dev: {
      op: 'http://op-cscec8-op.yzwdev.cn',
      sp: 'http://op-cscec8-sp.yzwdev.cn',
      openUrl: 'http://op-cscec8-${PORT_TYPE}-local.yzwdev.cn',
      static: 'https://static.yzwdev.cn/mro/dev',
    },
    qa: {
      op: 'http://op-cscec8-op.yzwqa.cn',
      sp: 'http://op-cscec8-sp.yzwqa.cn',
      openUrl: 'http://op-cscec8-${PORT_TYPE}-local.yzwqa.cn',
      static: 'https://static.yzwqa.cn/mro/qa',
    },
    stg: {
      op: 'https://op-cscec8-op-stg.yzw.cn',
      sp: 'https://op-cscec8-sp-stg.yzw.cn',
      openUrl: 'http://op-cscec8-${PORT_TYPE}-local.yzw.cn',
      static: 'https://static-stg.yzw.cn/mro/stg',
    },
    prd: {
      op: 'https://op-cscec8-op.yzw.cn',
      sp: 'https://op-cscec8-sp.yzw.cn',
      openUrl: 'http://op-cscec8-${PORT_TYPE}-local.yzw.cn',
      static: 'https://static.yzw.cn/mro',
    },
  },
};

if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV);
}

const opn = require('opn');
const path = require('path');
const express = require('express');
const webpack = require('webpack');
const proxyMiddleware = require('http-proxy-middleware');
const webpackConfig =
  process.env.NODE_ENV === 'testing'
    ? require('./webpack.prod.conf')
    : require('./webpack.dev.conf');

const port = process.env.PORT || config.dev.port;

const autoOpenBrowser = !!config.dev.autoOpenBrowser;

const proxyTable = config.dev.proxyTable || {};

const isHttps = config.dev.https;

const app = express();

const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000,
});
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function(compilation){
  compilation.plugin('html-webpack-plugin-after-emit', function(data, cb){
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});

// 本地开发时候 无法访问其他域的内容 发现是未注入PUBLIC_PATH 这里手动注入
['order-front', 'basis-front', 'item-front', 'account-front'].forEach(
  (name) => {
    const proxyKey = (host === 'cscec8' ? '/private-cscec8-' : '/') + name;
    if(!proxyTable[proxyKey]) {
      proxyTable[proxyKey] = {
        target: proxyMap[host][env]['static'],
        changeOrigin: true,
      };
    }
  },
);

// 追加api代理
proxyTable['/api'] = {
  target: proxyMap[host][env][PORT_TYPE],
  changeOrigin: true,
};

// proxy api requests
Object.keys(proxyTable).forEach(function(context){
  let options = proxyTable[context];
  if(typeof options === 'string') {
    options = { target: options };
  }
  app.use(proxyMiddleware(options.filter || context, options));
});

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// serve pure static assets
const staticPath = path.posix.join(
  config.dev.assetsPublicPath,
  config.dev.assetsSubDirectory,
);
app.use(staticPath, express.static('./static'));

const defaultUris = [
  proxyMap[host][env]['openUrl'].replace('${PORT_TYPE}', PORT_TYPE),
];

const uris = (config.dev.uris || defaultUris).map((item) => item + `:${ port }`).map((item) => {
  if(isHttps && !item.startsWith('https')) {
    // 错误兜底：指定启动https 但是uris为http的情况
    return item.replace('http', 'https');
  }
  return item;
});

let _resolve;
const readyPromise = new Promise((resolve) => {
  _resolve = resolve;
});

console.log('> Starting dev server...');

devMiddleware.waitUntilValid(() => {
  uris.forEach((uri) => {
    console.log('> Listening at ' + uri + '\n');
  });
  // when env is testing, don't need open it
  if(autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    uris.forEach((uri) => {
      opn(uri);
    });
  }
  _resolve();
});

let server;
// http 和 https应为互斥的
if(config.dev.https) {
  const httpsServer = https.createServer(
    {
      key: fs.readFileSync(path.resolve(__dirname, './cert/auac-server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, './cert/auac-server.crt')),
    },
    app,
  );
  server = httpsServer.listen(port);
} else {
  server = app.listen(port);
}

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close();
  },
};
