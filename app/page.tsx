import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      
      {/* NAVIGATION */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-200 h-16">
        <div className="h-full px-6 max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <span className="font-bold text-lg text-slate-900">Chataptor</span>
          </div>
          
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-slate-900 transition-colors">Produkt</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Dla kogo</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Cennik</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Panel Agenta</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors">
              Rozpocznij za darmo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-36 pb-20 text-center overflow-hidden">
        {/* Background Elements from globals.css */}
        <div className="hero-bg-stripes absolute inset-0 -z-10"></div>
        <div className="hero-bg-glow absolute -top-[20%] left-1/2 -translate-x-1/2 w-full h-[800px] -z-20"></div>
        
        <div className="px-6 max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium text-slate-600 mb-8">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-green"></div>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-slate-900">
            Sprzedawaj globalnie.<br />
            <span className="text-slate-400">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-light mb-10">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br />
            <strong className="font-semibold text-slate-900">Zero tłumaczy. Zero opóźnień. 100% AI.</strong>
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl text-base font-semibold hover:bg-slate-800 transition-colors">
              Dołącz do pilotażu
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-xl text-base font-semibold hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2">
              <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              Zobacz demo
            </button>
          </div>

          <div className="mt-16 text-xs text-slate-400 uppercase tracking-widest font-semibold">Powered by next-gen tech</div>
          <div className="flex justify-center gap-8 mt-4 opacity-40 grayscale">
            <div className="text-xl font-bold text-slate-400">OpenAI</div>
            <div className="text-xl font-bold text-slate-400">DeepL</div>
            <div className="text-xl font-bold text-slate-400">Elixir</div>
          </div>
        </div>
      </section>

      {/* UI MOCKUP */}
      <div className="px-6 max-w-5xl mx-auto -mt-10 mb-20 relative z-10">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Window Header */}
          <div className="bg-slate-50 h-9 border-b border-slate-100 flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
          </div>
          
          {/* Window Body */}
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] h-[400px]">
            {/* Sidebar */}
            <div className="hidden md:block border-r border-slate-100 p-4">
              <div className="p-3 rounded-lg bg-indigo-50 border border-indigo-100 mb-2 cursor-pointer">
                <div className="flex justify-between text-sm font-semibold text-slate-800">
                  Hans Müller <span className="text-slate-400 font-normal text-xs">2m</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">Wo ist meine Bestellung?</div>
                <span className="inline-block text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 mt-2">DE</span>
              </div>
              <div className="p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors">
                <div className="flex justify-between text-sm font-semibold text-slate-800">
                  Pierre Dubois <span className="text-slate-400 font-normal text-xs">5m</span>
                </div>
                <div className="text-xs text-slate-500 mt-1 truncate">Produit endommagé...</div>
                <span className="inline-block text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500 mt-2">FR</span>
              </div>
            </div>
            
            {/* Main Chat */}
            <div className="p-6 flex flex-col justify-between bg-white">
              <div className="flex flex-col gap-6">
                {/* Incoming */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 shrink-0"></div>
                  <div className="bg-slate-100 text-slate-700 p-3 rounded-xl rounded-tl-none max-w-[85%]">
                    <div className="font-medium text-sm">Hallo, wo ist meine Bestellung?</div>
                    <div className="text-[11px] text-slate-400 mt-1.5 pt-1.5 border-t border-slate-200/50">Tłum: Cześć, gdzie jest moje zamówienie?</div>
                  </div>
                </div>
                {/* Outgoing */}
                <div className="flex gap-3 justify-end">
                  <div className="bg-indigo-600 text-white p-3 rounded-xl rounded-tr-none max-w-[85%]">
                    <div className="text-sm">Sprawdzam to dla Ciebie, daj mi chwilę.</div>
                    <div className="text-[11px] text-indigo-200 mt-1.5 pt-1.5 border-t border-white/20">Przetłumaczono na Niemiecki</div>
                  </div>
                </div>
              </div>
              
              {/* Input */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg">
                  <input type="text" placeholder="Napisz wiadomość po polsku..." className="flex-1 bg-transparent border-none outline-none text-sm text-slate-700 placeholder:text-slate-400" />
                  <button className="text-indigo-600 text-sm font-semibold px-2">Wyślij</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES (BENTO GRID) */}
      <section id="product" className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Wszystko, czego potrzebujesz.<br />W jednym panelu.</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 md:col-span-2 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Native-like Translation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.</p>
            </div>
            <div className="hidden md:flex flex-1 flex-col gap-2 w-full">
               <div className="bg-white border border-slate-200 p-3 rounded-lg text-xs text-slate-600 shadow-sm">
                 "Produkt jest super!" <span className="text-slate-300 mx-1">→</span> <strong className="text-indigo-600">Das Produkt ist toll!</strong>
               </div>
               <div className="bg-white border border-slate-200 p-3 rounded-lg text-xs text-slate-600 shadow-sm">
                 "Zwrot środków" <span className="text-slate-300 mx-1">→</span> <strong className="text-indigo-600">Rückerstattung</strong>
               </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 md:row-span-2 flex flex-col">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Omnichannel Inbox</h3>
            <p className="text-slate-500 text-sm mb-8">Email, Chat, Messenger, WhatsApp - zarządzaj wszystkimi kanałami z jednego miejsca.</p>
            <div className="mt-auto flex flex-col gap-3">
               <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div> Messenger
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div> WhatsApp
               </div>
               <div className="flex items-center gap-3 text-sm text-slate-700">
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div> Email
               </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-lg bg-pink-100 text-pink-600 flex items-center justify-center mb-4">
              <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Marketing</h3>
            <p className="text-slate-500 text-sm">Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
          </div>

          {/* Card 4 (Dark) */}
          <div className="bg-slate-900 text-white border border-slate-800 rounded-2xl p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
            <div className="w-10 h-10 rounded-lg bg-white/10 text-white flex items-center justify-center mb-4">
               <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Pay-per-Satisfaction</h3>
            <p className="text-slate-400 text-sm">Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-slate-200 py-12 bg-white">
        <div className="px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 bg-slate-900 text-white text-[10px] flex items-center justify-center rounded">C</div>
            Chataptor
          </div>
          <div className="text-slate-500 text-sm">
            &copy; 2025 Chataptor. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors">Regulamin</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Prywatność</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Kontakt</a>
          </div>
        </div>
      </footer>

    </main>
  );
}
