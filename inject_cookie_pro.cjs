const fs = require('fs');

const css = `
/* Borlabs Cookie Consent 100% Clone */
.bc-modal-overlay {
  position: fixed; top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex; justify-content: center; align-items: center;
  z-index: 100000;
  backdrop-filter: blur(3px);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}
.bc-modal {
  background: white; border-radius: 6px; width: 90%; max-width: 520px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  display: flex; flex-direction: column; overflow: hidden;
  max-height: 90vh;
}
.bc-header {
  background: white; padding: 20px 24px; display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid #e5e7eb; position: relative;
}
.bc-header-title {
  display: flex; align-items: center; gap: 12px;
}
.bc-header h2 { font-size: 18px; font-weight: 600; margin: 0; color: #1f2937; }
.bc-close {
  background: transparent; border: none; font-size: 26px; color: #9ca3af;
  cursor: pointer; padding: 0; display: flex; align-items: center; justify-content: center;
  line-height: 1; transition: color 0.2s;
}
.bc-close:hover { color: #4b5563; }
.bc-body { 
  padding: 24px; font-size: 14px; color: #4b5563; line-height: 1.6; 
  overflow-y: auto; 
}
.bc-body p { margin-bottom: 16px; margin-top: 0; }
.bc-body p:last-child { margin-bottom: 0; }
.bc-body a { color: #2563eb; text-decoration: none; font-weight: 500; }
.bc-body a:hover { text-decoration: underline; }

.bc-buttons { display: flex; flex-direction: column; gap: 10px; margin-top: 24px; }
.bc-btn {
  padding: 12px 24px; border-radius: 4px; font-size: 14px; font-weight: 600;
  text-align: center; cursor: pointer; border: none; width: 100%;
  transition: all 0.2s;
}
.bc-btn-primary { background: #2563eb; color: white; }
.bc-btn-primary:hover { background: #1d4ed8; }
.bc-btn-secondary { background: #ffffff; color: #374151; border: 1px solid #d1d5db; }
.bc-btn-secondary:hover { background: #f9fafb; }
.bc-btn-link { background: transparent; color: #4b5563; border: none; padding: 8px; font-weight: 500; }
.bc-btn-link:hover { text-decoration: underline; color: #1f2937; }

/* Accordion & Switches */
.bc-details {
  margin-top: 20px; border-top: 1px solid #e5e7eb; padding-top: 20px;
}
.bc-accordion-item {
  border: 1px solid #e5e7eb; border-radius: 4px; margin-bottom: 10px;
}
.bc-accordion-header {
  padding: 12px 16px; background: #f9fafb; display: flex; align-items: center; gap: 12px;
  cursor: pointer; border-radius: 4px; font-weight: 600; color: #1f2937;
}
.bc-accordion-body {
  padding: 16px; border-top: 1px solid #e5e7eb; display: none; font-size: 13px; color: #6b7280;
}
.bc-accordion-item.active .bc-accordion-body { display: block; }
.bc-accordion-item.active .bc-accordion-header { border-bottom-left-radius: 0; border-bottom-right-radius: 0; }

.bc-badge {
  margin-left: auto; background: #10b981; color: white; font-size: 11px; padding: 2px 8px; border-radius: 12px; font-weight: 600;
}

/* Toggle Switch */
.bc-switch {
  position: relative; display: inline-block; width: 40px; height: 22px;
}
.bc-switch input { opacity: 0; width: 0; height: 0; }
.bc-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc; transition: .4s; border-radius: 22px;
}
.bc-slider:before {
  position: absolute; content: ""; height: 18px; width: 18px; left: 2px; bottom: 2px;
  background-color: white; transition: .4s; border-radius: 50%;
}
.bc-switch input:checked + .bc-slider { background-color: #2563eb; }
.bc-switch input:checked + .bc-slider:before { transform: translateX(18px); }
.bc-switch input:disabled + .bc-slider { background-color: #2563eb; opacity: 0.7; cursor: not-allowed; }

.bc-footer {
  display: flex; justify-content: center; align-items: center; gap: 8px;
  padding: 14px; background: #f3f4f6; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;
}
.bc-footer svg { width: 14px; height: 14px; color: #6b7280; }

.bc-fingerprint {
  position: fixed; bottom: 24px; left: 24px; width: 48px; height: 48px;
  background: #1e3a8a; border-radius: 8px; display: flex; align-items: center; justify-content: center;
  z-index: 99999; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.2);
  transition: transform 0.2s, background 0.2s;
}
.bc-fingerprint:hover { transform: scale(1.05); background: #172554; }
.bc-fingerprint svg { width: 28px; height: 28px; fill: white; }
.bc-hidden { display: none !important; }
`;

const html = `
<div id="bc-fingerprint" class="bc-fingerprint bc-hidden" onclick="bcOpen()">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.84 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 10.89 3.8 12 3.8c1.46 0 3.56.59 5.35 2.03.21.17.25.48.08.7-.17.21-.48.25-.7.08-1.56-1.25-3.37-1.81-4.73-1.81-1.01 0-1.82.22-4.63 1.63-1.33.68-2.45 1.65-3.32 2.89-.14.19-.35.29-.55.29zM2.5 15c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7C3.12 12.59 4.63 11 6.8 10.12c2.02-.82 4.13-1.07 6.31-.76 1.74.24 3.32 1.01 4.51 2.2.2.2.19.51-.01.71-.2.2-.51.19-.71-.01-1.04-1.04-2.41-1.71-3.92-1.92-1.9-.27-3.76-.04-5.54.68-1.9.77-3.21 2.14-4.04 3.33-.14.21-.36.31-.57.31zM1.8 19.3c-.05 0-.1-.01-.15-.02-.27-.08-.43-.36-.35-.63.29-1 .73-1.9 1.28-2.67.62-.87 1.4-1.63 2.3-2.22C7.3 12.16 10.3 11.5 13.5 11.83c1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.49.69-.88 1.48-1.13 2.37-.07.25-.29.42-.55.42zM5.5 22c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.62-.87 1.4-1.63 2.3-2.22 2.41-1.57 5.41-2.23 8.61-1.9 1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.14.21-.36.31-.57.31z" />
  </svg>
</div>

<div id="bc-modal-overlay" class="bc-modal-overlay bc-hidden">
  <div class="bc-modal">
    <div class="bc-header">
      <div class="bc-header-title">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          <path d="M9 12l2 2 4-4"></path>
        </svg>
        <h2>Datenschutz-Präferenz</h2>
      </div>
      <button class="bc-close" onclick="bcClose()">×</button>
    </div>
    <div class="bc-body" id="bc-body-scroll">
      <p>Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.</p>
      <p>Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer <a href="#">Datenschutzerklärung</a>.</p>
      <p>Sie können Ihre Auswahl jederzeit unter <a href="#" onclick="bcOpen(); return false;">Einstellungen</a> widerrufen oder anpassen.</p>
      
      <div id="bc-details" class="bc-details bc-hidden">
        <div class="bc-accordion-item active">
          <div class="bc-accordion-header" onclick="bcToggleAccordion(this)">
             <label class="bc-switch" onclick="event.stopPropagation()">
                <input type="checkbox" checked disabled>
                <span class="bc-slider"></span>
             </label>
             <span>Essenziell</span>
             <span class="bc-badge">Immer aktiv</span>
          </div>
          <div class="bc-accordion-body">
            <p>Essenzielle Cookies ermöglichen grundlegende Funktionen und sind für die einwandfreie Funktion der Website erforderlich.</p>
          </div>
        </div>
        
        <div class="bc-accordion-item">
          <div class="bc-accordion-header" onclick="bcToggleAccordion(this)">
             <label class="bc-switch" onclick="event.stopPropagation()">
                <input type="checkbox" id="bc-marketing-checkbox">
                <span class="bc-slider"></span>
             </label>
             <span>Marketing</span>
          </div>
          <div class="bc-accordion-body">
            <p>Marketing-Cookies werden von Drittanbietern oder Publishern verwendet, um personalisierte Werbung anzuzeigen. Sie tun dies, indem sie Besucher über Websites hinweg verfolgen.</p>
          </div>
        </div>
      </div>
      
      <div id="bc-buttons-default" class="bc-buttons">
        <button class="bc-btn bc-btn-primary" onclick="bcAccept('all')">Ich akzeptiere alle</button>
        <button class="bc-btn bc-btn-secondary" onclick="bcAccept('essential')">Nur essenzielle Cookies akzeptieren</button>
        <button class="bc-btn bc-btn-link" onclick="bcShowDetails()">Individuelle Datenschutz-Präferenzen</button>
      </div>
      
      <div id="bc-buttons-details" class="bc-buttons bc-hidden">
        <button class="bc-btn bc-btn-primary" onclick="bcSave()">Einwilligung speichern</button>
        <button class="bc-btn bc-btn-secondary" onclick="bcAccept('all')">Ich akzeptiere alle</button>
      </div>
    </div>
    
    <div class="bc-footer">
      <span>Präferenzen</span>
      <span>|</span>
      <span style="display:flex; align-items:center; gap: 4px;">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        Borlabs Cookie
      </span>
    </div>
  </div>
</div>
`;

const js = `
function bcOpen() {
  document.getElementById('bc-modal-overlay').classList.remove('bc-hidden');
  document.getElementById('bc-fingerprint').classList.add('bc-hidden');
}

function bcClose() {
  document.getElementById('bc-modal-overlay').classList.add('bc-hidden');
  document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
}

function bcAccept(type) {
  localStorage.setItem('cookieConsent', type);
  if(type === 'all') {
    document.getElementById('bc-marketing-checkbox').checked = true;
  } else {
    document.getElementById('bc-marketing-checkbox').checked = false;
  }
  bcClose();
}

function bcSave() {
  const marketing = document.getElementById('bc-marketing-checkbox').checked;
  localStorage.setItem('cookieConsent', marketing ? 'all' : 'custom');
  bcClose();
}

function bcShowDetails() {
  document.getElementById('bc-details').classList.remove('bc-hidden');
  document.getElementById('bc-buttons-default').classList.add('bc-hidden');
  document.getElementById('bc-buttons-details').classList.remove('bc-hidden');
  
  // Scroll to bottom so buttons are visible
  const body = document.getElementById('bc-body-scroll');
  setTimeout(() => { body.scrollTop = body.scrollHeight; }, 100);
}

function bcToggleAccordion(el) {
  const item = el.parentElement;
  if(item.classList.contains('active')) {
    item.classList.remove('active');
  } else {
    item.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    setTimeout(bcOpen, 400);
  } else {
    document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
    if(consent === 'all') {
       document.getElementById('bc-marketing-checkbox').checked = true;
    }
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
    content = content.replace('</style>', "</style>\\n" + cssInjection);
  } else {
    content = content.replace('</head>', cssInjection + "\\n</head>");
  }
  
  // 2. Inject HTML right before </body>
  const htmlInjection = "\\n<!-- BORLABS CLONE START -->\\n" + html + "\\n<!-- BORLABS CLONE END -->\\n</body>";
  content = content.replace('</body>', htmlInjection);
  
  // 3. Inject JS right before </body>
  const jsInjection = "\\n<!-- BORLABS CLONE START -->\\n<script>\\n" + js + "\\n</script>\\n<!-- BORLABS CLONE END -->\\n";
  content = content.replace('</body>', jsInjection + "\\n</body>");
  
  fs.writeFileSync(filename, content);
  console.log("Successfully injected Pro version into " + filename);
}

['hd_engineering_single_page.html', 'extracted.html'].forEach(injectIntoFile);
