const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

let generateHtmlPlugins = (templateDir) => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.');
    const name = parts[0];
    const extension = parts[1];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      chunks: [`${name}`],
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
      templateParameters:require('./src/data/data.json')
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/templates');

let generateScriptSources = () => {
  //Returns object of all our script entries based of the scripts name
  /*
  {
      index: './src/index.js',
      about: './src/about.js',
      contacts: './src/contacts.js'
  }
  */
  const scripts = fs.readdirSync(path.resolve(__dirname, 'src/scripts')).filter(fileName => fileName.endsWith('.js'));
  let myEntries = {};
  for (let i = 0; i < scripts.length; i++) {
      myEntries[scripts[i].split('.')[0]] = './src/scripts/'+scripts[i];
  }
  return myEntries;
}

module.exports = {
  entry: generateScriptSources(),
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
        {from:'src/assets',to:'assets'}
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ].concat(htmlPlugins),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.hbs/,
        use: [{
          loader: 'handlebars-loader',
          options: {
            helperDirs: path.resolve(__dirname, 'src/helpers'),
            partialDirs: path.resolve(__dirname, 'src/partials'),
            knownHelpersOnly: false
          }
        }]
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
         'file-loader'
        ]
      }
    ]
  }
};
