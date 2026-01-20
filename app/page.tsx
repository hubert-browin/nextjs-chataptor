'use client';

import React, { useState, useEffect, useRef } from 'react';

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

const SourceLabel = ({ source }: { source: string }) => {
    return source;
};

// Nowoczesny komponent kroku z poprawioną linią
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
        <div ref={domRef} className={`relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Desktop Center Connector Point */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-4 border-white bg-indigo-600 shadow-md z-10 items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
            </div>

            {/* Desktop Horizontal Connector Line */}
            <div className={`hidden md:block absolute top-1/2 -z-0 h-0.5 border-t-2 border-dashed border-indigo-200 w-1/2
                ${side === 'left' ? 'left-1/2' : 'right-1/2'}
            `}></div>

            {/* Content Side */}
            <div className={`w-full md:w-1/2 flex flex-col justify-center relative z-10 ${side === 'left' ? 'md:items-end md:text-right md:pr-12 order-2 md:order-1' : 'md:items-start md:text-left md:pl-12 order-2 md:order-2'}`}>
                <div>
                    <div className="inline-block px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold mb-4 tracking-wide border border-slate-200">
                        KROK {number}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{title}</h3>
                    <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-sm">{description}</p>
                </div>
            </div>
            
            {/* Visual Side */}
            <div className={`w-full md:w-1/2 flex items-center justify-center relative z-10 order-1 ${side === 'left' ? 'md:order-2 md:pl-12' : 'md:order-1 md:pr-12'}`}>
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
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* NAVIGATION */}
      <nav className={`fixed w-full z-50 top-0 left-0 transition-all duration-300 ${scrolled || mobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="px-4 md:px-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="#" className="flex items-center gap-2">
                <img 
                src="/logotype.png" 
                alt="Chataptor Logo" 
                className="h-6 md:h-8 w-auto object-contain"
                />
            </a>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-slate-900 transition-colors">Produkt</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Jak to działa</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Cennik</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Panel Agenta</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20 active:scale-95">
              Rozpocznij za darmo
            </button>
          </div>

          <button 
            className="md:hidden p-2 text-slate-600 z-50 relative"
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-40 flex flex-col pt-24 px-6 gap-6 md:hidden animate-in fade-in duration-200">
                <a href="#product" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Produkt</a>
                <a href="#how-it-works" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Jak to działa</a>
                <a href="#pricing" className="text-2xl font-bold text-slate-900" onClick={() => setMobileMenuOpen(false)}>Cennik</a>
                <div className="h-px bg-slate-100 my-2"></div>
                <a href="#" className="text-lg font-medium text-slate-600">Panel Agenta</a>
                <button className="bg-slate-900 text-white px-4 py-4 rounded-2xl text-lg font-bold w-full shadow-xl shadow-slate-900/10">
                    Rozpocznij za darmo
                </button>
            </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 md:pt-44 pb-16 md:pb-24 text-center overflow-hidden">
        {/* Softer Background Decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] md:w-[1200px] h-[600px] bg-gradient-to-b from-indigo-50/60 to-transparent rounded-[100%] blur-3xl -z-10 opacity-70"></div>
        
        <div className="px-4 md:px-6 max-w-7xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] md:text-xs font-semibold text-slate-600 mb-6 md:mb-8 shadow-sm hover:shadow-md hover:border-slate-300 transition-all cursor-default mx-auto">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 md:mb-8 text-slate-900 px-2">
            Sprzedawaj globalnie.<br />
            <span className="text-slate-400">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-normal mb-8 md:mb-12 leading-relaxed px-4">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br className="hidden md:block"/>
            <span className="block mt-2 md:inline md:mt-0 text-slate-900 font-medium">Zero tłumaczy. Zero opóźnień. 100% AI.</span>
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-16 md:mb-20 px-4">
            <button className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-slate-900 text-white rounded-2xl text-base font-semibold hover:bg-slate-800 transition-all hover:scale-[1.02] shadow-xl shadow-slate-900/10 ring-4 ring-slate-100 active:scale-95">
              Dołącz do bety
            </button>
            <button className="w-full sm:w-auto px-8 py-3.5 md:py-4 bg-white text-slate-700 rounded-2xl text-base font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 group active:scale-95">
              <div className="w-6 h-6 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <svg width="10" height="10" fill="currentColor" className="ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span>Zobacz demo</span>
            </button>
          </div>

          <p className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 md:mb-8">Technologia, której ufasz</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500 px-4">
            <div className="h-6 md:h-8 flex items-center">
                <img src="/openai-logo.png" alt="OpenAI" className="h-full w-auto object-contain" />
            </div>
            <div className="h-5 md:h-7 flex items-center">
                <img src="/deepl-logo.png" alt="DeepL" className="h-full w-auto object-contain" />
            </div>
            <div className="h-7 md:h-9 flex items-center">
                <img src="/elixir-logo.png" alt="Elixir" className="h-full w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP - INTERAKTYWNE */}
      <div className="w-full max-w-7xl mx-auto px-2 md:px-6 -mt-6 md:-mt-10 mb-20 md:mb-32 relative z-20">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col h-[500px] md:h-[750px] ring-1 ring-slate-900/5">
          {/* Mockup Header */}
          <div className="bg-white h-10 md:h-12 border-b border-slate-100 flex items-center px-3 md:px-5 gap-2 shrink-0 justify-between">
            <div className="flex gap-1.5 md:gap-2">
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div>
                <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-slate-200"></div>
            </div>
            <div className="text-[10px] md:text-[11px] text-slate-400 font-medium tracking-wide">Chataptor Agent</div>
            <div className="w-8 md:w-10"></div>
          </div>
          
          <div className="flex flex-1 overflow-hidden relative">
            {/* Sidebar List - Hidden on small mobile, simplified */}
            <div className={`
                ${activeChatId ? 'hidden md:flex' : 'flex'} 
                w-full md:w-[320px] border-r border-slate-100 bg-white flex-col overflow-y-auto custom-scrollbar absolute md:relative z-10 h-full
            `}>
              <div className="p-4 md:p-5 border-b border-slate-50 flex justify-between items-center sticky top-0 bg-white z-10">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider">Inbox</div>
                <div className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-md font-medium">3 nowe</div>
              </div>
              <div className="p-2 md:p-3 space-y-1">
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
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-full shrink-0 flex items-center justify-center text-xs md:text-sm font-bold ${chat.avatarColor} ring-2 ring-white shadow-sm`}>
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
                        </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Chat Area */}
            <div className={`
                ${activeChatId ? 'flex' : 'hidden md:flex'} 
                flex-1 flex-col bg-slate-50/30 relative w-full h-full
            `}>
              {/* Mobile back button header */}
              <div className="md:hidden h-14 border-b border-slate-100 bg-white flex items-center px-4 gap-3 sticky top-0 z-20">
                   <button onClick={() => setActiveChatId(0)} className="p-2 -ml-2 text-slate-500">
                     <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                   </button>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${activeChat.avatarColor}`}>
                    {activeChat.name.charAt(0)}
                   </div>
                   <div className="font-bold text-sm text-slate-900">{activeChat.name}</div>
              </div>

              {/* Desktop Header */}
              <div className="hidden md:flex h-16 border-b border-slate-100 bg-white/80 backdrop-blur-sm items-center justify-between px-6 shrink-0 sticky top-0 z-10">
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

              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-6">
                {activeChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2 md:gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${msg.sender === 'agent' ? 'justify-end' : ''}`}>
                    {msg.sender === 'user' && (
                        <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full shrink-0 flex items-center justify-center text-[10px] md:text-xs font-bold shadow-sm ${activeChat.avatarColor}`}>
                          {activeChat.name.charAt(0)}
                        </div>
                    )}
                    
                    <div className={`flex flex-col max-w-[85%] md:max-w-[70%] ${msg.sender === 'agent' ? 'items-end' : 'items-start'}`}>
                      <div 
                        className={`p-3 md:p-4 rounded-2xl text-sm shadow-sm relative group ${
                          msg.sender === 'agent' 
                            ? 'bg-indigo-600 text-white rounded-tr-none'
                            : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                        }`}
                      >
                        <div className="font-medium leading-relaxed">{msg.text}</div>
                        {msg.translation && (
                          <div className={`mt-2 md:mt-3 pt-2 text-[10px] md:text-[11px] border-t flex items-start gap-2 ${
                            msg.sender === 'agent' 
                              ? 'border-white/20 text-indigo-100'
                              : 'border-slate-100 text-slate-400'
                          }`}>
                            <svg className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                            <span className="italic">{msg.translation}</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                    </div>

                    {msg.sender === 'agent' && (
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-900 shrink-0 flex items-center justify-center text-white text-[10px] md:text-xs font-bold shadow-sm">
                          A
                        </div>
                    )}
                  </div>
                ))}
                
                {activeChat.messages.length > 0 && activeChat.messages[activeChat.messages.length-1].sender === 'user' && (
                    <div className="flex justify-center mt-4">
                        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-[10px] md:text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors border border-indigo-200 shadow-sm whitespace-nowrap overflow-hidden max-w-full text-ellipsis">
                            <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            <span className="truncate">AI Sugestia: "Wyślemy nowy produkt jutro."</span>
                        </button>
                    </div>
                )}
              </div>
              
              <div className="p-3 md:p-4 bg-white border-t border-slate-100">
                <div className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-xl focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all shadow-inner">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Napisz po polsku..." 
                    className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400 px-2 min-w-0" 
                  />
                  <div className="flex items-center gap-1 border-r border-slate-200 pr-1 md:pr-2 mr-1">
                     <button className="hover:bg-slate-200 p-1.5 rounded-lg text-slate-400 transition-colors hidden sm:block" title="Załącz plik">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                     </button>
                  </div>
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-3 md:px-4 py-1.5 rounded-lg transition-all shadow-md shadow-indigo-200 active:scale-95">
                    Wyślij
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- SEKCJA: ŚCIEŻKA EKSPANSJI (NOWOCZESNA LINIA) --- */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Od lokalnego sklepu<br/>do globalnego gracza.</h2>
            <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">Ścieżka, która poprowadzi Cię do międzynarodowego sukcesu. Prosta, logiczna, zautomatyzowana.</p>
        </div>

        <div className="relative">
            {/* The Central Line (Desktop Only) */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px border-l-2 border-dashed border-indigo-200 -translate-x-1/2 rounded-full"></div>
            
            {/* Mobile Vertical Line */}
            <div className="md:hidden absolute left-4 top-4 bottom-4 w-px bg-slate-200"></div>

            <div className="space-y-16 md:space-y-0 relative">
                {/* Step 1 */}
                <GrowthStep 
                    number="1" 
                    title="Szybka instalacja" 
                    description="Instalujesz widget i panel w kilka minut. Twój obecny zespół supportu jest gotowy do działania bez długich szkoleń."
                    side="right"
                >
                    <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm ml-auto transform hover:-translate-y-1 transition-transform duration-300 relative">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-sm">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            </div>
                            <div>
                                <div className="text-sm font-bold text-slate-900">System gotowy</div>
                                <div className="text-xs text-slate-500">Status: Aktywny</div>
                            </div>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-indigo-500 w-[85%] rounded-full"></div>
                        </div>
                    </div>
                </GrowthStep>

                {/* Step 2 */}
                <GrowthStep 
                    number="2" 
                    title="Wybór rynków" 
                    description="W panelu administratora zaznaczasz kraje, na które chcesz wejść. Tłumaczenie AI włącza się automatycznie dla każdego z nich."
                    side="left"
                >
                    <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 w-full max-w-sm mr-auto transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex flex-wrap gap-2 mb-6">
                            <span className="px-3 py-1.5 bg-slate-50 rounded-lg text-xs font-semibold text-slate-500">Polska 🇵🇱</span>
                            <span className="px-3 py-1.5 bg-amber-50 rounded-lg text-xs font-semibold text-amber-700 border border-amber-100">Niemcy 🇩🇪</span>
                            <span className="px-3 py-1.5 bg-blue-50 rounded-lg text-xs font-semibold text-blue-700 border border-blue-100">Francja 🇫🇷</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm font-bold text-slate-700">Dostępność</span>
                            <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md font-bold">Globalna</span>
                        </div>
                    </div>
                </GrowthStep>

                {/* Step 3 */}
                <GrowthStep 
                    number="3" 
                    title="Obsługa bez barier" 
                    description="Klienci piszą w swoim języku, Ty odpisujesz po polsku. AI tłumaczy wszystko w locie, zachowując idealny kontekst e-commerce."
                    side="right"
                >
                    <div className="bg-white p-5 md:p-5 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 w-full max-w-sm ml-auto transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="flex flex-col gap-3">
                            <div className="flex gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-sm shadow-sm">🇩🇪</div>
                                <div className="bg-slate-50 p-3 rounded-2xl rounded-tl-none text-xs font-medium text-slate-600 border border-slate-100">Wo ist mein Paket?</div>
                            </div>
                            <div className="flex gap-3 justify-end">
                                <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-xs font-medium text-white shadow-md shadow-indigo-200">Gdzie jest moja paczka? 🇵🇱</div>
                                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-sm font-bold text-indigo-600 shadow-sm">A</div>
                            </div>
                            <div className="text-[10px] text-center text-slate-400 mt-2 font-medium">Tłumaczenie w czasie rzeczywistym...</div>
                        </div>
                    </div>
                </GrowthStep>

                {/* Step 4 */}
                <GrowthStep 
                    number="4" 
                    title="Wzrost przychodów" 
                    description="Klienci kupują chętniej, gdy mogą porozmawiać w swoim języku. Ty oszczędzasz na zespole, a słupki sprzedaży rosną."
                    side="left"
                    last={true}
                >
                    <div className="bg-white p-5 md:p-6 rounded-3xl border border-emerald-100 shadow-xl shadow-emerald-500/10 w-full max-w-sm mr-auto relative overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-10 -mt-10 opacity-60"></div>
                        <div className="relative z-10">
                            <div className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-2 tracking-tight">+40%</div>
                            <div className="text-sm font-semibold text-slate-600">Wzrost konwersji</div>
                            <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg w-fit">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                Trend wzrostowy
                            </div>
                        </div>
                    </div>
                </GrowthStep>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: WDROŻENIE (JASNA I PRZYJEMNA) --- */}
      <section className="py-16 md:py-24 px-4 md:px-6 bg-slate-50 border-y border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
            {/* Lewa strona: Tekst */}
            <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Wdrożenie szybsze niż<br/>parzenie kawy.</h2>
                <p className="text-slate-600 text-base md:text-lg mb-10 leading-relaxed">
                    Nie potrzebujesz armii programistów. Nasz widget integruje się z Twoim sklepem w <span className="text-slate-900 font-bold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-sm">3 minuty</span>. Po prostu wklej kod i zacznij sprzedawać globalnie.
                </p>
                
                <div className="space-y-6 md:space-y-8">
                    <div className="flex gap-4 md:gap-5 group">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">1</div>
                        <div>
                            <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Skopiuj snippet</h4>
                            <p className="text-slate-500 text-sm">Dostępny w Twoim panelu administratora.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-5 group">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">2</div>
                        <div>
                            <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Wklej w &lt;head&gt;</h4>
                            <p className="text-slate-500 text-sm">Działa z każdym CMS i customowym sklepem.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 md:gap-5 group">
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 font-bold shadow-sm group-hover:border-indigo-300 group-hover:shadow-indigo-100 transition-all">3</div>
                        <div>
                            <h4 className="font-bold text-base md:text-lg text-slate-900 mb-1">Wybierz języki</h4>
                            <p className="text-slate-500 text-sm">Włącz niemiecki, francuski lub włoski jednym kliknięciem.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Prawa strona: Code Mockup (Clean Light Version) */}
            <div className="relative mt-8 lg:mt-0">
                <div className="absolute -inset-2 bg-gradient-to-r from-slate-200 to-indigo-100 rounded-3xl blur-lg opacity-60"></div>
                <div className="relative bg-white rounded-2xl border border-slate-200 p-6 md:p-8 shadow-xl font-mono text-xs md:text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4 min-w-[300px]">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                            <div className="w-3 h-3 rounded-full bg-slate-200"></div>
                        </div>
                        <span className="text-slate-400 text-xs font-semibold">index.html</span>
                    </div>
                    <div className="text-slate-600 space-y-1.5 leading-relaxed min-w-[300px]">
                        <div><span className="text-pink-600">&lt;head&gt;</span></div>
                        <div className="pl-4 text-slate-400 opacity-70">&lt;!-- Twoje meta tagi --&gt;</div>
                        <div className="pl-4"><span className="text-pink-600">&lt;meta</span> <span className="text-indigo-600">charset</span>=<span className="text-emerald-600">"UTF-8"</span> /&gt;</div>
                        <div className="pl-4 h-4"></div>
                        <div className="pl-4 text-slate-400 italic">&lt;!-- Chataptor Integration --&gt;</div>
                        <div className="pl-4 bg-slate-50 border-l-2 border-indigo-500 py-2 pr-2 rounded-r">
                            <span className="text-pink-600">&lt;script</span> <span className="text-indigo-600">src</span>=<span className="text-emerald-600">"https://cdn.chataptor.com/widget.js"</span></div>
                        <div className="pl-8 bg-slate-50 border-l-2 border-indigo-500 py-2 pr-2 rounded-r -mt-1.5">
                            <span className="text-indigo-600">data-id</span>=<span className="text-emerald-600">"YOUR_STORE_ID"</span> <span className="text-pink-600">&gt;&lt;/script&gt;</span>
                        </div>
                        <div><span className="text-pink-600">&lt;/head&gt;</span></div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-8 right-8 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 flex items-center gap-2 shadow-sm">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        Connected
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- SEKCJA: INTEGRACJE (PLATFORMY) --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4">Działa z Twoim ekosystemem</h3>
            <p className="text-slate-500 mb-10 md:mb-12 text-sm md:text-base">Bezproblemowa integracja z najpopularniejszymi platformami e-commerce i komunikatorami.</p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-20 opacity-70 grayscale hover:grayscale-0 transition-all duration-700">
                <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-slate-700 hover:text-[#96BF48] transition-colors cursor-default group">
                    <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M22.95 9.6l-1.95-6.9L17.5 7.2 12.55 0 7.6 7.2 4.1 2.7 2.15 9.6c-.05.2-.05.45.05.65l8.55 11.2c.4.55 1.25.55 1.65 0l8.55-11.2c.1-.2.1-.45.05-.65z"/></svg>
                    Shopify
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-slate-700 hover:text-[#96588A] transition-colors cursor-default group">
                    <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 6.63 5.37 12 12 12 6.63 0 12-5.37 12-12 0-6.63-5.37-12-12-12zm4.39 16.32c-.52.26-2.58 1.15-3.04 1.35-.46.2-.82.16-1.12-.22-.3-.38-.6-1.16-.76-1.57-.16-.41-.44-.46-.86-.26-.42.2-1.78.85-2.22 1.05-.44.2-.87.42-1.25.64-.38.22-.64.44-1.25.64-.61.2-1.28-.2-1.28-.2s-1.38-.9-1.9-1.26c-.52-.36-.36-.92-.36-.92s.32-.56 1.9-1.26c1.58-.7 5.14-2.12 5.14-2.12s.9-.4 1.4-.4c.5 0 .9.4 1.4.4s3.56 1.42 5.14 2.12c1.58.7 1.9 1.26 1.9 1.26s.16.56-.36.92c-.52.36-1.9 1.26-1.9 1.26z"/></svg>
                    Woo
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-slate-700 hover:text-[#F37623] transition-colors cursor-default group">
                    <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12.9 2.1c-.5-.1-1.3-.1-1.8 0l-5.8 1.2-3.7 3.7c-.4.4-.6 1-.6 1.5v7c0 .6.2 1.1.6 1.5l3.7 3.7 5.8 1.2c.5.1 1.3.1 1.8 0l5.8-1.2 3.7-3.7c.4-.4.6-1 .6-1.5v-7c0-.6-.2-1.1-.6-1.5l-3.7-3.7-5.8-1.2zM7 12l5-5 5 5-5 5-5-5z"/></svg>
                    Magento
                </div>
                <div className="flex items-center gap-2 md:gap-3 text-lg md:text-xl font-bold text-slate-700 hover:text-[#0084FF] transition-colors cursor-default group">
                    <svg className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.265 0 11.765c0 3.706 2.059 7.029 5.294 9.088v3.853l3.294-1.794c1.088.294 2.235.471 3.412.471 6.627 0 12-5.265 12-11.765C24 5.265 18.627 0 12 0zm1.147 14.735l-3-3.206-5.853 3.206 6.441-6.824 3.029 3.206 5.824-3.206-6.441 6.824z"/></svg>
                    Messenger
                </div>
            </div>
        </div>
      </section>

      {/* FEATURES (BENTO GRID) */}
      <section id="product" className="py-16 md:py-24 px-4 md:px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">Wszystko w jednym panelu.</h2>
          <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 md:gap-8">
          {/* Card 1 - Translation */}
          <div className="group bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-slate-100 transition-colors"></div>
            
            <div className="flex-1 relative z-10 text-center md:text-left">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6 shadow-xl shadow-slate-900/10 mx-auto md:mx-0">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">Tłumaczenie Native-like</h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.</p>
            </div>
            <div className="hidden md:flex flex-1 flex-col gap-4 w-full opacity-80 group-hover:opacity-100 transition-opacity">
               <div className="bg-white border border-slate-100 p-5 rounded-2xl text-sm text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="truncate">"Produkt jest super!"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg truncate">Das Produkt ist toll!</strong>
               </div>
               <div className="bg-white border border-slate-100 p-5 rounded-2xl text-sm text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span className="truncate">"Zwrot środków"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg truncate">Rückerstattung</strong>
               </div>
            </div>
          </div>

          {/* Card 2 - Omnichannel */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 md:row-span-2 flex flex-col relative overflow-hidden group min-h-[400px]">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-50/50 to-transparent"></div>
            
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-xl shadow-indigo-600/20 relative z-10">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 relative z-10 group-hover:text-indigo-600 transition-colors">Omnichannel Inbox</h3>
            <p className="text-slate-500 text-sm md:text-base mb-10 relative z-10">Email, Chat, Messenger, WhatsApp - zarządzaj wszystkimi kanałami z jednego miejsca.</p>
            
            <div className="mt-auto flex flex-col gap-3 md:gap-4 relative z-10">
               {['Messenger', 'WhatsApp', 'Email', 'Instagram DM'].map((app, i) => (
                   <div key={app} className="flex items-center justify-between p-3 md:p-4 bg-white border border-slate-100 rounded-xl shadow-sm hover:scale-[1.02] transition-transform cursor-default">
                      <div className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                         <div className={`w-2.5 h-2.5 rounded-full ${i===0 ? 'bg-blue-500' : i===1 ? 'bg-green-500' : i===2 ? 'bg-yellow-500' : 'bg-pink-500'}`}></div> 
                         {app}
                      </div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                   </div>
               ))}
            </div>
          </div>

          {/* Card 3 - Marketing */}
          <div className="bg-white border border-slate-200 rounded-[2rem] p-6 md:p-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 group">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-6 shadow-xl shadow-pink-500/20">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 group-hover:text-pink-600 transition-colors">Marketing Automation</h3>
            <p className="text-slate-500 text-sm md:text-base">Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
          </div>

          {/* Card 4 (Dark) - Pay-per-Satisfaction */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-[2rem] p-6 md:p-10 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between group min-h-[300px]">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/20 rounded-full blur-[60px] group-hover:bg-emerald-500/30 transition-all duration-500"></div>

            <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                   <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-3">Pay-per-Satisfaction</h3>
                <p className="text-slate-400 text-sm md:text-base mb-8">Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka.</p>
            </div>

            <div className="bg-slate-800/50 rounded-2xl p-5 border border-white/10 backdrop-blur-sm relative z-10">
                <div className="flex justify-between text-[10px] md:text-[11px] text-slate-400 mb-3 uppercase tracking-wider font-bold">
                    <span>Niezadowolony</span>
                    <span className="text-emerald-400">Sukces</span>
                </div>
                <div className="h-2.5 bg-slate-700 rounded-full overflow-hidden relative mb-4">
                    <div className="absolute left-0 top-0 h-full w-3/4 bg-gradient-to-r from-slate-600 to-emerald-500 rounded-full"></div>
                    <div className="absolute left-3/4 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg"></div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">Opłata: 0 PLN</span>
                    <span className="text-xs text-white font-bold bg-white/10 px-2 py-1 rounded">Opłata: Standard</span>
                </div>
            </div>
          </div>
        </div>

        {/* SECURITY BADGES */}
        <div className="mt-16 md:mt-20 border-t border-slate-100 pt-12 text-center">
            <h4 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Bezpieczeństwo klasy Enterprise</h4>
            <div className="flex flex-wrap justify-center gap-6 md:gap-20 items-center">
                 <div className="flex items-center gap-2 md:gap-3 text-slate-500 font-semibold hover:text-slate-800 transition-colors cursor-default text-sm md:text-base">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/></svg>
                    GDPR / RODO Shield
                 </div>
                 <div className="flex items-center gap-2 md:gap-3 text-slate-500 font-semibold hover:text-slate-800 transition-colors cursor-default text-sm md:text-base">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-9-2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/></svg>
                    AES-256 Encryption
                 </div>
                 <div className="flex items-center gap-2 md:gap-3 text-slate-500 font-semibold hover:text-slate-800 transition-colors cursor-default text-sm md:text-base">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                    Data Residency (EU)
                 </div>
            </div>
        </div>
      </section>

      <footer id="contact" className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-3 gap-12 md:gap-16 mb-16 md:mb-20">
            
            <div className="space-y-6 md:space-y-8">
                <div className="flex items-center gap-3">
                    <img 
                        src="/logotype.png" 
                        alt="Chataptor" 
                        className="h-6 md:h-8 w-auto object-contain"
                    />
                </div>
                <p className="text-slate-500 font-light leading-relaxed max-w-md text-base md:text-lg">
                    Brama na świat dla Twojego e-commerce. Przełamujemy bariery językowe, łącząc AI z ludzką empatią.
                </p>
            </div>

            <div className="space-y-6 md:space-y-8">
                <h4 className="text-lg font-bold text-slate-900">Kontakt</h4>
                <div className="space-y-4 md:space-y-5">
                <a href="mailto:hello@chataptor.com" className="flex items-center gap-4 text-slate-500 hover:text-slate-900 transition-colors group">
                    <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-slate-100 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail">
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                        </svg>
                    </div>
                    <span className="font-medium text-sm md:text-base">contact@chataptor.com</span>
                </a>
                <div className="flex items-center gap-4 text-slate-500">
                    <div className="p-2 bg-slate-50 rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin">
                        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                    </div>
                    <span className="font-medium text-sm md:text-base">Łódź, Polska</span>
                </div>
                </div>
            </div>

            <div className="space-y-6 md:space-y-8">
                <h4 className="text-lg font-bold text-slate-900">Informacje prawne</h4>
                <ul className="space-y-3 md:space-y-4 text-slate-500 font-medium text-sm md:text-base">
                <li>
                    <a href="#" className="hover:text-slate-900 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                        Polityka prywatności
                    </a>
                </li>
                <li>
                    <a href="#" className="hover:text-slate-900 transition-colors flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-slate-300 rounded-full"></span>
                        Regulamin
                    </a>
                </li>
                </ul>
            </div>
            </div>

            <div className="border-t border-slate-100 pt-8 md:pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-slate-400 text-sm font-medium text-center">
                © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
            </p>
            <div className="flex items-center gap-3 text-xs font-bold text-slate-500 bg-slate-50 px-4 py-2 rounded-full border border-slate-100">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Uptime: 99.98%
            </div>
            </div>
        </div>
      </footer>

    </main>
  );
}