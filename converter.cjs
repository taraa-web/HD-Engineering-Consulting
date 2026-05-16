const fs = require('fs');

let html = fs.readFileSync('extracted.html', 'utf8');

// 1. Basic JSX conversions
html = html.replace(/class=/g, 'className=');
html = html.replace(/for=/g, 'htmlFor=');
html = html.replace(/<!--.*?-->/gs, '');

// Convert inline styles
html = html.replace(/style="([^"]+)"/g, (match, p1) => {
    const styleObj = {};
    p1.split(';').forEach(rule => {
        if (!rule.trim()) return;
        let [key, value] = rule.split(':');
        if (!key || !value) return;
        key = key.trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
        styleObj[key] = value.trim();
    });
    return `style={${JSON.stringify(styleObj)}}`;
});

// SVG attributes conversion to camelCase
const svgAttrs = [
    'stroke-width', 'stroke-linecap', 'stroke-linejoin', 'stroke-dasharray',
    'fill-rule', 'clip-rule', 'clip-path', 'fill-opacity', 'stroke-opacity'
];
svgAttrs.forEach(attr => {
    const camelAttr = attr.replace(/-([a-z])/g, g => g[1].toUpperCase());
    const regex = new RegExp(attr + '="', 'g');
    html = html.replace(regex, camelAttr + '="');
});

// Self-close tags
const selfClosingTags = ['img', 'br', 'hr', 'input', 'source'];
selfClosingTags.forEach(tag => {
    const regex = new RegExp(`<${tag}([^>]*?)(?<!/)>`, 'g');
    html = html.replace(regex, `<${tag}$1 />`);
});

// Prepend domain for assets to fix images and videos
html = html.replace(/src="\/_next/g, 'src="https://hd-real-estate-construction.vercel.app/_next');
html = html.replace(/srcSet="\/_next/g, 'srcSet="https://hd-real-estate-construction.vercel.app/_next');
html = html.replace(/, \/_next/g, ', https://hd-real-estate-construction.vercel.app/_next');
html = html.replace(/src="\/images/g, 'src="https://hd-real-estate-construction.vercel.app/images');
html = html.replace(/poster="\/images/g, 'poster="https://hd-real-estate-construction.vercel.app/images');
html = html.replace(/src="\/videos/g, 'src="https://hd-real-estate-construction.vercel.app/videos');

// 4. Text replacements
html = html.replace(/Real Estate &amp; Construction/g, 'Engineering &amp; Consulting');
html = html.replace(/Real Estate & Construction/g, 'Engineering & Consulting');
html = html.replace(/Bau- und Immobilienprojekte/g, 'Ingenieur- und Beratungsprojekte');
html = html.replace(/Bau- und Immobilienprojekten/g, 'Ingenieur- und Beratungsprojekten');
html = html.replace(/Bau und Immobilien/g, 'Ingenieurwesen und Beratung');
html = html.replace(/Bau, Immobilien und Projektsteuerung/g, 'Ingenieurwesen, Beratung und Projektsteuerung');

// Replace the logo sources with our SVG
// Find any img with alt="HD Engineering & Consulting Logo" or similar
// Actually, it's easier to just do a global replace for the logo URL
html = html.replace(/src="[^"]*HD_logo\.png[^"]*"/g, 'src="/HD_logo.svg"');
html = html.replace(/srcSet="[^"]*HD_logo\.png[^"]*"/g, '');

const jsxCode = `import React from 'react';
import './index.css';

function App() {
  return (
    <div className="font-sans antialiased text-foreground">
      ${html}
    </div>
  );
}

export default App;
`;

fs.writeFileSync('src/App.jsx', jsxCode);
console.log('Successfully converted HTML to JSX');
