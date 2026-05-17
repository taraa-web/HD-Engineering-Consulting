const fs = require('fs');

function scaleLogo(filePath, scaleClass) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Replace object-contain with object-contain scale-[1.3] (or whatever is passed)
    // We only want to target the ones with src="/HD_logo.svg"
    // Since regex can be tricky with HTML, we'll do a simpler replace.
    
    // For Layout.jsx header and footer
    // Let's just find the img tag for HD_logo.svg and add the scale class
    const searchStr = 'src="/HD_logo.svg"';
    if (!content.includes(searchStr)) return;

    // split by src="/HD_logo.svg"
    let parts = content.split('src="/HD_logo.svg"');
    for (let i = 0; i < parts.length - 1; i++) {
        // Look back from parts[i] to find className="..."
        let classIndex = parts[i].lastIndexOf('className="');
        if (classIndex !== -1) {
            let classEndIndex = parts[i].indexOf('"', classIndex + 11);
            let currentClasses = parts[i].substring(classIndex + 11, classEndIndex);
            
            // Only add if not already there
            if (!currentClasses.includes('scale-')) {
                let newClasses = currentClasses + ' ' + scaleClass;
                parts[i] = parts[i].substring(0, classIndex + 11) + newClasses + parts[i].substring(classEndIndex);
            }
        }
    }
    
    fs.writeFileSync(filePath, parts.join('src="/HD_logo.svg"'), 'utf8');
}

scaleLogo('src/components/Layout.jsx', 'scale-[1.6]');
scaleLogo('src/pages/Home.jsx', 'scale-[1.4]');

console.log('Applied scale classes to logos!');
