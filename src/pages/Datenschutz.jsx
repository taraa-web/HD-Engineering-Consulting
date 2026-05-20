import React from 'react';
import { Link } from 'react-router-dom';

export default function Datenschutz() {
    return (
        <main className="relative overflow-hidden bg-background">
            <section className="relative w-full py-20 md:py-28">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Rechtliches</p>
                    <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] md:text-5xl">Datenschutzerklärung</h1>
                    <p className="mt-4 text-sm text-muted-foreground">Stand: Mai 2026</p>

                    <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
                        <section>
                            <h2 className="text-xl font-bold text-foreground">1. Verantwortlicher</h2>
                            <p className="mt-3">
                                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                            </p>
                            <p className="mt-3">
                                HD Engineering &amp; Consulting GmbH<br />
                                Habermehlstraße 160<br />
                                75172 Pforzheim<br />
                                Deutschland
                            </p>
                            <p className="mt-3">
                                Telefon: <a href="tel:+4972312809060" className="text-accent hover:underline">07231 2809060</a><br />
                                E-Mail: <a href="mailto:info@hdengineering.de" className="text-accent hover:underline">info@hdengineering.de</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">2. Allgemeine Hinweise</h2>
                            <p className="mt-3">
                                Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">3. Datenerfassung auf dieser Website</h2>
                            <h3 className="mt-4 text-lg font-semibold">Server-Log-Dateien</h3>
                            <p className="mt-2">
                                Beim Besuch dieser Website werden durch den Hosting-Anbieter automatisch Informationen erfasst und in sogenannten Server-Log-Dateien gespeichert (z. B. Browsertyp, Betriebssystem, Referrer-URL, Hostname, Uhrzeit der Serveranfrage, IP-Adresse). Die Erfassung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
                            </p>
                            <h3 className="mt-4 text-lg font-semibold">Kontaktformular</h3>
                            <p className="mt-2">
                                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Formular inklusive der von Ihnen angegebenen Kontaktdaten zur Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">4. Cookies und Einwilligung</h2>
                            <p className="mt-3">
                                Diese Website verwendet Cookies. Essenzielle Cookies sind für den Betrieb der Website erforderlich. Weitere Cookies (z. B. für Statistik oder Marketing) werden nur mit Ihrer Einwilligung gesetzt. Ihre Einstellungen können Sie jederzeit über den Cookie-Banner anpassen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">5. Ihre Rechte</h2>
                            <p className="mt-3">Sie haben jederzeit das Recht auf:</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6">
                                <li>Auskunft über Ihre gespeicherten personenbezogenen Daten (Art. 15 DSGVO)</li>
                                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                                <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
                                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                                <li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">6. Speicherdauer</h2>
                            <p className="mt-3">
                                Personenbezogene Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
                            </p>
                        </section>

                        <p className="pt-4">
                            <Link to="/impressum" className="font-medium text-accent hover:underline">Impressum</Link>
                            {' · '}
                            <Link to="/kontakt" className="font-medium text-accent hover:underline">Kontakt</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
