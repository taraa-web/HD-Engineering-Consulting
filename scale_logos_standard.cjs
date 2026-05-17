const fs = require('fs');

function scaleLogo(filePath, scaleClass) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    const searchStr = 'src="/HD_logo.svg"';
    if (!content.includes(searchStr)) return;

    let parts = content.split('src="/HD_logo.svg"');
    for (let i = 0; i < parts.length - 1; i++) {
        let classIndex = parts[i].lastIndexOf('className="');
        if (classIndex !== -1) {
            let classEndIndex = parts[i].indexOf('"', classIndex + 11);
            let currentClasses = parts[i].substring(classIndex + 11, classEndIndex);
            
            if (!currentClasses.includes('scale-')) {
                let newClasses = currentClasses + ' ' + scaleClass;
                parts[i] = parts[i].substring(0, classIndex + 11) + newClasses + parts[i].substring(classEndIndex);
            }
        }
    }
    
    fs.writeFileSync(filePath, parts.join('src="/HD_logo.svg"'), 'utf8');
}

scaleLogo('src/components/Layout.jsx', 'scale-150');
scaleLogo('src/pages/Home.jsx', 'scale-125');

console.log('Applied scale classes to logos!');
