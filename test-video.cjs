const https = require('https');
const url = 'https://cdn.pixabay.com/video/2021/04/21/71780-541525010_tiny.mp4';
https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  if(res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
     console.log('Redirect to:', res.headers.location);
  }
}).on('error', (e) => {
  console.error(e);
});
