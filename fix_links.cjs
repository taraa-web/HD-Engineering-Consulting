const fs = require('fs');
const path = require('path');

const dirs = [
    'components/Layout.jsx', 
    'pages/Home.jsx', 
    'pages/Leistungen.jsx', 
    'pages/Karriere.jsx', 
    'pages/Kontakt.jsx'
];

dirs.forEach(p => {
    const fp = path.join(__dirname, 'src', p);
    if (!fs.existsSync(fp)) return;
    let content = fs.readFileSync(fp, 'utf8');
    
    // Fix links
    content = content.replace(/<Link([^>]*)to="([^"]*)"([^>]*)>/g, '<a$1href="$2"$3>');
    content = content.replace(/<\/Link>/g, '</a>');
    
    // Fix HTML comments
    content = content.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');

    // Fix other common JSX errors (like unclosed img/input that weren't caught)
    content = content.replace(/<img([^>]*[^\/])>/g, '<img$1 />');
    content = content.replace(/<input([^>]*[^\/])>/g, '<input$1 />');
    content = content.replace(/<br([^>]*[^\/])>/g, '<br$1 />');
    content = content.replace(/<hr([^>]*[^\/])>/g, '<hr$1 />');
    content = content.replace(/<source([^>]*[^\/])>/g, '<source$1 />');
    
    fs.writeFileSync(fp, content, 'utf8');
});
console.log('Fixed JSX syntax issues.');
