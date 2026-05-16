const fs = require('fs');
const path = require('path');

// 1. Fix CSS
const themeCssPath = path.join(__dirname, 'theme.css');
const indexCssPath = path.join(__dirname, 'src', 'index.css');

let cssContent = fs.readFileSync(themeCssPath, 'utf8');

// Remove the lab() color supports block so it falls back to the hex values which we will update
cssContent = cssContent.replace(/@supports\s*\(\s*color\s*:\s*lab\(0%\s*0\s*0\)\s*\)\s*\{\s*:root\s*\{.*?\n?\s*\}\s*\}/g, '');
cssContent = cssContent.replace(/@supports\s*\(\s*color\s*:\s*lab\(0%\s*0\s*0\)\s*\)\s*\{\s*:root,:host\s*\{.*?\n?\s*\}\s*\}/g, '');

// I'll just forcefully replace all lab() @supports blocks to be safe
cssContent = cssContent.replace(/@supports\s*\(\s*color:lab\(0% 0 0\)\)\{.*?\n?\}\}\}/g, '}'); // for the first one
cssContent = cssContent.replace(/@supports\s*\(\s*color:lab\(0% 0 0\)\)\{.*?\n?\}/g, ''); // for the others

// Update CSS variables for colors
cssContent = cssContent.replace(/--primary:#012854/g, '--primary:#1B2A4A');
cssContent = cssContent.replace(/--accent:#00ade4/g, '--accent:#C9A84C');
cssContent = cssContent.replace(/--slate-panel:#29343f/g, '--slate-panel:#1B2A4A');
cssContent = cssContent.replace(/--footer:#162232/g, '--footer:#1B2A4A');

fs.writeFileSync(indexCssPath, cssContent, 'utf8');
console.log('CSS updated successfully.');

// 2. Run the replace script logic on App.jsx
const appPath = path.join(__dirname, 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const replacements = [
    // Header & Nav
    ['"Home"', '"Home"'],
    ['"Leistungen"', '"Services"'],
    ['"Karriere"', '"Projects"'],
    ['"Kontakt"', '"Contact"'],
    ['"Anfrage starten"', '"Get Consultation"'],
    
    // Hero
    ['Verantwortung entscheidet über Projekterfolg', 'HD ENGINEERING & CONSULTING'],
    ['<span className="text-accent">IHR PARTNER</span> FÜR<br className="hidden md:block" />REAL ESTATE &amp; CONSTRUCTION', '<span className="text-accent">ENGINEERING</span> VISION.<br className="hidden md:block" />BUILDING EXCELLENCE.'],
    ['<span className="text-accent">INGENIEUR-</span>VISION.<br className="hidden md:block" />EXZELLENZ IM BAU.', '<span className="text-accent">ENGINEERING</span> VISION.<br className="hidden md:block" />BUILDING EXCELLENCE.'],
    ['Wir strukturieren Komplexität, übernehmen Verantwortung und führen Ingenieur- und Beratungsprojekte verlässlich zum Ziel — auf Augenhöhe mit Bauherren, Investoren und Planern.', 'Delivering innovative engineering, consulting, construction supervision and infrastructure solutions with precision, reliability and modern expertise.'],
    ['Wir liefern innovative Ingenieur-, Beratungs-, Bauleitungs- und Infrastrukturlösungen mit Präzision, Zuverlässigkeit und moderner Expertise.', 'Delivering innovative engineering, consulting, construction supervision and infrastructure solutions with precision, reliability and modern expertise.'],
    
    // Hero Features
    ['Wirtschaftlichkeit', 'Structural Engineering'],
    ['Wir denken Projekte wirtschaftlich — von der ersten Kostenschätzung bis zur Schlussrechnung. Klare Budgets, saubere Steuerung.', 'Designing safe, efficient and modern structural systems for commercial and residential developments.'],
    ['Transparenz', 'Project Supervision'],
    ['Nachvollziehbare Entscheidungen statt Blackbox. Zahlen, Termine und Risiken sind jederzeit belastbar dokumentiert.', 'Professional site supervision ensuring quality, safety and timeline compliance.'],
    ['Verlässlichkeit', 'Infrastructure Consulting'],
    ['Zusagen werden eingehalten. Wir übernehmen Verantwortung für Termine, Qualität und den Gesamterfolg Ihres Projekts.', 'Planning and consulting services for roads, utilities and urban infrastructure projects.'],
    ['Qualität', 'Project Management'],
    ['Wir liefern Ergebnisse, die Bestand haben — technisch sauber, nutzungsgerecht und langfristig werthaltig.', 'Complete coordination and management from planning to execution.'],
    
    // About
    ['<span className="text-accent">HERZLICH WILLKOMMEN</span> BEI HD REAL ESTATE &amp; CONSTRUCTION', '<span className="text-accent">PROFESSIONAL</span> ENGINEERING &amp; CONSULTING SOLUTIONS'],
    ['<span className="text-accent">PROFESSIONELLE</span> INGENIEUR- &amp; BERATUNGSLÖSUNGEN', '<span className="text-accent">PROFESSIONAL</span> ENGINEERING &amp; CONSULTING SOLUTIONS'],
    ['HD <span className="text-accent">GROUP</span>', 'HD <span className="text-accent">ENGINEERING</span>'],
    ['HD Engineering &amp; Consulting bietet hochwertige Ingenieur-, Projektmanagement- und Beratungsdienstleistungen für Wohn-, Gewerbe- und Infrastrukturprojekte.', 'HD Engineering &amp; Consulting provides high-quality engineering, project management and consulting services for residential, commercial and infrastructure developments.'],
    ['<p>HD Engineering &amp; Consulting steht für eine klare Haltung im Umgang mit Ingenieur- und Beratungsprojekten: Verantwortung übernehmen, vorausschauend handeln und konsequent Qualität liefern.</p><p>Projekte werden nicht nur abgewickelt, sondern ganzheitlich gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen, Risiken frühzeitig zu erkennen und Entscheidungen auf einer belastbaren Grundlage zu treffen. Wirtschaftlichkeit, Transparenz und Verlässlichkeit bilden dabei die Basis jeder Zusammenarbeit.</p><p>HD Engineering &amp; Consulting versteht sich als Partner auf Augenhöhe, der Komplexität strukturiert, Interessen zusammenführt und Projekte sicher zum Ziel führt.</p>', '<p>Our team combines technical expertise, strategic planning and innovative solutions to deliver projects with efficiency, safety and long-term value. We specialize in Structural Engineering, Project Supervision, Construction Consulting, Infrastructure Planning, Technical Documentation, and Site Management.</p>'],
    ['<p>HD Engineering &amp; Consulting steht für eine klare Haltung im Umgang mit Ingenieur- und Beratungsprojekten: Verantwortung übernehmen, vorausschauend handeln und konsequent Projektmanagement liefern.</p><p>Projekte werden nicht nur abgewickelt, sondern ganzheitlich gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen, Risiken frühzeitig zu erkennen und Entscheidungen auf einer belastbaren Grundlage zu treffen. Tragwerksplanung, Bauüberwachung und Infrastrukturberatung bilden dabei die Basis jeder Zusammenarbeit.</p><p>HD Engineering &amp; Consulting versteht sich als Partner auf Augenhöhe, der Komplexität strukturiert, Interessen zusammenführt und Projekte sicher zum Ziel führt.</p>', '<p>Our team combines technical expertise, strategic planning and innovative solutions to deliver projects with efficiency, safety and long-term value. We specialize in Structural Engineering, Project Supervision, Construction Consulting, Infrastructure Planning, Technical Documentation, and Site Management.</p>'],

    // Services
    ['<span className="text-accent">SECHS SÄULEN</span><br />FÜR IHREN<br />PROJEKTERFOLG', '<span className="text-accent">OUR CORE</span><br />ENGINEERING<br />SERVICES'],
    ['<span className="text-accent">UNSERE</span><br />KERNDIENST-<br />LEISTUNGEN', '<span className="text-accent">OUR CORE</span><br />ENGINEERING<br />SERVICES'],
    ['Von der strategischen Projektentwicklung bis zur operativen Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander und schaffen die Grundlage für belastbare Ergebnisse.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions.'],
    ['Wir verbinden technische Präzision, moderne Ingenieurstandards und professionelle Projektabwicklung für zuverlässige und nachhaltige Lösungen.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions.'],
    
    ['Projektmanagement', 'Project Management'],
    ['Struktur schaffen, Entscheidungen treffen, Verantwortung übernehmen — für den Gesamterfolg.', 'Complete coordination and management from planning to execution.'],
    
    ['Bauausführung &amp; Realisierung', 'Construction Supervision'],
    ['Bauausführung & Realisierung', 'Construction Supervision'],
    ['Planung wird Wirklichkeit — verlässlich, koordiniert, bis zur schlüsselfertigen Übergabe.', 'Professional site supervision ensuring quality, safety and timeline compliance.'],
    
    ['Controlling &amp; Consulting', 'Infrastructure Consulting'],
    ['Controlling & Consulting', 'Infrastructure Consulting'],
    ['Transparenz als Grundlage guter Entscheidungen. Analyse, Steuerung, Optimierung.', 'Planning and consulting services for roads, utilities and urban infrastructure projects.'],
    
    ['Construction Management', 'Project Management'],
    ['Präsenz auf der Baustelle, klare Kommunikation, kompromisslose Qualitätssicherung.', 'Complete coordination and management from planning to execution.'],
    
    ['Real Estate Services', 'Architectural Coordination'],
    ['Immobilien im Kontext von Markt, Nutzung und Zukunftsfähigkeit bewerten und entwickeln.', 'Integrating engineering precision with architectural vision.'],
    
    ['Kostensteuerung', 'Technical Documentation'],
    ['Kostenbewusstsein als Haltung — klar, verbindlich, über alle Projektphasen hinweg.', 'Detailed technical reports, drawings and engineering documentation.'],

    ['Tragwerksplanung', 'Structural Engineering'],
    ['Entwurf sicherer, effizienter und moderner Tragwerke für Gewerbe- und Wohnbauprojekte.', 'Designing safe, efficient and modern structural systems for commercial and residential developments.'],
    ['Bauüberwachung', 'Construction Supervision'],
    ['Professionelle Bauüberwachung zur Sicherstellung von Qualität, Sicherheit und Termintreue.', 'Professional site supervision ensuring quality, safety and timeline compliance.'],
    ['Infrastrukturberatung', 'Infrastructure Consulting'],
    ['Planungs- und Beratungsdienstleistungen für Straßen, Versorgungsnetze und städtische Infrastrukturprojekte.', 'Planning and consulting services for roads, utilities and urban infrastructure projects.'],
    ['Architektonische Koordination', 'Architectural Coordination'],
    ['Integration von technischer Präzision mit architektonischer Vision.', 'Integrating engineering precision with architectural vision.'],
    ['Technische Dokumentation', 'Technical Documentation'],
    ['Detaillierte technische Berichte, Zeichnungen und technische Dokumentation.', 'Detailed technical reports, drawings and engineering documentation.'],
    
    ['Strategischer Kern', 'Core Expertise'],
    ['Ingenieurwesen, Beratung und Projektsteuerung aus einer Hand.', 'Engineering, consulting and project management from a single source.'],
    ['Unsere Expertise', 'Core Expertise'],
    ['Ingenieurwesen, Beratung und Projektmanagement aus einer Hand.', 'Engineering, consulting and project management from a single source.'],
    ['Alle Leistungen ansehen', 'View All Services'],
    ['Alle Leistungen entdecken', 'View All Services'],
    ['Projekt besprechen', 'Discuss Project'],
    
    // Why Choose Us
    ['<span className="text-accent">DIE PROJEKTE,</span> DIE ANDERE</span><span className="block lg:whitespace-nowrap">ÜBERFORDERN — STRUKTURIEREN WIR.</span>', '<span className="text-accent">WHY CLIENTS TRUST</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING</span>'],
    ['<span className="text-accent">WARUM KUNDEN</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING VERTRAUEN</span>', '<span className="text-accent">WHY CLIENTS TRUST</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING</span>'],
    ['Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten Projekte, die andere zögern lassen, und bringen Klarheit dorthin, wo zuvor Unsicherheit war.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions for every client.'],
    ['Wir verbinden technische Präzision, moderne Ingenieurstandards und professionelle Projektabwicklung, um für jeden Kunden zuverlässige und nachhaltige Lösungen zu liefern.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions for every client.'],
    ['Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert. Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss gelingen.', 'Our features include an Experienced Engineering Team, Innovative Technical Solutions, Transparent Communication, Sustainable Engineering Practices, Timely Project Delivery, and Advanced Technology Integration.'],
    ['Zu unseren Stärken zählen ein erfahrenes Ingenieurteam, innovative technische Lösungen, transparente Kommunikation, nachhaltige Ingenieurpraxis, termingerechte Projektabwicklung und modernste Technologieintegration.', 'Our features include an Experienced Engineering Team, Innovative Technical Solutions, Transparent Communication, Sustainable Engineering Practices, Timely Project Delivery, and Advanced Technology Integration.'],
    
    // Not an option
    ['<span className="text-accent">VERANTWORTUNG</span> IST KEINE OPTION. <br />SIE IST STANDARD.', '<span className="text-accent">ENGINEERING</span> PRECISION IS NOT AN OPTION. <br />IT IS OUR STANDARD.'],
    ['<span className="text-accent">INGENIEUR-</span>PRÄZISION IST KEINE OPTION. <br />SIE IST UNSER STANDARD.', '<span className="text-accent">ENGINEERING</span> PRECISION IS NOT AN OPTION. <br />IT IS OUR STANDARD.'],
    ['Technik und Planung sind nur so gut wie die Menschen dahinter.', 'Technology and planning are only as good as the people behind them.'],
    ['Bei HD Engineering &amp; Consulting verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Bau- und Immobilienprozesse zu Lösungen, die dauerhaft funktionieren und wirtschaftlich tragen.', 'At HD Engineering &amp; Consulting, we combine experience, technical expertise, and a deep understanding of construction processes to create long-lasting solutions.'],
    ['Bei HD Engineering &amp; Consulting verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Bauprozesse, um langlebige Lösungen zu schaffen.', 'At HD Engineering &amp; Consulting, we combine experience, technical expertise, and a deep understanding of construction processes to create long-lasting solutions.'],
    ['Jedes Projekt steht für unser Versprechen: Qualität ohne Kompromisse — und Verantwortung bis zur letzten Übergabe.', 'Every project represents our commitment: uncompromising quality and responsibility until final delivery.'],
    ['Jedes Projekt steht für unser Versprechen: Projektmanagement ohne Kompromisse — und Verantwortung bis zur letzten Übergabe.', 'Every project represents our commitment: uncompromising quality and responsibility until final delivery.'],
    
    // Projects
    ['<span className="text-accent">VERANTWORTUNG</span> IN AKTION:</span><span className="block">ECHTE PROJEKTE. ECHTE ERGEBNISSE.</span>', '<span className="text-accent">FEATURED</span> PROJECTS:</span><span className="block">ENGINEERING EXCELLENCE.</span>'],
    ['<span className="text-accent">AUSGEWÄHLTE</span> PROJEKTE:</span><span className="block">INGENIEUR-EXZELLENZ.</span>', '<span className="text-accent">FEATURED</span> PROJECTS:</span><span className="block">ENGINEERING EXCELLENCE.</span>'],
    ['Neubau · Büro- und Geschäftshaus', 'Commercial engineering and structural supervision.'],
    ['Gewerblicher Ingenieurbau und Bauüberwachung.', 'Commercial engineering and structural supervision.'],
    ['Schlüsselfertige Realisierung · Gewerbebau', 'High-rise residential infrastructure and consulting.'],
    ['Wohnhochhaus-Infrastruktur und Beratung.', 'High-rise residential infrastructure and consulting.'],
    ['HD Referenz', 'Skyline Business Center'],
    
    // Stats
    ['Aktuelle Projektkapazität', 'Our Impact'],
    ['Unser Einfluss', 'Our Impact'],
    ['Auslastung', 'Completed'],
    ['Abgeschlossen', 'Completed'],
    ['Kapazität · Projektmanagement &amp; Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung &amp; Construction Management', 'Years Experience'],
    ['Kapazität · Projektmanagement & Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung & Construction Management', 'Years Experience'],
    ['Kapazität · Tragwerksplanung &amp; Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung &amp; Projektmanagement', 'Years Experience'],
    ['Kapazität · Tragwerksplanung & Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung & Projektmanagement', 'Years Experience'],
    
    // Workflow
    ['<span className="text-accent">WIE LÄUFT</span> EINE ZUSAMMENARBEIT AB?', '<span className="text-accent">HOW WE</span> WORK TOGETHER?'],
    ['<span className="text-accent">WIE WIR</span> ZUSAMMENARBEITEN?', '<span className="text-accent">HOW WE</span> WORK TOGETHER?'],
    ['Anfrage', 'Consultation'],
    ['Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder über unser Kontaktformular.', 'Send us your project documents, plans or a brief description via email or our contact form.'],
    ['Senden Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder Kontaktformular.', 'Send us your project documents, plans or a brief description via email or our contact form.'],
    ['Erstgespräch &amp; Angebot', 'Initial Meeting &amp; Proposal'],
    ['In der Regel melden wir uns innerhalb von 24 Stunden mit einem strukturierten Gesprächstermin und einem ersten, nachvollziehbaren Angebot.', 'We typically respond within 24 hours to schedule a structured meeting and provide an initial, transparent proposal.'],
    ['In der Regel melden wir uns innerhalb von 24 Stunden, um ein strukturiertes Gespräch zu vereinbaren und ein transparentes Angebot zu unterbreiten.', 'We typically respond within 24 hours to schedule a structured meeting and provide an initial, transparent proposal.'],
    ['Wir übernehmen Verantwortung', 'Project Execution'],
    ['Projektdurchführung', 'Project Execution'],
    ['Auftrag angenommen? Dann strukturieren wir Ihr Projekt von Beginn an — mit klaren Rollen, Terminen und Entscheidungswegen.', 'Once approved, we structure your project from the start—with clear roles, deadlines, and decision paths.'],
    ['Nach Auftragserteilung strukturieren wir Ihr Projekt von Beginn an – mit klaren Rollen, Fristen und Entscheidungswegen.', 'Once approved, we structure your project from the start—with clear roles, deadlines, and decision paths.'],
    
    // Footer
    ['Verantwortung entscheidet über Projekterfolg. Ihr Partner für Ingenieurwesen und Beratung.', 'Engineering Vision. Building Excellence. Your partner for modern engineering solutions.'],
    ['HD ENGINEERING & CONSULTING. Ihr Partner für Ingenieurwesen und Beratung.', 'Engineering Vision. Building Excellence. Your partner for modern engineering solutions.'],
    ['Firmenanschrift', 'Location'],
    ['Standort', 'Location'],
    ['HD Engineering &amp; Consulting GmbH<br />Habermehlstraße 160<br />75172 Pforzheim', 'HD Engineering &amp; Consulting<br />Prishtinë, Kosovë'],
    ['07231 2809060', '+383 44 000 000'],
    ['info@hdrec.de', 'info@hdengineering.com'],
    ['© 2026 HD Engineering &amp; Consulting GmbH', '© 2026 HD Engineering &amp; Consulting. All Rights Reserved.'],
    ['© 2026 HD Engineering &amp; Consulting. Alle Rechte vorbehalten.', '© 2026 HD Engineering &amp; Consulting. All Rights Reserved.'],
    ['Impressum', 'Imprint'],
    ['Datenschutz', 'Privacy Policy']
];

for (const [search, replace] of replacements) {
    appContent = appContent.split(search).join(replace);
}

// Write it to src/App.jsx
const srcAppPath = path.join(__dirname, 'src', 'App.jsx');
fs.writeFileSync(srcAppPath, appContent, 'utf8');
console.log('App.jsx translated and copied to src/App.jsx successfully.');
