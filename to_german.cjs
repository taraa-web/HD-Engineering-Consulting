const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
    // Header & Nav
    ['"Services"', '"Leistungen"'],
    ['"Projects"', '"Projekte"'],
    ['"Contact"', '"Kontakt"'],
    ['"Get Consultation"', '"Anfrage starten"'],
    
    // Hero
    ['<span className="text-accent">ENGINEERING</span> VISION.<br className="hidden md:block" />BUILDING EXCELLENCE.', '<span className="text-accent">INGENIEUR-</span>VISION.<br className="hidden md:block" />EXZELLENZ IM BAU.'],
    ['Delivering innovative engineering, consulting, construction supervision and infrastructure solutions with precision, reliability and modern expertise.', 'Wir liefern innovative Ingenieur-, Beratungs-, Bauleitungs- und Infrastrukturlösungen mit Präzision, Zuverlässigkeit und moderner Expertise.'],
    
    // Hero Features
    ['Structural Engineering', 'Tragwerksplanung'],
    ['Designing safe, efficient and modern structural systems for commercial and residential developments.', 'Entwurf sicherer, effizienter und moderner Tragwerke für Gewerbe- und Wohnbauprojekte.'],
    ['Project Supervision', 'Bauüberwachung'],
    ['Professional site supervision ensuring quality, safety and timeline compliance.', 'Professionelle Bauüberwachung zur Sicherstellung von Qualität, Sicherheit und Termintreue.'],
    ['Infrastructure Consulting', 'Infrastrukturberatung'],
    ['Planning and consulting services for roads, utilities and urban infrastructure projects.', 'Planungs- und Beratungsdienstleistungen für Straßen, Versorgungsnetze und städtische Infrastrukturprojekte.'],
    ['Project Management', 'Projektmanagement'],
    ['Complete coordination and management from planning to execution.', 'Umfassende Koordination und Steuerung von der Planung bis zur Ausführung.'],
    
    // About
    ['<span className="text-accent">PROFESSIONAL</span> ENGINEERING &amp; CONSULTING SOLUTIONS', '<span className="text-accent">PROFESSIONELLE</span> INGENIEUR- &amp; BERATUNGSLÖSUNGEN'],
    ['HD Engineering &amp; Consulting provides high-quality engineering, project management and consulting services for residential, commercial and infrastructure developments.', 'HD Engineering &amp; Consulting bietet hochwertige Ingenieur-, Projektmanagement- und Beratungsdienstleistungen für Wohn-, Gewerbe- und Infrastrukturprojekte.'],
    ['<p>Our team combines technical expertise, strategic planning and innovative solutions to deliver projects with efficiency, safety and long-term value. We specialize in Structural Engineering, Project Supervision, Construction Consulting, Infrastructure Planning, Technical Documentation, and Site Management.</p>', '<p>Unser Team kombiniert technische Expertise, strategische Planung und innovative Lösungen, um Projekte effizient, sicher und mit langfristigem Wert zu realisieren. Wir sind spezialisiert auf Tragwerksplanung, Bauüberwachung, Bauberatung, Infrastrukturplanung, technische Dokumentation und Bauleitung.</p>'],

    // Services
    ['<span className="text-accent">OUR CORE</span><br />ENGINEERING<br />SERVICES', '<span className="text-accent">UNSERE</span><br />KERNDIENST-<br />LEISTUNGEN'],
    ['We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions.', 'Wir verbinden technische Präzision, moderne Ingenieurstandards und professionelle Projektabwicklung für zuverlässige und nachhaltige Lösungen.'],
    
    ['Construction Supervision', 'Bauüberwachung'],
    ['Architectural Coordination', 'Architektonische Koordination'],
    ['Integrating engineering precision with architectural vision.', 'Integration von technischer Präzision mit architektonischer Vision.'],
    
    ['Technical Documentation', 'Technische Dokumentation'],
    ['Detailed technical reports, drawings and engineering documentation.', 'Detaillierte technische Berichte, Zeichnungen und technische Dokumentation.'],
    
    ['Core Expertise', 'Unsere Expertise'],
    ['Engineering, consulting and project management from a single source.', 'Ingenieurwesen, Beratung und Projektmanagement aus einer Hand.'],
    ['View All Services', 'Alle Leistungen ansehen'],
    ['Discuss Project', 'Projekt besprechen'],
    
    // Why Choose Us
    ['<span className="text-accent">WHY CLIENTS TRUST</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING</span>', '<span className="text-accent">WARUM KUNDEN</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING VERTRAUEN</span>'],
    ['We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions for every client.', 'Wir verbinden technische Präzision, moderne Ingenieurstandards und professionelle Projektabwicklung, um für jeden Kunden zuverlässige und nachhaltige Lösungen zu liefern.'],
    ['Our features include an Experienced Engineering Team, Innovative Technical Solutions, Transparent Communication, Sustainable Engineering Practices, Timely Project Delivery, and Advanced Technology Integration.', 'Zu unseren Stärken zählen ein erfahrenes Ingenieurteam, innovative technische Lösungen, transparente Kommunikation, nachhaltige Ingenieurpraxis, termingerechte Projektabwicklung und modernste Technologieintegration.'],
    
    // Not an option
    ['<span className="text-accent">ENGINEERING</span> PRECISION IS NOT AN OPTION. <br />IT IS OUR STANDARD.', '<span className="text-accent">INGENIEUR-</span>PRÄZISION IST KEINE OPTION. <br />SIE IST UNSER STANDARD.'],
    ['Technology and planning are only as good as the people behind them.', 'Technik und Planung sind nur so gut wie die Menschen dahinter.'],
    ['At HD Engineering &amp; Consulting, we combine experience, technical expertise, and a deep understanding of construction processes to create long-lasting solutions.', 'Bei HD Engineering &amp; Consulting verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Bauprozesse, um langlebige Lösungen zu schaffen.'],
    ['Every project represents our commitment: uncompromising quality and responsibility until final delivery.', 'Jedes Projekt steht für unser Versprechen: kompromisslose Qualität und Verantwortung bis zur endgültigen Übergabe.'],
    
    // Projects
    ['<span className="text-accent">FEATURED</span> PROJECTS:</span><span className="block">ENGINEERING EXCELLENCE.</span>', '<span className="text-accent">AUSGEWÄHLTE</span> PROJEKTE:</span><span className="block">INGENIEUR-EXZELLENZ.</span>'],
    ['Commercial engineering and structural supervision.', 'Gewerblicher Ingenieurbau und Bauüberwachung.'],
    ['High-rise residential infrastructure and consulting.', 'Wohnhochhaus-Infrastruktur und Beratung.'],
    
    // Stats
    ['Our Impact', 'Unser Einfluss'],
    ['Completed', 'Abgeschlossen'],
    ['Projects Completed', 'Abgeschlossene Projekte'],
    ['Years Experience', 'Jahre Erfahrung'],
    
    // Workflow
    ['<span className="text-accent">HOW WE</span> WORK TOGETHER?', '<span className="text-accent">WIE WIR</span> ZUSAMMENARBEITEN?'],
    ['Consultation', 'Anfrage'],
    ['Send us your project documents, plans or a brief description via email or our contact form.', 'Senden Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder Kontaktformular.'],
    ['Initial Meeting &amp; Proposal', 'Erstgespräch &amp; Angebot'],
    ['We typically respond within 24 hours to schedule a structured meeting and provide an initial, transparent proposal.', 'In der Regel melden wir uns innerhalb von 24 Stunden, um ein strukturiertes Gespräch zu vereinbaren und ein transparentes Angebot zu unterbreiten.'],
    ['Project Execution', 'Projektdurchführung'],
    ['Once approved, we structure your project from the start—with clear roles, deadlines, and decision paths.', 'Nach Auftragserteilung strukturieren wir Ihr Projekt von Beginn an – mit klaren Rollen, Fristen und Entscheidungswegen.'],
    
    // Footer
    ['Engineering Vision. Building Excellence. Your partner for modern engineering solutions.', 'Ingenieurvision. Exzellenz im Bauwesen. Ihr Partner für moderne Ingenieurlösungen.'],
    ['Location', 'Standort'],
    ['All Rights Reserved.', 'Alle Rechte vorbehalten.'],
    ['Imprint', 'Impressum'],
    ['Privacy Policy', 'Datenschutz']
];

for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translated to German!');
