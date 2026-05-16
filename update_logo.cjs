const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let content = fs.readFileSync(appPath, 'utf8');

// The string we want to replace could be anywhere. We will use a regex to match the srcSet and src for the main logo.
content = content.replace(/srcSet="[^"]*HD_logo\.png[^"]*"/g, '');
content = content.replace(/src="[^"]*HD_logo\.png[^"]*"/g, 'src="/HD_logo.svg"');

fs.writeFileSync(appPath, content, 'utf8');
console.log('Logo replaced successfully.');
