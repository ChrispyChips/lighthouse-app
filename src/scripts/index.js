require('../styles/index.scss');
import { nothing } from '../components/math.js';

console.log('This is index.js')

//Is this true? Then you are not in production mode
if (process.env.NODE_ENV !== 'production') {
 console.log('Looks like we are in development mode!');
}


function component() {

   var element = document.createElement('pre');
   element.innerHTML = [
     'Hello webpack!',
     '5 is equal to ' + nothing(5)
   ].join('\n\n');

   return element;

 }
document.body.appendChild(component());
