const fs = require('fs');
const path = require('path');
const https = require('https');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// Regex to find all unique raw image URLs encoded in _next/image?url=...
const nextImageRegex = /_next\/image\?url=([^&]+)&/g;
let matches;
const uniqueImageUrls = new Set();

while ((matches = nextImageRegex.exec(content)) !== null) {
    const decodedUrl = decodeURIComponent(matches[1]);
    uniqueImageUrls.add(decodedUrl);
}

// Function to download an image
const downloadImage = (urlPath) => {
    return new Promise((resolve, reject) => {
        const fullUrl = `https://hd-real-estate-construction.vercel.app${urlPath}`;
        // Create local directories if they don't exist
        const localPath = path.join(__dirname, 'public', urlPath);
        const dir = path.dirname(localPath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        if (fs.existsSync(localPath)) {
            resolve();
            return;
        }

        const file = fs.createWriteStream(localPath);
        https.get(fullUrl, (response) => {
            if (response.statusCode === 200) {
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else {
                file.close();
                fs.unlink(localPath, () => {});
                console.error(`Failed to download ${fullUrl}: ${response.statusCode}`);
                resolve(); // resolve anyway so we don't crash
            }
        }).on('error', (err) => {
            fs.unlink(localPath, () => {});
            console.error(`Error downloading ${fullUrl}: ${err.message}`);
            resolve();
        });
    });
};

// Download all images sequentially
async function downloadAll() {
    console.log(`Found ${uniqueImageUrls.size} unique images to download...`);
    for (const urlPath of uniqueImageUrls) {
        console.log(`Downloading ${urlPath}...`);
        await downloadImage(urlPath);
    }
    console.log('All images downloaded!');

    // Now update App.jsx to use local paths and remove _next/image wrappers
    let newContent = content;
    // Replace srcSet="..." with empty string because we don't have all responsive sizes locally
    newContent = newContent.replace(/srcSet="[^"]+"/g, '');
    
    // Replace src="..." wrapper with direct path
    newContent = newContent.replace(/src="https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=([^&]+)&[^"]+"/g, (match, url) => {
        const decoded = decodeURIComponent(url);
        return `src="${decoded}"`;
    });

    fs.writeFileSync(appPath, newContent, 'utf8');
    console.log('App.jsx updated to use local images.');
}

downloadAll();
