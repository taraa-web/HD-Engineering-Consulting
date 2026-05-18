const fs = require('fs');

const css = `
/* Borlabs Cookie Consent 100% Pixel-Perfect Clone */
.bc-modal-overlay {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex; justify-content: center; align-items: center;
  z-index: 100000;
  font-family: Inter, system-ui, -apple-system, sans-serif;
}
.bc-modal {
  background-color: #ffffff;
  border-radius: 16px;
  width: 90%; max-width: 650px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  display: flex; flex-direction: column; overflow: hidden;
  max-height: 90vh;
  position: relative;
}

/* Fingerprint Button */
.bc-fingerprint {
  position: fixed; bottom: 24px; left: 24px;
  width: 56px; height: 56px; border-radius: 50%;
  background-color: #1f6fe5;
  display: flex; align-items: center; justify-content: center;
  z-index: 99999; cursor: pointer;
  box-shadow: 0 14px 30px -14px rgba(31, 111, 229, 0.8);
  transition: all 0.2s ease-in-out;
}
.bc-fingerprint:hover { transform: scale(1.05); background-color: #195fca; }
.bc-fingerprint svg { width: 32px; height: 32px; fill: white; }

/* Header */
.bc-header {
  padding: 24px 32px 16px 32px;
  display: flex; align-items: center; gap: 12px;
  position: relative;
}
.bc-header-icon {
  width: 24px; height: 24px; color: #1f6fe5;
}
.bc-header h2 {
  font-size: 22px; font-weight: 700; color: #111827; margin: 0;
}
.bc-close {
  position: absolute; top: 16px; right: 16px;
  width: 32px; height: 32px; border-radius: 50%;
  background: transparent; border: none; font-size: 20px; color: #64748b;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  transition: all 0.2s;
}
.bc-close:hover { background-color: #f1f5f9; color: #334155; }

/* Body Area */
.bc-body {
  padding: 0 32px 24px 32px;
  overflow-y: auto;
}
.bc-text {
  font-size: 14px; font-weight: 400; color: #374151; line-height: 1.6;
  margin: 0 0 16px 0;
}
.bc-text a {
  color: #1f6fe5; font-weight: 600; text-decoration: none;
}
.bc-text a:hover { text-decoration: none; }

/* Main Stacked Buttons */
.bc-buttons-stack {
  display: flex; flex-direction: column; gap: 10px; margin-top: 24px;
}
.bc-btn-block {
  width: 100%; padding: 12px 16px; border-radius: 8px;
  font-size: 14px; font-weight: 600; text-align: center;
  border: none; cursor: pointer; transition: all 0.2s;
  background-color: #1f6fe5; color: #ffffff;
}
.bc-btn-block:hover { background-color: #195fca; }

/* Detailed View Tabs */
.bc-tabs-row {
  display: flex; border-bottom: 2px solid transparent; margin-bottom: 16px;
  overflow-x: auto;
}
.bc-tab-btn {
  min-width: 160px; padding: 12px 20px; font-size: 14px; font-weight: 600;
  border: none; background: transparent; cursor: pointer; color: #475569;
  border-bottom: 2px solid transparent;
}
.bc-tab-btn.active {
  background-color: #2f67db; color: #ffffff; border-bottom-color: #2f67db;
}
.bc-tab-btn:not(.active):hover { background-color: #f8fafc; }

/* Quick Actions */
.bc-quick-actions {
  display: flex; justify-content: flex-end; gap: 8px; margin-bottom: 16px;
}
.bc-btn-dark {
  background-color: #0f172a; color: #ffffff; padding: 8px 16px;
  border-radius: 6px; font-size: 13px; font-weight: 600; border: none; cursor: pointer;
}
.bc-btn-dark:hover { background-color: #000000; }

/* Cards */
.bc-card {
  background-color: #f8fafc; border: 1px solid #e2e8f0;
  border-radius: 8px; padding: 16px 20px; margin-bottom: 12px;
}
.bc-card-header {
  display: flex; align-items: center; gap: 12px; margin-bottom: 8px;
}
.bc-card-title { font-size: 15px; font-weight: 700; color: #0f172a; }
.bc-card-badge {
  background-color: #dcfce7; color: #166534; font-size: 12px; font-weight: 600;
  padding: 2px 10px; border-radius: 9999px; margin-left: auto;
}

/* Switches inside cards */
.bc-switch {
  position: relative; display: inline-block; width: 36px; height: 20px;
}
.bc-switch input { opacity: 0; width: 0; height: 0; }
.bc-slider {
  position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0;
  background-color: #cbd5e1; transition: .3s; border-radius: 20px;
}
.bc-slider:before {
  position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px;
  background-color: white; transition: .3s; border-radius: 50%;
}
.bc-switch input:checked + .bc-slider { background-color: #10b981; }
.bc-switch input:checked + .bc-slider:before { transform: translateX(16px); }
.bc-switch input:disabled + .bc-slider { opacity: 0.6; cursor: not-allowed; }

/* Footer Inline Buttons */
.bc-inline-buttons {
  display: flex; justify-content: space-between; gap: 12px; margin-top: 24px;
}
.bc-btn-inline {
  flex: 1; padding: 12px 16px; border-radius: 8px; font-size: 14px; font-weight: 600;
  background-color: #2f67db; color: #ffffff; border: none; cursor: pointer; text-align: center;
}
.bc-btn-inline:hover { background-color: #1d4ed8; }

/* Modal Footer Base */
.bc-footer {
  background-color: #f8fafc; padding: 12px 24px;
  border-top: 1px solid #e2e8f0;
  display: flex; justify-content: center; align-items: center; gap: 8px;
  font-size: 12px; color: #6b7280;
}

.bc-hidden { display: none !important; }
`;

const html = `
<div id="bc-fingerprint" class="bc-fingerprint bc-hidden" onclick="bcOpen()">
  <!-- Borlabs Fingerprint Icon -->
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.81 4.47c-.08 0-.16-.02-.23-.06C15.66 3.42 14 3 12.01 3c-1.98 0-3.86.47-5.57 1.41-.24.13-.54.04-.68-.2-.13-.24-.04-.55.2-.68C7.84 2.52 9.86 2 12.01 2c2.13 0 3.99.47 6.03 1.52.25.13.34.43.21.67-.09.18-.26.28-.44.28zM3.5 9.72c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.99-1.4 2.25-2.5 3.75-3.27C9.98 4.04 10.89 3.8 12 3.8c1.46 0 3.56.59 5.35 2.03.21.17.25.48.08.7-.17.21-.48.25-.7.08-1.56-1.25-3.37-1.81-4.73-1.81-1.01 0-1.82.22-4.63 1.63-1.33.68-2.45 1.65-3.32 2.89-.14.19-.35.29-.55.29zM2.5 15c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7C3.12 12.59 4.63 11 6.8 10.12c2.02-.82 4.13-1.07 6.31-.76 1.74.24 3.32 1.01 4.51 2.2.2.2.19.51-.01.71-.2.2-.51.19-.71-.01-1.04-1.04-2.41-1.71-3.92-1.92-1.9-.27-3.76-.04-5.54.68-1.9.77-3.21 2.14-4.04 3.33-.14.21-.36.31-.57.31zM1.8 19.3c-.05 0-.1-.01-.15-.02-.27-.08-.43-.36-.35-.63.29-1 .73-1.9 1.28-2.67.62-.87 1.4-1.63 2.3-2.22C7.3 12.16 10.3 11.5 13.5 11.83c1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.49.69-.88 1.48-1.13 2.37-.07.25-.29.42-.55.42zM5.5 22c-.1 0-.2-.03-.29-.09-.23-.16-.28-.47-.12-.7.62-.87 1.4-1.63 2.3-2.22 2.41-1.57 5.41-2.23 8.61-1.9 1.6.17 3.09.77 4.3 1.73.22.17.26.48.09.7-.17.22-.48.26-.7.09-1.05-.84-2.35-1.36-3.75-1.5-2.81-.3-5.45.29-7.66 1.69-.8.51-1.48 1.18-2.02 1.95-.14.21-.36.31-.57.31z" />
  </svg>
</div>

<div id="bc-modal-overlay" class="bc-modal-overlay bc-hidden">
  <div class="bc-modal">
    <div class="bc-header">
      <svg class="bc-header-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <path d="M9 12l2 2 4-4"></path>
      </svg>
      <h2>Datenschutz-Präferenz</h2>
      <button class="bc-close" onclick="bcClose()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    </div>
    
    <div class="bc-body" id="bc-body-scroll">
      <!-- INITIAL VIEW (Screenshot 1) -->
      <div id="bc-view-initial">
        <p class="bc-text">Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.</p>
        <p class="bc-text">Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer <a href="#">Datenschutzerklärung</a>.</p>
        <p class="bc-text">Sie können Ihre Auswahl jederzeit unter Einstellungen widerrufen oder anpassen.</p>
        
        <div class="bc-buttons-stack">
          <button class="bc-btn-block" onclick="bcAccept('custom')">Einwilligung speichern</button>
          <button class="bc-btn-block" onclick="bcAccept('all')">Ich akzeptiere alle</button>
          <button class="bc-btn-block" onclick="bcAccept('essential')">Nur essenzielle Cookies akzeptieren</button>
          <button class="bc-btn-block" onclick="bcShowDetails()">Individuelle Datenschutz-Präferenzen</button>
        </div>
      </div>
      
      <!-- DETAILED VIEW (Screenshot 3) -->
      <div id="bc-view-details" class="bc-hidden">
        <p class="bc-text" style="color: #4b5563;">Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung für ganze Kategorien geben oder sich weitere Informationen anzeigen lassen.</p>
        
        <div class="bc-tabs-row">
          <button class="bc-tab-btn active">Service-Gruppen</button>
          <button class="bc-tab-btn">Services</button>
          <button class="bc-tab-btn">Provider</button>
          <button class="bc-tab-btn">Einwilligung-Historie</button>
        </div>
        
        <div class="bc-quick-actions">
          <button class="bc-btn-dark" onclick="bcSelectAll(true)">Alle auswählen</button>
          <button class="bc-btn-dark" onclick="bcSelectAll(false)">Alle abwählen</button>
        </div>
        
        <div class="bc-card">
          <div class="bc-card-header">
             <label class="bc-switch">
                <input type="checkbox" checked disabled>
                <span class="bc-slider"></span>
             </label>
             <span class="bc-card-title">Essenziell</span>
             <span class="bc-card-badge">Aktiv</span>
          </div>
          <p class="bc-text" style="font-size: 13px; color: #475569; margin: 0;">Essenzielle Services ermöglichen grundlegende Funktionen und sind für die einwandfreie Funktion der Website zwingend erforderlich.</p>
        </div>
        
        <div class="bc-card">
          <div class="bc-card-header">
             <label class="bc-switch">
                <input type="checkbox" id="bc-marketing-checkbox">
                <span class="bc-slider"></span>
             </label>
             <span class="bc-card-title">Marketing</span>
          </div>
          <p class="bc-text" style="font-size: 13px; color: #475569; margin: 0;">Marketing-Cookies werden von Drittanbietern oder Publishern verwendet, um personalisierte Werbung anzuzeigen. Sie tun dies, indem sie Besucher über Websites hinweg verfolgen.</p>
        </div>
        
        <div class="bc-inline-buttons">
          <button class="bc-btn-inline" onclick="bcSave()">Speichern</button>
          <button class="bc-btn-inline" onclick="bcAccept('all')">Alle akzeptieren</button>
          <button class="bc-btn-inline" onclick="bcAccept('essential')">Nur essenzielle Cookies akzeptieren</button>
        </div>
      </div>
      
    </div>
    
    <div class="bc-footer">
      <span>Präferenzen |</span>
      <span style="display:flex; align-items:center; gap: 4px;">
        ⚙️ Borlabs Cookie
      </span>
    </div>
  </div>
</div>
`;

const js = `
function bcOpen() {
  document.getElementById('bc-modal-overlay').classList.remove('bc-hidden');
  document.getElementById('bc-fingerprint').classList.add('bc-hidden');
  
  // Always open in initial view
  document.getElementById('bc-view-initial').classList.remove('bc-hidden');
  document.getElementById('bc-view-details').classList.add('bc-hidden');
}

function bcClose() {
  document.getElementById('bc-modal-overlay').classList.add('bc-hidden');
  document.getElementById('bc-fingerprint').classList.remove('bc-hidden');
}

function bcAccept(type) {
  localStorage.setItem('cookieConsent', type);
  if(type === 'all') {
    document.getElementById('bc-marketing-checkbox').checked = true;
  } else if (type === 'essential') {
    document.getElementById('bc-marketing-checkbox').checked = false;
  }
  bcClose();
}

function bcSave() {
  const marketing = document.getElementById('bc-marketing-checkbox').checked;
  localStorage.setItem('cookieConsent', marketing ? 'all' : 'essential');
  bcClose();
}

function bcShowDetails() {
  document.getElementById('bc-view-initial').classList.add('bc-hidden');
  document.getElementById('bc-view-details').classList.remove('bc-hidden');
}

function bcSelectAll(val) {
  document.getElementById('bc-marketing-checkbox').checked = val;
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
  console.log("Successfully injected Pixel-Perfect version into " + filename);
}

['hd_engineering_single_page.html', 'extracted.html'].forEach(injectIntoFile);
