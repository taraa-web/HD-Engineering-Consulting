const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'App.jsx');
let content = fs.readFileSync(filePath, 'utf8');

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
    ['Wir strukturieren Komplexität, übernehmen Verantwortung und führen Ingenieur- und Beratungsprojekte verlässlich zum Ziel — auf Augenhöhe mit Bauherren, Investoren und Planern.', 'Delivering innovative engineering, consulting, construction supervision and infrastructure solutions with precision, reliability and modern expertise.'],
    
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
    ['HD <span className="text-accent">GROUP</span>', 'HD <span className="text-accent">ENGINEERING</span>'],
    ['HD Engineering &amp; Consulting GmbH ist ein Unternehmen der HD Group.', 'HD Engineering &amp; Consulting provides high-quality engineering, project management and consulting services for residential, commercial and infrastructure developments.'],
    ['<p>HD Engineering &amp; Consulting steht für eine klare Haltung im Umgang mit Ingenieur- und Beratungsprojekten: Verantwortung übernehmen, vorausschauend handeln und konsequent Qualität liefern.</p><p>Projekte werden nicht nur abgewickelt, sondern ganzheitlich gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen, Risiken frühzeitig zu erkennen und Entscheidungen auf einer belastbaren Grundlage zu treffen. Wirtschaftlichkeit, Transparenz und Verlässlichkeit bilden dabei die Basis jeder Zusammenarbeit.</p><p>HD Engineering &amp; Consulting versteht sich als Partner auf Augenhöhe, der Komplexität strukturiert, Interessen zusammenführt und Projekte sicher zum Ziel führt.</p>', '<p>Our team combines technical expertise, strategic planning and innovative solutions to deliver projects with efficiency, safety and long-term value. We specialize in Structural Engineering, Project Supervision, Construction Consulting, Infrastructure Planning, Technical Documentation, and Site Management.</p>'],

    // Services
    ['<span className="text-accent">SECHS SÄULEN</span><br />FÜR IHREN<br />PROJEKTERFOLG', '<span className="text-accent">OUR CORE</span><br />ENGINEERING<br />SERVICES'],
    ['Von der strategischen Projektentwicklung bis zur operativen Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander und schaffen die Grundlage für belastbare Ergebnisse.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions.'],
    
    ['Projektmanagement', 'Structural Engineering'],
    ['Struktur schaffen, Entscheidungen treffen, Verantwortung übernehmen — für den Gesamterfolg.', 'Designing safe, efficient and modern structural systems for commercial and residential developments.'],
    
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
    
    ['Strategischer Kern', 'Core Expertise'],
    ['Ingenieurwesen, Beratung und Projektsteuerung aus einer Hand.', 'Engineering, consulting and project management from a single source.'],
    ['Alle Leistungen entdecken', 'View All Services'],
    ['Projekt besprechen', 'Discuss Project'],
    
    // Why Choose Us
    ['<span className="text-accent">DIE PROJEKTE,</span> DIE ANDERE</span><span className="block lg:whitespace-nowrap">ÜBERFORDERN — STRUKTURIEREN WIR.</span>', '<span className="text-accent">WHY CLIENTS TRUST</span> HD ENGINEERING</span><span className="block lg:whitespace-nowrap">&amp; CONSULTING</span>'],
    ['Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten Projekte, die andere zögern lassen, und bringen Klarheit dorthin, wo zuvor Unsicherheit war.', 'We combine technical precision, modern engineering standards and professional project execution to deliver reliable and sustainable solutions for every client.'],
    ['Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert. Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss gelingen.', 'Our features include an Experienced Engineering Team, Innovative Technical Solutions, Transparent Communication, Sustainable Engineering Practices, Timely Project Delivery, and Advanced Technology Integration.'],
    
    // Not an option
    ['<span className="text-accent">VERANTWORTUNG</span> IST KEINE OPTION. <br />SIE IST STANDARD.', '<span className="text-accent">ENGINEERING</span> PRECISION IS NOT AN OPTION. <br />IT IS OUR STANDARD.'],
    ['Technik und Planung sind nur so gut wie die Menschen dahinter.', 'Technology and planning are only as good as the people behind them.'],
    ['Bei HD Engineering &amp; Consulting verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Bau- und Immobilienprozesse zu Lösungen, die dauerhaft funktionieren und wirtschaftlich tragen.', 'At HD Engineering &amp; Consulting, we combine experience, technical expertise, and a deep understanding of construction processes to create long-lasting solutions.'],
    ['Jedes Projekt steht für unser Versprechen: Qualität ohne Kompromisse — und Verantwortung bis zur letzten Übergabe.', 'Every project represents our commitment: uncompromising quality and responsibility until final delivery.'],
    
    // Projects
    ['<span className="text-accent">VERANTWORTUNG</span> IN AKTION:</span><span className="block">ECHTE PROJEKTE. ECHTE ERGEBNISSE.</span>', '<span className="text-accent">FEATURED</span> PROJECTS:</span><span className="block">ENGINEERING EXCELLENCE.</span>'],
    ['Neubau · Büro- und Geschäftshaus', 'Commercial engineering and structural supervision.'],
    ['Schlüsselfertige Realisierung · Gewerbebau', 'High-rise residential infrastructure and consulting.'],
    ['HD Referenz', 'Skyline Business Center'],
    // Wait, the second "HD Referenz" needs to be Urban Residential Towers, so I will do this manually in code below
    
    // Stats
    ['Aktuelle Projektkapazität', 'Our Impact'],
    ['Auslastung', 'Completed'],
    ['0 %', '150+'],
    ['0 %', '12+'], // Need to be careful here if replacing "0 %" generally
    ['Kapazität · Projektmanagement &amp; Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung &amp; Construction Management', 'Years Experience'],
    ['Kapazität · Projektmanagement & Steuerung', 'Projects Completed'],
    ['Kapazität · Bauausführung & Construction Management', 'Years Experience'],
    
    // Workflow
    ['<span className="text-accent">WIE LÄUFT</span> EINE ZUSAMMENARBEIT AB?', '<span className="text-accent">HOW WE</span> WORK TOGETHER?'],
    ['Anfrage', 'Consultation'],
    ['Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder über unser Kontaktformular.', 'Send us your project documents, plans or a brief description via email or our contact form.'],
    ['Erstgespräch &amp; Angebot', 'Initial Meeting &amp; Proposal'],
    ['In der Regel melden wir uns innerhalb von 24 Stunden mit einem strukturierten Gesprächstermin und einem ersten, nachvollziehbaren Angebot.', 'We typically respond within 24 hours to schedule a structured meeting and provide an initial, transparent proposal.'],
    ['Wir übernehmen Verantwortung', 'Project Execution'],
    ['Auftrag angenommen? Dann strukturieren wir Ihr Projekt von Beginn an — mit klaren Rollen, Terminen und Entscheidungswegen.', 'Once approved, we structure your project from the start—with clear roles, deadlines, and decision paths.'],
    
    // Footer
    ['Verantwortung entscheidet über Projekterfolg. Ihr Partner für Ingenieurwesen und Beratung.', 'Engineering Vision. Building Excellence. Your partner for modern engineering solutions.'],
    ['Firmenanschrift', 'Location'],
    ['HD Engineering &amp; Consulting GmbH<br />Habermehlstraße 160<br />75172 Pforzheim', 'HD Engineering &amp; Consulting<br />Prishtinë, Kosovë'],
    ['07231 2809060', '+383 44 000 000'],
    ['info@hdrec.de', 'info@hdengineering.com'],
    ['© 2026 HD Engineering &amp; Consulting GmbH', '© 2026 HD Engineering &amp; Consulting. All Rights Reserved.'],
    ['Impressum', 'Imprint'],
    ['Datenschutz', 'Privacy Policy']
];

for (const [search, replace] of replacements) {
    content = content.split(search).join(replace);
}

// Special case for second "Skyline Business Center" which used to be HD Referenz
let firstFound = false;
content = content.replace(/Skyline Business Center/g, (match) => {
    if (!firstFound) {
        firstFound = true;
        return match;
    }
    return 'Urban Residential Towers';
});

// Special case for second "0 %" which is now "150+"
let first150Found = false;
content = content.replace(/150\+/g, (match) => {
    if (!first150Found) {
        first150Found = true;
        return match;
    }
    return '12+';
});


// Replace 3 logos with just 1 (or 2) to clean up About section. The user wants to use HD Engineering logo everywhere.
// The logo is /HD_logo.svg
// The original has srcSet pointing to hd.jpeg, hek.jpeg, hd-realestate.jpeg
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Findividual-logos%2Fhd\.jpeg&amp;w=3840&amp;q=75/g, '/HD_logo.svg');
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Findividual-logos%2Fhek\.jpeg&amp;w=3840&amp;q=75/g, '/HD_logo.svg');
content = content.replace(/https:\/\/hd-real-estate-construction\.vercel\.app\/_next\/image\?url=%2Fimages%2Findividual-logos%2Fhd-realestate\.jpeg&amp;w=3840&amp;q=75/g, '/HD_logo.svg');

// Also remove the srcSet entirely for these specific ones so they load the normal src
content = content.replace(/srcSet="[^"]*hd\.jpeg[^"]*"/g, '');
content = content.replace(/srcSet="[^"]*hek\.jpeg[^"]*"/g, '');
content = content.replace(/srcSet="[^"]*hd-realestate\.jpeg[^"]*"/g, '');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Done!');
