const fs = require('fs');
const path = require('path');

const replacements = {
    'Verantwortung entscheidet über Projekterfolg': 'Përgjegjësia përcakton suksesin e projektit',
    'IHR PARTNER</span> FÜR<br className="hidden md:block" />\n                ENGINEERING &amp; CONSULTING': 'PARTNERI JUAJ PËR</span><br className="hidden md:block" />\n                INXHINIERI DHE KONSULENCË',
    'IHR PARTNER</span> FÜR<br className=\"hidden md:block\" />\\n                ENGINEERING &amp; CONSULTING': 'PARTNERI JUAJ PËR</span><br className=\"hidden md:block\" />\\n                INXHINIERI DHE KONSULENCË',
    'IHR PARTNER FÜR ENGINEERING & CONSULTING': 'PARTNERI JUAJ PËR INXHINIERI DHE KONSULENCË',
    'Wir strukturieren Komplexität, übernehmen Verantwortung und führen Ingenieur- und Bauprojekte verlässlich zum Ziel — auf Augenhöhe mit Bauherren, Investoren und Planern.': 'Ne strukturojmë kompleksitetin, marrim përgjegjësi dhe i çojmë projektet inxhinierike dhe të ndërtimit drejt suksesit — krah për krah me ndërtuesit, investitorët dhe planifikuesit.',
    'Anfrage starten': 'Kërko një Ofertë',
    'Wirtschaftlichkeit': 'Efikasiteti Ekonomik',
    'Wir denken Projekte wirtschaftlich — von der ersten Kostenschätzung bis zur Schlussrechnung. Klare Budgets, saubere Steuerung.': 'Ne i trajtojmë projektet ekonomikisht — nga vlerësimi i parë i kostos deri te fatura përfundimtare. Buxhete të qarta, menaxhim i pastër.',
    'Transparenz': 'Transparenca',
    'Nachvollziehbare Entscheidungen statt Blackbox. Zahlen, Termine und Risiken sind jederzeit belastbar dokumentiert.': 'Vendime të qarta në vend të të panjohurave. Shifrat, afatet dhe rreziqet janë të dokumentuara në çdo kohë.',
    'Verlässlichkeit': 'Besueshmëria',
    'Zusagen werden eingehalten. Wir übernehmen Verantwortung für Termine, Qualität und den Gesamterfolg Ihres Projekts.': 'Premtimet mbahen. Ne marrim përgjegjësi për afatet, cilësinë dhe suksesin e përgjithshëm të projektit tuaj.',
    'Qualität': 'Cilësia',
    'Wir liefern Ergebnisse, die Bestand haben — technisch sauber, nutzungsgerecht und langfristig werthaltig.': 'Ne ofrojmë rezultate të qëndrueshme — teknikisht të sakta dhe me vlerë afatgjatë.',
    'HERZLICH WILLKOMMEN</span> BEI HD\n              ENGINEERING &amp; CONSULTING': 'MIRË SE VINI</span> NË HD\n              ENGINEERING &amp; CONSULTING',
    'HD Engineering &amp; Consulting GmbH ist ein Unternehmen der HD\n                Group.': 'HD Engineering &amp; Consulting është pjesë e HD\n                Group.',
    'HD Engineering &amp; Consulting steht für eine klare Haltung im\n                Umgang mit Ingenieur- und Bauprojekten: Verantwortung\n                übernehmen, vorausschauend handeln und konsequent Qualität\n                liefern.': 'HD Engineering &amp; Consulting ka një qasje të qartë ndaj\n                projekteve inxhinierike dhe të ndërtimit: të marrë përgjegjësi,\n                të veprojë me largpamësi dhe të ofrojë cilësi në mënyrë të\n                vazhdueshme.',
    'Projekte werden nicht nur abgewickelt, sondern ganzheitlich\n                gedacht — mit dem Anspruch, nachhaltige Werte zu schaffen,\n                Risiken frühzeitig zu erkennen und Entscheidungen auf einer\n                belastbaren Grundlage zu treffen. Wirtschaftlichkeit,\n                Transparenz und Verlässlichkeit bilden dabei die Basis jeder\n                Zusammenarbeit.': 'Projektet jo vetëm që zbatohen, por mendohen në mënyrë\n                gjithëpërfshirëse — me synimin për të krijuar vlera të\n                qëndrueshme, për të identifikuar rreziqet herët dhe për të\n                marrë vendime mbi një bazë të fortë. Efikasiteti ekonomik,\n                transparenca dhe besueshmëria formojnë bazën e çdo\n                bashkëpunimi.',
    'HD Engineering &amp; Consulting versteht sich als Partner auf\n                Augenhöhe, der Komplexität strukturiert, Interessen\n                zusammenführt und Projekte sicher zum Ziel führt.': 'HD Engineering &amp; Consulting është një partner i besueshëm që\n                strukturon kompleksitetin, bashkon interesat dhe udhëheq\n                projektet drejt një përfundimi të sigurt.',
    'SECHS SÄULEN</span>\n                <br />\n                FÜR IHREN\n                <br />\n                PROJEKTERFOLG': 'GJASHTË SHTYLLAT</span>\n                <br />\n                PËR SUKSESIN E\n                <br />\n                PROJEKTIT TUAJ',
    'Von der strategischen Projektentwicklung bis zur operativen\n              Umsetzung auf der Baustelle — unsere Leistungen greifen ineinander\n              und schaffen die Grundlage für belastbare Ergebnisse.': 'Nga zhvillimi strategjik i projektit deri tek zbatimi\n              operacional në kantier — shërbimet tona ndërthuren dhe krijojnë\n              bazën për rezultate të qëndrueshme.',
    '>Projektmanagement<': '>Menaxhimi i Projektit<',
    '>Bauausführung &amp; Realisierung<': '>Ndërtimi dhe Realizimi<',
    '>Controlling &amp; Consulting<': '>Kontrolli dhe Konsulenca<',
    '>Engineering Services<': '>Shërbime Inxhinierike<',
    '>Kostensteuerung<': '>Menaxhimi i Kostove<',
    '>Construction Management<': '>Mbikëqyrja e Ndërtimit<',
    '>Strategischer Kern<': '>Bërthama Strategjike<',
    'Ingenieurwesen, Bau und Projektsteuerung aus einer Hand.': 'Inxhinieria, ndërtimi dhe menaxhimi i projektit nga një burim i vetëm.',
    'Struktur schaffen, Entscheidungen treffen, Verantwortung übernehmen — für den Gesamterfolg.': 'Krijimi i strukturës, marrja e vendimeve, marrja e përgjegjësisë — për suksesin e përgjithshëm.',
    'Planung wird Wirklichkeit — verlässlich, koordiniert, bis zur schlüsselfertigen Übergabe.': 'Planifikimi bëhet realitet — i besueshëm, i koordinuar, deri te dorëzimi çelësa në dorë.',
    'Transparenz als Grundlage guter Entscheidungen. Analyse, Steuerung, Optimierung.': 'Transparenca si bazë për vendime të mira. Analiza, kontrolli, optimizimi.',
    'Präsenz auf der Baustelle, klare Kommunikation, kompromisslose Qualitätssicherung.': 'Prania në kantier, komunikimi i qartë, sigurimi i cilësisë pa kompromise.',
    'Projekte im Kontext von Markt, Nutzung und Zukunftsfähigkeit bewerten und entwickeln.': 'Vlerësimi dhe zhvillimi i projekteve në kontekstin e tregut, përdorimit dhe qëndrueshmërisë.',
    'Kostenbewusstsein als Haltung — klar, verbindlich, über alle Projektphasen hinweg.': 'Ndërgjegjësimi për kostot — i qartë, i detyrueshëm, në të gjitha fazat e projektit.',
    'Alle Leistungen entdecken': 'Zbulo të gjitha shërbimet',
    'Projekt besprechen': 'Diskuto Projektin',
    'DIE PROJEKTE,</span> DIE ANDERE</span>\n              <span className=\"block lg:whitespace-nowrap\">\n                ÜBERFORDERN — STRUKTURIEREN WIR.\n              </span>': 'PROJEKTET,</span> QË TË TJERËT I</span>\n              <span className=\"block lg:whitespace-nowrap\">\n                GJEJNË TË VËSHTIRA — NE I STRUKTUROJMË.\n              </span>',
    'Anspruchsvolle Rahmenbedingungen, knappe Termine, vielschichtige\n              Stakeholder — genau dort entsteht unser Mehrwert. Wir begleiten\n              Projekte, die andere zögern lassen, und bringen Klarheit dorthin,\n              wo zuvor Unsicherheit war.': 'Kushte kërkuese, afate të ngushta, palë të interesuara\n              komplekse — pikërisht këtu krijohet vlera jonë e shtuar. Ne\n              shoqërojmë projekte që i bëjnë të tjerët të hezitojnë, dhe\n              sjellim qartësi aty ku më parë kishte pasiguri.',
    'Jedes Vorhaben, das Sie uns anvertrauen, wird von unseren\n              Fachleuten persönlich geführt: geplant, gesteuert, kontrolliert.\n              Wir verstecken uns nicht hinter Hochglanzbroschüren — wir zeigen\n              echte Ergebnisse. Denn am Ende zählt nur eines: das Projekt muss\n              gelingen.': 'Çdo projekt që na besoni, udhëhiqet personalisht nga ekspertët\n              tanë: i planifikuar, i drejtuar, i kontrolluar. Ne nuk fshihemi\n              pas broshurave me shkëlqim — ne tregojmë rezultate të vërteta.\n              Sepse në fund të fundit, vetëm një gjë ka rëndësi: projekti\n              duhet të ketë sukses.',
    'VERANTWORTUNG</span> IST KEINE OPTION. <br />\n              SIE IST STANDARD.': 'PËRGJEGJËSIA</span> NUK ËSHTË OPSION. <br />\n              AJO ËSHTË STANDARDI YNË.',
    'Technik und Planung sind nur so gut wie die Menschen dahinter.': 'Teknologjia dhe planifikimi janë vetëm po aq të mira sa njerëzit pas tyre.',
    'Bei HD Engineering &amp; Consulting verbinden wir Erfahrung,\n              Fachkompetenz und ein tiefes Verständnis für Ingenieur- und\n              Bauprozesse zu Lösungen, die dauerhaft funktionieren und\n              wirtschaftlich tragen.': 'Në HD Engineering &amp; Consulting ne kombinojmë përvojën,\n              ekspertizën dhe një kuptim të thellë të proceseve inxhinierike\n              dhe të ndërtimit në zgjidhje që funksionojnë dhe janë\n              ekonomikisht të qëndrueshme.',
    'Jedes Projekt steht für unser Versprechen: Qualität ohne\n              Kompromisse — und Verantwortung bis zur letzten Übergabe.': 'Çdo projekt përfaqëson premtimin tonë: Cilësi pa kompromise —\n              dhe përgjegjësi deri në dorëzimin e fundit.',
    'VERANTWORTUNG</span> IN AKTION:</span>\n            <span className=\"block\">ECHTE PROJEKTE. ECHTE ERGEBNISSE.</span>': 'PËRGJEGJËSI</span> NË VEPRIM:</span>\n            <span className=\"block\">PROJEKTE TË VËRTETA. REZULTATE TË VËRTETA.</span>',
    'Neubau · Büro- und Geschäftshaus': 'Ndërtim i Ri · Objekt Biznesi dhe Zyra',
    'HD Referenz': 'Referencë e HD',
    'Schlüsselfertige Realisierung · Gewerbebau': 'Ndërtim Çelësa në Dorë · Objekt Industrial',
    'Aktuelle Projektkapazität': 'Kapaciteti Aktual i Projekteve',
    'Auslastung': 'Përdorimi',
    'Kapazität · Projektmanagement &amp; Steuerung': 'Kapaciteti · Menaxhimi i Projektit & Kontrolli',
    'Kapazität · Bauausführung &amp; Construction Management': 'Kapaciteti · Ndërtimi & Mbikëqyrja',
    'WIE LÄUFT</span> EINE ZUSAMMENARBEIT AB?': 'SI FUNKSIONON</span> BASHKËPUNIMI YNË?',
    '>Anfrage<': '>Kërkesa<',
    'Schicken Sie uns Ihre Projektunterlagen, Pläne oder eine kurze\n                Beschreibung per E-Mail oder über unser Kontaktformular.': 'Na dërgoni dokumentet tuaja të projektit, planet ose një\n                përshkrim të shkurtër me e-mail ose përmes formës sonë të\n                kontaktit.',
    'Erstgespräch &amp; Angebot': 'Takimi i Parë &amp; Oferta',
    'In der Regel melden wir uns innerhalb von 24 Stunden mit einem\n                strukturierten Gesprächstermin und einem ersten,\n                nachvollziehbaren Angebot.': 'Si rregull, ne do t\'ju kontaktojmë brenda 24 orëve me një\n                datë takimi të strukturuar dhe një ofertë fillestare, të qartë.',
    'Wir übernehmen Verantwortung': 'Ne Marrim Përgjegjësi',
    'Auftrag angenommen? Dann strukturieren wir Ihr Projekt von\n                Beginn an — mit klaren Rollen, Terminen und\n                Entscheidungswegen.': 'U pranua porosia? Pastaj ne strukturojmë projektin tuaj që\n                nga fillimi — me role, afate dhe procese vendimmarrjeje të\n                qarta.',
    '>Über Uns<': '>Rreth Nesh<',
    '>Karriere<': '>Karriera<',
    '>Kontakt<': '>Kontakti<',
    '>Impressum<': '>Impressum<',
    '>Datenschutz<': '>Privatësia<',
    '>Startseite<': '>Kreu<'
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
