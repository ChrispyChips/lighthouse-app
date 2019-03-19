const axios = require('axios');
var fs = require('fs');

axios.get('http://127.0.0.1:8887/initialData.json').then((response) => {
  let data = response.data;

  console.log(data);
  data.pages.forEach((page) => {
    let json = JSON.stringify(page);
    fs.writeFile('./src/data/'+page.page+'.json', json, 'utf8', (error) => {
      if(error){
        console.log('[write output]: could not write to ./scr/data/'+page.page+'.json: '+ error);
      }else{
        console.log('[write output]: successfully wrote to ./scr/data/'+page.page+'.json');
      }
    });
  });
}).catch((error) => {
  console.log(error);
});
