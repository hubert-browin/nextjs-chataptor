<!DOCTYPE html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chataptor - Global Support Platform</title>
    <!-- Ładujemy font Inter z Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* RESET & BASE STYLES */
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background-color: #ffffff;
            color: #0f172a; /* slate-900 */
            line-height: 1.5;
            -webkit-font-smoothing: antialiased;
        }
        a { text-decoration: none; color: inherit; }
        button { cursor: pointer; border: none; font-family: inherit; }

        /* UTILITIES (Imitacja Tailwinda) */
        .container { max-width: 1280px; margin: 0 auto; px: 24px; }
        .flex { display: flex; }
        .flex-col { display: flex; flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .gap-2 { gap: 8px; }
        .gap-3 { gap: 12px; }
        .gap-4 { gap: 16px; }
        .gap-6 { gap: 24px; }
        .gap-8 { gap: 32px; }
        .hidden-mobile { display: none; }
        @media (min-width: 768px) { .hidden-mobile { display: flex; } }
        
        /* HEADER / NAV */
        nav {
            position: fixed; top: 0; left: 0; width: 100%; z-index: 50;
            background-color: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(12px);
            border-bottom: 1px solid #e2e8f0;
            height: 64px;
        }
        .nav-content { height: 100%; padding: 0 24px; max-width: 1280px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
        .logo-box { width: 32px; height: 32px; background-color: #0f172a; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; }
        .nav-links a { font-size: 14px; font-weight: 500; color: #475569; transition: color 0.2s; }
        .nav-links a:hover { color: #0f172a; }
        .btn-primary {
            background-color: #0f172a; color: white; padding: 8px 16px; border-radius: 8px; font-size: 14px; font-weight: 500; transition: background 0.2s;
        }
        .btn-primary:hover { background-color: #1e293b; }

        /* HERO SECTION */
        .hero {
            position: relative; padding-top: 140px; padding-bottom: 80px; text-align: center; overflow: hidden;
        }
        /* Pattern w tle (Paski) */
        .hero-bg-stripes {
            position: absolute; inset: 0; z-index: -1;
            background-image: linear-gradient(90deg, rgba(15, 23, 42, 0.03) 1px, transparent 1px);
            background-size: 60px 100%;
            mask-image: linear-gradient(to bottom, black 40%, transparent);
            -webkit-mask-image: linear-gradient(to bottom, black 40%, transparent);
        }
        /* Glow w tle */
        .hero-bg-glow {
            position: absolute; top: -20%; left: 50%; transform: translateX(-50%); width: 100%; height: 800px; z-index: -2;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, rgba(255,255,255,0) 60%);
        }

        .badge {
            display: inline-flex; align-items: center; gap: 8px; padding: 4px 12px; 
            background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 99px;
            font-size: 12px; font-weight: 500; color: #475569; margin-bottom: 32px;
        }
        .status-dot {
            width: 8px; height: 8px; background-color: #22c55e; border-radius: 50%;
            box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4);
            animation: pulse-green 2s infinite;
        }
        @keyframes pulse-green {
            0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
            70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
            100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
        }

        h1 {
            font-size: 48px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 24px; color: #0f172a;
        }
        h1 span { color: #94a3b8; }
        @media (min-width: 768px) { h1 { font-size: 72px; } }

        .subtitle {
            font-size: 18px; color: #475569; max-width: 600px; margin: 0 auto 40px auto; font-weight: 300;
        }
        .subtitle strong { font-weight: 600; color: #0f172a; }

        .hero-buttons { display: flex; flex-direction: column; gap: 16px; align-items: center; justify-content: center; }
        @media (min-width: 768px) { .hero-buttons { flex-direction: row; } }
        
        .btn-large {
            padding: 16px 32px; border-radius: 12px; font-size: 16px; font-weight: 600;
        }
        .btn-outline {
            background: white; border: 1px solid #e2e8f0; color: #334155; display: flex; align-items: center; gap: 8px;
        }
        .btn-outline:hover { background: #f8fafc; border-color: #cbd5e1; }

        .tech-stack {
            margin-top: 60px; font-size: 12px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;
        }
        .tech-logos {
            display: flex; justify-content: center; gap: 32px; margin-top: 16px; opacity: 0.4; filter: grayscale(100%);
        }
        .tech-logo { font-size: 20px; font-weight: 700; color: #94a3b8; }

        /* UI MOCKUP */
        .mockup-container {
            max-width: 1000px; margin: -40px auto 80px auto; padding: 0 24px; position: relative; z-index: 10;
        }
        .window-frame {
            background: white; border-radius: 16px; border: 1px solid #e2e8f0;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            overflow: hidden;
        }
        .window-header {
            background: #f8fafc; height: 36px; border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; padding: 0 16px; gap: 8px;
        }
        .dot { width: 10px; height: 10px; border-radius: 50%; }
        .red { background: #f87171; } .yellow { background: #facc15; } .green { background: #4ade80; }

        .window-body { display: grid; grid-template-columns: 240px 1fr; height: 400px; }
        .sidebar { border-right: 1px solid #f1f5f9; padding: 16px; display: none; }
        @media (min-width: 768px) { .sidebar { display: block; } }
        
        .chat-item { padding: 12px; border-radius: 8px; cursor: pointer; margin-bottom: 8px; }
        .chat-item.active { background: #eef2ff; border: 1px solid #e0e7ff; }
        .chat-name { font-size: 14px; font-weight: 600; color: #1e293b; display: flex; justify-content: space-between; }
        .chat-time { font-size: 12px; color: #94a3b8; font-weight: 400; }
        .chat-preview { font-size: 12px; color: #64748b; margin-top: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .lang-tag { display: inline-block; font-size: 10px; padding: 2px 6px; background: white; border: 1px solid #e2e8f0; border-radius: 4px; margin-top: 8px; color: #64748b; }

        .chat-main { padding: 24px; display: flex; flex-direction: column; justify-content: space-between; background: white; }
        .messages { display: flex; flex-direction: column; gap: 24px; }
        
        .msg-row { display: flex; gap: 12px; }
        .msg-row.right { justify-content: flex-end; }
        .avatar { width: 32px; height: 32px; border-radius: 50%; background: #e2e8f0; flex-shrink: 0; }
        
        .bubble { padding: 12px 16px; border-radius: 12px; font-size: 14px; max-width: 80%; }
        .bubble-left { background: #f1f5f9; color: #334155; border-top-left-radius: 2px; }
        .bubble-right { background: #4f46e5; color: white; border-top-right-radius: 2px; }
        
        .translation { font-size: 11px; color: #94a3b8; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(0,0,0,0.05); }
        .translation-right { color: #cbd5e1; border-top: 1px solid rgba(255,255,255,0.2); }

        .input-area { margin-top: 16px; padding-top: 16px; border-top: 1px solid #f1f5f9; }
        .input-box { display: flex; gap: 8px; padding: 8px 12px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; }
        .input-box input { flex: 1; background: transparent; border: none; outline: none; font-size: 14px; color: #334155; }
        .send-btn { color: #4f46e5; font-size: 14px; font-weight: 600; }

        /* BENTO GRID */
        .features-section { padding: 80px 24px; max-width: 1280px; margin: 0 auto; }
        .section-header { text-align: center; margin-bottom: 60px; }
        .section-header h2 { font-size: 30px; font-weight: 700; margin-bottom: 16px; color: #0f172a; }
        .section-header p { color: #64748b; max-width: 500px; margin: 0 auto; }

        .grid { display: grid; gap: 24px; grid-template-columns: 1fr; }
        @media (min-width: 768px) { 
            .grid { grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, auto); }
            .col-span-2 { grid-column: span 2; }
            .row-span-2 { grid-row: span 2; }
        }

        .card {
            background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px;
            transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
        }
        .card:hover {
            transform: translateY(-2px); box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-color: #cbd5e1;
        }

        .icon-box {
            width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px;
        }
        .bg-indigo { background: #e0e7ff; color: #4f46e5; }
        .bg-blue { background: #dbeafe; color: #2563eb; }
        .bg-pink { background: #fce7f3; color: #db2777; }
        
        .card h3 { font-size: 20px; font-weight: 700; margin-bottom: 8px; color: #0f172a; }
        .card p { font-size: 14px; color: #64748b; line-height: 1.6; }
        
        .trans-example { margin-top: 24px; display: flex; flex-direction: column; gap: 8px; }
        .trans-bubble {
            background: white; border: 1px solid #e2e8f0; padding: 12px; border-radius: 8px; font-size: 12px; color: #475569;
            box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        }
        .trans-bubble span { color: #cbd5e1; margin: 0 4px; }
        .trans-bubble strong { color: #4f46e5; }

        .card-dark { background: #0f172a; color: white; border-color: #1e293b; }
        .card-dark h3 { color: white; }
        .card-dark p { color: #94a3b8; }
        .icon-dark { background: rgba(255,255,255,0.1); color: white; }

        /* FOOTER */
        footer { border-top: 1px solid #e2e8f0; padding: 48px 24px; background: white; margin-top: 80px; }
        .footer-content {
            max-width: 1280px; margin: 0 auto; display: flex; flex-direction: column; gap: 24px; align-items: center;
        }
        @media (min-width: 768px) { 
            .footer-content { flex-direction: row; justify-content: space-between; }
        }
        .footer-logo { display: flex; align-items: center; gap: 8px; font-weight: 700; color: #0f172a; }
        .footer-links { display: flex; gap: 24px; font-size: 14px; color: #64748b; }
        .footer-links a:hover { color: #0f172a; }

    </style>
</head>
<body>

    <!-- NAVIGATION -->
    <nav>
        <div class="nav-content">
            <div class="flex items-center gap-3">
                <div class="logo-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                </div>
                <span style="font-weight: 700; font-size: 18px; color: #0f172a;">Chataptor</span>
            </div>
            
            <div class="nav-links hidden-mobile">
                <a href="#product">Produkt</a>
                <a href="#how-it-works" style="margin-left: 24px;">Dla kogo</a>
                <a href="#pricing" style="margin-left: 24px;">Cennik</a>
            </div>

            <div class="flex items-center gap-4">
                <a href="#" class="nav-links hidden-mobile" style="font-size: 14px; font-weight: 500; color: #64748b;">Panel Agenta</a>
                <button class="btn-primary">Rozpocznij za darmo</button>
            </div>
        </div>
    </nav>

    <!-- HERO SECTION -->
    <section class="hero">
        <div class="hero-bg-stripes"></div>
        <div class="hero-bg-glow"></div>
        
        <div class="container">
            <div class="badge">
                <div class="status-dot"></div>
                Nowość: Model "Pay-per-satisfaction"
            </div>
            
            <h1>Sprzedawaj globalnie.<br><span>Obsługuj lokalnie.</span></h1>
            
            <p class="subtitle">
                Przełam barierę językową. Jeden agent obsługuje 20 rynków.<br>
                <strong>Zero tłumaczy. Zero opóźnień. 100% AI.</strong>
            </p>

            <div class="hero-buttons">
                <button class="btn-primary btn-large">Dołącz do pilotażu</button>
                <button class="btn-large btn-outline">
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    Zobacz demo
                </button>
            </div>

            <div class="tech-stack">Powered by next-gen tech</div>
            <div class="tech-logos">
                <div class="tech-logo">OpenAI</div>
                <div class="tech-logo">DeepL</div>
                <div class="tech-logo">Elixir</div>
            </div>
        </div>
    </section>

    <!-- UI MOCKUP -->
    <div class="mockup-container">
        <div class="window-frame">
            <div class="window-header">
                <div class="dot red"></div>
                <div class="dot yellow"></div>
                <div class="dot green"></div>
            </div>
            <div class="window-body">
                <!-- Sidebar -->
                <div class="sidebar">
                    <div class="chat-item active">
                        <div class="chat-name">Hans Müller <span class="chat-time">2m</span></div>
                        <div class="chat-preview">Wo ist meine Bestellung?</div>
                        <span class="lang-tag">DE</span>
                    </div>
                    <div class="chat-item">
                        <div class="chat-name">Pierre Dubois <span class="chat-time">5m</span></div>
                        <div class="chat-preview">Produit endommagé...</div>
                        <span class="lang-tag">FR</span>
                    </div>
                </div>
                <!-- Main Chat -->
                <div class="chat-main">
                    <div class="messages">
                        <!-- Message Incoming -->
                        <div class="msg-row">
                            <div class="avatar"></div>
                            <div class="bubble bubble-left">
                                <div style="font-weight: 500;">Hallo, wo ist meine Bestellung?</div>
                                <div class="translation">Tłum: Cześć, gdzie jest moje zamówienie?</div>
                            </div>
                        </div>
                        <!-- Message Outgoing -->
                        <div class="msg-row right">
                            <div class="bubble bubble-right">
                                <div>Sprawdzam to dla Ciebie, daj mi chwilę.</div>
                                <div class="translation translation-right">Przetłumaczono na Niemiecki</div>
                            </div>
                        </div>
                    </div>
                    <!-- Input -->
                    <div class="input-area">
                        <div class="input-box">
                            <input type="text" placeholder="Napisz wiadomość po polsku...">
                            <div class="send-btn">Wyślij</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- FEATURES (BENTO GRID) -->
    <section class="features-section" id="product">
        <div class="section-header">
            <h2>Wszystko, czego potrzebujesz.<br>W jednym panelu.</h2>
            <p>Zastąp Intercom, Mailchimp i zewnętrznych tłumaczy jednym narzędziem zaprojektowanym dla nowoczesnego e-commerce.</p>
        </div>

        <div class="grid">
            <!-- Card 1 -->
            <div class="card col-span-2" style="display: flex; gap: 32px; align-items: center;">
                <div style="flex: 1;">
                    <div class="icon-box bg-indigo">
                        <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path></svg>
                    </div>
                    <h3>Native-like Translation</h3>
                    <p>Silnik oparty na OpenAI i DeepL. Zachowuje kontekst, rozumie terminologię branżową i automatycznie wygładza ton. Latencja poniżej 50ms.</p>
                </div>
                <div style="flex: 1;" class="hidden-mobile">
                    <div class="trans-example">
                        <div class="trans-bubble">"Produkt jest super!" <span>→</span> <strong>Das Produkt ist toll!</strong></div>
                        <div class="trans-bubble">"Zwrot środków" <span>→</span> <strong>Rückerstattung</strong></div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="card row-span-2">
                <div class="icon-box bg-blue">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                </div>
                <h3>Omnichannel Inbox</h3>
                <p>Email, Chat, Messenger, WhatsApp - zarządzaj wszystkimi kanałami z jednego miejsca.</p>
                <div style="margin-top: 32px; display: flex; flex-direction: column; gap: 12px;">
                     <div style="display: flex; align-items: center; gap: 12px; font-size: 14px; color: #334155;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6;"></div> Messenger
                     </div>
                     <div style="display: flex; align-items: center; gap: 12px; font-size: 14px; color: #334155;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: #22c55e;"></div> WhatsApp
                     </div>
                     <div style="display: flex; align-items: center; gap: 12px; font-size: 14px; color: #334155;">
                        <div style="width: 8px; height: 8px; border-radius: 50%; background: #eab308;"></div> Email
                     </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="card">
                <div class="icon-box bg-pink">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"></path></svg>
                </div>
                <h3>Marketing</h3>
                <p>Wbudowane narzędzia do newsletterów i pop-upów. Zwiększaj sprzedaż, gdy support śpi.</p>
            </div>

            <!-- Card 4 (Dark) -->
            <div class="card card-dark">
                <div class="icon-box icon-dark">
                    <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <h3>Pay-per-Satisfaction</h3>
                <p>Płacisz tylko wtedy, gdy AI oceni rozmowę jako sukces (6/10+). Zero ryzyka dla Twojego biznesu.</p>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer>
        <div class="footer-content">
            <div class="footer-logo">
                <div class="logo-box" style="width: 24px; height: 24px; font-size: 10px;">C</div>
                Chataptor
            </div>
            <div class="footer-links">
                &copy; 2025 Chataptor. All rights reserved.
            </div>
            <div class="footer-links">
                <a href="#">Regulamin</a>
                <a href="#">Prywatność</a>
                <a href="#">Kontakt</a>
            </div>
        </div>
    </footer>

</body>
</html>
