/*
Author: Chris Pretoriurs (AKA: ChrispyChips)
Date: 2019/03/22
Description: this is a markdown converter use it in your .hbs template file to convert markdown into HTML markup.
If your data property "content" is in markdown add to .hbs file like this: {{#markdown content}}{{/markdown}}

console.log(options.data.root.pageName) is basically the current json object in handlebars so index.json in this case
*/

var fs = require('fs');
var showdown  = require('showdown');

module.exports = function (data, options) {
  let converter = new showdown.Converter();
  return converter.makeHtml(data);
};
