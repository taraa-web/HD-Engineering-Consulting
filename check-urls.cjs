const https = require('https');

const urls = [
    'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80'
];

urls.forEach(url => {
    https.get(url, (res) => {
        console.log(`URL: ${url} -> Status: ${res.statusCode}`);
    }).on('error', (e) => {
        console.error(`Error: ${e.message}`);
    });
});
