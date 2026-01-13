import React from 'react';
import { Play } from 'lucide-react';

const Videos = () => {
  return (
    <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto animate-fade-in">
      <h2 className="text-3xl font-bold text-white mb-8 sci-fi-font border-l-4 border-cyan-500 pl-4">
        VÍDEOS <span className="text-cyan-500">AVULSOS</span>
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Exemplo de Card de Vídeo */}
        <div className="group bg-slate-900 rounded-lg overflow-hidden border border-white/5 hover:border-cyan-500/30 transition-all">
          <div className="aspect-video bg-slate-800 relative">
             {/* Aqui entrará o thumbnail do YouTube futuramente */}
             <div className="absolute inset-0 flex items-center justify-center group-hover:bg-cyan-500/10 transition-colors">
                <Play className="text-white opacity-50 group-hover:opacity-100" />
             </div>
          </div>
          <div className="p-4">
            <h3 className="text-white font-medium">Título do Vídeo Avulso</h3>
            <p className="text-slate-500 text-sm mt-2">Breve descrição da criação.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;