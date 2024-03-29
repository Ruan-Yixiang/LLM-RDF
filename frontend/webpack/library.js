const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const webpack = require('webpack');
const spinner = ora('构建编译中...');
const resolve = dir => path.resolve(__dirname, dir);

const webpackLibConfig = {
  mode:   'production',
  entry:  resolve('../src/components/graph/graph.js'),
  output: {
    filename: 'ic.umd.min.js',
    library:  {
      root:     'ic',
      amd:      'ic',
      commonjs: 'ic',
    },
    libraryTarget: 'umd',
    path:          resolve('../dist/library'),
  },
};

spinner.start();

// 编译开始
webpack(webpackLibConfig, (err, stats) => {
    // 停止 loading
    spinner.stop();

    if (err) throw err;

    console.log(stats.toString({
        chunks:       false,  // 使构建过程静默无输出
        colors:       true,   // 在控制台展示颜色
        modules:      false,
        children:     false,
        chunkModules: false,
        warnings:     false,
    }));

    if (stats.hasErrors()) {
        console.log(chalk.red('\n编译失败 😭 😭 😭 (Build Failure).\n'));
        process.exit(1);
    }

    console.log(chalk.cyan('\n编译成功 😉 😉 😉 (Build Success)!!!.'));
});
