const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const npmInstall = require('npm-install-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;
process.env.BABEL_ENV = TARGET;

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
  eslint: path.join(__dirname, '.eslintrc.js'),
  stylelint: path.join(__dirname, '.stylelint.config.js')
};

const common = {
  entry: {
    app: PATHS.app
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint',
        include: PATHS.app
      },
      {
        test: /\.scss$/,
        loader: 'stylelint',
        include: PATHS.app
      }
    ],
    loaders: [
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: PATHS.app
      },
      {
        test: /\.jsx?$/,
        loader: 'babel?cacheDirectory',
        include: PATHS.app
      },
    ]
  },
  stylelint: {
    configFile: PATHS.stylelint
  },
  eslint: {
    configFile: PATHS.eslint
  },
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,
      stats: 'errors-only',
      host: process.env.HOST,
      port: process.env.PORT
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new npmInstall({
        save: true
      })
    ]
  });
}

if(TARGET === 'build') {
  module.exports = merge(common, {});
}
