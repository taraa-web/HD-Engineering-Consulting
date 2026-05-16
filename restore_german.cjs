const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, 'src', 'App.jsx');
let appContent = fs.readFileSync(appPath, 'utf8');

const replacements = [
    // Header & Nav
    ['"Services"', '"Leistungen"'],
    ['"Projects"', '"Karriere"'], // they originally had "Karriere"
    ['"Contact"', '"Kontakt"'],
    ['"Get Consultation"', '"Anfrage starten"'],
    ['"Consultation starten"', '"Anfrage starten"'],
    
    // Hero
    ['HD ENGINEERING & CONSULTING', 'Verantwortung entscheidet über Projekterfolg'],
    ['<span className="text-accent">ENGINEERING</span> VISION.<br className="hidden md:block" />BUILDING EXCELLENCE.', '<span className="text-accent">IHR PARTNER</span> FÜR<br className="hidden md:block" />REAL ESTATE &amp; CONSTRUCTION'],
    ['Delivering innovative engineering, consulting, construction supervision and infrastructure solutions with precision, reliability and modern expertise.', 'Wir strukturieren Komplexität, übernehmen Verantwortung und führen Ingenieur- und Beratungsprojekte verlässlich zum Ziel — auf Augenhöhe mit Bauherren, Investoren und Planern.'],
    
    // Hero Features
    ['Structural Engineering', 'Wirtschaftlichkeit'],
    ['Designing safe, efficient and modern structural systems for commercial and residential developments.', 'Wir denken Projekte wirtschaftlich — von der ersten Kostenschätzung bis zur Schlussrechnung. Klare Budgets, saubere Steuerung.'],
    ['Project Supervision', 'Transparenz'],
    ['Professional site supervision ensuring quality, safety and timeline compliance.', 'Nachvollziehbare Entscheidungen statt Blackbox. Zahlen, Termine und Risiken sind jederzeit belastbar dokumentiert.'],
    ['Infrastructure Consulting', 'Verlässlichkeit'],
    ['Planning and consulting services for roads, utilities and urban infrastructure projects.', 'Zusagen werden eingehalten. Wir übernehmen Verantwortung für Termine, Qualität und den Gesamterfolg Ihres Projekts.'],
    ['Project Management', 'Qualität'],
    ['Complete coordination and management from planning to execution.', 'Wir liefern Ergebnisse, die Bestand haben — technisch sauber, nutzungsgerecht und langfristig werthaltig.'],
    
    // About
    ['<span className="text-accent">PROFESSIONAL</span> ENGINEERING &amp; CONSULTING SOLUTIONS', '<span className="text-accent">HERZLICH WILLKOMMEN</span> BEI HD REAL ESTATE &amp; CONSTRUCTION'],
    ['HD <span className="text-accent">ENGINEERING</span>', 'HD <span className="text-accent">GROUP</span>'],
    ['HD Engineering &amp; Consulting provides high-quality engineering, project management and consulting services for residential, commercial and infrastructure developments.', 'HD Real Estate &amp; Construction GmbH ist ein Unternehmen der HD Group.'],
    ['<p>Our team combines technical expertise, strategic planning and innovative solutions to deliver projects with efficiency, safety and long-term value. We specialize in Structural Engineering, Project Supervision, Construction Consulting, Infrastructure Planning, Technical Documentation, and Site Management.</p>', '<p>HD Real Estate &amp; Construction steht für eine klare Haltung im Umgang mit Bau- und Immobilienprojekten: Verantwortung übernehmen, vorausschauend handeln und konsequent Qualität liefern.</p><p>Projekte werden nicht nur abgewickelt, sondern ganzheitlich gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen, Risiken frühzeitig zu erkennen und Entscheidungen auf einer belastbaren Grundlage zu treffen. Wirtschaftlichkeit, Transparenz und Verlässlichkeit bilden dabei die Basis jeder Zusammenarbeit.</p><p>HD Real Estate &amp; Construction versteht sich als Partner auf Augenhöhe, der Komplexität strukturiert, Interessen zusammenführt und Projekte sicher zum Ziel führt.</p>'],
    
    // Services
    ['<span className="text-accent">OUR CORE</span><br />ENGINEERING<br />SERVICES', '<span className="text-accent">SECHS SÄULEN</span><br />FÜR IHREN<br />PROJEKTERFOLG'],
    ['We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions.', 'Von der strategischen Projektentwicklung bis zur operativen Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander und schaffen die Grundlage für belastbare Ergebnisse.'],
    
    ['Construction Supervision', 'Bauausführung &amp; Realisierung'],
    ['Professional site supervision ensuring quality, safety and timeline compliance.', 'Planung wird Wirklichkeit — verlässlich, koordiniert, bis zur schlüsselfertigen Übergabe.'],
    
    ['Infrastructure Consulting', 'Controlling &amp; Consulting'],
    ['Planning and consulting services for roads, utilities and urban infrastructure projects.', 'Transparenz als Grundlage guter Entscheidungen. Analyse, Steuerung, Optimierung.'],
    
    ['Project Management', 'Construction Management'],
    ['Complete coordination and management from planning to execution.', 'Präsenz auf der Baustelle, klare Kommunikation, kompromisslose Qualitätssicherung.'],
    
    ['Architectural Coordination', 'Real Estate Services'],
    ['Integrating engineering precision with architectural vision.', 'Immobilien im Kontext von Markt, Nutzung und Zukunftsfähigkeit bewerten und entwickeln.'],
    
    ['Technical Documentation', 'Kostensteuerung'],
    ['Detailed technical reports, drawings and engineering documentation.', 'Kostenbewusstsein als Haltung — klar, verbindlich, über alle Projektphasen hinweg.'],
    
    ['Core Expertise', 'Strategischer Kern'],
    ['Engineering, consulting and project management from a single source.', 'Bau, Immobilien und Projektsteuerung aus einer Hand.'],
    ['Ingenieurwesen, Beratung und Project Management aus einer Hand.', 'Bau, Immobilien und Projektsteuerung aus einer Hand.'],
    ['View All Services', 'Alle Leistungen ansehen'],
    ['Discuss Project', 'Projekt besprechen'],
    
    // Why Choose Us
    ['<span className="text-accent">WHY CLIENTS TRUST</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING</span>', '<span className="text-accent">DIE PROJEKTE,</span> DIE ANDERE</span><span className="block lg:whitespace-nowrap">ÜBERFORDERN — STRUKTURIEREN WIR.</span>'],
    ['We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions for every client.', 'Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten Projekte, die andere zögern lassen, und bringen Klarheit dorthin, wo zuvor Unsicherheit war.'],
    ['Our features include an Experienced Engineering Team, Innovative Technical Solutions, Transparent Communication, Sustainable Engineering Practices, Timely Project Delivery, and Advanced Technology Integration.', 'Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert. Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss gelingen.'],
    
    // Not an option
    ['<span className="text-accent">ENGINEERING</span> PRECISION IS NOT AN OPTION. <br />IT IS OUR STANDARD.', '<span className="text-accent">VERANTWORTUNG</span> IST KEINE OPTION. <br />SIE IST STANDARD.'],
    ['Technology and planning are only as good as the people behind them.', 'Technik und Planung sind nur so gut wie die Menschen dahinter.'],
    ['At HD Engineering &amp; Consulting, we combine experience, technical expertise, and a deep understanding of construction processes to create long-lasting solutions.', 'Bei HD Real Estate &amp; Construction verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Bau- und Immobilienprozesse zu Lösungen, die dauerhaft funktionieren und wirtschaftlich tragen.'],
    ['Every project represents our commitment: uncompromising quality and responsibility until final delivery.', 'Jedes Projekt steht für unser Versprechen: Qualität ohne Kompromisse — und Verantwortung bis zur letzten Übergabe.'],
    
    // Projects
    ['<span className="text-accent">FEATURED</span> PROJECTS:</span><span className="block">ENGINEERING EXCELLENCE.</span>', '<span className="text-accent">VERANTWORTUNG</span> IN AKTION:</span><span className="block">ECHTE PROJEKTE. ECHTE ERGEBNISSE.</span>'],
    ['Commercial engineering and structural supervision.', 'Gewerblicher Ingenieurbau und Bauüberwachung.'],
    ['High-rise residential infrastructure and consulting.', 'Hochhaus-Wohninfrastruktur und Beratung.'],
    ['Skyline Business Center', 'HD Referenz'],
    ['Urban Residential Towers', 'Stadtwohntürme'],
    
    // Stats
    ['Our Impact', 'Aktuelle Projektkapazität'],
    ['Completed', 'Abgeschlossen'],
    ['Projects Completed', 'Kapazität · Projektmanagement & Steuerung'],
    ['Years Experience', 'Kapazität · Bauausführung & Construction Management'],
    
    // Workflow
    ['<span className="text-accent">HOW WE</span> WORK TOGETHER?', '<span className="text-accent">WIE LÄUFT</span> EINE ZUSAMMENARBEIT AB?'],
    ['Consultation', 'Anfrage'],
    ['Send us your project documents, plans or a brief description via email or our contact form.', 'Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder über unser Kontaktformular.'],
    ['Initial Meeting &amp; Proposal', 'Erstgespräch &amp; Angebot'],
    ['We typically respond within 24 hours to schedule a structured meeting and provide an initial, transparent proposal.', 'In der Regel melden wir uns innerhalb von 24 Stunden mit einem strukturierten Gesprächstermin und einem ersten, nachvollziehbaren Angebot.'],
    ['Project Execution', 'Projektdurchführung'],
    ['Once approved, we structure your project from the start—with clear roles, deadlines, and decision paths.', 'Auftrag angenommen? Dann strukturieren wir Ihr Projekt von Beginn an — mit klaren Rollen, Terminen und Entscheidungswegen.'],
    
    // Footer
    ['Engineering Vision. Building Excellence. Your partner for modern engineering solutions.', 'Verantwortung entscheidet über Projekterfolg. Ihr Partner für Immobilien und Bauwesen.'],
    ['Location', 'Firmenanschrift'],
    ['HD Engineering &amp; Consulting<br />Prishtinë, Kosovë', 'HD Real Estate &amp; Construction GmbH<br />Habermehlstraße 160<br />75172 Pforzheim'],
    ['+383 44 000 000', '07231 2809060'],
    ['info@hdengineering.com', 'info@hdrec.de'],
    ['© 2026 HD Engineering &amp; Consulting. All Rights Reserved.', '© 2026 HD Real Estate &amp; Construction GmbH. Alle Rechte vorbehalten.'],
    ['Imprint', 'Impressum'],
    ['Privacy Policy', 'Datenschutz'],
    ['"HD Engineering &amp; Consulting"', '"HD Real Estate &amp; Construction"'],
    ['HD Engineering &amp; Consulting', 'HD Real Estate &amp; Construction']
];

for (const [replace, search] of replacements) {
    appContent = appContent.split(replace).join(search);
}

// Revert images to exact Vercel URLs
appContent = appContent.replace(/\/images\/services_supervision\.png/g, 'https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fservice-bauausfuehrung.jpg&w=3840&q=75');
appContent = appContent.replace(/\/images\/about_team\.png/g, 'https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fwelcome-meeting.jpg&w=3840&q=75');
appContent = appContent.replace(/\/images\/projects_architecture\.png/g, 'https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fservice-real-estate.jpg&w=3840&q=75');

// Let's replace the srcSet and missing HD_logo.svg with the proper vercel images.
// Actually, it's easier to use a regex to restore the images from extracted.html, but that failed due to JSX syntax.
// We can just find the specific <img> and replace them with the Vercel URLs.

// Replace Logo 1 (HEK)
appContent = appContent.replace(/<img[^>]*src="\/HD_logo\.svg"[^>]*aria-label="HEK Logo"/g, '<img alt="HEK Logo" className="object-contain px-1" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} src="https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Flogo%2Fhek-logo.png&w=3840&q=75"');

// Replace Logo 2 (HD Group)
appContent = appContent.replace(/<img[^>]*src="\/HD_logo\.svg"[^>]*aria-label="HD Logo"/g, '<img alt="HD Group Logo" className="object-contain px-1" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} src="https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Flogo%2Fhd-group-logo.png&w=3840&q=75"');

// Replace all remaining HD_logo.svg with the main Vercel logo
appContent = appContent.replace(/src="\/HD_logo\.svg"/g, 'src="https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Flogo%2FHD_logo.png&w=3840&q=75"');
appContent = appContent.replace(/srcSet="\/HD_logo\.svg"/g, '');

// The portrait of the man in the "VERANTWORTUNG IST KEINE OPTION" section.
// It is inside a relative w-full max-w-[430px]
// Let's manually replace that image
const manImgRegex = /<img alt="Portrait eines Projektverantwortlichen[^>]*src="[^"]+" \/>/g;
appContent = appContent.replace(manImgRegex, '<img alt="Portrait eines Projektverantwortlichen" className="object-cover" style={{ position: "absolute", height: "100%", width: "100%", left: 0, top: 0, right: 0, bottom: 0, color: "transparent" }} src="https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fperson.png&w=3840&q=75" />');

// The logo overlay on the person
appContent = appContent.replace(/src="https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Flogo%2FHD_logo\.png&w=3840&q=75"[^>]*aria-label="HD Real Estate &amp; Consulting Logo"/g, 'src="https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fhd-logo-removebg.png&w=3840&q=75"');

// The 5 image grid in "DIE PROJEKTE DIE ANDERE ÜBERFORDERN" section
// Let's just blindly replace all occurrences of '/images/hero_engineering.png' with the Vercel images.
appContent = appContent.replace(/\/images\/hero_engineering\.png/g, 'https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fservice-kostensteuerung.jpg&w=3840&q=75');

// For the project slider images
appContent = appContent.replace(/\/images\/services_supervision\.png/g, 'https://hd-real-estate-construction.vercel.app/_next/image?url=%2Fimages%2Fservice-bauausfuehrung.jpg&w=3840&q=75');

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('German texts and Vercel images restored successfully.');
