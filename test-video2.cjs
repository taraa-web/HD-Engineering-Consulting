const https = require('https');
const url = 'https://videos.pexels.com/video-files/3201416/3201416-uhd_2560_1440_25fps.mp4';
https.get(url, (res) => {
  console.log('Status Code:', res.statusCode);
  if(res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
     console.log('Redirect to:', res.headers.location);
  }
}).on('error', (e) => {
  console.error(e);
});
