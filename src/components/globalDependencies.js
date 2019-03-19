require("jquery");
require('bootstrap');
require('popper.js');
require('bootstrap/scss/bootstrap.scss');

if (process.env.NODE_ENV === 'production') {
  //Registers service workers when production build
  if ('serviceWorker' in navigator) {
   window.addEventListener('load', () => {
     navigator.serviceWorker.register('/service-worker.js').then(registration => {
       console.log('SW registered: ', registration);
     }).catch(registrationError => {
       console.log('SW registration failed: ', registrationError);
     });
   });
  }
}
