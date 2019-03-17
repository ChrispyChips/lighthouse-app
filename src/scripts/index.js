require('../styles/index.scss');
import { nothing } from '../components/math.js';

console.log('This is index.js')

function component() {

   var element = document.createElement('pre');
   element.innerHTML = [
     'Hello webpack!',
     '5 is equal to ' + nothing(5)
   ].join('\n\n');

   return element;

 }
document.body.appendChild(component());
