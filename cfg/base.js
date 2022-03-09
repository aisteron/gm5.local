const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
  entry: { app: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].js',
    clean: true
  },

  plugins: [
    new CopyPlugin({ patterns: [{ from: 'src/img', to: 'img' }]}),

    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      filename: 'index.html',
      opt: {title: "Index", bodyClass: "index"}
    }),

    new HtmlWebpackPlugin({
      title: "about",
      template: "./src/pug/about.pug",
      filename: "about.html"
    }),

    new LiveReloadPlugin({
      appendScriptTag: true
    })

  ],
};
