import React, { useState, useEffect } from 'react';
import { Play, Share2, Youtube, Instagram, Mail, ChevronDown, Monitor, Cpu, Star, Check } from 'lucide-react';

/* --- SUA LÓGICA DE IMPORTAÇÃO --- */
// Tentamos importar. Se o ficheiro existir e o build passar, localLogo terá o caminho.
// Se o build falhar aqui, o erro será no terminal, não na lógica do React.
import localLogo from './assets/logo.png';

// Link de reserva para o caso de falha
const FALLBACK_LOGO = "https://drive.google.com/uc?export=view&id=1UthNABq7SFECJThMV3VDzieMmwULv6Yi";

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  
  // LÓGICA CONDICIONAL (IF/ELSE):
  // Verifica se localLogo foi carregado corretamente pelo import.
  // Se 'localLogo' for undefined ou null, usa o FALLBACK_LOGO.
  const logoSource = localLogo ? localLogo : FALLBACK_LOGO;

  const [currentLogo, setCurrentLogo] = useState(logoSource);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Segurança extra: Se o caminho existir mas a imagem estiver corrompida (erro 404)
  const handleImageError = () => {
    if (currentLogo !== FALLBACK_LOGO) {
      console.warn("Imagem local falhou ao renderizar. Ativando fallback.");
      setCurrentLogo(FALLBACK_LOGO);
    }
  };

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

  // ESTILO DO LOGO (Nuclear Option - Tamanho Travado)
  const logoWrapperStyle = {
    width: '48px',
    height: '48px',
    minWidth: '48px',
    borderRadius: '8px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(255,255,255,0.1)'
  };

  const logoImgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block'
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-black">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20"> {/* Altura ajustada para h-20 para dar espaço */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              
              {/* LOGO NO TOPO */}
              <div style={logoWrapperStyle} className="shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform bg-black/40">
                 <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900 to-blue-900 flex items-center justify-center -z-10">
                    <Star className="text-yellow-400 w-6 h-6 fill-current opacity-50" />
                 </div>
                 
                 <img 
                   src={currentLogo} 
                   alt="Alespace Logo" 
                   style={logoImgStyle}
                   onError={handleImageError} // O segredo está aqui também
                 />
              </div>
              
              <span className="text-xl font-bold tracking-wider text-white sci-fi-font">
                ALE<span className="text-cyan-400">SPACE</span>
              </span>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {['Home', 'Série', 'Sobre', 'Contato'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setActiveTab(item.toLowerCase().split(' ')[0])}
                    className="nav-link"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden flex flex-col items-end gap-1 cursor-pointer">
              <div className="w-8 h-0.5 bg-cyan-500"></div>
              <div className="w-6 h-0.5 bg-yellow-500"></div>
              <div className="w-4 h-0.5 bg-white"></div>
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
          <div className="inline-block px-4 py-1 mb-6 border border-yellow-500/30 rounded-full bg-yellow-500/5 backdrop-blur-sm animate-fade-in-up">
            <span className="text-yellow-400 text-xs font-bold tracking-[0.3em] uppercase">Estúdio Independente • Blender & AI</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tighter drop-shadow-2xl">
            {/* Título com ID para garantir o degradê */}
            <span id="scifi-title-gradient">
              ASTRAL ARROW
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed font-light">
            Uma saga sci-fi original explorando mistérios cósmicos e tecnologia ancestral. 
            <br className="hidden md:block" />
            Produzida por <span className="text-yellow-400 font-medium tracking-wide">Alespace Art Studio</span>.
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
             <div style={logoWrapperStyle} className="opacity-80 hover:opacity-100 transition-opacity bg-black/40">
                <img 
                   src={currentLogo} 
                   alt="Alespace Logo" 
                   style={logoImgStyle}
                   onError={handleImageError} 
                 />
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