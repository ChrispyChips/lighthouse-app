/*
Author: Chris Pretoriurs (AKA: ChrispyChips)
Date: 2019/03/22
Description: this is a markdown converter use it in your .hbs template file to convert markdown into HTML markup.
If your data property "content" is in markdown add to .hbs file like this: {{#markdown content}}{{/markdown}}
*/
var fs = require('fs');

module.exports = function (data, options) {
  console.log('---------------------------------------------------------------------------------------------');
  console.log('options', options);
  console.log('---------------------------------------------------------------------------------------------');
  console.log('options.data.root = index on pageName', options.data.root.pageName);
  return data;
};
