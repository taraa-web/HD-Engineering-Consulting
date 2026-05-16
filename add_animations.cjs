const fs = require('fs');

let app = fs.readFileSync('src/App.jsx', 'utf8');

// 1. Make the circle elements visible by default
app = app.replace(/"opacity":\s*"0",\s*"transform":\s*"translateX\(30px\)"/g, '"opacity": "1", "transform": "translateX(0px)", "transition": "all 1s ease-out"');

// 2. Make sure React, { useEffect } is imported
if (!app.includes('useEffect')) {
    app = app.replace("import React from 'react';", "import React, { useEffect } from 'react';");
}

// 3. Add IntersectionObserver logic for scroll animations
const useEffectCode = `
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        // Select elements to animate on scroll
        const elements = document.querySelectorAll('section h2, section h3, section p, article, figure, .grid > div > div');
        
        elements.forEach((el, index) => {
            // Avoid animating the hero section immediately or tiny elements
            if (!el.dataset.animated && !el.closest('header') && !el.closest('.absolute.inset-0')) {
                el.style.opacity = 0;
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                // Stagger effect for grid items
                if (el.closest('.grid')) {
                    el.style.transitionDelay = \`\${(index % 4) * 0.1}s\`;
                }
                el.dataset.animated = 'true';
                observer.observe(el);
            }
        });

        return () => observer.disconnect();
    }, []);
`;

// Insert it at the start of the App component
app = app.replace('function App() {', 'function App() {\n' + useEffectCode);

fs.writeFileSync('src/App.jsx', app);

// 4. Restore original CSS with exact Vercel colors
fs.copyFileSync('theme.css', 'src/index.css');

console.log('Scroll animations added and original colors restored.');
