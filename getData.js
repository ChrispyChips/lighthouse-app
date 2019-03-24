/*
Notice the package.json "npm run getData" command, which runs the code below. It's purpose is to write files to src/data for each page. It writes one .json file per page I have. So when you clone this repo by default it has index.json and test.json.
Both have corresponding .hbs template file (this is html written in html as usual with other benefits) and .scss files as described in method 1 above.

Here is how i call contentful for my page entries.
*/
var fs = require('fs');
const axios = require('axios');
const contentful = require("contentful");

const SPACE_ID = '';
const ACCESS_TOKEN = '';
const client = contentful.createClient({
  // This is the space ID. A space is like a project folder in Contentful terms
  space: SPACE_ID,
  // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
  accessToken: ACCESS_TOKEN
});
// This API call will request an entry with the specified ID from the space defined at the top, using a space-specific access token.
console.log(client);
client
  .getEntries()
  .then((entries)=>{
    entries.items.forEach((page)=>{
      const pageName = page.fields.pageName;
      let pageData = JSON.stringify(page.fields);
      // Create the json page/s filenamed after the page/s, ie: ./src/data/index.json for the index page or ./src/data/about-us.json for About Us
      fs.writeFile('./src/data/'+pageName+'.json', pageData, 'utf8', (error) => {
        if(error){
          console.log('[write output]: could not write to ./scr/data/'+pageName+'.json: '+ error);
        }else{
          console.log('[write output]: successfully wrote to ./scr/data/'+pageName+'.json');
        }
      });
    });
  })
  .catch(err => console.log(err));

/*
For when i want to work locally i use chrome web server browser extension and point to my temp json file
*/
// axios.get('http://127.0.0.1:8887/initialData.json').then((response) => {
//   let data = response.data;
//   data.pages.forEach((page) => {
//     let json = JSON.stringify(page);
//     fs.writeFile('./src/data/'+page.page+'.json', json, 'utf8', (error) => {
//       if(error){
//         console.log('[write output]: could not write to ./scr/data/'+page.page+'.json: '+ error);
//       }else{
//         console.log('[write output]: successfully wrote to ./scr/data/'+page.page+'.json');
//       }
//     });
//   });
// }).catch((error) => {
//   console.log(error);
// });
