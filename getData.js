const axios = require('axios');
var fs = require('fs');

axios.get('http://127.0.0.1:8887/initialData.json').then((response) => {
  let data = response.data;
  let json = JSON.stringify(data);
  fs.writeFile('./src/data/data.json', json, 'utf8', (error) => {
    if(error){
      console.log('[write output]: could not write to ./scr/data/data.json: '+error);
    }else{
      console.log('[write output]: successfully wrote to ./scr/data/data.json');
    }
  });
}).catch((error) => {
  console.log(error);
});
