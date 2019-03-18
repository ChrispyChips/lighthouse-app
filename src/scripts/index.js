require('../styles/index.scss');

console.log('This is index.js')

//Is this true? Then you are not in production mode
if (process.env.NODE_ENV !== 'production') {
 console.log('Looks like we are in development mode!');
}
