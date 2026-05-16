const fs = require('fs');
const path = require('path');

const files = [
    'src/components/Layout.jsx',
    'src/pages/Home.jsx',
    'src/pages/Leistungen.jsx',
    'src/pages/Karriere.jsx',
    'src/pages/Kontakt.jsx'
];

const replacements = [
    [/Immobilienökonomie/g, 'Ingenieurökonomie'],
    [/Immobilienprojekt/g, 'Ingenieurprojekt'],
    [/Immobilienprojekte/g, 'Ingenieurprojekte'],
    [/Immobilienbranche/g, 'Ingenieurbranche'],
    [/Immobilienwirtschaft/g, 'Ingenieurwirtschaft'],
    [/Immobilienkaufmann/g, 'Ingenieurkaufmann'],
    [/Immobilienberatung/g, 'Ingenieurberatung'],
    [/Immobilien/g, 'Ingenieurwesen'],
    [/Real Estate/g, 'Engineering'],
    [/Bau und Ingenieurwesen/g, 'Ingenieurwesen und Beratung'],
    [/Bauwesen/g, 'Ingenieurwesen'],
    [/info@hdrec\.de/g, 'info@hdengineering.de'],
    [/hdrec\.de/g, 'hdengineering.de']
];

files.forEach(f => {
    let fp = path.join(__dirname, f);
    if (!fs.existsSync(fp)) return;
    let content = fs.readFileSync(fp, 'utf8');
    
    // IF the file is Layout.jsx, DO NOT remove the footer.
    if (f !== 'src/components/Layout.jsx') {
        content = content.replace(/<footer[\s\S]*?<\/footer>/g, '');
    }

    for (const [search, replace] of replacements) {
        content = content.replace(search, replace);
    }
    
    fs.writeFileSync(fp, content, 'utf8');
});
console.log('Deep text replacements complete!');
