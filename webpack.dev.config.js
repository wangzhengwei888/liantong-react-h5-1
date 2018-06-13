const path = require('path');
const webpack = require("webpack");
let config = require('./webpack.common.config');

var proxyInterface = [
    '/indexApp/getFloorList',
    '/orderApi'
];
var proxy = {};
//代理
proxyInterface.forEach(function (item) {
  proxy[item] = {
    target: 'http://new.reagent.com.cn/reagent-front',
    changeOrigin: true,
    logLevel: 'debug'
  };
});

config = Object.assign(config, {
  devtool: '#eval-source-map', // for debug es6 source
  // devtool: '#cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    port: 3008,
    host: '0.0.0.0',
    //解决版本升级问题
    disableHostCheck: true,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: proxy
  },
  plugins: [
    ...config.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
});

module.exports = config
