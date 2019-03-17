require('../styles/index.scss');
import _ from 'lodash';
import printMe from './printMe.js';

console.log('This is index.js')

function component() {
   var element = document.createElement('div');
   var btn = document.createElement('button');

   element.innerHTML = _.join(['Hello', 'webpack'], ' ');

   btn.innerHTML = 'Click me and check the console!';
   btn.onclick = printMe;  // onclick event is bind to the original printMe function

   element.appendChild(btn);

   return element;
 }
document.body.appendChild(component());
