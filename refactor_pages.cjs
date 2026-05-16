const fs = require('fs');
const path = require('path');

function convertHtmlToJsx(html) {
    let jsx = html;
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    jsx = jsx.replace(/<img([^>]*[^/])>/g, '<img$1 />');
    jsx = jsx.replace(/<input([^>]*[^/])>/g, '<input$1 />');
    jsx = jsx.replace(/<br([^>]*[^/])>/g, '<br$1 />');
    jsx = jsx.replace(/<hr([^>]*[^/])>/g, '<hr$1 />');
    jsx = jsx.replace(/<source([^>]*[^/])>/g, '<source$1 />');
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        const styleObj = {};
        styleString.split(';').forEach(rule => {
            if (!rule.trim()) return;
            const parts = rule.split(':');
            if (parts.length >= 2) {
                let key = parts[0].trim();
                let value = parts.slice(1).join(':').trim();
                key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
                styleObj[key] = value;
            }
        });
        return `style={${JSON.stringify(styleObj)}}`;
    });
    // Add Link tags for internal links
    jsx = jsx.replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app\/([^"]*)"([^>]*)>/g, '<Link$1to="/$2"$3>');
    jsx = jsx.replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app"([^>]*)>/g, '<Link$1to="/"$2>');
    
    // Replace SVGs that might have invalid properties
    jsx = jsx.replace(/stroke-width/g, 'strokeWidth');
    jsx = jsx.replace(/stroke-linecap/g, 'strokeLinecap');
    jsx = jsx.replace(/stroke-linejoin/g, 'strokeLinejoin');
    jsx = jsx.replace(/fill-rule/g, 'fillRule');
    jsx = jsx.replace(/clip-rule/g, 'clipRule');
    
    // Convert to Engineering
    const replacements = [
        ['HD Real Estate & Construction', 'HD Engineering & Consulting'],
        ['HD Real Estate &amp; Construction', 'HD Engineering &amp; Consulting'],
        ['REAL ESTATE &amp; CONSTRUCTION', 'ENGINEERING &amp; CONSULTING'],
        ['Bau- und Immobilienprojekte', 'Ingenieur- und Bauprojekte'],
        ['Bau- und Immobilienprozesse', 'Ingenieur- und Bauprozesse'],
        ['Bau, Immobilien und Projektsteuerung', 'Ingenieurwesen, Bau und Projektsteuerung'],
        ['Ihr Partner für Immobilien und Bauwesen.', 'Ihr Partner für Ingenieurwesen und Beratung.'],
        ['Immobilien im Kontext von Markt', 'Projekte im Kontext von Markt'],
        ['Real Estate Services', 'Engineering Services'],
        // The Vercel image URLs
        [/src="https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=([^&]+)&[^"]+"/g, (match, url) => {
            return `src="${decodeURIComponent(url)}"`;
        }],
        [/srcSet="[^"]+"/g, '']
    ];
    
    for (const rep of replacements) {
        if (Array.isArray(rep) && rep[0] instanceof RegExp) {
            jsx = jsx.replace(rep[0], rep[1]);
        } else {
            jsx = jsx.split(rep[0]).join(rep[1]);
        }
    }
    
    // Also use the correct logo path everywhere
    jsx = jsx.replace(/src="[^"]*HD_logo\.png[^"]*"/g, 'src="/HD_logo.svg"');
    
    return jsx;
}

const appJsxContent = fs.readFileSync(path.join(__dirname, 'src', 'App.jsx'), 'utf8');

// Extract Header
const headerMatch = appJsxContent.match(/<header[\s\S]*?<\/header>/);
const headerJsx = headerMatch ? headerMatch[0] : '';

// Extract Footer
const footerMatch = appJsxContent.match(/<footer[\s\S]*?<\/footer>/);
const footerJsx = footerMatch ? footerMatch[0] : '';

// Convert header and footer internal links to <Link>
let newHeader = headerJsx.replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app\/([^"]*)"([^>]*)>/g, '<Link$1to="/$2"$3>').replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app"([^>]*)>/g, '<Link$1to="/"$2>');
let newFooter = footerJsx.replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app\/([^"]*)"([^>]*)>/g, '<Link$1to="/$2"$3>').replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app"([^>]*)>/g, '<Link$1to="/"$2>');

// Extract Main for Home
const mainMatch = appJsxContent.match(/<main[\s\S]*?<\/main>/);
const homeMainJsx = mainMatch ? mainMatch[0] : '';
let newHomeMain = homeMainJsx.replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app\/([^"]*)"([^>]*)>/g, '<Link$1to="/$2"$3>').replace(/<a([^>]*)href="https:\/\/hd-real-estate-construction\.vercel\.app"([^>]*)>/g, '<Link$1to="/"$2>');


// Create components dir
if (!fs.existsSync(path.join(__dirname, 'src', 'components'))) fs.mkdirSync(path.join(__dirname, 'src', 'components'));
if (!fs.existsSync(path.join(__dirname, 'src', 'pages'))) fs.mkdirSync(path.join(__dirname, 'src', 'pages'));

// Layout.jsx
const layoutCode = `
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <div className="font-sans antialiased text-foreground">
            ${newHeader}
            <div aria-hidden="true" className="h-24 md:h-28"></div>
            <Outlet />
            ${newFooter}
        </div>
    );
}
`;
fs.writeFileSync(path.join(__dirname, 'src', 'components', 'Layout.jsx'), layoutCode, 'utf8');

// Pages
const pages = ['Leistungen', 'Karriere', 'Kontakt'];
for (const p of pages) {
    const rawHtml = fs.readFileSync(path.join(__dirname, `${p.toLowerCase()}_raw.html`), 'utf8');
    const mMatch = rawHtml.match(/<main[^>]*>([\s\S]*?)<\/main>/);
    if (mMatch) {
        let pJsx = convertHtmlToJsx(mMatch[0]);
        // Wrap in a component, add useAnimations hook
        const compCode = `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ${p}() {
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

        document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach((el) => {
            if (!el.dataset.animated) {
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            }
        });
        document.querySelectorAll('section > div').forEach((el, index) => {
            if (index > 0 && !el.dataset.animated) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        ${pJsx}
    );
}
`;
        fs.writeFileSync(path.join(__dirname, 'src', 'pages', `${p}.jsx`), compCode, 'utf8');
    }
}

// Home.jsx
const homeCode = `
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
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

        document.querySelectorAll('[style*="opacity: 0"], [style*="opacity:0"]').forEach((el) => {
            if (!el.dataset.animated) {
                el.style.transition = 'all 0.8s ease-out';
                observer.observe(el);
            }
        });
        document.querySelectorAll('section > div').forEach((el, index) => {
            if (index > 0 && !el.dataset.animated) {
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);

    return (
        ${newHomeMain}
    );
}
`;
fs.writeFileSync(path.join(__dirname, 'src', 'pages', 'Home.jsx'), homeCode, 'utf8');

// main.jsx
const mainCode = `
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Leistungen from './pages/Leistungen';
import Karriere from './pages/Karriere';
import Kontakt from './pages/Kontakt';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="leistungen" element={<Leistungen />} />
          <Route path="karriere" element={<Karriere />} />
          <Route path="kontakt" element={<Kontakt />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
`;
fs.writeFileSync(path.join(__dirname, 'src', 'main.jsx'), mainCode, 'utf8');

// App.jsx (Can be safely cleared or exported as an empty shell, but we use main.jsx directly)
fs.writeFileSync(path.join(__dirname, 'src', 'App.jsx'), 'export default function App() { return null; }', 'utf8');

console.log('Refactoring complete!');
