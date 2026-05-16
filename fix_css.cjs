const fs = require('fs');
const path = require('path');

const themeCssPath = path.join(__dirname, 'theme.css');
const indexCssPath = path.join(__dirname, 'src', 'index.css');

let cssContent = fs.readFileSync(themeCssPath, 'utf8');

// Replace standard hex definitions
cssContent = cssContent.split('--primary:#012854').join('--primary:#1B2A4A');
cssContent = cssContent.split('--accent:#00ade4').join('--accent:#C9A84C');
cssContent = cssContent.split('--slate-panel:#29343f').join('--slate-panel:#1B2A4A');
cssContent = cssContent.split('--footer:#162232').join('--footer:#1B2A4A');

// Replace chart hex definitions if they exist
cssContent = cssContent.split('--chart-1:#012854').join('--chart-1:#1B2A4A');
cssContent = cssContent.split('--chart-2:#00ade4').join('--chart-2:#C9A84C');
cssContent = cssContent.split('--sidebar-primary:#012854').join('--sidebar-primary:#1B2A4A');
cssContent = cssContent.split('--sidebar-ring:#00ade4').join('--sidebar-ring:#C9A84C');


// Replace lab color definitions
cssContent = cssContent.split('lab(15.7727% 2.39243 -30.8645)').join('#1B2A4A'); // primary
cssContent = cssContent.split('lab(65.453% -25.4956 -44.2252)').join('#C9A84C'); // accent
cssContent = cssContent.split('lab(21.0726% -2.22062 -8.70217)').join('#1B2A4A'); // slate-panel
cssContent = cssContent.split('lab(12.8515% -1.38016 -12.3067)').join('#1B2A4A'); // footer

fs.writeFileSync(indexCssPath, cssContent, 'utf8');
console.log('CSS fixed and updated successfully.');
