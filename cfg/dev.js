const { merge } = require('webpack-merge');
const baseCfg = require('./base.js');
const path = require('path');

const options = {
  mode: 'development',
  devtool: 'eval-source-map',

  devServer: {
    static: '../src',
    compress: true,
    port: 9001,
    hot: true,
    host: '0.0.0.0',
    proxy: {
      '/api/receive/form':{
        bypass:(req, res)=> res.send(
        {
          status: 0,
          success: true
        }
        )
      },
      '/api/receive/form2':{
        bypass:(req, res)=> res.send(
        {
          status: 0,
          success: true
        }
        )
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'fonts/[name][ext][query]'
       }
      } 
    ],
  },
};

const devCfg = merge(baseCfg, options);
module.exports = new Promise((resolve) => resolve(devCfg));
