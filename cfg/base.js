const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
  entry: { 
    app: './src/js/index.js',
    sv: './src/js/sv/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].js',
    clean: true
  },

  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json'))
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
  module:{
    rules:[
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            //emitCss: true,
            hotReload: true
          }
        }
      },
      {
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false
        }
      }
    ]
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
