const path = require('path');
const fs = require('fs')
const CleanWebpackPlugin = require('clean-webpack-plugin');

//Array of pages in ./src/pages
const pages = fs.readdirSync(path.resolve(__dirname, 'src/pages')).filter(fileName => fileName.endsWith('.html'));

let generateHtmlPlugins = (templateDir) => {
  //Trigger HtmlWebpackPlugin for each page in pages array
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
console.log(generateScriptSources());


module.exports = {
  entry: generateScriptSources(),
  plugins: [
    new CleanWebpackPlugin()
  ].concat(htmlPlugins),
  output: {
    filename: '[name].[hash].js',
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
