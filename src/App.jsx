import React, { useState, useEffect } from 'react';
import { Play, Share2, Youtube, Instagram, Mail, ChevronDown, Star, Check } from 'lucide-react'; 

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const episodes = [
    {
      id: 1,
      title: "Ep. 1: The Myth",
      desc: "Quando um sinal antigo muda tudo. O início da jornada de Aira & Sylva.",
      tags: ["#SciFi", "#Blender", "#AI"],
      views: "Estreia",
      thumbnail: "bg-gradient-to-br from-blue-900 to-slate-900"
    },
    {
      id: 2,
      title: "Ep. 2: The Signal (Em Breve)",
      desc: "A decodificação da mensagem oculta no satélite.",
      tags: ["#Mystery", "#Space"],
      views: "Em Produção",
      thumbnail: "bg-gray-900"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center border-2 border-yellow-400/30 shadow-lg shadow-yellow-500/20 group-hover:scale-105 transition-transform">
                  <span className="text-black font-black text-xl sci-fi-font">ALE</span>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="relative mb-1">
                  <svg className="h-5 w-auto" viewBox="0 0 400 30" fill="none">
                    <path d="M 10 15 Q 200 5, 390 15" stroke="#fbbf24" strokeWidth="1.5" fill="none" opacity="0.6"/>
                    <text x="50" y="20" fill="#fbbf24" fontSize="10" fontWeight="bold" letterSpacing="3" className="sci-fi-font">
                      ESTÚDIO INDEPENDENTE • BLENDER & AI
                    </text>
                  </svg>
                </div>
                <span className="text-2xl font-bold tracking-wider text-white sci-fi-font">
                  ALE<span className="text-cyan-400">SPACE</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 cursor-pointer group">
              <div className="w-8 h-0.5 bg-cyan-500 transition-all group-hover:w-10"></div>
              <div className="w-6 h-0.5 bg-yellow-500 transition-all group-hover:w-8"></div>
              <div className="w-4 h-0.5 bg-white transition-all group-hover:w-6"></div>
            </div>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950 z-0"></div>
        
        <div className="absolute inset-0 z-0 opacity-30">
            {[...Array(25)].map((_, i) => (
                <div key={i} className="absolute rounded-full bg-cyan-100" 
                     style={{
                         top: `${Math.random() * 100}%`,
                         left: `${Math.random() * 100}%`,
                         width: `${Math.random() * 3}px`,
                         height: `${Math.random() * 3}px`,
                         opacity: Math.random(),
                         animation: `pulse ${2 + Math.random() * 4}s infinite`
                     }}>
                </div>
            ))}
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-[-50px]">
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter drop-shadow-2xl">
            ASTRAL ARROW
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed font-light">
            Uma saga sci-fi original explorando mistérios cósmicos e tecnologia ancestral. Produzida por <span className="text-yellow-400 font-semibold tracking-wide">Alespace Art Studio</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="btn-hero-primary group">
              <span className="flex items-center gap-3">
                <Play className="w-6 h-6 fill-current" />
                <span className="font-bold text-base tracking-wide">ASSISTIR EPISÓDIO 1</span>
                <Check className="w-5 h-5 text-cyan-400 group-hover:text-white transition-colors" />
              </span>
            </button>
            <button className="btn-hero-outline group">
              <span className="flex items-center gap-3">
                <Youtube className="w-6 h-6" />
                <span className="font-bold text-base tracking-wide">INSCREVER-SE</span>
              </span>
            </button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
          <ChevronDown className="w-8 h-8 text-cyan-400" />
        </div>
      </header>

      {/* --- SEÇÃO DE EPISÓDIOS --- */}
      <section className="py-24 px-4 bg-slate-950 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="w-12 h-1 bg-cyan-600 rounded-full shadow-[0_0_10px_cyan]"></div>
            <h2 className="text-3xl font-bold text-center text-white tracking-[0.2em] uppercase sci-fi-font">Transmissões</h2>
            <div className="w-12 h-1 bg-cyan-600 rounded-full shadow-[0_0_10px_cyan]"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {episodes.map((ep) => (
              <div key={ep.id} className="card-episode group relative">
                <div className={`aspect-[9/16] ${ep.thumbnail} relative overflow-hidden bg-slate-800`}>
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-50 group-hover:scale-100 duration-300">
                    <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-2xl hover:bg-cyan-500/20">
                      <Play className="w-8 h-8 text-white fill-current ml-1" />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-black/60 backdrop-blur text-xs font-bold px-2 py-1 rounded text-cyan-400 border border-cyan-500/30 flex items-center gap-1">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> SHORTS
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors sci-fi-font">{ep.title}</h3>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2 leading-relaxed font-light">{ep.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {ep.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider text-slate-400 bg-slate-950 px-2 py-1 rounded border border-white/10">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-yellow-500 text-xs font-bold tracking-wider flex items-center gap-1 uppercase">
                      <Star className="w-3 h-3 fill-current" /> {ep.views}
                    </span>
                    <button className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center border border-yellow-400/30 shadow-lg shadow-yellow-500/20 opacity-80 hover:opacity-100 transition-opacity">
              <span className="text-black font-black text-sm sci-fi-font">ALE</span>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white tracking-widest sci-fi-font">ALE<span className="text-cyan-500">SPACE</span></h3>
              <p className="text-slate-600 text-xs mt-1">© 2026 Alespace Art Studio.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-red-500 transition-colors transform hover:scale-110"><Youtube className="w-6 h-6" /></a>
            <a href="#" className="text-slate-500 hover:text-pink-500 transition-colors transform hover:scale-110"><Instagram className="w-6 h-6" /></a>
            <a href="#" className="text-slate-500 hover:text-cyan-400 transition-colors transform hover:scale-110"><Mail className="w-6 h-6" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;