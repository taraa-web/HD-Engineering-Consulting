const fs = require('fs');

const files = [
    'src/pages/Leistungen.jsx',
    'src/pages/Home.jsx',
    'src/pages/Karriere.jsx',
    'src/pages/Kontakt.jsx',
    'src/components/Layout.jsx'
];

const badPhoto = '1541888086425-d81bb19240f5';
// using a beautiful modern building construction / crane / engineering photo
const goodPhoto = '1504307651254-35680f356dfd'; // Or '1581094794329-c8112a89af12'

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(/1541888086425-d81bb19240f5/g, goodPhoto);
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Replaced bad photo');
