const fs = require('fs');
let content = fs.readFileSync('src/pages/Leistungen.jsx', 'utf8');

// Remove the mistakenly added line
content = content.replace("        content = content.replace(/REAL ESTATE/g, 'ENGINEERING');\n", "");

// Actually replace REAL ESTATE with ENGINEERING
content = content.replace(/REAL ESTATE/g, 'ENGINEERING');

fs.writeFileSync('src/pages/Leistungen.jsx', content);
console.log('Fixed Leistungen.jsx');
