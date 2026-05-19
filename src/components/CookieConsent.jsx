import React, { useState, useEffect } from 'react';
import { Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const BLUE = '#2563eb';
const BLUE_HOVER = '#1d4ed8';
const NAVY = '#0f172a';
const TEXT_MUTED = '#475569';
const TEXT_HEADING = '#0f172a';
const MODAL_WIDTH = 650;

function BlueButton({ children, onClick, className = '' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-[4px] text-[14px] font-bold text-white transition-colors ${className}`}
            style={{ backgroundColor: BLUE }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = BLUE_HOVER; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = BLUE; }}
        >
            {children}
        </button>
    );
}

function NavyButton({ children, onClick, className = '' }) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-[4px] text-[13px] font-bold text-white transition-colors ${className}`}
            style={{ backgroundColor: NAVY }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = NAVY; }}
        >
            {children}
        </button>
    );
}

function CategoryCard({ title, badge, description }) {
    return (
        <div className="rounded-[6px] border border-[#e8ecf0] bg-[#f4f6f8] px-5 py-4">
            <div className="mb-3 flex items-center justify-between gap-4">
                <span className="text-[17px] font-bold" style={{ color: TEXT_HEADING }}>{title}</span>
                <span
                    className="shrink-0 rounded-full px-3.5 py-1 text-[12px] font-bold text-white"
                    style={{ backgroundColor: '#22c55e' }}
                >
                    {badge}
                </span>
            </div>
            <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: TEXT_MUTED }}>{description}</p>
        </div>
    );
}

function DetailsView({
    activeTab,
    setActiveTab,
    expandedService,
    setExpandedService,
    closeMenu,
    handleSave,
    handleAcceptAll,
    handleAcceptEssential,
}) {
    const tabs = [
        { id: 'groups', label: 'Service-Gruppen' },
        { id: 'services', label: 'Services' },
        { id: 'provider', label: 'Provider' },
        { id: 'history', label: 'Einwilligung-Historie' },
    ];

    return (
        <div>
            <div className="px-8 pb-4 pt-2">
                <p className="m-0 text-[14px] leading-relaxed" style={{ color: TEXT_MUTED }}>
                    Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung für ganze Kategorien geben oder sich weitere Informationen anzeigen lassen.
                </p>
            </div>

            <div style={{ height: 1, width: '100%', backgroundColor: '#e2e8f0' }} />

            <div className="px-8 pt-5">
                <div className="flex flex-wrap items-center gap-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className="rounded-[4px] px-5 py-2 text-[14px] font-bold transition-colors"
                            style={
                                activeTab === tab.id
                                    ? { backgroundColor: BLUE, color: '#ffffff' }
                                    : { backgroundColor: 'transparent', color: TEXT_HEADING }
                            }
                            onMouseOver={(e) => {
                                if (activeTab !== tab.id) e.currentTarget.style.color = BLUE;
                            }}
                            onMouseOut={(e) => {
                                if (activeTab !== tab.id) e.currentTarget.style.color = TEXT_HEADING;
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {(activeTab === 'groups' || activeTab === 'history') && (
                    <div className="mt-4 flex justify-end gap-2">
                        <NavyButton className="px-4 py-2">Alle auswählen</NavyButton>
                        <NavyButton className="px-4 py-2">Alle abwählen</NavyButton>
                    </div>
                )}

                <div className="mt-4 pb-2">
                    {activeTab === 'groups' && (
                        <CategoryCard
                            title="Essenziell"
                            badge="Aktiv"
                            description="Essenzielle Services ermöglichen grundlegende Funktionen und sind für das ordnungsgemäße Funktionieren der Website erforderlich."
                        />
                    )}

                    {activeTab === 'history' && (
                        <>
                            <CategoryCard
                                title="Essenziell"
                                badge="Aktiv"
                                description="Essenzielle Services ermöglichen grundlegende Funktionen und sind für das ordnungsgemäße Funktionieren der Website erforderlich."
                            />
                            <div
                                className="rounded-[6px] border border-[#e8ecf0] bg-[#f4f6f8] px-6 py-10 text-center text-[15px]"
                                style={{ color: TEXT_MUTED }}
                            >
                                Es liegt keine Einwilligungshistorie vor.
                            </div>
                        </>
                    )}

                    {activeTab === 'services' && (
                        <div className="overflow-hidden rounded-[6px] border border-slate-200 bg-white">
                            <table className="w-full text-left text-[15px]">
                                <thead className="border-b border-slate-200 bg-slate-100">
                                    <tr>
                                        <th className="px-5 py-3.5 font-bold text-[#1e293b]">Service</th>
                                        <th className="px-5 py-3.5 font-bold text-[#1e293b]">Gruppe</th>
                                        <th className="px-5 py-3.5 font-bold text-[#1e293b]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        className="cursor-pointer border-b border-slate-200 hover:bg-slate-50"
                                        onClick={() => setExpandedService(expandedService === 'borlabs' ? null : 'borlabs')}
                                    >
                                        <td className="px-5 py-4">
                                            <span className="flex items-center gap-2 font-semibold" style={{ color: BLUE }}>
                                                {expandedService === 'borlabs' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                                Borlabs Cookie
                                            </span>
                                        </td>
                                        <td className="px-5 py-4" style={{ color: TEXT_MUTED }}>Essenziell</td>
                                        <td className="px-5 py-4">
                                            <span className="relative inline-block h-[22px] w-[42px]">
                                                <span className="absolute inset-0 rounded-full bg-[#10b981]" />
                                                <span className="absolute bottom-[3px] left-[23px] h-4 w-4 rounded-full bg-white" />
                                            </span>
                                        </td>
                                    </tr>
                                    {expandedService === 'borlabs' && (
                                        <tr className="bg-[#f8fafc]">
                                            <td colSpan={3} className="p-0">
                                                <table className="w-full text-[14px] text-[#334155]">
                                                    <tbody>
                                                        <tr className="border-b border-slate-100"><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Name</td><td className="px-8 py-3.5 font-medium">Borlabs Cookie</td></tr>
                                                        <tr className="border-b border-slate-100"><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Anbieter</td><td className="px-8 py-3.5">Eigentümer dieser Website</td></tr>
                                                        <tr className="border-b border-slate-100"><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Zweck</td><td className="px-8 py-3.5">Speichert die Einstellungen der Besucher, die in der Cookie Box von Borlabs Cookie ausgewählt wurden.</td></tr>
                                                        <tr className="border-b border-slate-100"><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Datenschutzerklärung</td><td className="px-8 py-3.5"><Link to="/datenschutz" className="hover:underline" style={{ color: BLUE }} onClick={closeMenu}>Link</Link></td></tr>
                                                        <tr className="border-b border-slate-100"><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Host(s)</td><td className="px-8 py-3.5">hd-engineering.de</td></tr>
                                                        <tr><td className="w-1/3 px-8 py-3.5 font-bold text-[#64748b]">Cookie Name & Laufzeit</td><td className="px-8 py-3.5 font-mono text-[13px]">borlabs-cookie (1 Jahr)</td></tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {activeTab === 'provider' && (
                        <div className="overflow-hidden rounded-[6px] border border-slate-200 bg-white">
                            <table className="w-full text-left text-[15px]">
                                <thead className="border-b border-slate-200 bg-slate-100">
                                    <tr>
                                        <th className="px-5 py-3.5 font-bold text-[#1e293b]">Provider</th>
                                        <th className="px-5 py-3.5 font-bold text-[#1e293b]">Datenschutzerklärung</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-200 hover:bg-slate-50">
                                        <td className="px-5 py-4" style={{ color: TEXT_MUTED }}>Eigentümer dieser Website</td>
                                        <td className="px-5 py-4">
                                            <Link to="/datenschutz" className="hover:underline" style={{ color: BLUE }} onClick={closeMenu}>Link</Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            <div style={{ height: 1, width: '100%', backgroundColor: '#e2e8f0', marginTop: 8 }} />

            <div className="flex flex-col gap-3 px-8 py-5 sm:flex-row">
                <BlueButton onClick={handleSave} className="flex-1 py-3">Speichern</BlueButton>
                <BlueButton onClick={handleAcceptAll} className="flex-1 py-3">Alle akzeptieren</BlueButton>
                <BlueButton onClick={handleAcceptEssential} className="flex-1 py-3">Nur essenzielle Cookies akzeptieren</BlueButton>
            </div>
        </div>
    );
}

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);
    const [showWidget, setShowWidget] = useState(false);
    const [view, setView] = useState('initial');
    const [activeTab, setActiveTab] = useState('groups');
    const [expandedService, setExpandedService] = useState(null);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => {
                setView('initial');
                setIsOpen(true);
            }, 100);
            return () => clearTimeout(timer);
        }
        setShowWidget(true);
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'all');
        setIsOpen(false);
        setShowWidget(true);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setIsOpen(false);
        setShowWidget(true);
    };

    const handleSave = () => {
        const consent = localStorage.getItem('cookieConsent') || 'essential';
        localStorage.setItem('cookieConsent', consent === 'all' ? 'all' : 'essential');
        setIsOpen(false);
        setShowWidget(true);
    };

    const openModal = (nextView = 'details') => {
        setView(nextView);
        setActiveTab('groups');
        setExpandedService(null);
        setIsOpen(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setShowWidget(true);
        setTimeout(() => setView('initial'), 300);
    };

    const openDetails = () => {
        setView('details');
        setActiveTab('groups');
        setExpandedService(null);
    };

    return (
        <div className="font-sans">
            {showWidget && !isOpen && (
                <button
                    type="button"
                    onClick={() => openModal('details')}
                    aria-label="Datenschutz-Präferenzen öffnen"
                    style={{
                        position: 'fixed',
                        bottom: 24,
                        left: 24,
                        zIndex: 2147483647,
                        width: 56,
                        height: 56,
                        borderRadius: '50%',
                        backgroundColor: '#1f6fe5',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 14px 30px -14px rgba(31,111,229,0.8)',
                        transition: 'transform 0.2s ease, background-color 0.2s ease',
                    }}
                    onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#195fca';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#1f6fe5';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    <img
                        src="https://hek-praezisionstechnik.de/wp-content/plugins/borlabs-cookie/assets/images/borlabs-cookie-widget-b.svg#main"
                        alt="Datenschutz Fingerabdruck"
                        style={{ width: 36, height: 36, objectFit: 'contain' }}
                    />
                </button>
            )}

            {isOpen && (
                <div
                    role="presentation"
                    onClick={closeMenu}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 2147483647,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 16,
                        backgroundColor: 'rgba(0, 0, 0, 0.55)',
                        backdropFilter: 'blur(3px)',
                    }}
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="cookie-consent-title"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            width: `min(92vw, ${MODAL_WIDTH}px)`,
                            maxWidth: MODAL_WIDTH,
                            maxHeight: '90vh',
                            overflow: 'hidden',
                            backgroundColor: '#ffffff',
                            borderRadius: 12,
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1)',
                        }}
                    >
                        <div className="flex shrink-0 items-center justify-between px-8 py-5">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6" width={32} height={32} aria-hidden>
                                    <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                <h2 id="cookie-consent-title" className="m-0 text-[22px] font-bold" style={{ color: TEXT_HEADING }}>
                                    Datenschutz-Präferenz
                                </h2>
                            </div>
                            <button
                                type="button"
                                onClick={closeMenu}
                                aria-label="Schließen"
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: '50%',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#64748b',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; }}
                                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                                <X size={20} strokeWidth={2} />
                            </button>
                        </div>

                        <div style={{ height: 1, width: '100%', backgroundColor: '#e2e8f0' }} />

                        <div className="overflow-y-auto" style={{ maxHeight: 'calc(90vh - 130px)' }}>
                            {view === 'initial' && (
                                <div className="px-8 py-5">
                                    <p className="m-0 mb-4 text-[15px] leading-relaxed" style={{ color: TEXT_MUTED }}>
                                        Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.
                                    </p>
                                    <p className="m-0 mb-4 text-[15px] leading-relaxed" style={{ color: TEXT_MUTED }}>
                                        Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer{' '}
                                        <Link to="/datenschutz" className="hover:underline" style={{ color: BLUE }} onClick={closeMenu}>Datenschutzerklärung</Link>.
                                    </p>
                                    <p className="m-0 mb-6 text-[15px] leading-relaxed" style={{ color: TEXT_MUTED }}>
                                        Sie können Ihre Auswahl jederzeit unter Einstellungen widerrufen oder anpassen.
                                    </p>
                                    <div className="flex flex-col gap-3">
                                        <BlueButton onClick={handleSave} className="w-full py-3">Einwilligung speichern</BlueButton>
                                        <BlueButton onClick={handleAcceptAll} className="w-full py-3">Ich akzeptiere alle</BlueButton>
                                        <BlueButton onClick={handleAcceptEssential} className="w-full py-3">Nur essenzielle Cookies akzeptieren</BlueButton>
                                        <button
                                            type="button"
                                            onClick={openDetails}
                                            className="w-full rounded-[4px] py-3 text-[14.5px] font-bold text-white transition-colors"
                                            style={{ backgroundColor: NAVY }}
                                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#000000'; }}
                                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = NAVY; }}
                                        >
                                            Individuelle Datenschutz-Präferenzen
                                        </button>
                                    </div>
                                </div>
                            )}

                            {view === 'details' && (
                                <DetailsView
                                    activeTab={activeTab}
                                    setActiveTab={setActiveTab}
                                    expandedService={expandedService}
                                    setExpandedService={setExpandedService}
                                    closeMenu={closeMenu}
                                    handleSave={handleSave}
                                    handleAcceptAll={handleAcceptAll}
                                    handleAcceptEssential={handleAcceptEssential}
                                />
                            )}
                        </div>

                        <div style={{ height: 1, width: '100%', backgroundColor: '#e2e8f0' }} />

                        <div
                            className="flex shrink-0 items-center justify-between px-8 py-4"
                            style={{ color: '#64748b', fontSize: 13.5 }}
                        >
                            <button
                                type="button"
                                onClick={() => openModal('details')}
                                style={{ border: 'none', background: 'transparent', color: '#64748b', cursor: 'pointer', padding: 0 }}
                                onMouseOver={(e) => { e.currentTarget.style.color = '#0f172a'; }}
                                onMouseOut={(e) => { e.currentTarget.style.color = '#64748b'; }}
                            >
                                Präferenzen
                            </button>
                            <span className="flex items-center gap-1.5" style={{ color: '#64748b' }}>
                                <Settings size={16} />
                                Borlabs Cookie
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
