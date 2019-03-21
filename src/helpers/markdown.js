var fs = require('fs');
var showdown  = require('showdown');

module.exports = function (data, options) {
  let converter = new showdown.Converter();
  return converter.makeHtml(data);
};
