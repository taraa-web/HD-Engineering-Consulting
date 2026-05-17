const fs = require('fs');

function addInlineScale(filePath, scaleValue) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // We want to find the HD_logo.svg tags and add transform: "scale(X)" to their inline styles
    const searchStr = 'src="/HD_logo.svg"';
    if (!content.includes(searchStr)) return;

    let parts = content.split('src="/HD_logo.svg"');
    for (let i = 0; i < parts.length - 1; i++) {
        let styleIndex = parts[i].lastIndexOf('style={{');
        if (styleIndex !== -1) {
            let styleEndIndex = parts[i].indexOf('}}', styleIndex);
            let currentStyle = parts[i].substring(styleIndex + 8, styleEndIndex);
            
            if (!currentStyle.includes('transform')) {
                let newStyle = currentStyle + `,"transform":"scale(${scaleValue})"`;
                parts[i] = parts[i].substring(0, styleIndex + 8) + newStyle + parts[i].substring(styleEndIndex);
            }
        }
    }
    
    fs.writeFileSync(filePath, parts.join('src="/HD_logo.svg"'), 'utf8');
}

addInlineScale('src/components/Layout.jsx', 1.8); // 80% larger
addInlineScale('src/pages/Home.jsx', 1.5); // 50% larger

console.log('Applied inline scale styles to logos!');
