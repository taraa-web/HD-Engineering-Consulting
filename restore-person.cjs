const fs = require('fs');

const url = 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=800&q=80';
const originalUrl = '/images/person.png';

const files = [
    'src/pages/Home.jsx',
    'src/pages/Leistungen.jsx',
    'src/pages/Kontakt.jsx',
    'src/pages/Karriere.jsx'
];

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = content.replace(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), originalUrl);
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Restored person.png');
