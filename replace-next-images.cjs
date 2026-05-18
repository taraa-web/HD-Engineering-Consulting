const fs = require('fs');

const files = [
    'src/pages/Leistungen.jsx',
    'src/pages/Karriere.jsx'
];

// Map of next/image urls to unsplash construction urls
const replacements = {
    '/_next/image?url=%2Fimages%2Fleistungen-hero.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
    '/_next/image?url=%2Fimages%2Fkarriere-hero.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
    '/_next/image?url=%2Fimages%2Fservice-projektmanagement.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-bauausfuehrung.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-controlling.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-construction-management.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-real-estate.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-kostensteuerung.jpg&amp;w=3840&amp;q=75': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    // also for normal un-escaped versions just in case
    '/_next/image?url=%2Fimages%2Fleistungen-hero.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=2000&q=80',
    '/_next/image?url=%2Fimages%2Fkarriere-hero.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=2000&q=80',
    '/_next/image?url=%2Fimages%2Fservice-projektmanagement.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-bauausfuehrung.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-controlling.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-construction-management.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-real-estate.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    '/_next/image?url=%2Fimages%2Fservice-kostensteuerung.jpg&w=3840&q=75': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80'
};

files.forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        Object.keys(replacements).forEach(key => {
            content = content.replace(new RegExp(key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacements[key]);
        });
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Replaced images in Leistungen.jsx and Karriere.jsx');
