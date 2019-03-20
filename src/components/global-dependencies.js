/*
Global dependencies are as they sound, the go in at the bottom of the body tag, before your pages .js file. Things like bootstrap / jquery would be included here.
Check in webpack.common.js there find an array of included scripts in their specific order, polyfills then global dependencies then the script file index.js for example
myEntries[scripts[i].split('.')[0]] = ["babel-polyfill", './src/components/global-dependencies.js', './src/scripts/'+scripts[i]];
*/

//If you want to get fancy you can remove jquery / bootstrap / popper if you arent going to use them. Or even just include specific bootstrap modules over the entire package. For now I leave it in.
require("jquery");
require('bootstrap');
require('popper.js');
require('bootstrap/scss/bootstrap.scss');
require('./../styles/global-styles.scss');
