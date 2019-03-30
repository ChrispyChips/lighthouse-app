/*
Notice the package.json "npm run getData" command, which runs the code below. It's purpose is to write files to src/data for each page. It writes one .json file per page I have. So when you clone this repo by default it has index.json and test.json.
Both have corresponding .hbs template file (this is html written in html as usual with other benefits) and .scss files as described in method 1 above.

Here is how i call contentful for my page entries.
*/
var fs = require('fs');
const contentful = require("contentful");
/*
Create a file named .env in the root of directory and make sure it is added to git ignore in order to hide your keys from github
The .env file will have just your keys /tokens etc as variables, example:

---------
SPACE_ID = 'aa133yk2344y3311';
ACCESS_TOKEN = '634f45937ac7437asdf9a060e99dd8434d3bb5gg335656d5cb';
---------

You can then access your variables like this process.env.ACCESS_TOKEN
*/
require('dotenv/config');
require('./.env');

const client = contentful.createClient({
  space:process.env.SPACE_ID,
  accessToken:process.env.ACCESS_TOKEN
});

client.getEntries().then((entries) => {
  entries.items.forEach((page) => {
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
}).catch((error) => {
  if(error.status && error.status === '404') {
    console.log('could not access, check your SPACE_ID and ACCESS_TOKEN, or Internet connection.');
  } else {
    console.log(error);
  }
});

/*
For when I want to work locally i use chrome web server browser extension and point to my temp json file
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
