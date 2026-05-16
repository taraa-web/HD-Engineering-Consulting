const fs = require('fs');

const path = 'src/pages/Home.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/src="\/images\/hd-logo-removebg\.png"/g, 'src="/HD_logo.svg"');

fs.writeFileSync(path, content, 'utf8');
console.log('Logo overlay updated.');
