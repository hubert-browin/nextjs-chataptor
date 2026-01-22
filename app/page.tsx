'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- STYLES FOR ANIMATIONS ---
const styles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 60s linear infinite;
  }
  .animate-marquee-mobile {
    animation: marquee 30s linear infinite;
  }
  .mask-gradient {
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  }
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background-color: #e4e4e7; /* zinc-200 */
    border-radius: 20px;
  }
  .glass-panel {
    background: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(228, 228, 231, 0.6); /* zinc-200 */
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
    // Przywrócone kolory (Indigo)
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
    // Przywrócone kolory (Emerald)
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
    // Przywrócone kolory (Rose)
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

const MarketCounter = () => {
    const [baseCount, setBaseCount] = useState(38000000); 
    const [activeCountries, setActiveCountries] = useState<string[]>(['pl']);
    
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
            <div className="text-center pt-2 pb-4 border-b border-zinc-100 shrink-0">
                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-1">Całkowity potencjał rynku</p>
                <div className="text-4xl md:text-5xl font-extrabold text-zinc-900 tabular-nums tracking-tighter">
                    {formattedCount}
                </div>
                <div className="text-xs font-medium text-emerald-600 mt-2 flex items-center justify-center gap-1.5 bg-emerald-50 w-fit mx-auto px-2 py-1 rounded-full border border-emerald-100">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    Dostępni klienci
                </div>
            </div>

            <div className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-1">
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
            </div>
        </div>
    );
};

const CountryToggle = ({ flag, name, sub, active, onClick, locked = false }: { flag: string, name: string, sub?: string, active: boolean, onClick: () => void, locked?: boolean }) => (
    <div 
        onClick={!locked ? onClick : undefined}
        className={`flex items-center justify-between py-2.5 px-3 rounded-xl transition-all cursor-pointer border ${active ? 'bg-zinc-50 border-zinc-200' : 'bg-transparent border-transparent hover:bg-zinc-50'} ${locked ? 'opacity-70 cursor-default' : ''}`}
    >
        <div className="flex items-center gap-4">
            <span className="text-xl filter drop-shadow-sm group-hover:scale-110 transition-transform">{flag}</span>
            <div>
                <div className={`text-sm font-semibold tracking-tight ${active ? 'text-zinc-900' : 'text-zinc-500'}`}>{name}</div>
                <div className={`text-[10px] font-medium transition-colors ${active ? 'text-zinc-400' : 'text-zinc-300'}`}>{sub}</div>
            </div>
        </div>
        <div className={`w-9 h-5 rounded-full relative transition-colors duration-300 ${active ? 'bg-zinc-900' : 'bg-zinc-200'}`}>
            <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${active ? 'left-[18px]' : 'left-0.5'}`}></div>
        </div>
    </div>
);

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
            {/* Linia tylko na desktopie - bardziej widoczna */}
            <div className={`hidden md:block absolute top-1/2 -z-0 h-0.5 border-t-2 border-dashed border-zinc-300/60 w-1/2 ${side === 'left' ? 'left-1/2' : 'right-1/2'}`}></div>
            
            {/* TEKST */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center relative z-10 order-1 ${side === 'left' ? 'md:items-end md:text-right md:pr-24 md:order-1' : 'md:items-start md:text-left md:pl-24 md:order-2'}`}>
                <div>
                    <div className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full text-[10px] font-bold mb-4 tracking-widest border border-zinc-200/50 uppercase">Krok {number}</div>
                    <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-4 tracking-tight">{title}</h3>
                    <p className="text-zinc-500 text-base leading-relaxed max-w-sm">{description}</p>
                </div>
            </div>

            {/* WIZUALIZACJA */}
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
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-sans text-zinc-900 selection:bg-indigo-100 selection:text-indigo-900">
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      
      {/* NAVIGATION */}
      <div className={`fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-6 px-4 pointer-events-none transition-all duration-500 ${showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
        <nav className="pointer-events-auto w-[95%] md:w-[720px] bg-white/70 backdrop-blur-xl border border-zinc-200/60 shadow-xl shadow-zinc-200/20 py-2.5 px-3 md:px-4 rounded-full flex items-center justify-between">
            <div className="flex items-center gap-3 pl-3">
                <a href="#" className="flex items-center gap-2 group opacity-90 hover:opacity-100 transition-opacity">
                    <img src="/logotype.png" alt="Chataptor Logo" className="h-5 md:h-6 object-contain" />
                </a>
            </div>
            <div className="hidden md:flex items-center gap-1 text-[13px] font-medium text-zinc-600">
                <a href="#how-it-works" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-all">Jak to działa</a>
                <a href="#implementation" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-all">Wdrożenie</a>
                <a href="#product" className="px-4 py-2 rounded-full hover:bg-zinc-100 hover:text-zinc-900 transition-all">Funkcje</a>
            </div>
            <div className="hidden md:flex items-center gap-2 pr-1">
                <a href="#" className="font-medium text-zinc-600 hover:text-zinc-900 transition-colors text-[13px] px-3">Zaloguj</a>
                <button className="bg-zinc-900 text-white rounded-full font-medium hover:bg-black transition-all hover:scale-105 active:scale-95 px-5 py-2 text-[13px] shadow-lg shadow-zinc-900/10">Rozpocznij</button>
            </div>
            <button className="md:hidden p-2 text-zinc-600 rounded-full hover:bg-zinc-100" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {mobileMenuOpen ? (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />) : (<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />)}
                </svg>
            </button>
        </nav>
      </div>

      {/* Static Header Logo */}
      <div className={`absolute top-0 left-0 w-full z-40 py-6 px-6 flex justify-between items-center max-w-7xl mx-auto left-0 right-0 transition-opacity duration-300 ${showNavbar ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
         <div className="flex items-center gap-2">
            <img src="/logotype.png" alt="Chataptor Logo" className="h-6 md:h-7 object-contain opacity-90" />
         </div>
         <div className="hidden md:flex items-center gap-6">
             <a href="#" className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors">Zaloguj się</a>
             <button className="bg-zinc-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-all hover:shadow-xl hover:shadow-zinc-900/10 active:scale-95">Rozpocznij za darmo</button>
         </div>
         <button className="md:hidden p-2 text-zinc-600" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50 flex flex-col pt-24 px-6 gap-6 md:hidden animate-in fade-in duration-200">
                <button className="absolute top-5 right-4 p-2 text-zinc-500" onClick={() => setMobileMenuOpen(false)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <a href="#how-it-works" className="text-2xl font-bold text-zinc-900 tracking-tight" onClick={() => setMobileMenuOpen(false)}>Jak to działa?</a>
                <a href="#implementation" className="text-2xl font-bold text-zinc-900 tracking-tight" onClick={() => setMobileMenuOpen(false)}>Wdrożenie</a>
                <a href="#product" className="text-2xl font-bold text-zinc-900 tracking-tight" onClick={() => setMobileMenuOpen(false)}>Funkcje</a>
                <div className="h-px bg-zinc-100 my-2"></div>
                <a href="#" className="text-lg font-medium text-zinc-500">Zaloguj się</a>
                <button className="bg-zinc-900 text-white px-4 py-4 rounded-2xl text-lg font-bold w-full shadow-xl shadow-zinc-900/10">Rozpocznij za darmo</button>
            </div>
        )}

      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-48 pb-16 md:pb-32 text-center overflow-hidden">
        {/* Usunięcie niebieskiego glow, dodanie bardzo subtelnego szarego */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-zinc-100/50 rounded-[100%] blur-[120px] -z-10 pointer-events-none"></div>
        
        <div className="px-4 md:px-6 max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full text-[11px] font-medium text-zinc-500 mb-8 shadow-sm hover:border-zinc-300 transition-all cursor-default mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] mb-8 text-zinc-900 px-2">
            Sprzedawaj globalnie.<br className="block sm:hidden" />
            <span className="hidden sm:inline"><br /></span>
            <span className="text-zinc-400 mt-2 sm:mt-0 block sm:inline font-semibold">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-base md:text-xl text-zinc-500 max-w-2xl mx-auto font-normal mb-10 leading-relaxed px-4">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br className="hidden md:block"/>
            <span className="block mt-2 md:inline md:mt-0 text-zinc-900 font-medium">Zero tłumaczy. Zero opóźnień. 100% AI.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-zinc-900 text-white rounded-full text-[15px] font-semibold hover:bg-black transition-all hover:scale-[1.02] shadow-xl shadow-zinc-900/10 ring-4 ring-white active:scale-95">
                Dołącz do bety
            </button>
            {/* PRZYWRÓCONY PRZYCISK DEMO */}
            <button className="group relative w-full sm:w-auto pl-2 pr-6 py-2 bg-white rounded-full border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-3 active:scale-95">
                <div className="relative w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:bg-black transition-colors duration-300">
                    <span className="absolute inset-0 rounded-full border border-white/20"></span>
                    <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                    <span className="absolute -inset-1 rounded-full border border-zinc-900/30 animate-[ping_2s_linear_infinite] opacity-50"></span>
                </div>
                <span className="text-sm font-bold text-zinc-700 group-hover:text-zinc-900 transition-colors">Zobacz demo</span>
            </button>
          </div>
          
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-8">Technologia, której ufasz</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale hover:grayscale-0 transition-all duration-700 px-4">
            <div className="h-6 md:h-7 flex items-center"><img src="/openai-logo.png" alt="OpenAI" className="h-full w-auto object-contain" /></div>
            <div className="h-5 md:h-6 flex items-center"><img src="/deepl-logo.png" alt="DeepL" className="h-full w-auto object-contain" /></div>
            <div className="h-6 md:h-8 flex items-center"><img src="/elixir-logo.png" alt="Elixir" className="h-full w-auto object-contain" /></div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP */}
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6 -mt-10 mb-20 md:mb-40 relative z-20">
        <div className="bg-white rounded-2xl md:rounded-[32px] border border-zinc-200 shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col h-[80vh] md:h-[800px] ring-1 ring-zinc-900/5">
          {/* Mockup Header */}
          <div className="bg-white h-12 border-b border-zinc-100 flex items-center px-4 md:px-5 gap-2 shrink-0 justify-between">
            <div className="flex gap-2 opacity-50"><div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div><div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div><div className="w-2.5 h-2.5 rounded-full bg-zinc-300"></div></div>
            <div className="flex items-center gap-2 px-3 py-1 bg-zinc-50 rounded-md border border-zinc-100/50">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                <span className="text-[10px] md:text-[11px] text-zinc-500 font-medium tracking-wide">app.chataptor.com</span>
            </div>
            <div className="w-8 md:w-10"></div>
          </div>
          
          <div className="flex flex-1 overflow-hidden relative bg-zinc-50/30">
            {/* Sidebar - lista czatów */}
            <div className={`${activeChatId ? 'hidden md:flex' : 'flex'} w-full md:w-[320px] border-r border-zinc-100 bg-white flex-col overflow-y-auto custom-scrollbar absolute md:relative z-10 h-full`}>
              <div className="p-4 md:p-5 flex justify-between items-center sticky top-0 bg-white z-10 border-b border-zinc-50">
                <div className="text-sm font-bold text-zinc-900 tracking-tight">Wiadomości</div>
                <div className="text-xs text-zinc-500 bg-zinc-100 px-2 py-1 rounded-md font-medium">3 nowe</div>
              </div>
              <div className="p-2 space-y-1">
                {conversations.map((chat) => (
                  <button key={chat.id} onClick={() => setActiveChatId(chat.id)} className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group flex items-start gap-3 relative ${activeChatId === chat.id ? 'bg-indigo-50 border-indigo-100 shadow-sm z-10' : 'bg-white border-transparent hover:bg-zinc-50'}`}>
                    {activeChatId === chat.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"></div>}
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${chat.avatarColor} ring-2 ring-white shadow-sm transition-colors`}>{chat.name.charAt(0)}</div>
                    <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className={`text-sm font-semibold truncate ${activeChatId === chat.id ? 'text-indigo-900' : 'text-zinc-700'}`}>{chat.name}</span>
                            <span className="text-[10px] text-zinc-400 ml-2 whitespace-nowrap">{chat.time}</span>
                        </div>
                        <div className={`text-xs truncate ${activeChatId === chat.id ? 'text-indigo-600/80' : 'text-zinc-400'}`}>{chat.lastMessage}</div>
                        {/* PRZYWRÓCONY BADGE */}
                        <div className="mt-2 flex items-center gap-2"><span className="inline-flex items-center gap-1.5 px-2 py-1 bg-zinc-50 border border-zinc-200 rounded text-[10px] font-medium text-zinc-500 shadow-sm"><span className="font-bold">{chat.lang}</span><span className="text-zinc-300">|</span><span className="capitalize">{chat.source}</span></span></div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Chat Area */}
            <div className={`${activeChatId ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-slate-50/30 relative w-full h-full`}>
              {/* Chat Header */}
              <div className="h-16 border-b border-zinc-100 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="md:hidden -ml-2 mr-2 cursor-pointer" onClick={() => setActiveChatId(0)}>
                    <svg width="24" height="24" fill="none" stroke="currentColor" className="text-zinc-400"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                  </div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${activeChat.avatarColor}`}>{activeChat.name.charAt(0)}</div>
                  <div>
                    <div className="text-sm font-bold text-zinc-900">{activeChat.name}</div>
                    <div className="text-[11px] text-zinc-500 flex items-center gap-2">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online
                        </span>
                        <span className="text-zinc-300">•</span>
                        <span>Język: <strong className="uppercase">{activeChat.lang}</strong></span>
                        <span className="text-zinc-300">•</span>
                        <span className="capitalize">{activeChat.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors"><svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg></button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'agent' ? 'justify-end' : ''}`}>
                    
                    {msg.sender === 'user' && (
                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-sm mt-2 ${activeChat.avatarColor}`}>{activeChat.name.charAt(0)}</div>
                    )}
                    
                    <div className={`flex flex-col max-w-[85%] md:max-w-[65%] ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div className={`p-4 md:p-5 rounded-2xl text-[15px] leading-relaxed shadow-sm relative group transition-all
                          ${msg.sender === 'agent' 
                            ? 'bg-indigo-600 text-white rounded-tr-sm' 
                            : 'bg-white text-zinc-800 border border-zinc-100 rounded-tl-sm shadow-sm'
                           }`}>
                        <div>{msg.text}</div>
                        {msg.translation && (
                          <div className={`mt-3 pt-2 text-xs border-t flex items-start gap-2 ${msg.sender === 'agent' ? 'border-white/20 text-indigo-100' : 'border-zinc-100 text-zinc-400'}`}>
                            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                            <span className="italic">{msg.translation}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 mt-2 px-1 font-medium">{msg.timestamp}</span>
                    </div>

                    {msg.sender === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-zinc-900 shrink-0 flex items-center justify-center text-white text-xs font-bold mt-2 shadow-sm">A</div>
                    )}
                  </div>
                ))}

                {/* AI Suggestion Chip */}
                {activeChat.messages.length > 0 && activeChat.messages[activeChat.messages.length-1].sender === 'user' && (
                    <div className="flex justify-center mt-6">
                        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs font-medium px-4 py-2 rounded-full flex items-center gap-2 transition-all border border-indigo-200 shadow-sm hover:shadow-md">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span>Sugestia: "Wyślemy nowy produkt jutro."</span>
                        </button>
                    </div>
                )}
              </div>

              {/* Input Area */}
              <div className="p-4 md:p-6 bg-white border-t border-zinc-100">
                <div className="flex gap-2 p-2 bg-zinc-50 border border-zinc-200 rounded-2xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                  <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Napisz po polsku..." className="flex-1 bg-transparent border-none outline-none text-sm text-zinc-900 placeholder:text-zinc-400 px-3 min-w-0 font-medium" />
                  <div className="flex items-center gap-1 pr-1">
                     <button className="hover:bg-zinc-200 p-2 rounded-xl text-zinc-400 transition-colors" title="Załącz plik"><svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg></button>
                     <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-200 active:scale-95">Wyślij</button>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-zinc-400 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span>AI przetłumaczy na <strong className="text-zinc-600 uppercase">{activeChat.lang}</strong> w czasie rzeczywistym</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- SEKCJA: ŚCIEŻKA EKSPANSJI --- */}
      <section id="how-it-works" className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24 md:mb-40">
            <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">Od lokalnego sklepu<br/>do globalnego gracza.</h2>
            <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light leading-relaxed">Ścieżka, która poprowadzi Cię do międzynarodowego sukcesu. Prosta, logiczna, zautomatyzowana.</p>
        </div>
        <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-indigo-200 -translate-x-1/2"></div>
            <div className="md:hidden absolute left-5 top-4 bottom-4 w-px bg-zinc-100"></div>
            
            <div className="space-y-24 md:space-y-40 relative">
                <GrowthStep number="1" title="Szybka instalacja" description="Instalujesz widget i panel w kilka minut. Twój obecny zespół supportu jest gotowy do działania." side="right">
                    <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-2xl shadow-zinc-200/40 w-full max-w-sm ml-auto transform hover:-translate-y-2 transition-transform duration-500 relative group">
                        <div className="flex items-center gap-5 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                            <div><div className="text-base font-bold text-zinc-900">System gotowy</div><div className="text-xs text-zinc-400 font-medium mt-1">Status: <span className="text-emerald-600 font-bold">Aktywny</span></div></div>
                        </div>
                        <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden"><div className="h-full bg-indigo-500 w-[85%] rounded-full"></div></div>
                    </div>
                </GrowthStep>
                <GrowthStep number="2" title="Wybór rynków" description="W panelu zaznaczasz kraje, na które chcesz wejść. Tłumaczenie AI włącza się automatycznie." side="left">
                    <div className="bg-white p-8 rounded-[32px] border border-zinc-100 shadow-2xl shadow-zinc-200/40 w-full max-w-sm mr-auto transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="px-4 py-2 bg-zinc-50 rounded-lg text-sm font-semibold text-zinc-600 border border-zinc-100">Polska 🇵🇱</span>
                            <span className="px-4 py-2 bg-amber-50 rounded-lg text-sm font-semibold text-amber-700 border border-amber-100">Niemcy 🇩🇪</span>
                            <span className="px-4 py-2 bg-blue-50 rounded-lg text-sm font-semibold text-blue-700 border border-blue-100">Francja 🇫🇷</span>
                        </div>
                        <div className="flex justify-between items-center"><span className="text-sm font-bold text-zinc-600">Dostępność</span><span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md font-bold">Globalna</span></div>
                    </div>
                </GrowthStep>
                <GrowthStep number="3" title="Obsługa bez barier" description="Klienci piszą w swoim języku, Ty odpisujesz po polsku. AI tłumaczy wszystko w locie." side="right">
                    <div className="bg-white p-6 rounded-[32px] border border-zinc-200 shadow-2xl shadow-zinc-200/40 w-full max-w-sm ml-auto transform hover:-translate-y-2 transition-transform duration-500">
                        <div className="flex gap-4">
                             <div className="w-10 h-10 rounded-full bg-zinc-100 shrink-0 flex items-center justify-center text-base shadow-inner">🇩🇪</div>
                             <div className="flex flex-col items-start max-w-[85%]">
                                <div className="p-5 rounded-2xl text-[15px] shadow-sm bg-white text-zinc-700 border border-zinc-100 rounded-tl-none">
                                    <div className="font-medium leading-relaxed">Wo ist mein Paket?</div>
                                    <div className="mt-3 pt-3 text-xs border-t border-zinc-100 text-zinc-400 flex items-start gap-2">
                                        <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                                        <span className="italic">Gdzie jest moja paczka?</span>
                                    </div>
                                </div>
                                <span className="text-[10px] text-zinc-300 mt-2 px-1 font-medium">10:42</span>
                             </div>
                        </div>
                    </div>
                </GrowthStep>
                <GrowthStep number="4" title="Wzrost przychodów" description="Klienci kupują chętniej, gdy mogą porozmawiać w swoim języku. Ty oszczędzasz na zespole, a słupki sprzedaży rosną." side="left" last={true}>
                    <div className="bg-white p-8 rounded-[32px] border border-emerald-100 shadow-2xl shadow-emerald-500/10 w-full max-w-sm mr-auto relative overflow-hidden transform hover:-translate-y-2 transition-transform duration-500 group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                        <div className="relative z-10">
                            <div className="text-5xl md:text-6xl font-extrabold text-emerald-500 mb-2 tracking-tighter">+40%</div>
                            <div className="text-base font-semibold text-zinc-600">Wzrost konwersji</div>
                            <div className="mt-6 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full w-fit"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>Trend wzrostowy</div>
                        </div>
                    </div>
                </GrowthStep>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: WDROŻENIE (Przywrócona wersja) --- */}
      <section id="implementation" className="py-24 md:py-32 px-4 md:px-6 bg-slate-50 border-y border-zinc-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 md:gap-24 items-center relative z-10 mb-16 md:mb-24">
            <div>
                <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-8 tracking-tight">Wdrożenie szybsze niż<br/>parzenie kawy.</h2>
                <p className="text-zinc-500 text-lg mb-12 leading-relaxed">Nie potrzebujesz armii programistów. Nasz widget integruje się z Twoim sklepem w <span className="text-zinc-900 font-bold bg-white px-2 py-0.5 rounded border border-zinc-200 shadow-sm">3 minuty</span>.</p>
                <div className="space-y-8 md:space-y-10">
                    <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold shadow-sm group-hover:border-indigo-400 group-hover:shadow-indigo-100 transition-all">1</div>
                        <div><h4 className="font-bold text-lg text-zinc-900 mb-1">Skopiuj snippet</h4><p className="text-zinc-500 text-sm">Dostępny w Twoim panelu administratora.</p></div>
                    </div>
                    <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold shadow-sm group-hover:border-indigo-400 group-hover:shadow-indigo-100 transition-all">2</div>
                        <div><h4 className="font-bold text-lg text-zinc-900 mb-1">Wklej w &lt;head&gt;</h4><p className="text-zinc-500 text-sm">Działa z każdym CMS i customowym sklepem.</p></div>
                    </div>
                    <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold shadow-sm group-hover:border-indigo-400 group-hover:shadow-indigo-100 transition-all">3</div>
                        <div><h4 className="font-bold text-lg text-zinc-900 mb-1">Wybierz języki</h4><p className="text-zinc-500 text-sm">Włącz niemiecki, francuski lub włoski jednym kliknięciem.</p></div>
                    </div>
                    <div className="flex gap-6 group">
                        <div className="w-12 h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center text-zinc-900 font-bold shadow-sm group-hover:border-indigo-400 group-hover:shadow-indigo-100 transition-all">4</div>
                        <div><h4 className="font-bold text-lg text-zinc-900 mb-1">Integracja (Opcjonalne)</h4><p className="text-zinc-500 text-sm">Podłącz Messengera, WhatsAppa lub e-mail.</p></div>
                    </div>
                </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-indigo-100 rounded-[32px] blur-xl opacity-60"></div>
                
                {/* Fixed Terminal Window - LIGHT MODE RESTORED */}
                <div className="relative bg-white rounded-2xl shadow-xl font-mono text-xs md:text-sm flex flex-col overflow-hidden max-w-[calc(100vw-2rem)] md:max-w-full mx-auto border border-zinc-200">
                    
                    {/* Header Bar */}
                    <div className="flex items-center justify-between px-4 py-3 md:px-5 md:py-4 border-b border-zinc-100 bg-white relative z-10">
                        <div className="flex items-center gap-2 min-w-[50px]">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24]"></div>
                            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]"></div>
                        </div>
                        <div className="text-zinc-400 text-xs font-semibold truncate px-2">
                            index.html
                        </div>
                        <div className="flex items-center justify-end min-w-[50px]">
                            <div className="flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded-full border border-emerald-100">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                                <span className="hidden sm:inline">Connected</span>
                            </div>
                        </div>
                    </div>

                    {/* Code Content - Light Mode */}
                    <div className="p-4 sm:p-6 md:p-8 overflow-x-auto bg-white">
                        <div className="text-zinc-600 space-y-2 leading-relaxed whitespace-pre-wrap break-all md:whitespace-nowrap text-[11px] sm:text-xs md:text-sm font-mono">
                            <div><span className="text-pink-600">&lt;</span><span className="text-pink-600">head</span><span className="text-pink-600">&gt;</span></div>
                            <div className="pl-4 text-zinc-400 italic opacity-70">&lt;!-- Twoje meta tagi --&gt;</div>
                            <div className="pl-4"><span className="text-pink-600">&lt;meta</span> <span className="text-indigo-600">charset</span>=<span className="text-emerald-600">"UTF-8"</span> /&gt;</div>
                            <div className="pl-4 h-4"></div>
                            <div className="pl-4 text-zinc-400 italic">&lt;!-- Chataptor Integration --&gt;</div>
                            <div className="pl-4 bg-slate-50 border-l-2 border-indigo-500 py-3 pr-2 rounded-r w-full"><span className="text-pink-600">&lt;script</span> <span className="text-indigo-600">src</span>=<span className="text-emerald-600">"https://cdn.chataptor.com/widget.js"</span></div>
                            <div className="pl-8 bg-slate-50 border-l-2 border-indigo-500 py-3 pr-2 rounded-r -mt-2 w-full"><span className="text-indigo-600">data-id</span>=<span className="text-emerald-600">"YOUR_STORE_ID"</span> <span className="text-pink-600">&gt;&lt;/script&gt;</span></div>
                            <div><span className="text-pink-600">&lt;/head&gt;</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* LOGOS */}
        <div className="w-full relative mask-gradient mt-8 md:mt-24 overflow-hidden">
            <div className="flex animate-marquee-mobile md:animate-marquee whitespace-nowrap items-center">
                {[...logos, ...logos, ...logos, ...logos, ...logos].map((logo, index) => (
                    <div key={index} className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center mx-4 md:mx-12 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                        <img src={logo} alt="Integration" className="w-20 h-20 md:w-24 md:h-24 object-contain" />
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* --- FEATURE BENTO GRID --- */}
      <section id="product" className="py-24 md:py-40 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-24 md:mb-32">
          <h2 className="text-3xl md:text-5xl font-extrabold text-zinc-900 mb-6 tracking-tight">Wszystko w jednym panelu.</h2>
          <p className="text-lg text-zinc-500 max-w-2xl mx-auto font-light">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-min">
          
          {/* Card 1 - Translation */}
          <div className="group bg-white border border-zinc-200 rounded-[32px] p-8 md:p-10 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 md:col-span-2 flex flex-col md:flex-row gap-10 items-center relative overflow-hidden">
            <div className="flex-1 relative z-10 text-left">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/20">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-3 tracking-tight">Real-time Translation</h3>
              <p className="text-zinc-500 text-base leading-relaxed mb-6">
                 Silnik oparty na OpenAI i DeepL. Klient pisze po niemiecku, Ty widzisz to od razu po polsku. Zero opóźnień, zero nieporozumień.
              </p>
            </div>
            
            <div className="relative w-full md:w-1/2 flex flex-col gap-6 justify-center items-center py-4">
                <div className="relative w-full max-w-sm bg-white p-6 rounded-3xl">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-zinc-500">DE</div>
                            <div className="flex-1">
                                <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-zinc-200/60 text-sm text-zinc-800">
                                    Wo ist mein Paket?
                                    <div className="h-px bg-slate-100 my-2"></div>
                                    <div className="text-indigo-600 font-medium flex items-center gap-2 text-xs">
                                        <svg className="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                                        Gdzie jest moja paczka?
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 flex-row-reverse mt-2">
                            <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-xs font-bold text-white">PL</div>
                            <div className="flex-1 text-right">
                                <div className="bg-zinc-900 text-white p-3 rounded-2xl rounded-tr-none shadow-md text-sm text-left">
                                    Sprawdzam to...
                                    <div className="h-px bg-white/20 my-2"></div>
                                    <div className="text-indigo-200 font-medium flex items-center gap-2 text-xs">
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
          <div className="group bg-white border border-zinc-200 rounded-[32px] p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 md:row-span-2 flex flex-col relative overflow-hidden">
             <div className="relative z-10 mb-6 flex-none">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Market Unlock</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    Włącz nowy rynek jednym kliknięciem. Skaluj sprzedaż bez granic.
                </p>
            </div>
            <MarketCounter />
          </div>

          {/* Card 3 - Omnichannel Hub */}
          <div className="group bg-white border border-zinc-200 rounded-[32px] p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative overflow-hidden flex flex-col">
            <div className="relative z-10 mb-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Omnichannel</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    Wszystkie kanały w jednym miejscu. Zarządzaj wiadomościami z wielu źródeł bez przełączania kart.
                </p>
            </div>
            
            <div className="relative z-10 flex-1 space-y-3">
                {[
                    { name: 'Widget na stronie', color: 'bg-indigo-500' },
                    { name: 'Email', color: 'bg-amber-500' },
                    { name: 'WhatsApp', color: 'bg-green-500' },
                    { name: 'Messenger', color: 'bg-blue-500' },
                ].map((item, i) => (
                    <div key={i} className="glass-panel p-3 rounded-xl flex items-center justify-between cursor-pointer transition-transform hover:scale-[1.02] hover:bg-white border border-zinc-100 shadow-sm">
                        <span className="font-semibold text-zinc-700 text-xs pl-2">{item.name}</span>
                        <div className={`w-2 h-2 rounded-full ${item.color} mr-2 shadow-sm`}></div>
                    </div>
                ))}
            </div>
          </div>

          {/* Card 4 - Marketing Automation */}
          <div className="group bg-white border border-zinc-200 rounded-[32px] p-8 hover:shadow-2xl hover:shadow-zinc-200/50 transition-all duration-500 relative overflow-hidden flex flex-col">
             <div className="relative z-10 mb-6">
                <h3 className="text-xl font-bold text-zinc-900 mb-2 tracking-tight">Marketing</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">
                    Nasz innowacyjny kreator pop-upów i inteligentne kampanie zmienią odwiedzających w lojalnych klientów.
                </p>
            </div>
            
            <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col justify-end relative overflow-hidden">
                <div className="flex items-end justify-between gap-2 h-20 mt-2">
                    {[30, 45, 35, 60, 50, 75, 90].map((height, i) => (
                        <div key={i} className="w-full bg-slate-200 rounded-t-sm relative group/bar hover:bg-pink-200 transition-colors" style={{ height: `${height}%` }}>
                            {i === 6 && (
                                <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-rose-500 rounded-t-sm shadow-lg shadow-pink-500/30"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Card 5 (Dark) - Pay-per-Satisfaction (RESTORED) */}
          <div className="md:col-span-3 bg-slate-900 text-white border border-slate-800 rounded-[32px] p-8 md:p-16 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-500 relative overflow-hidden flex flex-col md:flex-row gap-12 md:gap-24 items-center mt-6">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-black/40"></div>
            
            <div className="relative z-10 flex-1 max-w-lg">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                        Rewolucyjny Model
                    </span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Pay-per-Satisfaction</h3>
                <p className="text-slate-400 text-lg leading-relaxed mb-8 font-light">
                    Koniec z płaceniem za puste słowa. Płacisz tylko wtedy, gdy AI rozwiąże problem klienta, a ocena jakości wyniesie <span className="text-white font-bold">6/10</span> lub więcej.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 text-sm font-medium text-slate-300">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-slate-600"></div>
                        Ocena 0-5: <span className="text-white font-bold">0 PLN</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        Ocena 6-10: <span className="text-white font-bold">Success Fee</span>
                    </div>
                </div>
            </div>

            {/* Progress Bar Visualization */}
            <div className="relative z-10 w-full md:w-1/2 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-md">
                <div className="flex justify-between items-end mb-6">
                    <div className="text-sm font-medium text-slate-400">Analiza jakości (Live)</div>
                    <div className="text-5xl font-bold text-emerald-400 tracking-tighter">9.2<span className="text-xl text-slate-500 font-normal">/10</span></div>
                </div>
                
                {/* The Bar */}
                <div className="relative h-4 bg-slate-700/50 rounded-full overflow-hidden w-full mb-3">
                    <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-gradient-to-r from-slate-600 to-slate-500/50 border-r-2 border-white/10"></div>
                    <div className="absolute left-[60%] top-0 bottom-0 w-[40%] bg-gradient-to-r from-emerald-600 to-emerald-400"></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_white] left-[92%] z-20"></div>
                </div>

                <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-4">
                    <span>Niezadowolony</span>
                    <span className="text-white text-center">Próg (6.0)</span>
                    <span className="text-emerald-400 text-right">Zachwycony</span>
                </div>

                <div className="mt-8 bg-emerald-500/10 rounded-2xl p-5 border border-emerald-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold text-sm">✓</div>
                        <div>
                            <div className="text-sm font-bold text-white">Sukces!</div>
                            <div className="text-xs text-slate-400">Naliczono opłatę.</div>
                        </div>
                    </div>
                    <div className="text-emerald-400 font-mono font-bold text-lg">2.00 PLN</div>
                </div>
            </div>
          </div>

        </div>
      </section>

      <footer id="contact" className="py-20 md:py-32 bg-white border-t border-zinc-200">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-4 gap-12 md:gap-16 mb-20 md:mb-24">
                <div className="md:col-span-2 space-y-8">
                    <div className="flex items-center gap-3">
                        <img src="/logotype.png" alt="Chataptor" className="h-6 w-auto object-contain opacity-80" />
                    </div>
                    <p className="text-zinc-500 font-light leading-relaxed max-w-md text-lg">Brama na świat dla Twojego e-commerce. Przełamujemy bariery językowe, łącząc AI z ludzką empatią.</p>
                </div>
                <div className="space-y-8">
                    <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Kontakt</h4>
                    <div className="space-y-4">
                    <a href="mailto:contact@chataptor.com" className="flex items-center gap-3 text-zinc-500 hover:text-zinc-900 transition-colors">
                        <span className="font-medium">contact@chataptor.com</span>
                    </a>
                    <div className="flex items-center gap-3 text-zinc-500">
                        <span className="font-medium">Łódź, Polska</span>
                    </div>
                    </div>
                </div>
                <div className="space-y-8">
                    <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Legal</h4>
                    <ul className="space-y-4 text-zinc-500 font-medium">
                    <li><a href="#" className="hover:text-zinc-900 transition-colors">Polityka prywatności</a></li>
                    <li><a href="#" className="hover:text-zinc-900 transition-colors">Regulamin</a></li>
                    </ul>
                </div>
            </div>
            <div className="border-t border-zinc-100 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-zinc-400 text-sm font-medium text-center">© {new Date().getFullYear()} Chataptor. Wszystkie prawa zastrzeżone.</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-zinc-400 bg-zinc-50 px-3 py-1.5 rounded-full border border-zinc-100">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                    System Operational
                </div>
            </div>
        </div>
      </footer>
    </main>
  );
}