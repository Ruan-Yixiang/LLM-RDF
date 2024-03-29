const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const { webpackConfig } = require('./webpack.common.js');
const { stringify } = require('querystring');
const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
  }),
  new webpack.HotModuleReplacementPlugin(),
];


const devServer = {
  mode:      'development',
  devtool:   '#source-map',
  devServer: {
    compress:           true,
    historyApiFallback: true,
    contentBase:        path.join(__dirname, '../dist'),
    host:               '0.0.0.0',
    port:               83,
    hot:                true,
    open:               false,
    progress:           false,
    quiet:              true,
    overlay:            {
      warning: true,
      errors:  true,
    },
    proxy: {},
  },
  watchOptions: {
    ignored: [
      'node_modules',
    ],
  },
  plugins,
};

module.exports = merge(webpackConfig, devServer);
