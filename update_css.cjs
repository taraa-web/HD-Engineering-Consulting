const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'index.css');
let content = fs.readFileSync(filePath, 'utf8');

// The original root block:
const newRootBlock = `:root{
  --background:#F1F4F7;
  --foreground:#1E2A36;
  --card:#FFFFFF;
  --card-foreground:#1E2A36;
  --popover:#FFFFFF;
  --popover-foreground:#1E2A36;
  --primary:#22354B;
  --primary-foreground:#FFFFFF;
  --accent:#2D6AA6;
  --accent-foreground:#FFFFFF;
  --secondary:#E8EDF2;
  --secondary-foreground:#172433;
  --muted:#E8EDF2;
  --muted-foreground:#6B7B8C;
  --slate-panel:#172433;
  --slate-panel-foreground:#FFFFFF;
  --footer:#172433;
  --footer-foreground:#FFFFFF;
  --destructive:#e40014;
  --destructive-foreground:#fcfcfc;
  --border:#d9dfe5;
  --input:#e0e5eb;
  --ring:#2D6AA6;
  --radius:0.5rem;
}`;

// Replace the :root block
content = content.replace(/:root\{--background:#fff;[^}]+--sidebar-ring:[^}]+\}/g, newRootBlock);

// Remove the lab colors supports block
content = content.replace(/@supports \(color:lab\(0% 0 0\)\)\{[^}]+\}/g, '');

// Also need to be careful with any lab colors support blocks, let's just use regex to remove it
content = content.replace(/@supports \(color:lab\(0% 0 0\)\)\s*\{\s*:root\s*\{[^}]+\}\s*\}/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('CSS updated');
