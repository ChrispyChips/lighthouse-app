const merge = require('webpack-merge');
const common = require('./webpack.common.js');
//service worker
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = merge(common, {
 mode: 'production',
 plugins: [
   new WorkboxPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    swDest: 'service-worker.js',
   })
 ]
});
