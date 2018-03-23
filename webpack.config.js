const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  }, //devServer
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new CleanWebpackPlugin(['dist']),
    new Dotenv(),
    new CopyWebpackPlugin([
            {from:'./src/img',to:'images'}
        ]),
    new HtmlWebpackPlugin({
      title: 'Find a Doctor',
      template: './src/index.html',
      inject: 'body'
    })
  ], // plugins
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i, // image code
        use: [
           'file-loader',
           {
             loader: 'image-webpack-loader', // image code
             options: {
               bypassOnDebug: true,
             },
           },
        ],
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "eslint-loader"
      },
      // new rule
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /spec/
        ],
        loader: "babel-loader",
        options: {
          presets: ['es2015']
        }
      }
    ] // rules
  } // module
}; // module.exports
