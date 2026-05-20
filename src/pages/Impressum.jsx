import React from 'react';

const COMPANY = 'HD Engineering & Consulting GmbH';
const EMAIL = 'info@hdengineering.de';
const PHONE = '07231 2809060';

function LegalSection({ title, children }) {
    return (
        <section>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
            <div className="mt-4 space-y-4 text-[15.5px] leading-relaxed text-foreground/80">{children}</div>
        </section>
    );
}

export default function Impressum() {
    return (
        <main>
            <section className="bg-background py-20 md:py-28">
                <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Rechtliches</p>
                        <h1 className="mt-4 text-balance text-4xl md:text-5xl font-extrabold leading-tight">Impressum</h1>
                        <p className="mt-6 text-[17px] leading-relaxed text-foreground/80">
                            Angaben gemäß § 5 DDG sowie § 18 Abs. 2 MStV.
                        </p>

                        <div className="mt-14 space-y-12">
                            <LegalSection title="Anbieterkennzeichnung">
                                <p>
                                    {COMPANY}<br />
                                    Habermehlstraße 160<br />
                                    75172 Pforzheim<br />
                                    Deutschland
                                </p>
                            </LegalSection>

                            <LegalSection title="Vertreten durch">
                                <p>Geschäftsführung: Wird ergänzt</p>
                            </LegalSection>

                            <LegalSection title="Kontakt">
                                <p>
                                    Telefon: <a href="tel:+4972312809060" className="text-accent hover:underline">{PHONE}</a>
                                    <br />
                                    E-Mail: <a href={`mailto:${EMAIL}`} className="text-accent hover:underline">{EMAIL}</a>
                                </p>
                            </LegalSection>

                            <LegalSection title="Registereintrag">
                                <p>Handelsregister: Wird ergänzt</p>
                            </LegalSection>

                            <LegalSection title="Umsatzsteuer">
                                <p>USt-IdNr. gemäß § 27 a UStG: Wird ergänzt</p>
                            </LegalSection>

                            <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
                                <p>
                                    {COMPANY}, Habermehlstraße 160, 75172 Pforzheim
                                </p>
                            </LegalSection>

                            <LegalSection title="Haftung für Inhalte">
                                <p>
                                    Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt und laufend geprüft. Dennoch können wir keine Gewähr für Richtigkeit, Vollständigkeit und Aktualität der bereitgestellten Inhalte übernehmen.
                                </p>
                            </LegalSection>

                            <LegalSection title="Haftung für Links">
                                <p>
                                    Unsere Website enthält Verlinkungen zu externen Websites Dritter. Auf deren Inhalte haben wir keinen Einfluss. Für die Inhalte der verlinkten Seiten ist ausschließlich der jeweilige Anbieter oder Betreiber verantwortlich.
                                </p>
                            </LegalSection>

                            <LegalSection title="Urheberrecht">
                                <p>
                                    Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen dem deutschen Urheberrecht. Jede Verwertung außerhalb der Grenzen des Urheberrechts bedarf der vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.
                                </p>
                            </LegalSection>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
