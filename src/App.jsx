import React, { useState, useEffect } from 'react';
import { Play, Share2, Youtube, Instagram, Mail, ChevronDown, Star, Lock, LogOut, Shield, Plus, Trash2, Check } from 'lucide-react';
import { auth, db, provider, signInWithPopup, signOut } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';

// Importação do logo
import logoImage from './assets/logo.png';
const FALLBACK_LOGO = "https://placehold.co/200x200/000212/fbbf24?text=ALE";

const App = () => {
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [activeTab, setActiveTab] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Estado do Formulário de Admin
  const [newVideo, setNewVideo] = useState({ title: '', desc: '', url: '', type: 'short', tags: '' });
  const [loading, setLoading] = useState(false);

  // SEU EMAIL DE ADMIN (Substitui pelo teu email real para liberar o painel)
  const ADMIN_EMAIL = "alespaceartstudio@gmail.com"; 

  // Lógica do Logo
  const logoSource = logoImage ? logoImage : FALLBACK_LOGO;
  const [currentLogo, setCurrentLogo] = useState(logoSource);

  // 1. Monitorar Autenticação e Scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Verifica se o email logado é o do dono
      if (currentUser && currentUser.email === ADMIN_EMAIL) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  // 2. Ler Banco de Dados (Tempo Real)
  useEffect(() => {
    // Busca todos os vídeos na coleção "videos" ordenados por data
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    
    // Ouve mudanças em tempo real (sem precisar recarregar página)
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const videoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setVideos(videoData);
    });
    return () => unsubscribe();
  }, []);

  // Funções de Auth
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Erro ao logar:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setActiveTab('home');
  };

  // Função para salvar vídeo no Firestore
  const handleSaveVideo = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Extrair ID do YouTube da URL (funciona com links curtos e longos)
      let youtubeId = newVideo.url;
      if (newVideo.url.includes('v=')) youtubeId = newVideo.url.split('v=')[1].split('&')[0];
      else if (newVideo.url.includes('youtu.be/')) youtubeId = newVideo.url.split('youtu.be/')[1].split('?')[0];
      else if (newVideo.url.includes('/shorts/')) youtubeId = newVideo.url.split('/shorts/')[1].split('?')[0];

      await addDoc(collection(db, "videos"), {
        title: newVideo.title,
        desc: newVideo.desc,
        youtubeId: youtubeId,
        type: newVideo.type, // 'short' ou 'full'
        tags: newVideo.tags.split(',').map(tag => tag.trim()),
        createdAt: new Date(),
        isPremium: newVideo.type === 'full' // Episódios completos são premium
      });
      
      setNewVideo({ title: '', desc: '', url: '', type: 'short', tags: '' }); // Limpa form
      alert("Vídeo adicionado à base de dados!");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      alert("Erro ao salvar. Verifique se está logado como Admin.");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Tem a certeza que quer apagar este vídeo?")) {
      await deleteDoc(doc(db, "videos", id));
    }
  };

  // Filtros de Exibição
  const publicVideos = videos.filter(v => v.type === 'short'); // Shorts para todos
  const premiumVideos = videos; // Assinantes veem tudo (Shorts + Longos)

  // Estilos
  const logoWrapperStyle = { width: '48px', height: '48px', minWidth: '48px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' };
  const imgStyle = { width: '100%', height: '100%', objectFit: 'cover', display: 'block' };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500 selection:text-black font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setActiveTab('home')}>
              <div style={logoWrapperStyle} className="shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform bg-black/40">
                 <img src={currentLogo} alt="Logo" style={imgStyle} 
                      onError={() => setCurrentLogo(FALLBACK_LOGO)} />
              </div>
              <span className="text-xl font-bold tracking-wider text-white sci-fi-font">
                ALE<span className="text-cyan-400">SPACE</span>
              </span>
            </div>
            
            {/* MENU DIREITO */}
            <div className="flex items-center gap-4">
              <button onClick={() => setActiveTab('home')} className={`nav-link ${activeTab === 'home' ? 'text-cyan-400' : ''}`}>HOME</button>
              
              {user ? (
                <>
                  <button onClick={() => setActiveTab('premium')} className={`nav-link flex items-center gap-2 ${activeTab === 'premium' ? 'text-yellow-400' : ''}`}>
                    <Star className="w-4 h-4" /> PREMIUM
                  </button>
                  {isAdmin && (
                    <button onClick={() => setActiveTab('admin')} className="text-red-400 font-bold uppercase text-sm flex items-center gap-1 hover:text-red-300 border border-red-500/30 px-2 py-1 rounded">
                      <Shield className="w-4 h-4" /> ADMIN
                    </button>
                  )}
                  <div className="h-6 w-px bg-white/20 mx-2 hidden md:block"></div>
                  <div className="flex items-center gap-2">
                    <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-cyan-500/50" />
                    <button onClick={handleLogout} className="text-slate-400 hover:text-white" title="Sair">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </>
              ) : (
                <button onClick={handleLogin} className="btn-scifi-outline text-xs px-4 py-2">
                  <span>LOGIN</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* --- CONTEÚDO PRINCIPAL --- */}
      <main className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
        
        {/* PAINEL DE ADMIN (Só aparece se for admin) */}
        {activeTab === 'admin' && isAdmin && (
          <div className="bg-slate-900 border border-red-500/30 p-8 rounded-xl mb-12 animate-fade-in-up">
            <h2 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2 sci-fi-font"><Shield /> PAINEL DE CONTROLE</h2>
            <form onSubmit={handleSaveVideo} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input 
                className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none" 
                placeholder="Título do Episódio" 
                value={newVideo.title} onChange={e => setNewVideo({...newVideo, title: e.target.value})} required 
              />
              <input 
                className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none" 
                placeholder="Link do YouTube (URL completa)" 
                value={newVideo.url} onChange={e => setNewVideo({...newVideo, url: e.target.value})} required 
              />
              <select 
                className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none"
                value={newVideo.type} onChange={e => setNewVideo({...newVideo, type: e.target.value})}
              >
                <option value="short">Short (Vertical)</option>
                <option value="full">Episódio Completo (Horizontal)</option>
              </select>
              <input 
                className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none" 
                placeholder="Tags (separadas por vírgula)" 
                value={newVideo.tags} onChange={e => setNewVideo({...newVideo, tags: e.target.value})} 
              />
              <textarea 
                className="bg-black/50 border border-white/10 p-3 rounded text-white focus:border-cyan-500 outline-none md:col-span-2" 
                placeholder="Sinopse / Descrição" rows="3"
                value={newVideo.desc} onChange={e => setNewVideo({...newVideo, desc: e.target.value})} 
              ></textarea>
              <button type="submit" disabled={loading} className="btn-scifi-primary md:col-span-2 w-full flex justify-center">
                <span>{loading ? "A PROCESSAR..." : "ADICIONAR À BASE DE DADOS"} <Plus className="w-4 h-4 ml-2" /></span>
              </button>
            </form>
          </div>
        )}

        {/* HOME (Pública - Só Shorts) */}
        {activeTab === 'home' && (
          <div>
            <div className="text-center mb-12 mt-10">
               <h1 className="text-4xl md:text-7xl font-black mb-6 drop-shadow-2xl">
                 <span id="scifi-title-gradient">ASTRAL ARROW</span>
               </h1>
               <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                 Uma saga sci-fi original. Assista aos shorts mais recentes ou faça login para a experiência completa.
               </p>
               {!user && (
                 <div className="mt-8">
                   <button onClick={handleLogin} className="btn-hero-primary">
                     <span>ACEDER ÁREA PREMIUM</span>
                   </button>
                 </div>
               )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {publicVideos.map((video) => (
                <div key={video.id} className="card-episode group relative bg-slate-900 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all">
                  {/* Thumbnail do YouTube (Clica para abrir externo) */}
                  <a href={`https://www.youtube.com/shorts/${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="aspect-[9/16] relative bg-black block">
                    <img 
                      src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`} 
                      alt={video.title}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/50 shadow-2xl group-hover:scale-110 transition-transform">
                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                      </div>
                    </div>
                  </a>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 sci-fi-font">{video.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{video.desc}</p>
                    {isAdmin && (
                      <button onClick={() => handleDelete(video.id)} className="mt-4 text-red-500 text-xs flex items-center gap-1 hover:underline cursor-pointer">
                        <Trash2 className="w-3 h-3" /> REMOVER
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ÁREA PREMIUM (Todos os Vídeos + Player Embutido) */}
        {activeTab === 'premium' && (
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-4 mb-10 p-6 bg-yellow-900/10 border border-yellow-500/30 rounded-xl">
               <div className="p-3 bg-yellow-500/20 rounded-full border border-yellow-500"><Star className="w-6 h-6 text-yellow-500 fill-yellow-500" /></div>
               <div>
                 <h2 className="text-2xl md:text-3xl font-bold text-white sci-fi-font">ACERVO COMPLETO</h2>
                 <p className="text-slate-400">Bem-vindo, Viajante. Aqui tens acesso a todos os arquivos da frota.</p>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {premiumVideos.map((video) => (
                <div key={video.id} className="bg-slate-900 border border-white/10 rounded-xl overflow-hidden hover:border-yellow-500/30 transition-all flex flex-col">
                  {/* Player Embedado para Premium (Assiste DENTRO do site) */}
                  <div className={`w-full ${video.type === 'short' ? 'aspect-[9/16] max-w-[300px] mx-auto' : 'aspect-video'} bg-black`}>
                    <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${video.youtubeId}`} 
                      title={video.title} 
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-yellow-500 sci-fi-font">{video.title}</h3>
                        <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase border border-white/10">{video.type}</span>
                      </div>
                      <p className="text-slate-300 text-sm leading-relaxed">{video.desc}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {video.tags.map((tag, idx) => (
                        <span key={idx} className="text-[10px] uppercase text-slate-500 bg-black/30 px-2 py-1 rounded border border-white/5">#{tag}</span>
                      ))}
                    </div>

                    {isAdmin && (
                      <button onClick={() => handleDelete(video.id)} className="mt-4 text-red-500 text-xs flex items-center gap-1 hover:underline cursor-pointer self-end">
                        <Trash2 className="w-3 h-3" /> REMOVER
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* --- FOOTER --- */}
      <footer className="bg-black py-12 border-t border-white/10 text-center text-slate-600 text-xs">
        <p>© 2026 Alespace Art Studio. Sistema Operacional v2.0</p>
      </footer>
    </div>
  );
};

export default App;