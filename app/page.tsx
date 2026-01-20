'use client';

import React, { useState, useEffect, useRef } from 'react';

// --- MOCK DATA (Dane testowe do prototypu) ---
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

const SourceLabel = ({ source }: { source: string }) => {
    return source;
};

// Komponent dla pojedynczego kroku w sekcji "Jak to działa" z prostą animacją wejścia
const GrowthStep = ({ number, title, description, children, side = 'left' }: { number: string, title: string, description: string, children: React.ReactNode, side?: 'left' | 'right' }) => {
    const [isVisible, setIsVisible] = useState(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setIsVisible(entry.isIntersecting));
        });
        if (domRef.current) observer.observe(domRef.current);
        return () => {
            if (domRef.current) observer.unobserve(domRef.current);
        };
    }, []);

    return (
        <div ref={domRef} className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className={`md:w-1/2 flex ${side === 'left' ? 'justify-end text-right' : 'justify-start text-left'} ${side === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                <div>
                    <div className="text-indigo-600 font-bold mb-2 uppercase tracking-wide text-xs">KROK {number}</div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{title}</h3>
                    <p className="text-slate-500 max-w-xs leading-relaxed">{description}</p>
                </div>
            </div>
            
            {/* Circle Indicator */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 bg-white border-2 border-indigo-100 rounded-full shadow-lg hidden md:flex items-center justify-center text-indigo-600 text-sm font-bold z-10 transition-colors duration-500 ${isVisible ? 'bg-indigo-600 text-white border-indigo-600' : ''}`}>
                {number}
            </div>

            <div className={`md:w-1/2 ${side === 'left' ? 'md:order-2' : 'md:order-1 flex justify-end'}`}>
                {children}
            </div>
        </div>
    );
};


export default function Home() {
  const [activeChatId, setActiveChatId] = useState(conversations[0].id);
  const [inputValue, setInputValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    const handleScroll = () => {
        setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3' : 'bg-transparent py-5'}`}>
        <div className="px-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <img 
                src="/logotype.png" 
                alt="Chataptor Logo" 
                className="h-8 w-auto object-contain"
                />
            </div>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-slate-900 transition-colors">Produkt</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Jak to działa</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Cennik</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Panel Agenta</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20">
              Rozpocznij za darmo
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-5">
                <a href="#product" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Produkt</a>
                <a href="#how-it-works" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Jak to działa</a>
                <a href="#pricing" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Cennik</a>
                <div className="h-px bg-slate-100 my-2"></div>
                <a href="#" className="text-lg font-medium text-slate-700">Panel Agenta</a>
                <button className="bg-slate-900 text-white px-4 py-3 rounded-xl text-base font-medium w-full">
                    Rozpocznij za darmo
                </button>
            </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-slate-50/80 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-gray-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-slate-100/40 rounded-full blur-3xl -z-10"></div>
        
        <div className="px-6 max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-600 mb-8 shadow-sm hover:shadow-md transition-shadow cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
            Sprzedawaj globalnie.<br />
            <span className="text-slate-500">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br />
            <strong className="font-semibold text-slate-900">Zero tłumaczy. Zero opóźnień. 100% AI.</strong>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl text-base font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 ring-4 ring-slate-900/5">
              Dołącz do bety
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-800 rounded-xl text-base font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center group-hover:scale-110 group-hover:bg-slate-800 group-hover:text-white transition-all duration-300 shadow-inner">
                <svg width="12" height="12" fill="currentColor" className="ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Zobacz demo</span>
            </button>
          </div>

          <div className="mt-16 text-xs text-slate-400 uppercase tracking-widest font-semibold mb-6">Technologia, której ufasz</div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="h-8 flex items-center">
                <img src="/openai-logo.png" alt="OpenAI" className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-8 flex items-center">
                <img src="/deepl-logo.png" alt="DeepL" className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
            <div className="h-10 flex items-center">
                <img src="/elixir-logo.png" alt="Elixir" className="h-full w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP - INTERAKTYWNE */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 -mt-10 mb-20 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-indigo-900/10 overflow-hidden flex flex-col h-[600px] md:h-[750px] ring-1 ring-slate-900/5">
          <div className="bg-slate-50 h-10 border-b border-slate-100 flex items-center px-4 gap-2 shrink-0 justify-between">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wide">Chataptor Agent Dashboard v1.0</div>
            <div className="w-10"></div>
          </div>
          
          <div className="flex flex-1 overflow-hidden">
            <div className="w-1/3 md:w-[320px] border-r border-slate-100 bg-white flex flex-col overflow-y-auto custom-scrollbar">
              <div className="p-4 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inbox</div>
                <div className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded-md">3 oczekujące</div>
              </div>
              <div className="p-2 space-y-1">
                {conversations.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all duration-200 group flex items-start gap-3 relative ${
                      activeChatId === chat.id
                        ? 'bg-indigo-50 border-indigo-100 shadow-sm z-10'
                        : 'bg-white border-transparent hover:bg-slate-50'
                    }`}
                  >
                    {activeChatId === chat.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"></div>}
                    <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm font-bold ${chat.avatarColor} ring-2 ring-white shadow-sm`}>
                        {chat.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0 py-0.5">
                        <div className="flex justify-between items-center mb-0.5">
                            <span className={`text-sm font-semibold truncate ${activeChatId === chat.id ? 'text-indigo-900' : 'text-slate-700'}`}>
                                {chat.name}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-2 whitespace-nowrap">{chat.time}</span>
                        </div>
                        <div className={`text-xs truncate ${activeChatId === chat.id ? 'text-indigo-600/80' : 'text-slate-500'}`}>
                            {chat.lastMessage}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                             <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] font-medium text-slate-500 shadow-sm">
                                <span className={`w-2 h-2 rounded-full ${chat.id === 1 ? 'bg-yellow-400' : chat.id === 2 ? 'bg-blue-400' : 'bg-green-400'}`}></span>
                                <span>{chat.lang}</span>
                            </span>
                             <span className="inline-flex items-center px-1.5 py-0.5 bg-slate-50 rounded text-[9px] text-slate-400 uppercase tracking-wide">
                                {SourceLabel({source: chat.source})}
                             </span>
                        </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex-1 flex flex-col bg-slate-50/50 relative">
              <div className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-10">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${activeChat.avatarColor}`}>
                    {activeChat.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">{activeChat.name}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-2">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Online</span>
                      <span className="text-slate-300">•</span>
                      <span>Język: <strong className="uppercase">{activeChat.lang}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span className="capitalize">{activeChat.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'agent' ? 'justify-end' : ''}`}>
                    {msg.sender === 'user' && (
                        <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold shadow-sm ${activeChat.avatarColor}`}>
                          {activeChat.name.charAt(0)}
                        </div>
                    )}
                    
                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`p-4 rounded-2xl text-sm shadow-sm relative group ${
                          msg.sender === 'agent' 
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                        }`}
                      >
                        <div className="font-medium leading-relaxed">{msg.text}</div>
                        {msg.translation && (
                          <div className={`mt-3 pt-2 text-[11px] border-t flex items-start gap-2 ${
                            msg.sender === 'agent' 
                              ? 'border-white/20 text-indigo-100'
                              : 'border-slate-100 text-slate-400'
                          }`}>
                            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                            <span className="italic">{msg.translation}</span>
                          </div>
                        )}
                        {msg.sender === 'agent' && (
                            <div className="absolute -left-5 bottom-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>

                    {msg.sender === 'agent' && (
                        <div className="w-8 h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                          A
                        </div>
                    )}
                  </div>
                ))}
                
                {activeChat.messages.length > 0 && activeChat.messages[activeChat.messages.length-1].sender === 'user' && (
                    <div className="flex justify-center mt-4">
                        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors border border-indigo-200">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            AI Sugestia: "Przepraszam za kłopot. Wyślemy nowy produkt jutro."
                        </button>
                    </div>
                )}
              </div>
              
              <div className="p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Napisz wiadomość po polsku..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 px-2" 
                  />
                  <div className="flex items-center gap-1 border-r border-slate-200 pr-2 mr-1">
                     <button className="hover:bg-slate-200 p-1.5 rounded-lg text-slate-400 transition-colors" title="Załącz plik">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                     </button>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-all shadow-md shadow-indigo-200 active:scale-95">
                    Wyślij
                  </button>
                </div>
                <div className="text-center mt-2 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                   <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                   AI automatycznie przetłumaczy Twoją wiadomość na <strong className="uppercase">{activeChat.lang}</strong>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SEKCJA: ŚCIEŻKA EKSPANSJI (JAK TO DZIAŁA) - PRZENIESIONA I ODŚWIEŻONA --- */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Od lokalnego sklepu<br/>do globalnego gracza.</h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">Prosta ścieżka ekspansji. Bez dodatkowych pracowników, bez skomplikowanych wdrożeń.</p>
        </div>

        <div className="relative">
            {/* Vertical Line - connecting steps */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-100 via-indigo-200 to-slate-100 -translate-x-1/2 hidden md:block"></div>

            <div className="space-y-32">
                <GrowthStep 
                    number="1" 
                    title="Podłączasz Chataptor" 
                    description="Instalujesz widget i panel w kilka minut. Twój obecny zespół supportu jest gotowy do działania."
                    side="left"
                >
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-sm transform hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">System gotowy</div>
                                <div className="text-xs text-slate-500">Status: Aktywny</div>
                            </div>
                        </div>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-full animate-[progress_1s_ease-out]"></div>
                        </div>
                    </div>
                </GrowthStep>

                <GrowthStep 
                    number="2" 
                    title="Odblokowujesz rynki" 
                    description="W panelu administratora zaznaczasz kraje, które chcesz obsługiwać. Tłumaczenie AI włącza się automatycznie."
                    side="right"
                >
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/50 max-w-sm ml-auto transform hover:scale-105 transition-transform duration-300">
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-500">Polska 🇵🇱</span>
                            <span className="px-3 py-1 bg-yellow-100 rounded-full text-xs font-medium text-yellow-700 border border-yellow-200">Niemcy 🇩🇪</span>
                            <span className="px-3 py-1 bg-blue-100 rounded-full text-xs font-medium text-blue-700 border border-blue-200">Francja 🇫🇷</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-sm font-semibold text-slate-700">Dostępność</span>
                            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">Globalna</span>
                        </div>
                    </div>
                </GrowthStep>

                <GrowthStep 
                    number="3" 
                    title="Obsługujesz bez barier" 
                    description="Klienci piszą po niemiecku, Ty odpisujesz po polsku. AI tłumaczy w locie, zachowując kontekst e-commerce."
                    side="left"
                >
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 max-w-sm transform hover:scale-105 transition-transform duration-300">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">🇩🇪</div>
                                <div className="bg-slate-100 p-2.5 rounded-2xl rounded-tl-none text-xs text-slate-600">Wo ist mein Paket?</div>
                            </div>
                            <div className="flex gap-2 justify-end">
                                <div className="bg-indigo-600 p-2.5 rounded-2xl rounded-tr-none text-xs text-white shadow-md shadow-indigo-200">Gdzie jest moja paczka? 🇵🇱</div>
                                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px]">A</div>
                            </div>
                            <div className="text-[10px] text-center text-slate-400 mt-1">Tłumaczenie w czasie rzeczywistym...</div>
                        </div>
                    </div>
                </GrowthStep>

                <GrowthStep 
                    number="4" 
                    title="Zwiększasz sprzedaż" 
                    description="Klienci kupują chętniej, gdy mogą porozmawiać w swoim języku. Ty oszczędzasz na native speakerach."
                    side="right"
                >
                    <div className="bg-white p-6 rounded-2xl border border-green-100 shadow-xl shadow-green-900/5 max-w-sm ml-auto relative overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-full blur-2xl -mr-10 -mt-10"></div>
                        <div className="relative z-10">
                            <div className="text-4xl font-bold text-green-600 mb-2">+40%</div>
                            <div className="text-sm font-medium text-slate-600">Wzrost konwersji na nowych rynkach</div>
                            <div className="mt-4 flex items-center gap-2 text-xs text-green-700 bg-green-50 px-3 py-1.5 rounded-lg w-fit">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                Trend wzrostowy
                            </div>
                        </div>
                    </div>
                </GrowthStep>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: WDROŻENIE (DEVELOPER FRIENDLY) --- */}
      <section className="py-24 px-6 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-[100px]"></div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
            {/* Lewa strona: Tekst */}
            <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Wdrożenie szybsze niż parzenie kawy.</h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                    Nie potrzebujesz armii programistów. Nasz widget integruje się z Twoim sklepem w <span className="text-white font-semibold">3 minuty</span>. Po prostu wklej kod i zacznij sprzedawać globalnie.
                </p>
                
                <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">1</div>
                        <div>
                            <h4 className="font-semibold text-lg text-white">Skopiuj snippet</h4>
                            <p className="text-slate-500 text-sm">Dostępny w Twoim panelu administratora.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">2</div>
                        <div>
                            <h4 className="font-semibold text-lg text-white">Wklej w &lt;head&gt;</h4>
                            <p className="text-slate-500 text-sm">Działa z każdym CMS i customowym sklepem.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 group">
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400 font-bold group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-500 transition-colors">3</div>
                        <div>
                            <h4 className="font-semibold text-lg text-white">Wybierz języki</h4>
                            <p className="text-slate-500 text-sm">Włącz niemiecki, francuski lub włoski jednym kliknięciem.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prawa strona: Code Mockup */}
            <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-[#0F172A] rounded-xl border border-slate-800 p-6 shadow-2xl font-mono text-sm overflow-hidden">
                    <div className="flex items-center gap-2 mb-4 border-b border-slate-800 pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="ml-2 text-slate-500 text-xs">index.html</span>
                    </div>
                    <div className="text-slate-300 space-y-1">
                        <div><span className="text-purple-400">&lt;head&gt;</span></div>
                        <div className="pl-4 text-slate-500">&lt;!-- Twoje meta tagi --&gt;</div>
                        <div className="pl-4"><span className="text-purple-400">&lt;meta</span> <span className="text-blue-400">charset</span>=<span className="text-green-400">"UTF-8"</span> /&gt;</div>
                        <div className="pl-4 h-4"></div>
                        <div className="pl-4 text-slate-500">&lt;!-- Chataptor Integration --&gt;</div>
                        <div className="pl-4 bg-indigo-500/10 border-l-2 border-indigo-500 py-1 pr-2">
                            <span className="text-purple-400">&lt;script</span> <span className="text-blue-400">src</span>=<span className="text-green-400">"https://cdn.chataptor.com/widget.js"</span></div>
                        <div className="pl-8 bg-indigo-500/10 border-l-2 border-indigo-500 py-1 pr-2">
                            <span className="text-blue-400">data-id</span>=<span className="text-green-400">"YOUR_STORE_ID"</span> <span className="text-purple-400">&gt;&lt;/script&gt;</span>
                        </div>
                        <div><span className="text-purple-400">&lt;/head&gt;</span></div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-6 right-6 px-3 py-1 bg-green-500/10 text-green-400 text-xs rounded-full border border-green-500/20 flex items-center gap-2 animate-pulse">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
                        Connected
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: INTEGRACJE (PLATFORMY) - PRZENIESIONA NIŻEJ --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-2xl font-bold text-slate-900 mb-10">Integrujemy się z Twoim ekosystemem</h3>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Text placeholders for platforms */}
                <div className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#96BF48] transition-colors cursor-default">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M22.95 9.6l-1.95-6.9L17.5 7.2 12.55 0 7.6 7.2 4.1 2.7 2.15 9.6c-.05.2-.05.45.05.65l8.55 11.2c.4.55 1.25.55 1.65 0l8.55-11.2c.1-.2.1-.45.05-.65z"/></svg>
                    Shopify
                </div>
                <div className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#96588A] transition-colors cursor-default">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12 0-6.63-5.37-12-12-12zm4.39 16.32c-.52.26-2.58 1.15-3.04 1.35-.46.2-.82.16-1.12-.22-.3-.38-.6-1.16-.76-1.57-.16-.41-.44-.46-.86-.26-.42.2-1.78.85-2.22 1.05-.44.2-.87.42-1.25.64-.38.22-.64.44-1.25.64-.61.2-1.28-.2-1.28-.2s-1.38-.9-1.9-1.26c-.52-.36-.36-.92-.36-.92s.32-.56 1.9-1.26c1.58-.7 5.14-2.12 5.14-2.12s.9-.4 1.4-.4c.5 0 .9.4 1.4.4s3.56 1.42 5.14 2.12c1.58.7 1.9 1.26 1.9 1.26s.16.56-.36.92c-.52.36-1.9 1.26-1.9 1.26z"/></svg>
                    WooCommerce
                </div>
                <div className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#F37623] transition-colors cursor-default">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12.9 2.1c-.5-.1-1.3-.1-1.8 0l-5.8 1.2-3.7 3.7c-.4.4-.6 1-.6 1.5v7c0 .6.2 1.1.6 1.5l3.7 3.7 5.8 1.2c.5.1 1.3.1 1.8 0l5.8-1.2 3.7-3.7c.4-.4.6-1 .6-1.5v-7c0-.6-.2-1.1-.6-1.5l-3.7-3.7-5.8-1.2zM7 12l5-5 5 5-5 5-5-5z"/></svg>
                    Magento
                </div>
                <div className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#0084FF] transition-colors cursor-default">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.265 0 11.765c0 3.706 2.059 7.029 5.294 9.088v3.853l3.294-1.794c1.088.294 2.235.471 3.412.471 6.627 0 12-5.265 12-11.765C24 5.265 18.627 0 12 0zm1.147 14.735l-3-3.206-5.853 3.206 6.441-6.824 3.029 3.206 5.824-3.206-6.441 6.824z"/></svg>
                    Messenger
                </div>
                <div className="flex items-center gap-2 text-xl font-bold text-slate-700 hover:text-[#25D366] transition-colors cursor-default">
                    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 0C5.396 0 0 5.373 0 12c0 2.123.554 4.116 1.517 5.862L.47 23.587l5.962-1.564A11.91 11.91 0 0012.031 24c6.634 0 12.031-5.373 12.031-12S18.665 0 12.031 0zm0 21.84a9.824 9.824 0 01-5.006-1.373l-.36-.213-3.716.974.993-3.623-.234-.373A9.824 9.824 0 013.99 12c0-5.41 4.402-9.84 9.84-9.84s9.84 4.43 9.84 9.84c0 5.424-4.416 9.84-9.839 9.84z"/></svg>
                    WhatsApp
                </div>
            </div>
        </div>
      </section>

      {/* FEATURES (BENTO GRID) - PRZENIESIONE NA KONIEC */}
      <section id="product" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Wszystko w jednym panelu.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Card 1 - Translation */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-slate-100 transition-colors"></div>
            
            <div className="flex-1 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-slate-900/10">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">Tłumaczenie Native-like</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.</p>
            </div>
            <div className="hidden md:flex flex-1 flex-col gap-3 w-full opacity-80 group-hover:opacity-100 transition-opacity">
               <div className="bg-white border border-slate-100 p-4 rounded-xl text-xs text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span>"Produkt jest super!"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-slate-700 bg-slate-100 px-2 py-1 rounded">Das Produkt ist toll!</strong>
               </div>
               <div className="bg-white border border-slate-100 p-4 rounded-xl text-xs text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span>"Zwrot środków"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-slate-700 bg-slate-100 px-2 py-1 rounded">Rückerstattung</strong>
               </div>
            </div>
          </div>

          {/* Card 2 - Omnichannel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 md:row-span-2 flex flex-col relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20 relative z-10">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10 group-hover:text-indigo-600 transition-colors">Omnichannel Inbox</h3>
            <p className="text-slate-500 text-sm mb-8 relative z-10">Email, Chat, Messenger, WhatsApp - zarządzaj wszystkimi kanałami z jednego miejsca.</p>
            
            <div className="mt-auto flex flex-col gap-3 relative z-10">
               {['Messenger', 'WhatsApp', 'Email', 'Instagram DM'].map((app, i) => (
                   <div key={app} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl shadow-sm hover:scale-105 transition-transform cursor-default">
                      <div className="flex items-center gap-3 text-sm font-medium text-slate-700">
                         <div className={`w-2 h-2 rounded-full ${i===0 ? 'bg-blue-500' : i===1 ? 'bg-green-500' : i===2 ? 'bg-yellow-500' : 'bg-pink-500'}`}></div> 
                         {app}
                      </div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                   </div>
               ))}
            </div>
          </div>

          {/* Card 3 - Marketing */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">Marketing Automation</h3>
            <p className="text-slate-500 text-sm">Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
          </div>

          {/* Card 4 (Dark) - Pay-per-Satisfaction */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>

            <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                   <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Pay-per-Satisfaction</h3>
                <p className="text-slate-400 text-sm mb-6">Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka.</p>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-3 border border-white/5 backdrop-blur-sm">
                <div className="flex justify-between text-[10px] text-slate-400 mb-2 uppercase tracking-wider font-semibold">
                    <span>Niezadowolony</span>
                    <span className="text-green-400">Sukces</span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden relative">
                    <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-slate-600 to-green-500 rounded-full"></div>
                    <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"></div>
                </div>
                <div className="flex justify-between mt-2 items-center">
                    <span className="text-xs text-slate-500">Opłata: 0 PLN</span>
                    <span className="text-xs text-white font-bold">Opłata: Standard</span>
                </div>
            </div>
          </div>
        </div>

        {/* SECURITY BADGES (na dole bento grida) */}
        <div className="mt-16 border-t border-slate-100 pt-10 text-center">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">Bezpieczeństwo klasy Enterprise</h4>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center">
                 <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                    GDPR / RODO Shield
                 </div>
                 <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    AES-256 Encryption
                 </div>
                 <div className="flex items-center gap-2 text-slate-500 font-semibold">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    Data Residency (EU)
                 </div>
            </div>
        </div>
      </section>

      <footer id="contact" className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
            
            <div className="space-y-6">
                <div className="flex items-center gap-3">
                    <img 
                        src="/logotype.png" 
                        alt="Chataptor" 
                        className="h-8 w-auto object-contain"
                    />
                </div>
                <p className="text-slate-500 font-light leading-relaxed max-w-md">
                    Brama na świat dla Twojego e-commerce. Przełamujemy bariery językowe, łącząc AI z ludzką empatią.
                </p>
            </div>

            <div className="space-y-6">
                <h4 className="text-xl font-medium text-slate-900">Kontakt</h4>
                <div className="space-y-4">
                <a href="mailto:hello@chataptor.com" className="flex items-center gap-3 text-slate-500 hover:text-slate-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail h-5 w-5 flex-shrink-0">
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <span className="font-light">contact@chataptor.com</span>
                </a>
                <div className="flex items-center gap-3 text-slate-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin w-5 h-5">
                    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="font-light">Łódź, Polska</span>
                </div>
                </div>
            </div>

            <div className="space-y-6">
                <h4 className="text-xl font-medium text-slate-900">Informacje prawne</h4>
                <ul className="space-y-3 text-slate-500 font-light">
                <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Polityka prywatności</a>
                </li>
                <li>
                    <a href="#" className="hover:text-slate-900 transition-colors">Regulamin</a>
                </li>
                </ul>
            </div>
            </div>

            <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm font-light text-center">
                © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                Uptime: 99.98%
            </div>
            </div>
        </div>
      </footer>

    </main>
  );
}