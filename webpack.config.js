const webpack = require('atool-build/lib/webpack');

module.exports = function (webpackConfig, env) {
  webpackConfig.babel.plugins.push('transform-runtime');
  //babel-plugin-import 是用来按需加载 antd 的脚本和样式的
  webpackConfig.babel.plugins.push(['import', {
    libraryName: 'antd',
    style: 'css',
  }]);

  // Support hmr
  if (env === 'development') {
    webpackConfig.devtool = '#eval';
    webpackConfig.babel.plugins.push('dva-hmr');
  } else {
    webpackConfig.babel.plugins.push('dev-expression');
  }

  // Don't extract common.js and common.css
  webpackConfig.plugins = webpackConfig.plugins.filter(function (plugin) {
    return !(plugin instanceof webpack.optimize.CommonsChunkPlugin);
  });

  // Support CSS Modules
  // Parse all less files as css module.
  webpackConfig.module.loaders.forEach(function (loader, index) {
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.less$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.less$/;
    }
    if (loader.test.toString() === '/\\.module\\.less$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.less$/;
    }
    if (typeof loader.test === 'function' && loader.test.toString().indexOf('\\.css$') > -1) {
      loader.include = /node_modules/;
      loader.test = /\.css$/;
    }
    if (loader.test.toString() === '/\\.module\\.css$/') {
      loader.exclude = /node_modules/;
      loader.test = /\.css$/;
    }
  });


  webpackConfig.module.loaders.push({
    test   : /\.woff/,
    loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
  })
  webpackConfig.module.loaders.push({
    test   : /\.ttf/,
    loader : 'file?prefix=font/'
  })
  webpackConfig.module.loaders.push({
    test   : /\.eot/,
    loader : 'file?prefix=font/'
  })
  webpackConfig.module.loaders.push({
    test   : /\.svg/,
    loader : 'file?prefix=font/'
  })
  
  return webpackConfig;
};