var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './js/main',
    vendor: [
      'core-js/fn/array/from',
      'core-js/fn/object/assign',
      'then-request',
      'bonzo',
      'alertifyjs',
      'bootstrap/dist/css/bootstrap.css',
      'alertifyjs/build/css/alertify.css'
    ]
  },
  output: {
    path: path.join(__dirname, 'static', 'dist'),
    filename: '[name].js',
  },
  resolve: {
    root: __dirname,
    moduleDirectories: ['node_modules']
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'url',
        query: {
          mimetype: 'application/font-woff',
          limit: 10000
        }
      },
      {
        test: /\.ttf$/,
        loader: 'url',
        query: {
          mimetype: 'application/octet-stream',
          limit: 10000
        }
      },
      {
        test: /\.eot$/,
        loader: 'file'
      },
      {
        test: /\.svg$/,
        loader: 'url',
        query: {
          mimetype: 'image/svg+xml',
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css')
  ]
}
