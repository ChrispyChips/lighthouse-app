const path = require('path');
const fs = require('fs')
const webpack = require('webpack');
const devMode = process.env.NODE_ENV !== 'production';
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyPlugin = require('copy-webpack-plugin');



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
      templateParameters:require(`./src/data/${name}.json`)
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
      myEntries[scripts[i].split('.')[0]] = ["babel-polyfill", './src/components/global-dependencies.js', './src/scripts/'+scripts[i]];
  }
  return myEntries;
}

module.exports = {
  entry: generateScriptSources(),
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new CopyWebpackPlugin([
    //     {from:'src/assets',to:'assets'}
    // ]),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, './src/assets/'),
          to: path.resolve(__dirname, './docs/assets/')
      }
    ]),
    new CopyWebpackPlugin([
      {
          from: path.resolve(__dirname, './src/manifest.json'),
          to: path.resolve(__dirname, './docs/manifest.json')
      }
    ]),
    new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
            quality: '95-100'
        }
    }),
  ].concat(htmlPlugins).concat(
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/sw.js",
      include: [
        /\.html$/,
        /\.js$/,
        /\.css$/,
        /\.ico$/,
        /\.json$/,
        /\.png/,
        /\.svg$/,
        /\.gif$/,
        /\.woff$/,
        /\.ttf$/,
        /\/workbox.*\/.*$/,
        /css.*\.css$/,
        /fonts.*\.(svg|eot|ttf|woff)$/,
        /i18n.*\.json$/,
        /img.*\.(svg|png|gif|jpeg|jpg)$/,
      ],
      exclude: [
        /sw.js$/
      ],
      swDest: "sw.js"
    })
  ),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'docs')
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
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
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader'
        }]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [{
            loader: 'file-loader'
        }]
      }
    ]
  }
};
