import React from 'react';
import { Link } from 'react-router-dom';

export default function Impressum() {
    return (
        <main className="relative overflow-hidden bg-background">
            <section className="relative w-full py-20 md:py-28">
                <div className="mx-auto w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                    <p className="text-[13px] font-semibold uppercase tracking-[0.22em] text-accent">Rechtliches</p>
                    <h1 className="mt-4 text-balance text-4xl font-extrabold leading-[1.05] md:text-5xl">Impressum</h1>

                    <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-foreground/90">
                        <section>
                            <h2 className="text-xl font-bold text-foreground">Angaben gemäß § 5 TMG</h2>
                            <p className="mt-3">
                                HD Engineering &amp; Consulting GmbH<br />
                                Habermehlstraße 160<br />
                                75172 Pforzheim<br />
                                Deutschland
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Kontakt</h2>
                            <p className="mt-3">
                                Telefon: <a href="tel:+4972312809060" className="text-accent hover:underline">07231 2809060</a><br />
                                E-Mail: <a href="mailto:info@hdengineering.de" className="text-accent hover:underline">info@hdengineering.de</a>
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Vertretungsberechtigte</h2>
                            <p className="mt-3">Geschäftsführung der HD Engineering &amp; Consulting GmbH</p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Registereintrag</h2>
                            <p className="mt-3">
                                Eintragung im Handelsregister.<br />
                                Registergericht und Registernummer werden bei Bedarf ergänzt.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Umsatzsteuer-ID</h2>
                            <p className="mt-3">
                                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz wird bei Bedarf ergänzt.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Haftung für Inhalte</h2>
                            <p className="mt-3">
                                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Haftung für Links</h2>
                            <p className="mt-3">
                                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter verantwortlich.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-foreground">Urheberrecht</h2>
                            <p className="mt-3">
                                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                            </p>
                        </section>

                        <p className="pt-4">
                            <Link to="/datenschutz" className="font-medium text-accent hover:underline">Datenschutzerklärung</Link>
                            {' · '}
                            <Link to="/kontakt" className="font-medium text-accent hover:underline">Kontakt</Link>
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
