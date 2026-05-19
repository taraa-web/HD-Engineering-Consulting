import React, { useState, useEffect } from 'react';
import { Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState('initial'); // 'initial' or 'details'
    const [activeTab, setActiveTab] = useState('groups'); // 'groups', 'services', 'provider', 'history'
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [expandedService, setExpandedService] = useState(null);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => setIsOpen(true), 100);
            return () => clearTimeout(timer);
        } else {
            if (consent === 'all') setMarketingChecked(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'all');
        setMarketingChecked(true);
        setIsOpen(false);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setMarketingChecked(false);
        setIsOpen(false);
    };

    const handleSave = () => {
        localStorage.setItem('cookieConsent', marketingChecked ? 'all' : 'essential');
        setIsOpen(false);
    };

    const openDetails = () => {
        setView('details');
    };

    const closeMenu = () => {
        setIsOpen(false);
        // Reset to initial view for next time
        setTimeout(() => setView('initial'), 300);
    };

    return (
        <div className="font-sans">
            {/* Borlabs Fingerprint Button */}
            <button 
                onClick={() => { setIsOpen(true); setView('initial'); }}
                className="fixed bottom-5 left-4 inline-flex h-14 w-14 items-center justify-center rounded-full text-white transition hover:scale-105 sm:bottom-6 sm:left-6"
                style={{ 
                    zIndex: 2147483647, 
                    backgroundColor: '#1f6fe5', 
                    boxShadow: '0 14px 30px -14px rgba(31,111,229,0.8)' 
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#195fca'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#1f6fe5'}
                aria-label="Datenschutz-Präferenzen öffnen"
            >
                <img src="https://hek-praezisionstechnik.de/wp-content/plugins/borlabs-cookie/assets/images/borlabs-cookie-widget-b.svg#main" alt="Datenschutz Fingerabdruck" className="h-9 w-9 object-contain" />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 flex items-center justify-center p-4"
                    style={{ zIndex: 2147483647, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
                >
                    <div 
                        className="relative max-h-[95vh] w-full max-w-[850px] flex flex-col overflow-hidden bg-white"
                        style={{ 
                            borderRadius: '8px', 
                            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)' 
                        }}
                    >
                        
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-5">
                            <div className="flex items-center gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#3b82f6" className="h-8 w-8">
                                  <path fillRule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                </svg>
                                <h2 className="m-0 text-[24px] font-bold tracking-tight" style={{ color: '#0f172a' }}>Datenschutz-Präferenz</h2>
                            </div>
                            <button 
                                onClick={closeMenu}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" strokeWidth={2} />
                            </button>
                        </div>
                        <div style={{ height: '1px', width: '100%', backgroundColor: '#e2e8f0' }}></div>

                        {/* Body Container (Scrollable) */}
                        <div className="w-full bg-white overflow-y-auto" style={{ maxHeight: 'calc(95vh - 140px)' }}>
                            
                            {/* INITIAL VIEW */}
                            {view === 'initial' && (
                                <div className="px-6 py-5">
                                    <p className="m-0 text-[15px] leading-relaxed" style={{ color: '#475569', marginBottom: '16px' }}>
                                        Wir nutzen Cookies auf unserer Website. Einige von ihnen sind essenziell, während andere uns helfen, diese Website und Ihre Erfahrung zu verbessern.
                                    </p>
                                    <p className="m-0 text-[15px] leading-relaxed" style={{ color: '#475569', marginBottom: '16px' }}>
                                        Personenbezogene Daten können verarbeitet werden (z. B. IP-Adressen), z. B. für personalisierte Anzeigen und Inhalte oder Anzeigen- und Inhaltsmessung. Weitere Informationen über die Verwendung Ihrer Daten finden Sie in unserer <Link to="/datenschutz" className="hover:underline" style={{ color: '#2563eb' }} onClick={closeMenu}>Datenschutzerklärung</Link>.
                                    </p>
                                    <p className="m-0 text-[15px] leading-relaxed" style={{ color: '#475569', marginBottom: '24px' }}>
                                        Sie können Ihre Auswahl jederzeit unter Einstellungen widerrufen oder anpassen.
                                    </p>
                                    
                                    <div className="flex flex-col gap-3">
                                        <button onClick={handleSave} className="w-full py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Einwilligung speichern</button>
                                        <button onClick={handleAcceptAll} className="w-full py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Ich akzeptiere alle</button>
                                        <button onClick={handleAcceptEssential} className="w-full py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Nur essenzielle Cookies akzeptieren</button>
                                        <button onClick={openDetails} className="w-full py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#0f172a', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000000'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}>Individuelle Datenschutz-Präferenzen</button>
                                    </div>
                                </div>
                            )}

                            {/* DETAILED VIEW */}
                            {view === 'details' && (
                                <div>
                                    <div className="px-6 py-5">
                                        <p className="m-0 text-[15px] leading-relaxed" style={{ color: '#475569' }}>
                                            Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung für ganze Kategorien geben oder sich weitere Informationen anzeigen lassen.
                                        </p>
                                    </div>
                                    <div style={{ height: '1px', width: '100%', backgroundColor: '#e2e8f0' }}></div>

                                    {/* Tabs Row */}
                                    <div className="flex flex-wrap items-center px-6 pt-4 border-b border-slate-200">
                                        <button onClick={() => setActiveTab('groups')} className="mr-8 pb-4 text-[14.5px] font-bold transition-colors -mb-px" style={{ borderBottom: activeTab === 'groups' ? '3px solid #2563eb' : '3px solid transparent', color: activeTab === 'groups' ? '#0f172a' : '#475569' }}>Service-Gruppen</button>
                                        <button onClick={() => setActiveTab('services')} className="mr-8 pb-4 text-[14.5px] font-bold transition-colors -mb-px" style={{ borderBottom: activeTab === 'services' ? '3px solid #2563eb' : '3px solid transparent', color: activeTab === 'services' ? '#0f172a' : '#475569' }}>Services</button>
                                        <button onClick={() => setActiveTab('provider')} className="mr-8 pb-4 text-[14.5px] font-bold transition-colors -mb-px" style={{ borderBottom: activeTab === 'provider' ? '3px solid #2563eb' : '3px solid transparent', color: activeTab === 'provider' ? '#0f172a' : '#475569' }}>Provider</button>
                                        <div className="pb-4 -mb-px flex items-center">
                                            <button onClick={() => setActiveTab('history')} className="px-5 py-2 text-[14px] font-bold transition-colors text-white" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Einwilligung-Historie</button>
                                        </div>
                                    </div>

                                    <div className="px-6 py-5">
                                        {/* Select All Actions */}
                                        <div className="mb-4 flex justify-end gap-2">
                                            <button onClick={() => setMarketingChecked(true)} className="px-4 py-2 text-[13px] font-bold text-white transition-colors" style={{ backgroundColor: '#0f172a', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000000'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}>Alle auswählen</button>
                                            <button onClick={() => setMarketingChecked(false)} className="px-4 py-2 text-[13px] font-bold text-white transition-colors" style={{ backgroundColor: '#0f172a', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#000000'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#0f172a'}>Alle abwählen</button>
                                        </div>

                                        {/* TAB CONTENT */}
                                        {activeTab === 'groups' && (
                                            <div className="mb-4 bg-transparent px-0 py-2">
                                                <div className="mb-3 flex items-center justify-between">
                                                    <span className="text-[17px] font-bold" style={{ color: '#0f172a' }}>Essenziell</span>
                                                    <span className="px-3.5 py-1 text-[12px] font-bold" style={{ backgroundColor: '#dcfce7', color: '#166534', borderRadius: '9999px' }}>Aktiv</span>
                                                </div>
                                                <p className="m-0 text-[14.5px] leading-relaxed" style={{ color: '#475569' }}>Essenzielle Services ermöglichen grundlegende Funktionen und sind für das ordnungsgemäße Funktionieren der Website erforderlich.</p>
                                            </div>
                                        )}

                                        {activeTab === 'services' && (
                                            <div className="mb-4 overflow-hidden border border-slate-200 bg-white" style={{ borderRadius: '6px' }}>
                                                <table className="w-full text-left text-[15px]">
                                                    <thead className="border-b border-slate-200 bg-slate-100">
                                                        <tr>
                                                            <th className="px-5 py-3.5 font-bold" style={{ color: '#1e293b' }}>Service</th>
                                                            <th className="px-5 py-3.5 font-bold" style={{ color: '#1e293b' }}>Gruppe</th>
                                                            <th className="px-5 py-3.5 font-bold" style={{ color: '#1e293b' }}>Status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="cursor-pointer border-b border-slate-200 hover:bg-slate-50" onClick={() => setExpandedService(expandedService === 'borlabs' ? null : 'borlabs')}>
                                                            <td className="px-5 py-4 font-semibold flex items-center gap-2" style={{ color: '#2563eb' }}>
                                                                {expandedService === 'borlabs' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Borlabs Cookie
                                                            </td>
                                                            <td className="px-5 py-4" style={{ color: '#475569' }}>Essenziell</td>
                                                            <td className="px-5 py-4">
                                                                <div className="relative inline-block h-[22px] w-[42px] cursor-not-allowed opacity-70" style={{ backgroundColor: '#10b981', borderRadius: '9999px' }}>
                                                                    <div className="absolute bottom-[3px] left-[23px] h-4 w-4 bg-white" style={{ borderRadius: '9999px' }}></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        {expandedService === 'borlabs' && (
                                                            <tr style={{ backgroundColor: '#f8fafc' }}>
                                                                <td colSpan="3" className="p-0">
                                                                    <table className="w-full text-[14px]" style={{ color: '#334155' }}>
                                                                        <tbody>
                                                                            <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Name</td><td className="px-8 py-3.5 font-medium">Borlabs Cookie</td></tr>
                                                                            <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Anbieter</td><td className="px-8 py-3.5">Eigentümer dieser Website</td></tr>
                                                                            <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Zweck</td><td className="px-8 py-3.5">Speichert die Einstellungen der Besucher, die in der Cookie Box von Borlabs Cookie ausgewählt wurden.</td></tr>
                                                                            <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Datenschutzerklärung</td><td className="px-8 py-3.5"><Link to="/datenschutz" className="hover:underline" style={{ color: '#2563eb' }} onClick={closeMenu}>Link</Link></td></tr>
                                                                            <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Host(s)</td><td className="px-8 py-3.5">hd-engineering.de</td></tr>
                                                                            <tr><td className="px-8 py-3.5 font-bold w-1/3" style={{ color: '#64748b' }}>Cookie Name & Laufzeit</td><td className="px-8 py-3.5 font-mono text-[13px]">borlabs-cookie (1 Jahr)</td></tr>
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
                                            <div className="mb-4 overflow-hidden border border-slate-200 bg-white" style={{ borderRadius: '6px' }}>
                                                <table className="w-full text-left text-[15px]">
                                                    <thead className="border-b border-slate-200 bg-slate-100">
                                                        <tr>
                                                            <th className="px-5 py-3.5 font-bold" style={{ color: '#1e293b' }}>Provider</th>
                                                            <th className="px-5 py-3.5 font-bold" style={{ color: '#1e293b' }}>Datenschutzerklärung</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr className="border-b border-slate-200 hover:bg-slate-50">
                                                            <td className="px-5 py-4" style={{ color: '#475569' }}>Eigentümer dieser Website</td>
                                                            <td className="px-5 py-4"><Link to="/datenschutz" className="hover:underline" style={{ color: '#2563eb' }} onClick={closeMenu}>Link</Link></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}

                                        {activeTab === 'history' && (
                                            <div className="mb-4 border border-slate-200 px-6 py-8 text-center text-[15px]" style={{ backgroundColor: '#f8fafc', color: '#475569', borderRadius: '6px' }}>
                                                Es liegt keine Einwilligungshistorie vor.
                                            </div>
                                        )}
                                    </div>

                                    <div style={{ height: '1px', width: '100%', backgroundColor: '#e2e8f0' }}></div>

                                    <div className="px-6 py-5 flex flex-col gap-3 sm:flex-row">
                                        <button onClick={handleSave} className="flex-1 py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Speichern</button>
                                        <button onClick={handleAcceptAll} className="flex-1 py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Alle akzeptieren</button>
                                        <button onClick={handleAcceptEssential} className="flex-1 py-3 text-[14.5px] font-bold text-white transition-colors" style={{ backgroundColor: '#2563eb', borderRadius: '4px' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}>Nur essenzielle Cookies akzeptieren</button>
                                    </div>
                                </div>
                            )}

                        </div>

                        <div style={{ height: '1px', width: '100%', backgroundColor: '#e2e8f0' }}></div>

                        {/* Footer Section */}
                        <div className="flex items-center justify-center gap-6 bg-white px-6 py-4 text-[13.5px]" style={{ color: '#64748b' }}>
                            <button onClick={() => {}} className="hover:text-slate-900 transition-colors">Präferenzen</button>
                            <span className="flex items-center gap-1.5 hover:text-slate-900 transition-colors cursor-pointer">
                                <Settings className="h-4 w-4" /> Borlabs Cookie
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

