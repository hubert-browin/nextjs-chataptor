import Image from "next/image";

export default function Home() {
  return (
    // Tło w kolorze "Stripe off-white"
    <main className="min-h-screen bg-[#F6F9FC] text-[#0A2540] font-sans selection:bg-[#635BFF] selection:text-white">
      
      {/* Navbar - Minimalistyczny */}
      <nav className="flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="font-bold text-xl tracking-tight flex items-center gap-2">
          {/* Tu wstawisz swoje logo */}
          <div className="w-8 h-8 bg-[#0A2540] rounded-lg flex items-center justify-center text-white text-xs">
            🦖
          </div>
          <span>Chataptor</span>
        </div>
        <div className="hidden md:flex gap-6 text-sm font-medium text-slate-500">
          <a href="#how-it-works" className="hover:text-[#635BFF] transition">Jak to działa?</a>
          <a href="#pricing" className="hover:text-[#635BFF] transition">Cennik</a>
        </div>
        <button className="text-sm font-semibold text-[#0A2540] hover:text-[#635BFF] transition">
          Zaloguj
        </button>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          {/* Badge "Development Status" */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#635BFF]/10 text-[#635BFF] text-xs font-bold uppercase tracking-wider mb-4">
            <span className="w-2 h-2 rounded-full bg-[#635BFF] animate-pulse"></span>
            Dostępny Early Access
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            Sprzedawaj globalnie.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#635BFF] to-[#0A2540]">
              Mów po polsku.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Jedyny chat dla e-commerce, który tłumaczy rozmowy w czasie rzeczywistym. 
            Jeden agent obsługuje Niemcy, Francję i USA. <br/>
            <strong>Płacisz tylko, gdy klient jest zadowolony.</strong>
          </p>

          {/* Waitlist Form */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mt-8">
            <input 
              type="email" 
              placeholder="Twój adres email firmowy" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#635BFF] shadow-sm transition"
            />
            <button className="w-full sm:w-auto px-6 py-3 bg-[#635BFF] hover:bg-[#534BEB] text-white font-semibold rounded-lg shadow-lg shadow-[#635BFF]/30 transition-all transform hover:-translate-y-0.5">
              Dołącz do bety
            </button>
          </div>
          
          <p className="text-xs text-slate-400">
            *Pierwsze 50 firm otrzymuje 60 dni bez limitów.
          </p>
        </div>

        {/* Visual Placeholder (Superhuman Style UI) */}
        <div className="mt-20 relative max-w-5xl mx-auto">
            {/* Efekt "Glow" pod screenem */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#635BFF] to-purple-600 rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden min-h-[400px] flex flex-col md:flex-row">
                {/* To jest miejsce na Twój screenshot interfejsu */}
                <div className="p-8 w-full flex items-center justify-center text-slate-300">
                    [Wizualizacja UI Agenta: Ciemny sidebar, jasne okno chatu, flagi PL/DE]
                </div>
            </div>
        </div>
      </section>
    </main>
  );
}