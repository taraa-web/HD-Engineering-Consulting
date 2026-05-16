const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace the video background with the new hero image
// Original:
// <video autoPlay="" muted="" loop="" playsInline="" preload="metadata" poster="https://hd-real-estate-construction.vercel.app/images/hero-construction.jpg" aria-hidden="true" className="h-full w-full object-cover"><source src="https://hd-real-estate-construction.vercel.app/videos/hero.webm" type="video/webm" /><source src="https://hd-real-estate-construction.vercel.app/videos/hero.mp4" type="video/mp4" /></video>
// Replace with img tag:
const videoRegex = /<video autoPlay="" muted="" loop="" playsInline="" preload="metadata" poster="https:\/\/hd-real-estate-construction\.vercel\.app\/images\/hero-construction\.jpg" aria-hidden="true" className="h-full w-full object-cover"><source src="https:\/\/hd-real-estate-construction\.vercel\.app\/videos\/hero\.webm" type="video\/webm" \/><source src="https:\/\/hd-real-estate-construction\.vercel\.app\/videos\/hero\.mp4" type="video\/mp4" \/><\/video>/g;
content = content.replace(videoRegex, '<img src="/images/hero_engineering.png" alt="Engineering Hero" className="h-full w-full object-cover" />');

// Replace service-bauausfuehrung.jpg with services_supervision.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-bauausfuehrung\.jpg[^"]+/g, '/images/services_supervision.png');
content = content.replace(/srcSet="[^"]*service-bauausfuehrung\.jpg[^"]*"/g, '');

// Replace service-projektmanagement.jpg with about_team.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-projektmanagement\.jpg[^"]+/g, '/images/about_team.png');
content = content.replace(/srcSet="[^"]*service-projektmanagement\.jpg[^"]*"/g, '');

// Replace service-real-estate.jpg with projects_architecture.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-real-estate\.jpg[^"]+/g, '/images/projects_architecture.png');
content = content.replace(/srcSet="[^"]*service-real-estate\.jpg[^"]*"/g, '');

// Replace proof-project.jpg with projects_architecture.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fproof-project\.jpg[^"]+/g, '/images/projects_architecture.png');
content = content.replace(/srcSet="[^"]*proof-project\.jpg[^"]*"/g, '');

// Replace welcome-meeting.jpg with about_team.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fwelcome-meeting\.jpg[^"]+/g, '/images/about_team.png');
content = content.replace(/srcSet="[^"]*welcome-meeting\.jpg[^"]*"/g, '');

// For the rest of the images in the scrolling grid, let's just make them point to the new images as well to give a consistent premium look.
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-construction-management\.jpg[^"]+/g, '/images/services_supervision.png');
content = content.replace(/srcSet="[^"]*service-construction-management\.jpg[^"]*"/g, '');

content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-kostensteuerung\.jpg[^"]+/g, '/images/hero_engineering.png');
content = content.replace(/srcSet="[^"]*service-kostensteuerung\.jpg[^"]*"/g, '');

content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fservice-controlling\.jpg[^"]+/g, '/images/about_team.png');
content = content.replace(/srcSet="[^"]*service-controlling\.jpg[^"]*"/g, '');

// Remove the person image since we don't have a new portrait, and just use the about_team image
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fperson\.png[^"]+/g, '/images/services_supervision.png');
content = content.replace(/srcSet="[^"]*person\.png[^"]*"/g, '');

// Also the "person.png" has an overlay HD logo. We can keep the logo overlay.
// It is hd-logo-removebg.png
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Fhd-logo-removebg\.png[^"]+/g, '/HD_logo.svg');
content = content.replace(/srcSet="[^"]*hd-logo-removebg\.png[^"]*"/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Images updated');
