const fs = require('fs');

const file = 'src/pages/Home.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Fix autoPlay="" muted="" loop="" playsInline=""
content = content.replace(/autoPlay=""/g, 'autoPlay');
content = content.replace(/muted=""/g, 'muted');
content = content.replace(/loop=""/g, 'loop');
content = content.replace(/playsInline=""/g, 'playsInline');

// 2. Change video URL to a new construction video to ensure it's "new" and "moves"
// I will use a Pexels video URL: https://videos.pexels.com/video-files/3201416/3201416-uhd_2560_1440_25fps.mp4
const newVideoSrc = 'https://videos.pexels.com/video-files/3201416/3201416-uhd_2560_1440_25fps.mp4';
content = content.replace('src="https://hd-real-estate-construction.vercel.app/videos/hero.webm"', `src="${newVideoSrc}"`);
content = content.replace('src="https://hd-real-estate-construction.vercel.app/videos/hero.mp4"', `src="${newVideoSrc}"`);

// 3. Change welcome meeting photo
const oldWelcomePhoto = 'src="/images/welcome-meeting.jpg"';
const newWelcomePhoto = 'src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80"';
content = content.replace(oldWelcomePhoto, newWelcomePhoto);

// 4. Change person photo
const oldPersonPhoto = 'src="/images/person.png"';
const newPersonPhoto = 'src="https://images.unsplash.com/photo-1541888086425-d81bb19240f5?auto=format&fit=crop&w=800&q=80"';
content = content.replace(oldPersonPhoto, newPersonPhoto);

// 5. Change the two proof project references
// The first one is proof-project.jpg
const oldProof1 = 'src="/images/proof-project.jpg"';
const newProof1 = 'src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"';
content = content.replace(oldProof1, newProof1);

// The second one in the references section is service-bauausfuehrung.jpg
// We must only replace it where it's in the HD Referenz section.
const oldProof2Block = 'span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-accent">HD Referenz</span>';
// Let's find the figure containing this and replace the image inside it.
let parts = content.split('HD Referenz</span>');
if (parts.length > 2) {
    // There are 2 references.
    // The second reference is before the 2nd 'HD Referenz</span>'
    let beforeSecond = parts[1];
    let newBeforeSecond = beforeSecond.replace('src="/images/service-bauausfuehrung.jpg"', 'src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"');
    parts[1] = newBeforeSecond;
    content = parts.join('HD Referenz</span>');
}

fs.writeFileSync(file, content, 'utf8');
console.log('Images and video replaced.');
