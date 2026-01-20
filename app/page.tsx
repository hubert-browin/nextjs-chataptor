'use client';

import React, { useState, useEffect } from 'react';

// --- MOCK DATA (Dane testowe do prototypu) ---
const conversations = [
  {
    id: 1,
    name: 'Hans Müller',
    time: '2m',
    lastMessage: 'Wo ist meine Bestellung?',
    lang: 'DE',
    source: 'messenger', // messenger, whatsapp, email
    avatarColor: 'bg-indigo-100 text-indigo-600',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'Hallo, wo ist meine Bestellung?',
        translation: 'Cześć, gdzie jest moje zamówienie?', // Tłumaczenie na PL
        timestamp: '10:23'
      },
      {
        id: 2,
        sender: 'agent',
        text: 'Sprawdzam to dla Ciebie, daj mi chwilę.',
        translation: 'Ich überprüfe das für Sie, einen Moment bitte.', // Tłumaczenie na język klienta
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
    source: 'email',
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
    source: 'whatsapp',
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

// Helper do etykiety źródła
const SourceLabel = ({ source }: { source: string }) => {
    switch (source) {
      case 'messenger': return 'Messenger';
      case 'whatsapp': return 'WhatsApp';
      case 'email': return 'Email';
      default: return 'Chat';
    }
  };

export default function Home() {
  const [activeChatId, setActiveChatId] = useState(conversations[0].id);
  const [inputValue, setInputValue] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const activeChat = conversations.find(c => c.id === activeChatId) || conversations[0];

  // Efekt cienia na nawigacji po scrollowaniu
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
            {/* Logo */}
            <div className="flex items-center gap-2">
                <img 
                src="/logotype.png" 
                alt="Chataptor Logo" 
                className="h-8 w-auto object-contain"
                />
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-indigo-600 transition-colors">Produkt</a>
            <a href="#features" className="hover:text-indigo-600 transition-colors">Dla kogo</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Cennik</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors">Panel Agenta</a>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-slate-800 transition-all hover:shadow-lg hover:shadow-slate-900/20">
              Rozpocznij za darmo
            </button>
          </div>

          {/* Mobile Menu Button */}
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

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl md:hidden animate-in slide-in-from-top-5">
                <a href="#product" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Produkt</a>
                <a href="#features" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Dla kogo</a>
                <a href="#pricing" className="text-lg font-medium text-slate-700" onClick={() => setMobileMenuOpen(false)}>Cennik</a>
                <div className="h-px bg-slate-100 my-2"></div>
                <a href="#" className="text-lg font-medium text-slate-700">Panel Agenta</a>
                <button className="bg-indigo-600 text-white px-4 py-3 rounded-xl text-base font-medium w-full">
                    Rozpocznij za darmo
                </button>
            </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 text-center overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-3xl -z-10 opacity-60"></div>
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-40 left-0 w-72 h-72 bg-purple-100/40 rounded-full blur-3xl -z-10"></div>
        
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
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light mb-10 leading-relaxed">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br />
            <strong className="font-semibold text-slate-900">Zero tłumaczy. Zero opóźnień. 100% AI.</strong>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl text-base font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-xl shadow-slate-900/20 ring-4 ring-slate-900/5">
              Dołącz do bety
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 group">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <svg width="12" height="12" fill="currentColor" className="text-indigo-600 ml-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              Zobacz demo
            </button>
          </div>

          <div className="mt-16 text-xs text-slate-400 uppercase tracking-widest font-semibold mb-6">Technologia, której ufasz</div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Simple Text Logos for Tech Stack */}
            <div className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <span className="text-2xl">⚡</span> OpenAI
            </div>
            <div className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <span className="text-2xl">🔵</span> DeepL
            </div>
            <div className="text-xl font-bold text-slate-600 flex items-center gap-2">
                <span className="text-2xl">💧</span> Elixir
            </div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP - INTERAKTYWNE */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-6 -mt-10 mb-20 relative z-20">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-indigo-900/10 overflow-hidden flex flex-col h-[600px] md:h-[750px] ring-1 ring-slate-900/5">
          {/* Window Header */}
          <div className="bg-slate-50 h-10 border-b border-slate-100 flex items-center px-4 gap-2 shrink-0 justify-between">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
            </div>
            <div className="text-[10px] text-slate-400 font-mono tracking-wide">Chataptor Agent Dashboard v1.0</div>
            <div className="w-10"></div> {/* Spacer */}
          </div>
          
          {/* Window Body */}
          <div className="flex flex-1 overflow-hidden">
            
            {/* Sidebar (Chat List) */}
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
                    {/* Active Indicator */}
                    {activeChatId === chat.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full"></div>}

                    {/* AVATAR W SIDEBARZE */}
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
                             {/* JĘZYK + ŹRÓDŁO */}
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
            
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-slate-50/50 relative">
              
              {/* Chat Header */}
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
                      <span>Język klienta: <strong className="uppercase">{activeChat.lang}</strong></span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors" title="Szczegóły zamówienia">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                    </button>
                </div>
              </div>

              {/* Messages List */}
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
                        
                        {/* Translation Block */}
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
                        
                        {/* Status Icon for Agent */}
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
                
                {/* AI Suggestion Pill - Extra Feature */}
                {activeChat.messages.length > 0 && activeChat.messages[activeChat.messages.length-1].sender === 'user' && (
                    <div className="flex justify-center mt-4">
                        <button className="bg-indigo-50 hover:bg-indigo-100 text-indigo-600 text-xs px-3 py-1.5 rounded-full flex items-center gap-2 transition-colors border border-indigo-200">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            AI Sugestia: "Przepraszam za kłopot. Wyślemy nowy produkt jutro."
                        </button>
                    </div>
                )}
              </div>
              
              {/* Input Area */}
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

      {/* FEATURES (BENTO GRID) */}
      <section id="product" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Wszystko w jednym panelu.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Card 1 - Translation */}
          <div className="group bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300 md:col-span-2 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 group-hover:bg-indigo-100 transition-colors"></div>
            
            <div className="flex-1 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-600/20">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">Tłumaczenie Native-like</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.</p>
            </div>
            <div className="hidden md:flex flex-1 flex-col gap-3 w-full opacity-80 group-hover:opacity-100 transition-opacity">
               <div className="bg-white border border-slate-100 p-4 rounded-xl text-xs text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span>"Produkt jest super!"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Das Produkt ist toll!</strong>
               </div>
               <div className="bg-white border border-slate-100 p-4 rounded-xl text-xs text-slate-600 shadow-sm flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                 <span>"Zwrot środków"</span>
                 <svg className="w-4 h-4 text-slate-300 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                 <strong className="text-indigo-600 bg-indigo-50 px-2 py-1 rounded">Rückerstattung</strong>
               </div>
            </div>
          </div>

          {/* Card 2 - Omnichannel */}
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 md:row-span-2 flex flex-col relative overflow-hidden group">
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-50/50 to-transparent"></div>
            
            <div className="w-12 h-12 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 relative z-10">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 relative z-10 group-hover:text-blue-600 transition-colors">Omnichannel Inbox</h3>
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
          <div className="bg-white border border-slate-200 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-900/5 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-pink-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-pink-500/20">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-pink-600 transition-colors">Marketing Automation</h3>
            <p className="text-slate-500 text-sm">Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
          </div>

          {/* Card 4 (Dark) - Pay-per-Satisfaction */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
            {/* Background Mesh */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl"></div>

            <div>
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
                   <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Pay-per-Satisfaction</h3>
                <p className="text-slate-400 text-sm mb-6">Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka.</p>
            </div>

            {/* Interactive Visual Element */}
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

        {/* SECURITY TRUST BADGE SECTION */}
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

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
        <div className="px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            {/* Kolumna 1: Logo i Opis */}
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src="/logotype.png" 
                  alt="Chataptor" 
                  className="h-6 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Brama na świat dla Twojego e-commerce. Przełamujemy bariery językowe, łącząc AI z ludzką empatią. Sprzedawaj wszędzie, obsługuj lokalnie.
              </p>
              <div className="flex gap-4">
                {/* Social Icons (Placeholdery) */}
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.48 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                </a>
              </div>
            </div>

            {/* Kolumna 2: Produkt */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Produkt</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Funkcje</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Integracje</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Cennik</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Dla Developerów</a></li>
              </ul>
            </div>

            {/* Kolumna 3: Firma */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Firma</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">O nas</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Blog</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Kariera</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Kontakt</a></li>
              </ul>
            </div>

            {/* Kolumna 4: Legal & Kontakt */}
            <div>
              <h3 className="text-sm font-semibold text-slate-900 mb-4 uppercase tracking-wider">Legal</h3>
              <ul className="space-y-3 mb-6">
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Polityka Prywatności</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">Regulamin (Terms)</a></li>
                <li><a href="#" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors">RODO / GDPR</a></li>
              </ul>
              
              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-semibold mb-1">Masz pytania?</p>
                <a href="mailto:hello@chataptor.com" className="text-sm font-medium text-slate-700 hover:text-indigo-600 transition-colors">hello@chataptor.com</a>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-slate-400">
              &copy; {new Date().getFullYear()} Chataptor Sp. z o.o. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex gap-6">
               <span className="text-xs text-slate-300 flex items-center gap-1">
                 <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Systemy sprawne
               </span>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}