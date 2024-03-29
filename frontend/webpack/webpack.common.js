const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

const webpackEnv = require('./utils/env-analyzer');

const {
  devMode,
} = webpackEnv;

const plugins = [];

if (webpackEnv.envParams.report !== undefined) {
  plugins.push(new BundleAnalyzerPlugin());
}

if (webpackEnv.envParams.log !== undefined) {
  const Dashboard = require('webpack-dashboard');
  const DashboardPlugin = require('webpack-dashboard/plugin');
  const dashboard = new Dashboard();

  plugins.push(new DashboardPlugin(dashboard.setData));
}

const cssloaders = [
  'css-loader',
  'postcss-loader',
  {
    loader:  'sass-loader',
    options: {
      implementation: require('dart-sass'),
    },
  },
  {
    loader:  'sass-resources-loader',
    options: {
      resources: [
        resolve('../src/assets/styles/_variable.scss'),
      ],
    },
  },
];

const isProd = process.env.npm_lifecycle_event === 'prod';
const webpackConfig = {
  mode:  'development',
  entry: {
    main: resolve('../src/app/app.js'),
  },
  output: {
    filename:      `js/[name].[${devMode ? 'hash' : 'chunkhash'}:7].js`,
    chunkFilename: `js/[name].[${devMode ? 'hash' : 'chunkhash'}:7].js`,
    path:          resolve('../dist'),
    publicPath:    isProd ? '/ic/dist/' : '/',
  },
  resolve: {
    extensions: ['.js', '.vue', '.scss'],
    alias:      {
      '@':        resolve('../'),
      '@src':     resolve('../src'),
      '@assets':  resolve('../src/assets'),
      '@comp':    resolve('../src/components'),
      '@js':      resolve('../src/assets/js'),
      '@styles':  resolve('../src/assets/styles'),
      '@modules': resolve('../src/modules'),
      '@views':   resolve('../src/views'),
    },
  },
  module: {
    rules: [{
      test: /\.(sc|c)ss$/,
      use:  devMode ? [
        'style-loader',
        ...cssloaders,
      ] : [
          'style-loader',
          { loader: MiniCssExtractPlugin.loader },
          ...cssloaders,
        ],
      exclude: [/node_modules/],
    }, {
      test:    /\.js$/,
      use:     ['cache-loader', 'babel-loader'],
      exclude: [/node_modules/],
    }, {
      test: /\.(png|jpe?g|svg|gif)$/i,
      use:  [{
        loader:  'url-loader',
        options: {
          limit: 8192,    // 8k
          name:  'images/[name].[hash:7].[ext]',
        },
      }],
      exclude: [],
    }, {
      test: /\.(eot|woff|woff2|ttf)$/i,
      use:  [{
        loader:  'url-loader',
        options: {
          limit: 8192,    // 8k
          name:  'fonts/[name].[hash:7].[ext]',
        },
      }],
      exclude: [],
    }, {
      test:    /element-ui\/.*?js$/,
      loader:  ['cache-loader', 'babel-loader'],
      exclude: [/node_modules/],
    }, {
      test:   /\*?\.css$/,
      loader: [
        'style-loader',
        'css-loader',
        'postcss-loader',
      ],
    }, {
      test:    /\.vue$/,
      loader:  'vue-loader',
      exclude: [],
    }],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename:      'css/[name].[hash:7].css',
      chunkFilename: 'css/[id].[hash:7].css',
    }),
    new HtmlWebpackPlugin({
      template: resolve('../public/index.html'),
      favicon:  resolve('../public/logo.png'),
      inject:   true,
    }),
    new FriendlyErrorsPlugin(),
    new ManifestPlugin(),
    ...plugins,
  ],
  optimization: {
    splitChunks: {
      minChunks:          1,
      name:               true,
      chunks:             'async',
      minSize:            100 * 1024,
      maxInitialRequests: 5,
    },
  },
};

module.exports = {
  webpackConfig,
  webpackEnv,
};
