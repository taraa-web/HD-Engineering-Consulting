const fs = require('fs');
const path = require('path');

const replacements = {
    // 1. Hero
    'Verantwortung entscheidet über Projekterfolg': 'Exzellenz im Bauingenieurwesen',
    'IHR PARTNER</span> FÜR<br className="hidden md:block"/>ENGINEERING &amp; CONSULTING': 'IHR EXPERTE</span> FÜR<br className="hidden md:block"/>BAUPROJEKTE &amp; ENGINEERING',
    'IHR PARTNER</span> FÜR<br className="hidden md:block" />\n                ENGINEERING &amp; CONSULTING': 'IHR EXPERTE</span> FÜR<br className="hidden md:block" />\n                BAUPROJEKTE &amp; ENGINEERING',
    'IHR PARTNER FÜR ENGINEERING & CONSULTING': 'IHR EXPERTE FÜR BAUPROJEKTE & ENGINEERING',
    'Wir strukturieren Komplexität, übernehmen Verantwortung und führen Ingenieur- und Bauprojekte verlässlich zum Ziel — auf Augenhöhe mit Bauherren, Investoren und Planern.': 'Wir realisieren anspruchsvolle Bau- und Infrastrukturprojekte mit höchster technischer Präzision. Von der statischen Berechnung bis zur schlüsselfertigen Bauleitung bieten wir maßgeschneiderte Ingenieurlösungen.',
    
    // 2. 4 Features
    '>Wirtschaftlichkeit<': '>Tragwerksplanung<',
    'Wir denken Projekte wirtschaftlich — von der ersten Kostenschätzung bis zur Schlussrechnung. Klare Budgets, saubere Steuerung.': 'Wir garantieren höchste Standsicherheit und Materialeffizienz für jedes Gebäude. Detaillierte Berechnungen für maximale Sicherheit.',
    '>Transparenz<': '>Präzision & Sicherheit<',
    'Nachvollziehbare Entscheidungen statt Blackbox. Zahlen, Termine und Risiken sind jederzeit belastbar dokumentiert.': 'Innovative Ingenieurmethoden für maximale Sicherheit und Langlebigkeit Ihrer Bauwerke. Wir lassen keinen Raum für Fehler.',
    '>Verlässlichkeit<': '>Effiziente Bauleitung<',
    'Zusagen werden eingehalten. Wir übernehmen Verantwortung für Termine, Qualität und den Gesamterfolg Ihres Projekts.': 'Strikte Überwachung der Bauausführung zur Einhaltung von Zeit- und Kostenplänen. Wir sind Ihr Auge auf der Baustelle.',
    '>Qualität<': '>Nachhaltiges Bauen<',
    'Wir liefern Ergebnisse, die Bestand haben — technisch sauber, nutzungsgerecht und langfristig werthaltig.': 'Wir integrieren zukunftsweisende und energieeffiziente Konzepte in jede Planungsphase für den modernen Hoch- und Tiefbau.',
    
    // 3. Welcome section
    'HD Engineering &amp; Consulting steht für eine klare Haltung im Umgang mit Ingenieur- und Bauprojekten: Verantwortung übernehmen, vorausschauend handeln und konsequent Qualität liefern.': 'Als hochspezialisiertes Ingenieurbüro decken wir das gesamte Spektrum des modernen Bauingenieurwesens ab. Wir übersetzen visionäre Architektur in berechenbare, sichere und wirtschaftliche Realität.',
    'HD Engineering &amp; Consulting steht für eine klare Haltung im\n                Umgang mit Ingenieur- und Bauprojekten: Verantwortung\n                übernehmen, vorausschauend handeln und konsequent Qualität\n                liefern.': 'Als hochspezialisiertes Ingenieurbüro decken wir das gesamte Spektrum des modernen Bauingenieurwesens ab. Wir übersetzen visionäre Architektur in berechenbare, sichere und wirtschaftliche Realität.',
    'Projekte werden nicht nur abgewickelt, sondern ganzheitlich gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen, Risiken frühzeitig zu erkennen und Entscheidungen auf einer belastbaren Grundlage zu treffen. Wirtschaftlichkeit, Transparenz und Verlässlichkeit bilden dabei die Basis jeder Zusammenarbeit.': 'Unser Team aus erfahrenen Ingenieuren und Bauleitern begleitet Ihr Projekt von der ersten Machbarkeitsstudie über die detaillierte Ausführungsplanung bis hin zur finalen Bauabnahme. Wir vereinen technisches Know-how mit innovativer Methodik.',
    'Projekte werden nicht nur abgewickelt, sondern ganzheitlich\n                gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen,\n                Risiken frühzeitig zu erkennen und Entscheidungen auf einer\n                belastbaren Grundlage zu treffen. Wirtschaftlichkeit,\n                Transparenz und Verlässlichkeit bilden dabei die Basis jeder\n                Zusammenarbeit.': 'Unser Team aus erfahrenen Ingenieuren und Bauleitern begleitet Ihr Projekt von der ersten Machbarkeitsstudie über die detaillierte Ausführungsplanung bis hin zur finalen Bauabnahme. Wir vereinen technisches Know-how mit innovativer Methodik.',
    'HD Engineering &amp; Consulting versteht sich als Partner auf Augenhöhe, der Komplexität strukturiert, Interessen zusammenführt und Projekte sicher zum Ziel führt.': 'Egal ob Hochbau, Tiefbau oder Geotechnik – HD Engineering &amp; Consulting ist das Rückgrat komplexer Bauvorhaben und Ihr Partner für technische Meisterleistungen.',
    'HD Engineering &amp; Consulting versteht sich als Partner auf\n                Augenhöhe, der Komplexität strukturiert, Interessen\n                zusammenführt und Projekte sicher zum Ziel führt.': 'Egal ob Hochbau, Tiefbau oder Geotechnik – HD Engineering &amp; Consulting ist das Rückgrat komplexer Bauvorhaben und Ihr Partner für technische Meisterleistungen.',
    
    // 4. Six Pillars
    'Von der strategischen Projektentwicklung bis zur operativen Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander und schaffen die Grundlage für belastbare Ergebnisse.': 'Vom ersten statischen Konzept bis zur finalen Bauabnahme — unsere Ingenieurleistungen greifen ineinander und garantieren die strukturelle Integrität Ihres Bauwerks.',
    'Von der strategischen Projektentwicklung bis zur operativen\n              Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander\n              und schaffen die Grundlage für belastbare Ergebnisse.': 'Vom ersten statischen Konzept bis zur finalen Bauabnahme — unsere Ingenieurleistungen greifen ineinander und garantieren die strukturelle Integrität Ihres Bauwerks.',
    '>Projektmanagement<': '>Tragwerksplanung<',
    '>Bauausführung &amp; Realisierung<': '>Bauplanung & Konstruktion<',
    '>Controlling &amp; Consulting<': '>Bauleitung & Überwachung<',
    '>Engineering Services<': '>Geotechnik & Grundbau<',
    '>Kostensteuerung<': '>Statik & Berechnungen<',
    '>Construction Management<': '>Energie- & Brandschutz<',
    
    'Struktur schaffen, Entscheidungen treffen, Verantwortung übernehmen — für den Gesamterfolg.': 'Erstellung prüffähiger statischer Berechnungen und Konstruktionspläne für den Hoch- und Tiefbau.',
    'Planung wird Wirklichkeit — verlässlich, koordiniert, bis zur schlüsselfertigen Übergabe.': 'Detaillierte Ausführungs- und Detailplanung mittels modernster 3D- und BIM-Technologien.',
    'Transparenz als Grundlage guter Entscheidungen. Analyse, Steuerung, Optimierung.': 'Lückenlose Kontrolle der Bauausführung auf der Baustelle zur Sicherstellung der Qualitätsstandards.',
    'Projekte im Kontext von Markt, Nutzung und Zukunftsfähigkeit bewerten und entwickeln.': 'Baugrundgutachten und Planung von anspruchsvollen Baugrubensicherungen und Fundamenten.',
    'Kostenbewusstsein als Haltung — klar, verbindlich, über alle Projektphasen hinweg.': 'Präzise Bemessung von Bauteilen aus Stahlbeton, Stahl, Holz und Mauerwerk für maximale Belastbarkeit.',
    'Präsenz auf der Baustelle, klare Kommunikation, kompromisslose Qualitätssicherung.': 'Entwicklung nachhaltiger Energiekonzepte und maßgeschneiderter Brandschutznachweise.',
    
    // 5. Dark section
    'DIE PROJEKTE,</span> DIE ANDERE</span><span className="block lg:whitespace-nowrap">ÜBERFORDERN — STRUKTURIEREN WIR.': 'KOMPLEXE BAUPROJEKTE</span> MEISTERN WIR MIT</span><span className="block lg:whitespace-nowrap">INNOVATION UND ERFAHRUNG.',
    'DIE PROJEKTE,</span> DIE ANDERE</span>\n              <span className="block lg:whitespace-nowrap">\n                ÜBERFORDERN — STRUKTURIEREN WIR.\n              </span>': 'KOMPLEXE BAUPROJEKTE</span> MEISTERN WIR MIT</span>\n              <span className="block lg:whitespace-nowrap">\n                INNOVATION UND ERFAHRUNG.\n              </span>',
    'Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten Projekte, die andere zögern lassen, und bringen Klarheit dorthin, wo zuvor Unsicherheit war.': 'Ob Industrieanlagen, komplexe Bürogebäude oder anspruchsvoller Wohnungsbau – wo Standardlösungen enden, beginnt unsere Stärke. Wir finden wirtschaftliche und statisch einwandfreie Wege für architektonische Herausforderungen.',
    'Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige\n              Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten\n              Projekte, die andere zögern lassen, und bringen Klarheit dorthin,\n              wo zuvor Unsicherheit war.': 'Ob Industrieanlagen, komplexe Bürogebäude oder anspruchsvoller Wohnungsbau – wo Standardlösungen enden, beginnt unsere Stärke. Wir finden wirtschaftliche und statisch einwandfreie Wege für architektonische Herausforderungen.',
    'Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert. Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss gelingen.': 'Jeder Grundriss, jedes Material und jede Belastung wird von unseren Ingenieuren bis ins Detail berechnet und optimiert. Das Ergebnis sind Bauwerke, die Jahrzehnte überdauern. Statik, die Vertrauen schafft.',
    'Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren\n              Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert.\n              Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen\n              echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss\n              gelingen.': 'Jeder Grundriss, jedes Material und jede Belastung wird von unseren Ingenieuren bis ins Detail berechnet und optimiert. Das Ergebnis sind Bauwerke, die Jahrzehnte überdauern. Statik, die Vertrauen schafft.',
    
    // 6. Values
    'VERANTWORTUNG</span> IST KEINE OPTION. <br/>SIE IST STANDARD.': 'INGENIEURSKUNST</span> IST UNSERE LEIDENSCHAFT. <br/>PRÄZISION IST STANDARD.',
    'VERANTWORTUNG</span> IST KEINE OPTION. <br />\n              SIE IST STANDARD.': 'INGENIEURSKUNST</span> IST UNSERE LEIDENSCHAFT. <br />\n              PRÄZISION IST STANDARD.',
    'Technik und Planung sind nur so gut wie die Menschen dahinter.': 'Hinter jedem erfolgreichen Bauwerk stehen präzise Berechnungen und Menschen, die ihr Handwerk verstehen.',
    'Bei HD Engineering &amp; Consulting verbinden wir Erfahrung, Fachkompetenz und ein tiefes Verständnis für Ingenieur- und Bauprozesse zu Lösungen, die dauerhaft funktionieren und wirtschaftlich tragen.': 'Bei HD Engineering &amp; Consulting verlassen wir uns nicht auf Schätzungen. Wir berechnen, prüfen und optimieren. Unsere Ingenieure garantieren, dass Ihr Gebäude genau so steht, wie es geplant wurde.',
    'Bei HD Engineering &amp; Consulting verbinden wir Erfahrung,\n              Fachkompetenz und ein tiefes Verständnis für Ingenieur- und\n              Bauprozesse zu Lösungen, die dauerhaft funktionieren und\n              wirtschaftlich tragen.': 'Bei HD Engineering &amp; Consulting verlassen wir uns nicht auf Schätzungen. Wir berechnen, prüfen und optimieren. Unsere Ingenieure garantieren, dass Ihr Gebäude genau so steht, wie es geplant wurde.',
    'Jedes Projekt steht für unser Versprechen: Qualität ohne Kompromisse — und Verantwortung bis zur letzten Übergabe.': 'Wir verbinden statische Sicherheit mit wirtschaftlicher Bauausführung. Denn wahre Ingenieurskunst zeigt sich in der Effizienz des Tragwerks.',
    'Jedes Projekt steht für unser Versprechen: Qualität ohne\n              Kompromisse — und Verantwortung bis zur letzten Übergabe.': 'Wir verbinden statische Sicherheit mit wirtschaftlicher Bauausführung. Denn wahre Ingenieurskunst zeigt sich in der Effizienz des Tragwerks.',
    
    // 7. References
    'VERANTWORTUNG</span> IN AKTION:</span><span className="block">ECHTE PROJEKTE. ECHTE ERGEBNISSE.': 'INGENIEURWESEN</span> IN DER PRAXIS:</span><span className="block">UNSERE REFERENZEN.',
    'VERANTWORTUNG</span> IN AKTION:</span>\n            <span className="block">ECHTE PROJEKTE. ECHTE ERGEBNISSE.</span>': 'INGENIEURWESEN</span> IN DER PRAXIS:</span>\n            <span className="block">UNSERE REFERENZEN.</span>',
    'Neubau · Büro- und Geschäftshaus': 'Tragwerksplanung · Hochhauskomplex',
    'Schlüsselfertige Realisierung · Gewerbebau': 'Bauleitung · Infrastrukturprojekt',
    
    // 8. Process
    'WIE LÄUFT</span> EINE ZUSAMMENARBEIT AB?': 'IHR WEG</span> ZUM ERFOLGREICHEN BAUPROJEKT',
    '>Anfrage<': '>Bedarfsanalyse<',
    'Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze Beschreibung per E-Mail oder über unser Kontaktformular.': 'Wir prüfen Ihre Architekturentwürfe auf statische Machbarkeit und erstellen erste Schätzungen.',
    'Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze\n                Beschreibung per E-Mail oder über unser Kontaktformular.': 'Wir prüfen Ihre Architekturentwürfe auf statische Machbarkeit und erstellen erste Schätzungen.',
    '>Erstgespräch &amp; Angebot<': '>Planungsphase<',
    'In der Regel melden wir uns innerhalb von 24 Stunden mit einem strukturierten Gesprächstermin und einem ersten, nachvollziehbaren Angebot.': 'Unsere Ingenieure erarbeiten detaillierte Konstruktionspläne und statische Berechnungen für die Baugenehmigung.',
    'In der Regel melden wir uns innerhalb von 24 Stunden mit einem\n                strukturierten Gesprächstermin und einem ersten,\n                nachvollziehbaren Angebot.': 'Unsere Ingenieure erarbeiten detaillierte Konstruktionspläne und statische Berechnungen für die Baugenehmigung.',
    '>Wir übernehmen Verantwortung<': '>Bau & Realisierung<',
    'Auftrag angenommen? Dann strukturieren wir Ihr Projekt von Beginn an — mit klaren Rollen, Terminen und Entscheidungswegen.': 'Wir überwachen die Bauphase vor Ort und stellen sicher, dass alle statischen Vorgaben exakt umgesetzt werden.',
    'Auftrag angenommen? Dann strukturieren wir Ihr Projekt von\n                Beginn an — mit klaren Rollen, Terminen und\n                Entscheidungswegen.': 'Wir überwachen die Bauphase vor Ort und stellen sicher, dass alle statischen Vorgaben exakt umgesetzt werden.',
    
    // 9. Extra
    'Ingenieurwesen, Bau und Projektsteuerung aus einer Hand.': 'Präzise Tragwerksplanung und Baustatik für anspruchsvolle Projekte.',
    'Ingenieurwesen, Bau und Projektsteuerung aus einer Hand': 'Präzise Tragwerksplanung und Baustatik für anspruchsvolle Projekte'
};

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith(".jsx") || file.endsWith(".js") || file.endsWith(".json")) {
            results.push(file);
        }
    });
    return results;
}

const files = walk('src');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;
    for (const [old, newStr] of Object.entries(replacements)) {
        content = content.split(old).join(newStr);
    }
    if (content !== original) {
        fs.writeFileSync(file, content, 'utf8');
        console.log("Updated " + file);
    }
}
