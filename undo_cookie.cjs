const fs = require('fs');

function undoInjection(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf-8');
  
  // Remove CSS
  content = content.replace(/<!-- BORLABS CLONE START -->[\s\S]*?<!-- BORLABS CLONE END -->/g, '');
  
  fs.writeFileSync(filename, content);
  console.log("Reverted " + filename);
}

['hd_engineering_single_page.html', 'extracted.html'].forEach(undoInjection);
