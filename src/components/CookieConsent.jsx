import React, { useState, useEffect } from 'react';
import { ShieldCheck, Settings, X, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CookieConsent() {
    const [isOpen, setIsOpen] = useState(false);
    const [consentGiven, setConsentGiven] = useState(false);
    const [marketingChecked, setMarketingChecked] = useState(false);
    const [activeTab, setActiveTab] = useState('groups'); // groups, services, provider, history
    const [expandedService, setExpandedService] = useState(null);

    useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
            const timer = setTimeout(() => setIsOpen(true), 100);
            return () => clearTimeout(timer);
        } else {
            setConsentGiven(true);
            if (consent === 'all') setMarketingChecked(true);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem('cookieConsent', 'all');
        setMarketingChecked(true);
        setConsentGiven(true);
        setIsOpen(false);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem('cookieConsent', 'essential');
        setMarketingChecked(false);
        setConsentGiven(true);
        setIsOpen(false);
    };

    const handleSave = () => {
        localStorage.setItem('cookieConsent', marketingChecked ? 'all' : 'essential');
        setConsentGiven(true);
        setIsOpen(false);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    if (!isOpen && !consentGiven) return null;

    return (
        <div className="font-sans">
            {/* Borlabs Fingerprint Button - Exact Image from Vercel */}
            <button 
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-5 left-4 z-[60] inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#1f6fe5] text-white shadow-[0_14px_30px_-14px_rgba(31,111,229,0.8)] transition hover:scale-105 hover:bg-[#195fca] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6fe5] sm:bottom-6 sm:left-6 ${isOpen ? 'hidden' : ''}`}
                aria-label="Datenschutz-Präferenzen öffnen"
            >
                <img src="https://hek-praezisionstechnik.de/wp-content/plugins/borlabs-cookie/assets/images/borlabs-cookie-widget-b.svg#main" alt="Datenschutz Fingerabdruck" className="h-9 w-9 object-contain" />
            </button>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-[100000] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[2px]">
                    <div className="relative max-h-[95vh] w-full max-w-[850px] flex flex-col overflow-hidden rounded-[8px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)]">
                        
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4">
                            <div className="flex items-center gap-3">
                                <ShieldCheck className="h-7 w-7 text-[#2563eb]" strokeWidth={2.5} />
                                <h2 className="m-0 text-[26px] font-bold text-[#0f172a] tracking-tight">Datenschutz-Präferenz</h2>
                            </div>
                            <button 
                                onClick={closeMenu}
                                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700"
                            >
                                <X className="h-5 w-5" strokeWidth={2} />
                            </button>
                        </div>
                        <div className="h-px w-full bg-slate-200"></div>

                        {/* Body Container */}
                        <div className="flex-1 overflow-y-auto bg-white">
                            {/* Intro Text */}
                            <div className="px-6 py-5">
                                <p className="m-0 text-[15px] leading-relaxed text-[#475569]">
                                    Hier finden Sie eine Übersicht über alle verwendeten Cookies. Sie können Ihre Einwilligung für ganze Kategorien geben oder sich weitere Informationen anzeigen lassen.
                                </p>
                            </div>
                            <div className="h-px w-full bg-slate-200"></div>

                            {/* Tabs Row */}
                            <div className="flex flex-wrap items-center gap-1 px-6 py-2">
                                <button onClick={() => setActiveTab('groups')} className={`px-5 py-2.5 text-[14.5px] font-bold transition-colors ${activeTab === 'groups' ? 'bg-[#2563eb] text-white' : 'text-[#475569] hover:text-[#0f172a]'}`}>Service-Gruppen</button>
                                <button onClick={() => setActiveTab('services')} className={`px-5 py-2.5 text-[14.5px] font-bold transition-colors ${activeTab === 'services' ? 'bg-[#2563eb] text-white' : 'text-[#475569] hover:text-[#0f172a]'}`}>Services</button>
                                <button onClick={() => setActiveTab('provider')} className={`px-5 py-2.5 text-[14.5px] font-bold transition-colors ${activeTab === 'provider' ? 'bg-[#2563eb] text-white' : 'text-[#475569] hover:text-[#0f172a]'}`}>Provider</button>
                                <button onClick={() => setActiveTab('history')} className={`px-5 py-2.5 text-[14.5px] font-bold transition-colors ${activeTab === 'history' ? 'bg-[#2563eb] text-white' : 'text-[#475569] hover:text-[#0f172a]'}`}>Einwilligung-Historie</button>
                            </div>
                            <div className="h-px w-full bg-slate-200"></div>

                            {/* Main Content Area */}
                            <div className="px-6 py-5">
                                {/* Select All Actions */}
                                <div className="mb-4 flex justify-end gap-3">
                                    <button onClick={() => setMarketingChecked(true)} className="rounded-[4px] bg-[#0f172a] px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-black">Alle auswählen</button>
                                    <button onClick={() => setMarketingChecked(false)} className="rounded-[4px] bg-[#0f172a] px-5 py-2.5 text-[14px] font-bold text-white transition-colors hover:bg-black">Alle abwählen</button>
                                </div>

                                {/* TAB CONTENT: Service-Gruppen */}
                                {activeTab === 'groups' && (
                                    <>
                                        <div className="mb-4 rounded-[6px] border border-slate-200 bg-[#f8fafc] px-6 py-5">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-[17px] font-bold text-[#0f172a]">Essenziell</span>
                                                <span className="rounded-full bg-[#dcfce7] px-3.5 py-1 text-[13px] font-bold text-[#166534]">Aktiv</span>
                                            </div>
                                            <p className="m-0 text-[15px] leading-relaxed text-[#475569]">Essenzielle Services ermöglichen grundlegende Funktionen und sind für das ordnungsgemäße Funktionieren der Website erforderlich.</p>
                                        </div>

                                        <div className="mb-4 rounded-[6px] border border-slate-200 bg-[#f8fafc] px-6 py-5">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-[17px] font-bold text-[#0f172a]">Marketing</span>
                                                <div 
                                                    onClick={() => setMarketingChecked(!marketingChecked)}
                                                    className={`relative inline-block h-[24px] w-[44px] cursor-pointer rounded-full transition-colors duration-300 ${marketingChecked ? 'bg-[#10b981]' : 'bg-[#cbd5e1]'}`}
                                                >
                                                    <div className={`absolute bottom-[3px] h-[18px] w-[18px] rounded-full bg-white shadow-sm transition-transform duration-300 ${marketingChecked ? 'translate-x-[23px]' : 'translate-x-[3px]'}`}></div>
                                                </div>
                                            </div>
                                            <p className="m-0 text-[15px] leading-relaxed text-[#475569]">Marketing-Cookies werden von Drittanbietern oder Publishern verwendet, um personalisierte Werbung anzuzeigen. Sie tun dies, indem sie Besucher über Websites hinweg verfolgen.</p>
                                        </div>
                                    </>
                                )}

                                {/* TAB CONTENT: Services */}
                                {activeTab === 'services' && (
                                    <div className="mb-4 overflow-hidden rounded-[6px] border border-slate-200 bg-white">
                                        <table className="w-full text-left text-[15px]">
                                            <thead className="border-b border-slate-200 bg-slate-100">
                                                <tr>
                                                    <th className="px-5 py-3.5 font-bold text-[#1e293b]">Service</th>
                                                    <th className="px-5 py-3.5 font-bold text-[#1e293b]">Gruppe</th>
                                                    <th className="px-5 py-3.5 font-bold text-[#1e293b]">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="cursor-pointer border-b border-slate-200 hover:bg-slate-50" onClick={() => setExpandedService(expandedService === 'borlabs' ? null : 'borlabs')}>
                                                    <td className="px-5 py-4 font-semibold text-[#2563eb] flex items-center gap-2">
                                                        {expandedService === 'borlabs' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Borlabs Cookie
                                                    </td>
                                                    <td className="px-5 py-4 text-[#475569]">Essenziell</td>
                                                    <td className="px-5 py-4">
                                                        <div className="relative inline-block h-[22px] w-[42px] cursor-not-allowed rounded-full bg-[#10b981] opacity-70">
                                                            <div className="absolute bottom-[3px] left-[23px] h-4 w-4 rounded-full bg-white"></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedService === 'borlabs' && (
                                                    <tr className="bg-[#f8fafc]">
                                                        <td colSpan="3" className="p-0">
                                                            <table className="w-full text-[14px] text-[#334155]">
                                                                <tbody>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Name</td><td className="px-8 py-3.5 font-medium">Borlabs Cookie</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Anbieter</td><td className="px-8 py-3.5">Eigentümer dieser Website</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Zweck</td><td className="px-8 py-3.5">Speichert die Einstellungen der Besucher, die in der Cookie Box von Borlabs Cookie ausgewählt wurden.</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Datenschutzerklärung</td><td className="px-8 py-3.5"><Link to="/datenschutz" className="text-[#2563eb] hover:underline" onClick={closeMenu}>Link</Link></td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Host(s)</td><td className="px-8 py-3.5">hd-engineering.de</td></tr>
                                                                    <tr><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Cookie Name & Laufzeit</td><td className="px-8 py-3.5 font-mono text-[13px]">borlabs-cookie (1 Jahr)</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                                <tr className="cursor-pointer border-b border-slate-200 hover:bg-slate-50" onClick={() => setExpandedService(expandedService === 'ga' ? null : 'ga')}>
                                                    <td className="px-5 py-4 font-semibold text-[#2563eb] flex items-center gap-2">
                                                        {expandedService === 'ga' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />} Google Analytics
                                                    </td>
                                                    <td className="px-5 py-4 text-[#475569]">Marketing</td>
                                                    <td className="px-5 py-4">
                                                        <div 
                                                            onClick={(e) => { e.stopPropagation(); setMarketingChecked(!marketingChecked); }}
                                                            className={`relative inline-block h-[22px] w-[42px] cursor-pointer rounded-full transition-colors duration-300 ${marketingChecked ? 'bg-[#10b981]' : 'bg-[#cbd5e1]'}`}
                                                        >
                                                            <div className={`absolute bottom-[3px] h-4 w-4 rounded-full bg-white transition-transform duration-300 ${marketingChecked ? 'translate-x-[23px]' : 'translate-x-[3px]'}`}></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                {expandedService === 'ga' && (
                                                    <tr className="bg-[#f8fafc]">
                                                        <td colSpan="3" className="p-0">
                                                            <table className="w-full text-[14px] text-[#334155]">
                                                                <tbody>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Name</td><td className="px-8 py-3.5 font-medium">Google Analytics</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Anbieter</td><td className="px-8 py-3.5">Google LLC</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Zweck</td><td className="px-8 py-3.5">Cookie von Google für Website-Analysen. Erzeugt statistische Daten darüber, wie der Besucher die Website nutzt.</td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Datenschutzerklärung</td><td className="px-8 py-3.5"><a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="text-[#2563eb] hover:underline">Link</a></td></tr>
                                                                    <tr className="border-b border-slate-100"><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Host(s)</td><td className="px-8 py-3.5">google.com</td></tr>
                                                                    <tr><td className="px-8 py-3.5 font-bold text-[#64748b] w-1/3">Cookie Name & Laufzeit</td><td className="px-8 py-3.5 font-mono text-[13px]">_ga (2 Jahre), _gid (1 Tag)</td></tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* TAB CONTENT: Provider */}
                                {activeTab === 'provider' && (
                                    <div className="mb-4 overflow-hidden rounded-[6px] border border-slate-200 bg-white">
                                        <table className="w-full text-left text-[15px]">
                                            <thead className="border-b border-slate-200 bg-slate-100">
                                                <tr>
                                                    <th className="px-5 py-3.5 font-bold text-[#1e293b]">Provider</th>
                                                    <th className="px-5 py-3.5 font-bold text-[#1e293b]">Datenschutzerklärung</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="border-b border-slate-200 hover:bg-slate-50">
                                                    <td className="px-5 py-4 text-[#475569]">Eigentümer dieser Website</td>
                                                    <td className="px-5 py-4"><Link to="/datenschutz" className="text-[#2563eb] hover:underline" onClick={closeMenu}>Link</Link></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                )}

                                {/* TAB CONTENT: History */}
                                {activeTab === 'history' && (
                                    <div className="mb-4 rounded-[6px] border border-slate-200 bg-[#f8fafc] px-6 py-8 text-center text-[15px] text-[#475569]">
                                        Es liegt keine Einwilligungshistorie vor.
                                    </div>
                                )}
                            </div>

                            <div className="h-px w-full bg-slate-200"></div>

                            {/* Three Side-by-side Blue Buttons */}
                            <div className="px-6 py-5 flex flex-col gap-4 sm:flex-row">
                                <button onClick={handleSave} className="flex-1 rounded-[6px] bg-[#2563eb] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1d4ed8]">Speichern</button>
                                <button onClick={handleAcceptAll} className="flex-1 rounded-[6px] bg-[#2563eb] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1d4ed8]">Alle akzeptieren</button>
                                <button onClick={handleAcceptEssential} className="flex-1 rounded-[6px] bg-[#2563eb] py-3.5 text-[15px] font-bold text-white transition-colors hover:bg-[#1d4ed8]">Nur essenzielle Cookies akzeptieren</button>
                            </div>
                        </div>

                        <div className="h-px w-full bg-slate-200"></div>

                        {/* Footer Section */}
                        <div className="flex items-center justify-center gap-3 bg-[#f1f5f9] px-6 py-4 text-[13.5px] text-[#64748b]">
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
