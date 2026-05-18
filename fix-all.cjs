const fs = require('fs');

// 1. Fix Home.jsx Hero Video
let homeContent = fs.readFileSync('src/pages/Home.jsx', 'utf8');
homeContent = homeContent.replace(/src="https:\/\/videos\.pexels\.com\/video-files\/3201416\/3201416-uhd_2560_1440_25fps\.mp4" type="video\/webm"/g, 'src="https://hd-real-estate-construction.vercel.app/videos/hero.webm" type="video/webm"');
homeContent = homeContent.replace(/src="https:\/\/videos\.pexels\.com\/video-files\/3201416\/3201416-uhd_2560_1440_25fps\.mp4" type="video\/mp4"/g, 'src="https://hd-real-estate-construction.vercel.app/videos/hero.mp4" type="video/mp4"');
fs.writeFileSync('src/pages/Home.jsx', homeContent, 'utf8');

// Helper to replace images
function replaceImagesInFile(filePath) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace welcome-meeting
    content = content.replace(/src="\/images\/welcome-meeting\.jpg"/g, 'src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"');
    // Replace person.png
    content = content.replace(/src="\/images\/person\.png"/g, 'src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"');
    // Replace proof-project
    content = content.replace(/src="\/images\/proof-project\.jpg"/g, 'src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"');
    
    // Replace hero images for subpages (like in Leistungen)
    content = content.replace(/src="\/images\/hero-construction\.jpg"/g, 'src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80"');
    content = content.replace(/src="\/images\/service-bauausfuehrung\.jpg"/g, 'src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"');
    
    fs.writeFileSync(filePath, content, 'utf8');
}

// 2. Fix images in other pages
replaceImagesInFile('src/pages/Leistungen.jsx');
replaceImagesInFile('src/pages/Kontakt.jsx');
replaceImagesInFile('src/pages/Karriere.jsx');

console.log('Fixed video and replaced images in subpages');
