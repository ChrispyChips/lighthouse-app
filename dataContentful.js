var fs = require('fs');
const contentful = require("contentful");
const SPACE_ID = 'aa6ykz6kypbo';
const ACCESS_TOKEN = '6397ac7437737ed6319a060e99dd84d3bb597100a083704d5cb7d1c21a2ac9c8';

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
      // Create the json page filenamed after the page, ie ./src/data/index.json for the index page
      // let pageData = [];
      // pageData.push(page.fields);
      // pageData = JSON.stringify(pageData);
      let pageData = JSON.stringify(page.fields);
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
