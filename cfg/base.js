const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');


module.exports = {
  entry: { 
    app: './src/js/index.js',
    //sv: './src/js/sv/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].js',
    clean: true
  },



  plugins: [
    new CopyPlugin({ patterns: [{ from: 'src/img', to: 'img' }]}),
    new CopyPlugin({ patterns: [{ from: 'src/vendors', to: 'vendors' }]}),

    new HtmlWebpackPlugin({
      template: "./src/pug/index.pug",
      filename: 'index.html',
      opt: {title: "Index", bodyClass: "index"},
      options: {minify: false}
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/about.pug",
      filename: "about.html",
      opt: {title: "About", bodyClass: "about"}
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/blog.pug",
      filename: "blog.html",
      opt: {title: "Blog", bodyClass: "blog"}
    }),


    new HtmlWebpackPlugin({
      template: "./src/pug/post.pug",
      filename: "post.html",
      opt: {title: "Post", bodyClass: "post"}
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/courses.pug",
      filename: "courses.html",
      opt: {title: "Courses", bodyClass: "courses"}
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/course.pug",
      filename: "course.html",
      opt: {title: "Course", bodyClass: "course"}
    }),

    new HtmlWebpackPlugin({
      template: "./src/pug/contacts.pug",
      filename: "contacts.html",
      opt: {title: "Contacts", bodyClass: "contacts"}
    }),

    new LiveReloadPlugin({
      appendScriptTag: true
    })

  ],
};
