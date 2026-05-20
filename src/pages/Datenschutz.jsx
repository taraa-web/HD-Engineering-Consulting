import React from 'react';

const COMPANY = 'HD Engineering & Consulting GmbH';
const EMAIL = 'info@hdengineering.de';

function LegalSection({ title, children }) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-foreground/80">{children}</div>
        </section>
    );
}

export default function Datenschutz() {
    return (
        <main>
            <section className="bg-background py-20 md:py-28">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Rechtliches</p>
                        <h1 className="mt-4 text-balance text-4xl md:text-5xl font-extrabold leading-tight">Datenschutzerklärung</h1>
                        <p className="mt-6 text-[17px] leading-relaxed text-foreground/80">
                            Der Schutz Ihrer personenbezogenen Daten ist uns wichtig. Nachfolgend informieren wir Sie über die Verarbeitung Ihrer Daten beim Besuch dieser Website und bei der Nutzung unseres Kontaktformulars.
                        </p>

                        <div className="mt-14 space-y-12">
                            <LegalSection title="1. Verantwortlicher">
                                <p>
                                    Verantwortlich für die Datenverarbeitung ist die {COMPANY}, Habermehlstraße 160, 75172 Pforzheim. Sie erreichen uns unter{' '}
                                    <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">{EMAIL}</a>.
                                </p>
                            </LegalSection>

                            <LegalSection title="2. Erhebung und Verarbeitung personenbezogener Daten">
                                <p>
                                    Beim Besuch unserer Website werden automatisch technische Informationen erfasst (z. B. IP-Adresse, Browsertyp, Zeitpunkt des Zugriffs). Diese Daten dienen der Sicherstellung des Betriebs und der Sicherheit der Website.
                                </p>
                                <p>
                                    Bei einer Anfrage über unser Kontaktformular verarbeiten wir die von Ihnen angegebenen Daten (Name, Firma, E-Mail, Telefon, Anfragetext, hochgeladene Dateien) ausschließlich zur Bearbeitung Ihrer Anfrage.
                                </p>
                            </LegalSection>

                            <LegalSection title="3. Rechtsgrundlagen">
                                <p>
                                    Rechtsgrundlage der Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Durchführung eines Vertrages) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer und funktionsfähiger Website).
                                </p>
                            </LegalSection>

                            <LegalSection title="4. Weitergabe von Daten">
                                <p>
                                    Eine Weitergabe Ihrer personenbezogenen Daten an Dritte erfolgt nur, soweit dies zur Erfüllung unserer vertraglichen Pflichten erforderlich ist oder eine gesetzliche Verpflichtung besteht.
                                </p>
                            </LegalSection>

                            <LegalSection title="5. Ihre Rechte">
                                <ul className="ml-5 list-disc space-y-2">
                                    <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                                    <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                                    <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                                    <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                                    <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                                    <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                                    <li>Beschwerderecht bei der zuständigen Aufsichtsbehörde</li>
                                </ul>
                            </LegalSection>

                            <LegalSection title="6. Speicherdauer">
                                <p>
                                    Wir speichern personenbezogene Daten nur so lange, wie es für die genannten Zwecke erforderlich ist oder gesetzliche Aufbewahrungsfristen bestehen.
                                </p>
                            </LegalSection>

                            <LegalSection title="7. Kontakt in Datenschutzfragen">
                                <p>
                                    Für Fragen zum Datenschutz wenden Sie sich bitte an:{' '}
                                    <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">{EMAIL}</a>.
                                </p>
                            </LegalSection>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
