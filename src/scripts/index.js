require('../styles/index.scss');
import _ from 'lodash';

console.log('This is index.js')

function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }

document.body.appendChild(component());
