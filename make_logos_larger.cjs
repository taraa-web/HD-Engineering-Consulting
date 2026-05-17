const fs = require('fs');

// Update Layout.jsx
let layout = fs.readFileSync('src/components/Layout.jsx', 'utf8');
// Header logo
layout = layout.replace(
    'relative shrink-0 h-16 w-[14.5rem] sm:h-[4.5rem] sm:w-[17rem]',
    'relative shrink-0 h-24 w-[16rem] sm:h-28 sm:w-[20rem]'
);
// Footer logo
layout = layout.replace(
    'relative shrink-0 h-12 w-[11rem] sm:h-14 sm:w-[12.5rem]',
    'relative shrink-0 h-20 w-[14rem] sm:h-24 sm:w-[16rem]'
);
fs.writeFileSync('src/components/Layout.jsx', layout, 'utf8');


// Update Home.jsx
let home = fs.readFileSync('src/pages/Home.jsx', 'utf8');
// Overlay logo on the guy's shirt
home = home.replace(
    'relative h-20 w-48 sm:h-24 sm:w-56',
    'relative h-32 w-64 sm:h-40 sm:w-80'
);

// Central logo in "Strategischer Kern"
home = home.replace(
    'relative shrink-0 h-12 w-[11rem] sm:h-14 sm:w-[12.5rem]',
    'relative shrink-0 h-20 w-[14rem] sm:h-24 sm:w-[16rem]'
);
fs.writeFileSync('src/pages/Home.jsx', home, 'utf8');

console.log('Logos made larger successfully!');
