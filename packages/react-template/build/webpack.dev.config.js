const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { merge } = require('webpack-merge')
const ThreadLoader = require('thread-loader')
const webpack = require('webpack')

const configs = require('./config')
const common = require('./webpack.common.config')
const port = 8080

ThreadLoader.warmup(configs.workerpool, ['ts-loader', 'babel-loader'])

/**
 * @type import('webpack').Configuration
 */
const dev = {
  devtool: 'eval-cheap-module-source-map',
  mode: 'development',
  output: {
    path: configs.path.output,
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    port,
    watchContentBase: true,
    contentBase: configs.path.public,
    hot: true,
    inline: true,
    overlay: true,
    compress: true,
    clientLogLevel: 'none',
    quiet: true,
    public: `http://localhost:${port}`,
    proxy: {
      '/proxy': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
  optimization: {
    moduleIds: 'named',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
        ],
      },
      {
        test: /(\.styl$|\.stylus$)/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'typings-for-css-modules-loader',
            options: {
              sourceMap: true,
              modules: true,
              localIdentName: '[name]_[local]___[hash:base64:5]',
              namedExport: true,
              silent: true,
            },
          },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          {
            loader: 'stylus-loader',
            options: {
              stylusOptions: {
                sourceMap: true,
                use: configs.stylus.plugins,
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: (entry) => `${entry}.html`,
      template: 'public/index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: [`Running here http://localhost:${port}`],
        notes: ['Happy coding'],
      },
      onErrors: function (severity, errors) {
        // You can listen to errors transformed and prioritized by the plugin
        // severity can be 'error' or 'warning'
      },
    }),
  ],
}

module.exports = merge(common, dev)
