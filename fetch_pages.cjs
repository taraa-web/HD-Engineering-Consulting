const fs = require('fs');
const https = require('https');
const path = require('path');

const pages = [
    { name: 'Leistungen', url: 'https://hd-real-estate-construction.vercel.app/leistungen' },
    { name: 'Karriere', url: 'https://hd-real-estate-construction.vercel.app/karriere' },
    { name: 'Kontakt', url: 'https://hd-real-estate-construction.vercel.app/kontakt' }
];

async function fetchHtml(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve(data));
        }).on('error', reject);
    });
}

async function run() {
    for (const page of pages) {
        console.log(`Fetching ${page.name}...`);
        const html = await fetchHtml(page.url);
        
        // Extract the <main> part or whatever is relevant. We want the full page structure ideally.
        // Actually, just save the raw HTML first.
        fs.writeFileSync(path.join(__dirname, `${page.name.toLowerCase()}_raw.html`), html, 'utf8');
        console.log(`Saved ${page.name.toLowerCase()}_raw.html`);
    }
}

run();
