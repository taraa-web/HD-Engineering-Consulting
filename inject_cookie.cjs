const fs = require('fs');

const css = `
/* Borlabs Cookie Consent Clone */
.bc-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex; justify-content: center; align-items: center;
  z-index: 100000;
  backdrop-filter: blur(2px);
}
.bc-modal {
  background: white; border-radius: 8px; width: 90%; max-width: 500px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  display: flex; flex-direction: column; overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.bc-header {
  background: white; padding: 18px 24px; display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid #e5e7eb; position: relative;
}
.bc-header h2 { font-size: 18px; font-weight: 700; margin: 0; color: #111827; }
.bc-close {
  position: absolute; right: 24px; top: 50%; transform: translateY(-50%);
  background: transparent; border: none; font-size: 24px; color: #9ca3af;
  cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;
  transition: color 0.2s;
}
.bc-close:hover { color: #4b5563; }
.bc-body { padding: 24px; font-size: 14px; color: #4b5563; line-height: 1.6; }
.bc-body p { margin-bottom: 16px; margin-top: 0; }
.bc-body p:last-child { margin-bottom: 0; }
.bc-body a { color: #2563eb; text-decoration: none; }
.bc-body a:hover { text-decoration: underline; }
.bc-buttons { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.bc-btn {
  padding: 12px 24px; border-radius: 6px; font-size: 14px; font-weight: 600;
  text-align: center; cursor: pointer; border: none; width: 100%;
  transition: all 0.2s;
}
.bc-btn-primary { background: #2563eb; color: white; }
.bc-btn-primary:hover { background: #1d4ed8; }
.bc-btn-secondary { background: #f9fafb; color: #374151; border: 1px solid #d1d5db; }
.bc-btn-secondary:hover { background: #f3f4f6; }
.bc-footer {
  display: flex; justify-content: center; align-items: center; gap: 6px;
  padding: 12px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af; background: #f9fafb;
}

.bc-fingerprint {
  position: fixed; bottom: 20px; left: 20px; width: 44px; height: 44px;
  background: #1e3a8a; border-radius: 6px; display: flex; align-items: center; justify-content: center;
  z-index: 99999; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: transform 0.2s, background 0.2s;
}
.bc-fingerprint:hover { transform: scale(1.05); background: #172554; }
.bc-fingerprint svg { width: 24px; height: 24px; fill: white; }
.bc-hidden { display: none !important; }
`;

const html = `
<div id="bc-fingerprint" class="bc-fingerprint bc-hidden" onclick="openCookieConsent()">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.84 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 10.89 3.8 12 3.8c1.46 0 3.56.59 5.35 2.03.21.17.25.48.08.7-.17.21-.48.25-.7.08-1.56-1.25-3.37-1.81-4.73-1.81-1.01 0-1.82.22-4.63 1.63-1.33.68-2.45 1.65-3.32 2.89-.14.19-.35.29-.55.29zM2.5 15c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7C3.12 12.59 4.63 11 6.8 10.12c2.02-.82 4.13-1.07 6.31-.76 1.74.24 3.32 1.01 4.51 2.2.2.2.19.51-.01.71-.2.2-.51.19-.71-.01-1.04-1.04-2.41-1.71-3.92-1.92-1.9-.27-3.76-.04-5.54.68-1.9.77-3.21 2.14-4.04 3.33-.14.21-.36.31-.57.31zM1.8 19.3c-.05 0-.1-.01-.15-.02-.27-.08-.43-.36-.35-.63.29-1 .73-1.9 1.28-2.67.62-.87 1.4-1.63 2.3-2.22C7.3 12.16 10.3 11.5 13.5 11.83c1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.49.69-.88 1.48-1.13 2.37-.07.25-.29.42-.55.42zM5.5 22c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.62-.87 1.4-1.63 2.3-2.22 2.41-1.57 5.41-2.23 8.61-1.9 1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.14.21-.36.31-.57.31z" />
  </svg>
</div>

<div id="bc-modal-overlay" class="bc-modal-overlay bc-hidden">
  <div class="bc-modal">
    <div class="bc-header">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
      <h2>Datenschutz-Präferenz</h2>
      <button class="bc-close" onclick="closeCookieConsent()">×</button>
    </div>
    <div class="bc-body">
      <p>Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.</p>
      <p>Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer <a href="#">Datenschutzerklärung</a>.</p>
      <p>Sie können Ihre Auswahl jederzeit unter <a href="#" onclick="openCookieConsent(); return false;">Einstellungen</a> widerrufen oder anpassen.</p>
      
      <div class="bc-buttons">
        <button class="bc-btn bc-btn-primary" onclick="acceptCookies('all')">Ich akzeptiere alle</button>
        <button class="bc-btn bc-btn-secondary" onclick="acceptCookies('essential')">Nur essenzielle Cookies akzeptieren</button>
        <button class="bc-btn bc-btn-secondary" onclick="closeCookieConsent()">Individuelle Datenschutz-Präferenzen</button>
      </div>
    </div>
    <div class="bc-footer">
      <span>Präferenzen |</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
      <span>Borlabs Cookie</span>
    </div>
  </div>
</div>
`;

const js = `
function openCookieConsent() {
  document.getElementById('bc-modal-overlay').classList.remove('bc-hidden');
  document.getElementById('bc-fingerprint').classList.add('bc-hidden');
}

function closeCookieConsent() {
  document.getElementById('bc-modal-overlay').classList.add('bc-hidden');
  if (localStorage.getItem('cookieConsent')) {
    document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
  } else {
    // If closed without choice, still show fingerprint
    document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
  }
}

function acceptCookies(type) {
  localStorage.setItem('cookieConsent', type);
  closeCookieConsent();
}

document.addEventListener('DOMContentLoaded', () => {
  if (!localStorage.getItem('cookieConsent')) {
    setTimeout(() => {
      document.getElementById('bc-modal-overlay').classList.remove('bc-hidden');
    }, 500);
  } else {
    document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
  }
});
`;

function injectIntoFile(filename) {
  if (!fs.existsSync(filename)) return;
  let content = fs.readFileSync(filename, 'utf-8');
  
  // Clean up previous injection if exists
  content = content.replace(/<!-- BORLABS CLONE START -->[\\s\\S]*<!-- BORLABS CLONE END -->/g, '');
  
  // 1. Inject CSS right before </style> or </head>
  const cssInjection = "\\n<!-- BORLABS CLONE START -->\\n<style>\\n" + css + "\\n</style>\\n<!-- BORLABS CLONE END -->\\n";
  if (content.includes('</style>')) {
    content = content.replace('</style>', "</style>" + cssInjection);
  } else {
    content = content.replace('</head>', cssInjection + "</head>");
  }
  
  // 2. Inject HTML right before </body>
  const htmlInjection = "\\n<!-- BORLABS CLONE START -->\\n" + html + "\\n<!-- BORLABS CLONE END -->\\n</body>";
  content = content.replace('</body>', htmlInjection);
  
  // 3. Inject JS right before </body>
  const jsInjection = "\\n<!-- BORLABS CLONE START -->\\n<script>\\n" + js + "\\n</script>\\n<!-- BORLABS CLONE END -->\\n";
  content = content.replace('</body>', jsInjection + "</body>");
  
  fs.writeFileSync(filename, content);
  console.log("Successfully injected into " + filename);
}

['hd_engineering_single_page.html', 'extracted.html'].forEach(injectIntoFile);
