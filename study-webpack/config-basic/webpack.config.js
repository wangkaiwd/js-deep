const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  devServer: { // provides you with a simple web server and the ability to use live reloading.
    // 默认会为output指定path下的打包文件目录提供服务
    // contentBase: 指定还需要提供静态服务的目录
    // contentBase: path.resolve(__dirname, 'dist'), // Tell the server where to serve content from.
    // compress: true, // Enable gzip compress for everything served
    // port: 8080,
    // open: true,
    writeToDisk: true,
    // publicPath: '/'
  },
  devtool: 'eval-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    // publicPath: '/'
  },
  externals: {
    'lodash': '_', // 这俩个怎么配置都可以使用？
  },
  module: {
    rules: [
      {
        test: /\.txt$/i,
        use: 'raw-loader'
      },
      // {
      //   test: require.resolve('lodash'),
      //   loader: 'expose-loader',
      //   options: {
      //     exposes: {
      //       globalName: '_',
      //       override: true
      //     },
      //   },
      // },
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: '2.0', proposals: true },
                  targets: 'defaults'
                }
              ]
            ]
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/i,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // webpack 5: Asset Modules
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        // Export HTML as string, HTML is minimized when compiler demand
        // support img src import images
        use: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Custom template',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    // 只能对webpack编译的文件起作用
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // })
    new HtmlWebpackTagsPlugin({
      tags: ['https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.20/lodash.min.js'],
      append: false
    })
  ]
};
