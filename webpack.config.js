const path = require('path');
const fs = require('fs')

//Array of pages in ./src/pages
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(fileName => fileName.endsWith('.html'));

//Trigger HtmlWebpackPlugin for each page in pages array
function generateHtmlPlugins (templateDir) {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
  return templateFiles.map(item => {
    console.log('item:', item);
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/pages');

module.exports = {
  entry: {
   app: './src/index.js',
   print: './src/print.js'
  },
  plugins: [].concat(htmlPlugins),
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
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
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
};
