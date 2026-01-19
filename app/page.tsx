import React from 'react';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* NAV */}
      <nav className="fixed w-full z-50 top-0 left-0 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo: Black Square with White Lines */}
            <div className="w-8 h-8 bg-slate-900 rounded-md flex items-center justify-center text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
              </svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Chataptor</span>
          </div>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#product" className="hover:text-slate-900 transition-colors">Produkt</a>
            <a href="#how-it-works" className="hover:text-slate-900 transition-colors">Dla kogo</a>
            <a href="#pricing" className="hover:text-slate-900 transition-colors">Cennik</a>
          </div>

          <div className="flex items-center gap-4">
            <a href="#" className="hidden md:block text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Panel Agenta</a>
            <button className="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition shadow-sm">
              Rozpocznij za darmo
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 px-6 overflow-hidden hero-glow">
        {/* Background Stripes Pattern */}
        <div className="absolute inset-0 z-0 hero-stripes pointer-events-none [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs font-medium text-slate-600">
            <span className="w-2 h-2 rounded-full bg-green-500 status-dot"></span>
            Nowość: Model "Pay-per-satisfaction"
          </div>
          
          {/* Headlines */}
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-slate-900 leading-[1.05]">
            Sprzedawaj globalnie.<br />
            <span className="text-slate-400">Obsługuj lokalnie.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
            Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br />
            <span className="font-medium text-slate-900">Zero tłumaczy. Zero opóźnień. 100% AI.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-6">
            <button className="w-full md:w-auto px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition shadow-lg shadow-slate-900/10 text-lg">
              Dołącz do pilotażu
            </button>
            <button className="w-full md:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 hover:border-slate-300 transition flex items-center justify-center gap-2 text-lg shadow-sm">
              <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              Zobacz demo
            </button>
          </div>
          
          {/* Tech Stack / Trust */}
          <div className="pt-12">
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-4">Powered by next-gen tech</p>
            <div className="flex justify-center gap-8 opacity-40 grayscale">
               {/* Tekstowe placeholdery logotypów dla czystości kodu */}
              <span className="font-bold text-xl text-slate-400">OpenAI</span>
              <span className="font-bold text-xl text-slate-400">DeepL</span>
              <span className="font-bold text-xl text-slate-400">Elixir</span>
            </div>
          </div>
        </div>
      </section>

      {/* UI VISUALIZATION (Chat Interface) */}
      <section className="pb-20 px-6 max-w-6xl mx-auto -mt-12 relative z-20">
        <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-200/50 overflow-hidden">
          {/* Window Controls */}
          <div className="absolute top-0 left-0 w-full h-8 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-400"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
          </div>
          
          {/* Chat Interface */}
          <div className="pt-12 pb-8 px-8 grid grid-cols-1 md:grid-cols-3 gap-8 bg-white">
            {/* Left Panel: List */}
            <div className="hidden md:block border-r border-slate-100 pr-4 space-y-4">
              <div className="p-3 bg-indigo-50 rounded-lg border border-indigo-100">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-slate-900">Hans Müller</span>
                  <span className="text-xs text-slate-400">2m</span>
                </div>
                <p className="text-xs text-slate-500 truncate">Wo ist meine Bestellung?</p>
                <div className="mt-2 flex gap-1">
                  <span className="text-[10px] px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-500">DE</span>
                </div>
              </div>
              <div className="p-3 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm text-slate-900">Pierre Dubois</span>
                  <span className="text-xs text-slate-400">5m</span>
                </div>
                <p className="text-xs text-slate-500 truncate">Produit endommagé...</p>
              </div>
            </div>

            {/* Main Panel: Conversation */}
            <div className="md:col-span-2 flex flex-col justify-between h-[300px]">
              <div className="space-y-4">
                {/* Incoming Message */}
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex-shrink-0"></div>
                  <div>
                    <div className="bg-slate-100 p-3 rounded-2xl rounded-tl-none text-sm text-slate-700">
                      <p className="font-medium">Hallo, wo ist meine Bestellung?</p>
                      <p className="text-xs text-slate-400 mt-1 pt-1 border-t border-slate-200/50">Tłum: Cześć, gdzie jest moje zamówienie?</p>
                    </div>
                  </div>
                </div>

                {/* Outgoing Message */}
                <div className="flex gap-3 justify-end">
                  <div className="text-right">
                    <div className="bg-indigo-600 p-3 rounded-2xl rounded-tr-none text-sm text-white shadow-sm">
                      <p>Sprawdzam to dla Ciebie, daj mi chwilę.</p>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">Przetłumaczono na Niemiecki</p>
                  </div>
                </div>
              </div>
              
              {/* Input Area */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50">
                  <input type="text" placeholder="Napisz wiadomość po polsku..." className="bg-transparent w-full text-sm outline-none text-slate-700 placeholder:text-slate-400" />
                  <button className="text-indigo-600 font-medium text-sm px-3 hover:text-indigo-800 transition-colors">Wyślij</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENTO GRID (FEATURES) */}
      <section id="product" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">Wszystko, czego potrzebujesz.<br />W jednym panelu.</h2>
          <p className="text-slate-500 max-w-xl mx-auto">Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6">
          
          {/* Feature 1: Translation Core */}
          <div className="bento-card bg-white border border-slate-200 p-8 rounded-2xl md:col-span-2 row-span-1 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Native-like Translation</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.
              </p>
            </div>
            <div className="flex-1 w-full bg-slate-50 rounded-xl border border-slate-100 p-4 flex flex-col gap-2">
              <div className="bg-white p-3 rounded border border-slate-200 shadow-sm text-xs text-slate-600">
                "Produkt jest super!" <span className="text-slate-300">→</span> <span className="text-indigo-600 font-medium">Das Produkt ist toll!</span>
              </div>
              <div className="bg-white p-3 rounded border border-slate-200 shadow-sm text-xs text-slate-600">
                "Zwrot środków" <span className="text-slate-300">→</span> <span className="text-indigo-600 font-medium">Rückerstattung</span>
              </div>
            </div>
          </div>

          {/* Feature 2: Omnichannel */}
          <div className="bento-card bg-white border border-slate-200 p-8 rounded-2xl md:col-span-1 md:row-span-2 flex flex-col">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Omnichannel Inbox</h3>
            <p className="text-slate-500 text-sm mb-6">Email, Chat, Messenger, WhatsApp - zarządzaj wszystkimi kanałami z jednego miejsca.</p>
            
            <div className="mt-auto space-y-2">
              <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm font-medium text-slate-700">Messenger</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-slate-700">WhatsApp</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded hover:bg-slate-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-slate-700">Email</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Marketing */}
          <div className="bento-card bg-white border border-slate-200 p-8 rounded-2xl md:col-span-1">
            <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center text-pink-600 mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Marketing</h3>
            <p className="text-slate-500 text-sm">Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
          </div>

          {/* Feature 4: Model */}
          <div className="bento-card p-8 rounded-2xl md:col-span-1 bg-slate-900 text-white border-slate-900">
            <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Pay-per-Satisfaction</h3>
            <p className="text-slate-300 text-sm">Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center text-white text-xs">C</div>
            <span className="font-bold text-slate-900">Chataptor</span>
          </div>
          <div className="text-slate-500 text-sm">
            &copy; 2025 Chataptor. Wszystkie prawa zastrzeżone.
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
