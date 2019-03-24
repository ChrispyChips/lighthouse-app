/*
Global dependencies are as they sound, the go in at the bottom of the body tag, before your pages .js file. Things like bootstrap / jquery would be included here.
Check in webpack.common.js there find an array of included scripts in their specific order, polyfills then global dependencies then the script file index.js

If youre not going to use bootstrap feel free to remove jquery / bootstrap / popper.
Or even just include specific bootstrap modules over the entire package. Entire bootstrap 4 in by default.
*/

require('bootstrap/scss/bootstrap.scss');
require("jquery");
require('bootstrap');
require('popper.js');
require('./../styles/global-styles.scss');

//Navigation code for setting active link wont work unless you have the dataset attribute on body tag matching page url ie: <body data-pageName='index.html'>
const pageName = document.querySelector('body').dataset.pagename;
let listItems = document.querySelectorAll('.navbar ul li');
listItems.forEach((item) => {
  let anchor = item.querySelector('a');
  let href = anchor.getAttribute('href').replace('/', '');
  if(href.indexOf(pageName) !== -1){
    anchor.classList.add('active');
  }
});

//if you dont want the service worker and Progressive Web App functionality then just remove this code below.
//The code only runs on production mode "npm run build"
if (process.env.NODE_ENV === 'production') {
  //Registers service workers when production build
  if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('sw.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
  }
}
