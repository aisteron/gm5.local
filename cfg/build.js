const { merge } = require('webpack-merge');
const baseCfg = require('./base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const options = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'img/[name][ext][query]'
       }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
         filename: 'fonts/[name][ext][query]'
       }
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].[fullhash].css`,
    }),
  ],
};
const buildCfg = merge(baseCfg, options);

module.exports = new Promise((resolve) => resolve(buildCfg));
