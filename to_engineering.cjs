const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

const replacements = [
    // Brand Name
    ['HD Real Estate & Construction', 'HD Engineering & Consulting'],
    ['HD Real Estate &amp; Construction', 'HD Engineering &amp; Consulting'],
    ['REAL ESTATE &amp; CONSTRUCTION', 'ENGINEERING &amp; CONSULTING'],
    
    // Core statements
    ['Bau- und Immobilienprojekte', 'Ingenieur- und Bauprojekte'],
    ['Bau- und Immobilienprozesse', 'Ingenieur- und Bauprozesse'],
    ['Bau, Immobilien und Projektsteuerung', 'Ingenieurwesen, Bau und Projektsteuerung'],
    ['Ihr Partner für Immobilien und Bauwesen.', 'Ihr Partner für Ingenieurwesen und Beratung.'],
    ['Immobilien im Kontext von Markt', 'Projekte im Kontext von Markt'],
    
    // Email / Contact (Keep the one they provided before if any, otherwise just update domain)
    // The previous prompt said info@hdrec.de, let's keep it or change it? The user didn't specify. I'll leave it as is or change to info@hdengineering.de. Actually they didn't ask to change the email. I'll just change the text.
];

for (const [search, replace] of replacements) {
    // Escape special characters in search string for regex if needed, or just use split/join
    content = content.split(search).join(replace);
}

fs.writeFileSync(appPath, content, 'utf8');
console.log('Text content successfully updated to HD Engineering & Consulting (German).');
