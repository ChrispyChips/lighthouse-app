const axios = require('axios');
axios.get('http://127.0.0.1:8887/data.json').then((response)=>{
  let data = response.data;
  global.data = response.data;
  console.log(global.data);
}).catch((error) => {
  console.log(error);
});
