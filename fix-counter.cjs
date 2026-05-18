const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf8');

// Add import if not present
if (!content.includes('AnimatedCounter')) {
    content = content.replace("import { Link } from 'react-router-dom';", "import { Link } from 'react-router-dom';\nimport AnimatedCounter from '../components/AnimatedCounter';");
}

// Replace 0 % with AnimatedCounter
const searchStr = 'className="mt-3 text-6xl md:text-7xl font-extrabold text-accent">0 %</p>';
const replaceStr1 = 'className="mt-3 text-6xl md:text-7xl font-extrabold text-accent"><AnimatedCounter end={85} suffix=" %" /></p>';
const replaceStr2 = 'className="mt-3 text-6xl md:text-7xl font-extrabold text-accent"><AnimatedCounter end={90} suffix=" %" /></p>';

// There are two occurrences.
let firstIndex = content.indexOf(searchStr);
if (firstIndex !== -1) {
    content = content.substring(0, firstIndex) + replaceStr1 + content.substring(firstIndex + searchStr.length);
}

let secondIndex = content.indexOf(searchStr);
if (secondIndex !== -1) {
    content = content.substring(0, secondIndex) + replaceStr2 + content.substring(secondIndex + searchStr.length);
}

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed Home.jsx counters');
