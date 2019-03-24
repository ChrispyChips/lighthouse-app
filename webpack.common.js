//Plugin and variable declarations
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
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HandlebarsPlugin = require("handlebars-webpack-plugin");

/*
  generateHtmlPlugins returns multiple HtmlWebpackPlugin instances, one for each of our pages in src/templates.
  Because of this i have to concat the plugin instances at the end of webpack plugins. Which also means any plugins that need to run after pages are processed must be added AFTER the HtmlWebpackPlugin
  See my plugins concat() below in config.
*/
let generateHtmlPlugins = (templateDir) => {
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));

  return templateFiles.map(item => {
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

/*
generateScriptSources returns object of all our script entries based of the scripts name so we can give this object as webpack entry points
  {
      index: './src/index.js',
      about: './src/about.js',
      contacts: './src/contacts.js'
  }

if you do not want babel-polyfills included on each page as it is by default remove it from the array ["babel-polyfill", './src/components/global-dependencies.js', './src/scripts/'+scripts[i]];
*/
let generateScriptSources = () => {
  const scripts = fs.readdirSync(path.resolve(__dirname, 'src/scripts')).filter(fileName => fileName.endsWith('.js'));
  let myEntries = {};
  for (let i = 0; i < scripts.length; i++) {
      myEntries[scripts[i].split('.')[0]] = ["babel-polyfill", './src/components/global-dependencies.js', './src/scripts/'+scripts[i]];
  }
  return myEntries;
}


module.exports = {
  entry: generateScriptSources(),
  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'docs')
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
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
    ])
  ].concat(
    htmlPlugins,
    // new HandlebarsPlugin({
    //   htmlWebpackPlugin: {
    //     enabled: true, // register all partials from html-webpack-plugin, defaults to `false`
    //     prefix: "html" // default is "html"
    //   },
    //   entry: path.join(process.cwd(), "src", "templates", "*.hbs"),
    //   output: path.join(process.cwd(), "docs", "[name].html"),
    //   data: require("./src/data/index.json"),
    //   partials: [
    //     path.join(process.cwd(), "src", "partials", "*.hbs")
    //   ],
    //   helpers: {
    //     nameOfHbsHelper: Function.prototype,
    //     projectHelpers: path.join(process.cwd(), "src", "helpers", "*.js")
    //   }
    // }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].[hash].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].[hash].css' : '[id].[hash].css',
    }),
    new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i,
        pngquant: {
            quality: '95-100'
        }
    }),
    new WorkboxWebpackPlugin.InjectManifest({
      swSrc: "./src/sw.js",
      swDest: "sw.js",
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
      ]
    })
  ),
  module: {
    rules: [
      {
        test: /\.hbs/,
        use: [{
          loader: 'handlebars-loader',
          options: {
            helperDirs: path.resolve(__dirname, 'src/helpers'),
            partialDirs: path.resolve(__dirname, 'src/partials')
          }
        }]
      },
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
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
