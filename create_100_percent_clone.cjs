const fs = require('fs');
const path = require('path');

const extractedHtmlPath = path.join(__dirname, 'extracted.html');
const appJsxPath = path.join(__dirname, 'src', 'App.jsx');

let html = fs.readFileSync(extractedHtmlPath, 'utf8');

// Convert HTML to JSX
let jsx = html
  .replace(/class=/g, 'className=')
  .replace(/for=/g, 'htmlFor=')
  .replace(/<!--.*?-->/g, '')
  .replace(/<img([^>]*[^/])>/g, '<img$1 />')
  .replace(/<source([^>]*[^/])>/g, '<source$1 />')
  .replace(/<br>/g, '<br />')
  .replace(/<hr([^>]*[^/])>/g, '<hr$1 />')
  .replace(/<rect([^>]*[^/])>/g, '<rect$1 />')
  .replace(/<circle([^>]*[^/])>/g, '<circle$1 />')
  .replace(/<path([^>]*[^/])>/g, '<path$1 />')
  .replace(/<line([^>]*[^/])>/g, '<line$1 />')
  .replace(/<polyline([^>]*[^/])>/g, '<polyline$1 />')
  .replace(/<polygon([^>]*[^/])>/g, '<polygon$1 />');

// Remove next/image specific artifacts or replace them properly
// For Vercel images that use srcSet with /_next/image, we can keep the exact URL structure or just let them load if the vercel site is up!
// Actually, using the absolute Vercel URL for _next images might be best to ensure 100% clone, BUT the user probably wants local images if possible.
// Wait, the user said "100% clone". If the local images are missing, they will be broken. Let's prepend https://hd-real-estate-construction.vercel.app to all /_next/image?url= and /videos/ to ensure they load EXACTLY the same!
jsx = jsx.replace(/href="\/([^"]*)"/g, 'href="https://hd-real-estate-construction.vercel.app/$1"');
jsx = jsx.replace(/src="\/([^"]*)"/g, 'src="https://hd-real-estate-construction.vercel.app/$1"');
jsx = jsx.replace(/srcSet="\/([^"]*)"/g, 'srcSet="https://hd-real-estate-construction.vercel.app/$1"');
jsx = jsx.replace(/poster="\/([^"]*)"/g, 'poster="https://hd-real-estate-construction.vercel.app/$1"');

// Fix style strings to objects
jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
    let styleObj = {};
    styleString.split(';').forEach(s => {
        let [key, value] = s.split(':');
        if (key && value) {
            key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
            styleObj[key] = value.trim();
        }
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// React component wrapper with IntersectionObserver
const appComponent = `import React, { useEffect } from 'react';
import './index.css';

function App() {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    if (entry.target.style.transform !== undefined) {
                        entry.target.style.transform = 'translateY(0) translateX(0)';
                    }
                    entry.target.dataset.animated = 'true';
                }
            });
        }, { threshold: 0.1 });

        // Add initial styles for animation
        document.querySelectorAll('section > div').forEach((el, index) => {
            if (index > 0 && !el.dataset.animated) {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="font-sans antialiased text-foreground">
            ${jsx}
        </div>
    );
}

export default App;
`;

fs.writeFileSync(appJsxPath, appComponent);
console.log('App.jsx has been regenerated as a 100% clone of extracted.html');
