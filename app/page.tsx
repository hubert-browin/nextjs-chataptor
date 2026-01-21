'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- STYLES FOR ANIMATIONS ---
const styles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 40s linear infinite;
  }
  .mask-gradient {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
  /* Custom scrollbar for mockup */
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e2e8f0;
    border-radius: 20px;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.5);
  }
  .glass-card-dark {
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

// --- MOCK DATA ---
const conversations = [
  {
    id: 1,
    name: 'Hans Müller',
    time: '2m',
    lastMessage: 'Wo ist meine Bestellung?',
    lang: 'DE',
    source: 'Messenger', 
    avatarColor: 'bg-indigo-100 text-indigo-600',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'Hallo, wo ist meine Bestellung?',
        translation: 'Cześć, gdzie jest moje zamówienie?', 
        timestamp: '10:23'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Sprawdzam to dla Ciebie, daj mi chwilę.',
        translation: 'Ich überprüfe das für Sie, einen Moment bitte.', 
        timestamp: '10:24'
      }
    ]
  },
  {
    id: 2,
    name: 'Pierre Dubois',
    time: '15m',
    lastMessage: 'Produit endommagé...',
    lang: 'FR',
    source: 'Email',
    avatarColor: 'bg-emerald-100 text-emerald-600',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'Bonjour, mon produit est arrivé endommagé.',
        translation: 'Dzień dobry, mój produkt dotarł uszkodzony.',
        timestamp: '09:45'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Bardzo mi przykro. Czy możesz przesłać zdjęcie?',
        translation: 'Je suis désolé. Pouvez-vous envoyer une photo ?',
        timestamp: '09:46'
      },
      {
        id: 3,
        sender: 'user',
        text: 'Bien sûr, voici la photo.',
        translation: 'Oczywiście, oto zdjęcie. [Obraz]',
        timestamp: '09:48'
      }
    ]
  },
  {
    id: 3,
    name: 'Giovanni Rossi',
    time: '1h',
    lastMessage: 'Avete questo in rosso?',
    lang: 'IT',
    source: 'WhatsApp',
    avatarColor: 'bg-rose-100 text-rose-600',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'Ciao! Avete questo modello in rosso?',
        translation: 'Cześć! Macie ten model w kolorze czerwonym?',
        timestamp: '08:30'
      }
    ]
  }
];

// --- COMPONENTS ---

// Komponent Licznika (Market Unlock)
const MarketCounter = () => {
    const [baseCount, setBaseCount] = useState(38000000); // Startowa liczba (Polska)
    const [activeCountries, setActiveCountries] = useState<string[]>(['pl']);
    
    // Formatowanie liczby
    const formattedCount = new Intl.NumberFormat('pl-PL').format(baseCount);

    const toggleCountry = (code: string, population: number) => {
        if (activeCountries.includes(code)) {
            setActiveCountries(activeCountries.filter(c => c !== code));
            setBaseCount(prev => prev - population);
        } else {
            setActiveCountries([...activeCountries, code]);
            setBaseCount(prev => prev + population);
        }
    };

    return (
        <div className="w-full space-y-6 flex flex-col h-full">
            <div className="text-center pt-2 pb-4 border-b border-slate-100 shrink-0">
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">Całkowity potencjał rynku</p>
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tabular-nums transition-all duration-300 tracking-tight">
                    {formattedCount}
                </div>
                <div className="text-xs font-medium text-emerald-600 mt-1 flex items-center justify-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                    Dostępni klienci
                </div>
            </div>

            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1">
                <CountryToggle 
                    flag="🇵🇱" name="Polska" sub="Rynek domowy" active={true} locked={true} 
                    onClick={() => {}} 
                />
                <CountryToggle 
                    flag="🇩🇪" name="Niemcy" sub="+83M klientów" active={activeCountries.includes('de')} 
                    onClick={() => toggleCountry('de', 83000000)} 
                />
                <CountryToggle 
                    flag="🇫🇷" name="Francja" sub="+67M klientów" active={activeCountries.includes('fr')} 
                    onClick={() => toggleCountry('fr', 67000000)} 
                />
                <CountryToggle 
                    flag="🇮🇹" name="Włochy" sub="+59M klientów" active={activeCountries.includes('it')} 
                    onClick={() => toggleCountry('it', 59000000)} 
                />
                <CountryToggle 
                    flag="🇪🇸" name="Hiszpania" sub="+47M klientów" active={activeCountries.includes('es')} 
                    onClick={() => toggleCountry('es', 47000000)} 
                />
                <CountryToggle 
                    flag="🇬🇧" name="Wlk. Brytania" sub="+67M klientów" active={activeCountries.includes('gb')} 
                    onClick={() => toggleCountry('gb', 67000000)} 
                />
            </div>
        </div>
    );
};

const CountryToggle = ({ flag, name, sub, active, onClick, locked = false }: { flag: string, name: string, sub?: string, active: boolean, onClick: () => void, locked?: boolean }) => (
    <div 
        onClick={!locked ? onClick : undefined}
        className={`flex items-center justify-between py-2 px-1 transition-all cursor-pointer group ${locked ? 'opacity-70 cursor-default' : ''}`}
    >
        <div className="flex items-center gap-4">
            <span className="text-2xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{flag}</span>
            <div>
                <div className={`text-sm font-bold ${active ? 'text-slate-900' : 'text-slate-500'}`}>{name}</div>
                <div className={`text-[10px] font-medium transition-colors ${active ? 'text-slate-400' : 'text-slate-300'}`}>{sub}</div>
            </div>
        </div>
        <div className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${active ? 'bg-slate-900' : 'bg-slate-200'}`}>
            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${active ? 'left-[22px]' : 'left-0.5'}`}></div>
        </div>
    </div>
);

// Komponent Kroku Growth - ZMODYFIKOWANY UKŁAD MOBILNY
const GrowthStep = ({ number, title, description, children, side = 'left', last = false }: { number: string, title: string, description: string, children: React.ReactNode, side?: 'left' | 'right', last?: boolean }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        }, { threshold: 0.2 });
        if (domRef.current) observer.observe(domRef.current);
        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
        };
    }, []);

    return (
        <div ref={domRef} className={`relative flex flex-col md:flex-row items-center justify-between gap-12 md:gap-32 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white bg-indigo-600 shadow-md z-10 items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>
            {/* Linia tylko na desktopie */}
            <div className={`hidden md:block absolute top-1/2 -z-0 h-0.5 border-t-2 border-dashed border-indigo-200 w-1/2 ${side === 'left' ? 'left-1/2' : 'right-1/2'}`}></div>
            
            {/* TEKST (KROK, TYTUŁ) */}
            {/* Mobile: order-1 (pierwszy) */}
            {/* Desktop: order zależy od 'side' */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center relative z-10 order-1 ${side === 'left' ? 'md:items-end md:text-right md:pr-16 md:order-1' : 'md:items-start md:text-left md:pl-16 md:order-2'}`}>
                <div>
                    <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 tracking-wide border border-slate-200">KROK {number}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{title}</h3>
                    <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-sm">{description}</p>
                </div>
            </div>

            {/* WIZUALIZACJA (KAFELEK) */}
            {/* Mobile: order-2 (drugi) */}
            {/* Desktop: order zależy od 'side' */}
            <div className={`w-full md:w-1/2 flex items-center justify-center relative z-10 order-2 ${side === 'left' ? 'md:order-2 md:pl-16' : 'md:order-1 md:pr-16'}`}>
                {children}
            </div>
        </div>
    );
};

export default function Home() {
  const [activeChatId, setActiveChatId] = useState(conversations[0].id);
  const [inputValue, setInputValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false); 

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    const handleScroll = () => {
        setShowNavbar(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logos = [
    '/shopify-logo.png',
    '/woo-logo.png',
    '/magento-logo.png',
    '/messenger-logo.png',
    '/whatsapp-logo.png',
    '/gmail-logo.png'
  ];

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* NAVIGATION */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none transition-all duration-500 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <nav className="pointer-events-auto w-[95%] md:w-[680px] bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-lg shadow-slate-200/20 py-2.5 px-3 md:px-4 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3 pl-2">
                <a href="#" className="flex items-center gap-2 group">
                    <img src="/logotype.png" alt="Chataptor Logo" className="h-6 object-contain" />
                </a>
            </div>
            <div className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
                <a href="#how-it-works" className="px-4 py-2 rounded-lg hover:bg-slate-100/50 hover:text-slate-900 transition-all">Jak to działa?</a>
                <a href="#implementation" className="px-4 py-2 rounded-lg hover:bg-slate-100/50 hover:text-slate-900 transition-all">Wdrożenie</a>
                <a href="#product" className="px-4 py-2 rounded-lg hover:bg-slate-100/50 hover:text-slate-900 transition-all">Funkcje</a>
            </div>
            <div className="hidden md:flex items-center gap-3 pr-1">
                <a href="#" className="font-medium text-slate-600 hover:text-slate-900 transition-colors text-xs">Zaloguj się</a>
                <button className="bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95 px-4 py-2 text-xs">Rozpocznij</button>
            </div>
            <button className="md:hidden p-2 text-slate-600 rounded-lg hover:bg-slate-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />)}
                </svg>
            </button>
        </nav>
      </div>

      {/* Static Header Logo - zmiana paddingu na mobile */}
      <div className={`absolute top-0 left-0 w-full z-40 py-4 md:py-6 px-4 md:px-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 transition-opacity duration-300 ${showNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <div className="flex items-center gap-2">
            <img src="/logotype.png" alt="Chataptor Logo" className="h-6 md:h-8 object-contain" />
         </div>
         <div className="hidden md:flex items-center gap-4">
             <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Zaloguj się</a>
             <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95">Rozpocznij za darmo</button>
         </div>
         <button className="md:hidden p-2 text-slate-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col pt-24 px-6 gap-6 md:hidden animate-in fade-in duration-200">
                <button className="absolute top-5 right-4 p-2 text-slate-600" onClick={() => setMobileMenuOpen(false)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <a href="#how-it-works" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Jak to działa?</a>
                <a href="#implementation" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Wdrożenie</a>
                <a href="#product" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Funkcje</a>
                <div className="h-px bg-slate-100 my-2"></div>
                <a href="#" className="text-lg font-medium text-slate-600">Zaloguj się</a>
                <button className="bg-slate-900 text-white px-4 py-4 rounded-2xl text-lg font-bold w-full shadow-xl shadow-slate-900/10">Rozpocznij za darmo</button>
            </div>
        )}

      {/* HERO SECTION - Optymalizacja mobile: pt-40 -> pt-28 */}
      <section className="relative pt-28 md:pt-48 pb-12 md:pb-24 text-center overflow-hidden">
        {/* Zmniejszony blur na mobile, żeby nie zasłaniał treści */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[1200px] h-[400px] md:h-[600px] bg-gradient-to-b from-indigo-50/60 to-transparent rounded-[100%] blur-3xl -z-10 opacity-70"></div>
        <div className="px-4 md:px-6 max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] md:text-xs font-semibold text-slate-600 mb-6 md:mb-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          {/* Zmniejszony font nagłówka na mobile: text-4xl -> text-3xl */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 md:mb-8 text-slate-900 px-2">
            Sprzedawaj globalnie.<br />
            <span className="text-slate-400">Obsługuj lokalnie.</span>
          </h1>
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto font-normal mb-8 md:mb-12 leading-relaxed px-4">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br className="hidden md:block"/>
            <span className="block mt-2 md:inline md:mt-0 text-slate-900 font-medium">Zero tłumaczy. Zero opóźnień. 100% AI.</span>
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mb-12 md:mb-20 px-4">
            <button className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-2xl text-base font-semibold hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl shadow-slate-900/10 ring-4 ring-slate-100 active:scale-95">Dołącz do bety</button>
            <button className="group relative w-full sm:w-auto pl-2 pr-6 py-2 bg-white rounded-full border border-slate-200 shadow-[0_0_40px_-10px_rgba(0,0,0,0.1)] hover:shadow-[0_0_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                <div className="relative w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white shadow-lg shadow-slate-900/20 shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span className="absolute inset-0 rounded-full border border-white/20"></span>
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span className="absolute -inset-1 rounded-full border border-slate-900/30 animate-[ping_2s_linear_infinite]"></span>
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900 transition-colors">Zobacz demo</span>
            </button>
          </div>
          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 md:mb-8">Technologia, której ufasz</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-4">
            <div className="h-6 md:h-8 flex items-center"><img src="/openai-logo.png" alt="OpenAI" className="h-full w-auto object-contain" /></div>
            <div className="h-5 md:h-7 flex items-center"><img src="/deepl-logo.png" alt="DeepL" className="h-full w-auto object-contain" /></div>
            <div className="h-7 md:h-9 flex items-center"><img src="/elixir-logo.png" alt="Elixir" className="h-full w-auto object-contain" /></div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP - Optymalizacja pod mobile */}
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6 -mt-6 md:-mt-10 mb-16 md:mb-32 relative z-20">
        {/* Na mobile wysokość jest dynamiczna (80vh), na desktopie stała */}
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col h-[80vh] md:h-[750px] ring-1 ring-slate-900/5">
          <div className="bg-white h-12 border-b border-slate-100 flex items-center px-4 md:px-5 gap-2 shrink-0 justify-between">
            <div className="flex gap-2"><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div><div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div></div>
            <div className="text-[10px] md:text-[11px] text-slate-400 font-medium tracking-wide">Chataptor Agent Dashboard</div>
            <div className="w-8 md:w-10"></div>
          </div>
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar listy rozmów */}
            <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} w-full md:w-[320px] border-r border-slate-100 bg-white flex-col overflow-y-auto custom-scrollbar absolute md:relative z-10 h-full`}>
              <div className="p-4 md:p-5 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inbox</div>
                <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-medium">3 nowe</div>
              </div>
              <div className="p-2 md:p-3 space-y-1">
                {conversations.map((chat) => (
                  <button key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group flex items-start gap-3 relative ${activeChatId === chat.id ? 'bg-indigo-50 border-indigo-100 shadow-sm z-10' : 'bg-white border-transparent hover:bg-slate-50'}`}>
                    {activeChatId === chat.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"></div>}
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${chat.avatarColor} ring-2 ring-white shadow-sm`}>{chat.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex justify-between items-center mb-0.5"><span className={`text-sm font-semibold truncate ${activeChatId === chat.id ? 'text-indigo-900' : 'text-slate-700'}`}>{chat.name}</span><span className="text-[10px] text-slate-400 ml-2 whitespace-nowrap">{chat.time}</span></div>
                        <div className={`text-xs truncate ${activeChatId === chat.id ? 'text-indigo-600/80' : 'text-slate-500'}`}>{chat.lastMessage}</div>
                        <div className="mt-2 flex items-center gap-2"><span className="inline-flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded text-[10px] font-medium text-slate-500 shadow-sm"><span className="font-bold">{chat.lang}</span><span className="text-slate-300">|</span><span className="capitalize">{chat.source}</span></span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            {/* Widok rozmowy */}
            <div className={`${activeChatId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-50/30 relative w-full h-full`}>
              {/* Header mobilny czatu z przyciskiem powrotu */}
              <div className="md:hidden h-14 border-b border-slate-100 bg-white flex items-center px-3 gap-3 sticky top-0 z-20 shadow-sm">
                   <button onClick={() => setActiveChatId(0)} className="p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-lg">
                      <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                   </button>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeChat.avatarColor}`}>{activeChat.name.charAt(0)}</div>
                   <div className="flex flex-col">
                        <div className="font-bold text-sm text-slate-900 leading-tight">{activeChat.name}</div>
                        <div className="text-[10px] text-slate-400 leading-tight">{activeChat.lang} • Online</div>
                   </div>
              </div>
              {/* Header desktopowy */}
              <div className="hidden md:flex h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm items-center justify-between px-6 shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${activeChat.avatarColor}`}>{activeChat.name.charAt(0)}</div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{activeChat.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2"><span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online</span><span className="text-slate-300">•</span><span>Język: <strong className="uppercase">{activeChat.lang}</strong></span><span className="text-slate-300">•</span><span className="capitalize">{activeChat.source}</span></div>
                  </div>
                </div>
                <div className="flex gap-2"><button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button></div>
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'agent' ? 'justify-end' : ''}`}>
                    {msg.sender === 'user' && (<div className={`w-6 h-6 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] md:text-xs font-bold shadow-sm ${activeChat.avatarColor}`}>{activeChat.name.charAt(0)}</div>)}
                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-3 md:p-4 rounded-2xl text-sm shadow-sm relative group ${msg.sender === 'agent' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'}`}>
                        <div className="font-medium leading-relaxed">{msg.text}</div>
                        {msg.translation && (
                          <div className={`mt-3 pt-2 text-[11px] border-t flex items-start gap-2 ${msg.sender === 'agent' ? 'border-white/20 text-indigo-100' : 'border-slate-100 text-slate-400'}`}>
                            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                            <span className="italic">{msg.translation}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>
                    {msg.sender === 'agent' && (<div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">A</div>)}
                  </div>
                ))}
                {activeChat.messages.length > 0 && activeChat.messages[activeChat.messages.length-1].sender === 'user' && (
                    <div className="flex justify-center mt-4">
                        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors border border-indigo-200 shadow-sm whitespace-nowrap overflow-hidden max-w-full text-ellipsis">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span className="truncate">AI Sugestia: "Wyślemy nowy produkt jutro."</span>
                        </button>
                    </div>
                )}
              </div>
              <div className="p-3 md:p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 p-1.5 md:p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Napisz po polsku..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 px-2 min-w-0" />
                  <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-1">
                     <button className="hover:bg-slate-200 p-1.5 rounded-lg text-slate-400 transition-colors hidden sm:block" title="Załącz plik"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg></button>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 py-1.5 md:px-4 rounded-lg transition-all shadow-md shadow-indigo-200 active:scale-95">Wyślij</button>
                </div>
                <div className="mt-2 md:mt-3 flex items-center justify-center gap-2 text-[10px] text-slate-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>AI automatycznie przetłumaczy Twoją wiadomość na <strong className="uppercase">{activeChat.lang}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEKCJA: ŚCIEŻKA EKSPANSJI - mniejsze paddingi --- */}
      <section id="how-it-works" className="py-16 md:py-32 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-32">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Od lokalnego sklepu<br/>do globalnego gracza.</h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">Ścieżka, która poprowadzi Cię do międzynarodowego sukcesu. Prosta, logiczna, zautomatyzowana.</p>
        </div>
        <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-indigo-200 -translate-x-1/2 rounded-full"></div>
            {/* Usunięta linia pionowa na mobile - robiła bałagan */}
            <div className="md:hidden absolute left-4 top-4 bottom-4 w-px bg-slate-100"></div>
            <div className="space-y-16 md:space-y-32 relative">
                <GrowthStep number="1" title="Szybka instalacja" description="Instalujesz widget i panel w kilka minut. Twój obecny zespół supportu jest gotowy do działania." side="right">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm ml-auto transform hover:-translate-y-1 transition-transform duration-300 relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                            <div><div className="text-sm font-bold text-slate-900">System gotowy</div><div className="text-xs text-slate-500">Status: Aktywny</div></div>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[85%] rounded-full"></div></div>
                    </div>
                </GrowthStep>
                <GrowthStep number="2" title="Wybór rynków" description="W panelu zaznaczasz kraje, na które chcesz wejść. Tłumaczenie AI włącza się automatycznie." side="left">
                    <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm mr-auto transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500">Polska 🇵🇱</span>
                            <span className="px-3 py-1.5 bg-amber-50 rounded-lg text-xs font-semibold text-amber-700 border border-amber-100">Niemcy 🇩🇪</span>
                            <span className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 border border-blue-100">Francja 🇫🇷</span>
                        </div>
                        <div className="flex justify-between items-center"><span className="text-sm font-bold text-slate-700">Dostępność</span><span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-bold">Globalna</span></div>
                    </div>
                </GrowthStep>
                <GrowthStep number="3" title="Obsługa bez barier" description="Klienci piszą w swoim języku, Ty odpisujesz po polsku. AI tłumaczy wszystko w locie." side="right">
                    <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 w-full max-w-sm ml-auto transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex gap-3">
                             <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 flex items-center justify-center text-sm shadow-sm">🇩🇪</div>
                             <div className="flex flex-col items-start max-w-[85%]">
                                <div className="p-4 rounded-2xl text-sm shadow-sm bg-white text-slate-700 border border-slate-100 rounded-tl-none">
                                    <div className="font-medium leading-relaxed">Wo ist mein Paket?</div>
                                    <div className="mt-3 pt-2 text-[11px] border-t border-slate-100 text-slate-400 flex items-start gap-2">
                                        <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                                        <span className="italic">Gdzie jest moja paczka?</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-slate-400 mt-1 px-1">10:42</span>
                             </div>
                        </div>
                    </div>
                </GrowthStep>
                <GrowthStep number="4" title="Wzrost przychodów" description="Klienci kupują chętniej, gdy mogą porozmawiać w swoim języku. Ty oszczędzasz na zespole, a słupki sprzedaży rosną." side="left" last={true}>
                    <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/10 w-full max-w-sm mr-auto relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                        <div className="relative z-10">
                            <div className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-2 tracking-tight">+40%</div>
                            <div className="text-sm font-semibold text-slate-600">Wzrost konwersji</div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Trend wzrostowy</div>
                        </div>
                    </div>
                </GrowthStep>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: WDROŻENIE --- */}
      <section id="implementation" className="py-20 md:py-32 px-4 md:px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10 mb-12 md:mb-16">
            <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Wdrożenie szybsze niż<br/>parzenie kawy.</h2>
                <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">Nie potrzebujesz armii programistów. Nasz widget integruje się z Twoim sklepem w <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">3 minuty</span>. Po prostu wklej kod i zacznij sprzedawać globalnie.</p>
                <div className="space-y-6 md:space-y-8">
                    <div className="flex gap-4 md:gap-5 group"><div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">1</div><div><h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Skopiuj snippet</h4><p className="text-slate-500 text-sm">Dostępny w Twoim panelu administratora.</p></div></div>
                    <div className="flex gap-4 md:gap-5 group"><div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">2</div><div><h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Wklej w &lt;head&gt;</h4><p className="text-slate-500 text-sm">Działa z każdym CMS i customowym sklepem.</p></div></div>
                    <div className="flex gap-4 md:gap-5 group"><div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">3</div><div><h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Wybierz języki</h4><p className="text-slate-500 text-sm">Włącz niemiecki, francuski lub włoski jednym kliknięciem.</p></div></div>
                    <div className="flex gap-4 md:gap-5 group"><div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">4</div><div><h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Integracja (Opcjonalne)</h4><p className="text-slate-500 text-sm">Podłącz Messengera, WhatsAppa lub e-mail.</p></div></div>
                </div>
            </div>
            <div className="relative mt-4 lg:mt-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-indigo-100 rounded-3xl blur-lg opacity-60"></div>
                
                {/* Fixed Terminal Window */}
                <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl font-mono text-xs md:text-sm flex flex-col overflow-hidden">
                    
                    {/* Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3 md:px-6 md:py-4 border-b border-slate-100 bg-white relative z-10">
                        {/* Dots */}
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>
                        </div>
                        
                        {/* Title - Centered absolutely */}
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400 text-xs font-semibold">
                            index.html
                        </div>

                        {/* Connected Badge - Right Aligned */}
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                            <span className="hidden sm:inline">Connected</span>
                            <span className="sm:hidden">Connected</span>
                        </div>
                    </div>

                    {/* Scrollable Code Content */}
                    <div className="p-5 md:p-8 overflow-x-auto bg-white">
                        <div className="text-slate-600 space-y-1.5 leading-relaxed whitespace-nowrap">
                            <div><span className="text-pink-600">&lt;head&gt;</span></div>
                            <div className="pl-4 text-slate-400 opacity-70">&lt;!-- Twoje meta tagi --&gt;</div>
                            <div className="pl-4"><span className="text-pink-600">&lt;meta</span> <span className="text-indigo-600">charset</span>=<span className="text-emerald-600">"UTF-8"</span> /&gt;</div>
                            <div className="pl-4 h-4"></div>
                            <div className="pl-4 text-slate-400 italic">&lt;!-- Chataptor Integration --&gt;</div>
                            <div className="pl-4 bg-slate-50 border-l-2 border-indigo-500 py-2 pr-2 rounded-r w-full"><span className="text-pink-600">&lt;script</span> <span className="text-indigo-600">src</span>=<span className="text-emerald-600">"https://cdn.chataptor.com/widget.js"</span></div>
                            <div className="pl-8 bg-slate-50 border-l-2 border-indigo-500 py-2 pr-2 rounded-r -mt-1.5 w-full"><span className="text-indigo-600">data-id</span>=<span className="text-emerald-600">"YOUR_STORE_ID"</span> <span className="text-pink-600">&gt;&lt;/script&gt;</span></div>
                            <div><span className="text-pink-600">&lt;/head&gt;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* POWIĘKSZONE LOGOTYPY INTEGRACJI */}
        <div className="w-full relative mask-gradient mt-8 md:mt-12 overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap items-center">
                {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                    <div key={index} className="w-32 h-32 md:w-48 md:h-48 flex-shrink-0 flex items-center justify-center mx-6 md:mx-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300">
                        {/* Zmieniono w-16 h-16 na w-24 h-24 oraz w-24 na w-32 */}
                        <img src={logo} alt="Integration" className="w-24 h-24 md:w-32 md:h-32 object-contain" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FEATURE BENTO GRID (Zoptymalizowane paddingi na mobile: p-8 -> p-5) --- */}
      <section id="product" className="py-16 md:py-28 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Wszystko w jednym panelu.</h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
          
          {/* Card 1 - Translation - Mobile: flex-col, Desktop: flex-row */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-5 md:p-8 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 md:col-span-2 flex flex-col md:flex-row gap-8 md:gap-10 items-center relative overflow-hidden">
            
            <div className="flex-1 relative z-10 text-left">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Real-time Translation</h3>
              <p className="text-slate-500 text-base leading-relaxed mb-6">
                 Silnik oparty na OpenAI i DeepL. Klient pisze po niemiecku, Ty widzisz to od razu po polsku. Zero opóźnień, zero nieporozumień.
              </p>
            </div>
            
            {/* Visual - Real-time Chat Simulation */}
            <div className="relative w-full md:w-1/2 flex flex-col gap-6 justify-center items-center py-4">
                <div className="relative w-full max-w-sm bg-white p-4 md:p-6 rounded-3xl">
                    <div className="flex flex-col gap-4">
                        {/* Incoming Message */}
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">DE</div>
                            <div className="flex-1">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200/60 text-sm text-slate-800">
                                    Wo ist mein Paket?
                                    <div className="h-px bg-slate-100 my-2"></div>
                                    <div className="text-indigo-600 font-medium flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                                        Gdzie jest moja paczka?
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Outgoing Message */}
                        <div className="flex items-start gap-3 flex-row-reverse mt-2">
                            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-xs font-bold text-white">PL</div>
                            <div className="flex-1 text-right">
                                <div className="bg-slate-900 text-white p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-left">
                                    Sprawdzam to...
                                    <div className="h-px bg-white/20 my-2"></div>
                                    <div className="text-indigo-200 font-medium flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                                        Ich überprüfe das...
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

          {/* Card 2 - Market Unlock */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-5 md:p-8 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 md:row-span-2 flex flex-col relative overflow-hidden">
             <div className="relative z-10 mb-4 flex-none">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Market Unlock</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Włącz nowy rynek jednym kliknięciem. Skaluj sprzedaż bez granic.
                </p>
            </div>
            
            <MarketCounter />
          </div>

          {/* Card 3 - Omnichannel Hub */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-5 md:p-5 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden flex flex-col">
            <div className="relative z-10 mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Omnichannel</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Wszystkie kanały w jednym miejscu. Zarządzaj wiadomościami z wielu źródeł bez przełączania kart.
                </p>
            </div>
            
            <div className="relative z-10 flex-1 space-y-2">
                {[
                    { name: 'Widget na stronie', color: 'bg-indigo-500' },
                    { name: 'Email', color: 'bg-amber-500' },
                    { name: 'WhatsApp', color: 'bg-green-500' },
                    { name: 'Messenger', color: 'bg-blue-500' },
                ].map((item, i) => (
                    <div key={i} className="glass-panel p-2 rounded-xl flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.02] hover:bg-white/80">
                        <span className="font-bold text-slate-700 text-xs pl-2">{item.name}</span>
                        <div className={`w-2 h-2 rounded-full ${item.color} shadow-sm mr-2`}></div>
                    </div>
                ))}
                <div className="text-center pt-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">...i wiele więcej</span>
                </div>
            </div>
          </div>

          {/* Card 4 - Marketing Automation */}
          <div className="group bg-white border border-slate-200 rounded-[2.5rem] p-5 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden flex flex-col">
             <div className="relative z-10 mb-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Marketing</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                    Nasz innowacyjny kreator pop-upów i inteligentne kampanie zmienią odwiedzających w lojalnych klientów.
                </p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col justify-end relative overflow-hidden">
                <div className="flex items-end justify-between gap-2 h-20 mt-2">
                    {[30, 45, 35, 60, 50, 75, 90].map((height, i) => (
                        <div key={i} className="w-full bg-slate-200 rounded-t-md relative group/bar hover:bg-pink-200 transition-colors" style={{ height: `${height}%` }}>
                            {i === 6 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-rose-500 rounded-t-md shadow-lg shadow-pink-500/30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Card 5 (Dark) - Pay-per-Satisfaction */}
          <div className="md:col-span-3 bg-slate-900 text-white border border-slate-800 rounded-[2.5rem] p-6 md:p-12 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-8 md:gap-12 items-center mt-4">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
            
            <div className="relative z-10 flex-1 max-w-lg">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-widest">
                        Rewolucyjny Model
                    </span>
                </div>
                <h3 className="text-3xl font-bold mb-4">Pay-per-Satisfaction</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-6">
                    Koniec z płaceniem za puste słowa. Nasz model opiera się na jakości. Płacisz tylko wtedy, gdy AI rozwiąże problem klienta, a ocena sentymentu wyniesie <span className="text-white font-bold">6/10</span> lub więcej.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        Ocena 0-5: <span className="text-white font-bold">0 PLN</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        Ocena 6-10: <span className="text-white font-bold">Success Fee</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar Visualization */}
            <div className="relative z-10 w-full md:w-1/2 bg-white/5 rounded-3xl p-6 md:p-8 border border-white/10 backdrop-blur-sm">
                <div className="flex justify-between items-end mb-4">
                    <div className="text-sm font-medium text-slate-400">Analiza sentymentu (Live)</div>
                    <div className="text-4xl font-bold text-emerald-400">9.2<span className="text-lg text-slate-500">/10</span></div>
                </div>
                
                {/* The Bar */}
                <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden w-full mb-2">
                    <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-slate-600 to-slate-500/50 border-r-2 border-white/10"></div>
                    <div className="absolute left-[60%] top-0 bottom-0 w-[40%] bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_white] left-[92%] z-20"></div>
                </div>

                <div className="flex justify-between text-[8px] md:text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2">
                    <span>Niezadowolony (0)</span>
                    <span className="text-white">Próg Płatności (6.0)</span>
                    <span className="text-emerald-400">Zachwycony (10)</span>
                </div>

                <div className="mt-6 bg-emerald-500/10 rounded-xl p-4 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">✓</div>
                        <div>
                            <div className="text-sm font-bold text-white">Sukces!</div>
                            <div className="text-xs text-slate-400">Naliczono opłatę za rozmowę.</div>
                        </div>
                    </div>
                    <div className="text-emerald-400 font-mono font-bold">2.00 PLN</div>
                </div>
            </div>
          </div>

        </div>
      </section>

      <footer id="contact" className="py-12 md:py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-3">
                    <img src="/logotype.png" alt="Chataptor" className="h-6 md:h-8 w-auto object-contain" />
                </div>
                <p className="text-slate-500 font-light leading-relaxed max-w-md text-base md:text-lg">Brama na świat dla Twojego e-commerce. Przełamujemy bariery językowe, łącząc AI z ludzką empatią.</p>
            </div>
            <div className="space-y-6 md:space-y-8">
                <h4 className="text-lg font-bold text-slate-900">Kontakt</h4>
                <div className="space-y-4 md:space-y-5">
                <a href="mailto:contact@chataptor.com" className="flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-colors group">
                    <div className="p-2 rounded-lg group-hover:bg-slate-100 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg></div>
                    <span className="font-medium text-sm md:text-base">contact@chataptor.com</span>
                </a>
                <div className="flex items-center gap-4 text-slate-500">
                    <div className="p-2 rounded-lg"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
                    <span className="font-medium text-sm md:text-base">Łódź, Polska</span>
                </div>
                </div>
            </div>
            <div className="space-y-6 md:space-y-8">
                <h4 className="text-lg font-bold text-slate-900">Informacje prawne</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-500 font-medium text-sm md:text-base">
                <li><a href="#" className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>Polityka prywatności</a></li>
                <li><a href="#" className="hover:text-slate-900 transition-colors flex items-center gap-2"><span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>Regulamin</a></li>
                </ul>
            </div>
            </div>
            <div className="border-t border-slate-100 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm font-medium text-center">© {new Date().getFullYear()} Wszystkie prawa zastrzeżone.</p>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span></span>Uptime: 99.98%</div>
            </div>
        </div>
      </footer>
    </main>
  );
}