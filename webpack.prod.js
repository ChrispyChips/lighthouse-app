const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//service worker


module.exports = merge(common, {
 mode: 'production'
});
