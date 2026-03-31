import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/content';
import { Calendar, User, ArrowRight, Instagram, Menu, X } from 'lucide-react';

export default function Blog() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FDFBF8] text-[#2A2420] font-['DM_Sans'] min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-3 bg-[rgba(253,251,248,0.92)] backdrop-blur-md border-b border-[rgba(196,181,160,0.2)] transition-[padding] duration-300 max-md:px-6">
        <Link to="/" className="flex items-center no-underline focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">
          <img 
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/2.png" 
            alt="Logo Dr. Valdecir Alves" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="flex gap-4 items-center max-md:hidden">
          <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[#2A2420] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-full p-1" aria-label="Instagram do Dr. Valdecir">
            <Instagram size={20} />
          </a>
          <Link to="/agendamento" className="bg-[#2A2420] text-[#FDFBF8] px-6 py-2.5 rounded-[2px] tracking-[0.1em] text-[0.75rem] uppercase no-underline hover:bg-[#1A1512] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8935A] focus:ring-offset-2">
            Agendamento
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="hidden max-md:flex items-center justify-center p-2 text-[#2A2420] focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[85] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`fixed top-0 right-0 bottom-0 w-[280px] bg-[#FDFBF8] z-[90] flex flex-col p-8 pt-24 gap-6 shadow-2xl transition-transform duration-300 ease-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Início</Link>
          <Link to="/agendamento" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Agendamento</Link>
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[#2A2420] hover:text-[#B8935A] transition-colors" aria-label="Instagram">
              <Instagram size={28} />
            </a>
          </div>
          <Link to="/agendamento" onClick={() => setIsMenuOpen(false)} className="mt-auto bg-[#2A2420] text-[#FDFBF8] px-6 py-4 rounded-[2px] tracking-[0.1em] text-sm text-center uppercase no-underline hover:bg-[#1A1512] transition-colors">Agendamento</Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <div className="text-[#C9A96E] text-sm tracking-[0.2em] uppercase font-medium">Saúde e Bem-estar</div>
          <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light text-[#1A1512]">Blog do Dr. Valdecir</h1>
          <p className="text-[#2A2420] opacity-70 max-w-2xl mx-auto">Dicas, novidades e informações importantes para manter seu sorriso sempre saudável e radiante.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group space-y-6">
              <div className="aspect-video overflow-hidden rounded-sm relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-[#FDFBF8] px-3 py-1 text-[0.65rem] uppercase tracking-widest font-medium text-[#B8935A]">
                  {post.category}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-6 text-[0.7rem] text-[#8A7866] uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={14} />
                    Dr. Valdecir
                  </span>
                </div>
                
                <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#1A1512] group-hover:text-[#B8935A] transition-colors leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-[#2A2420] opacity-70 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link 
                  to={`/blog/${post.id}`} 
                  className="inline-flex items-center gap-2 text-[#2A2420] font-medium text-sm hover:gap-4 transition-all focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm"
                >
                  Ler artigo completo
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1512] text-[rgba(247,244,239,0.5)] px-12 py-[60px] grid grid-cols-1 md:grid-cols-3 gap-12 text-[0.78rem] leading-[1.8]">
        <div>
          <img 
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/2.png" 
            alt="Logo Dr. Valdecir Alves" 
            className="h-12 w-auto object-contain mb-4"
            referrerPolicy="no-referrer"
          />
          <div className="text-[0.65rem] tracking-[0.12em] uppercase text-[#C9A96E] mb-4">CRO/MG 22.503</div>
          <div>Cirurgião-Dentista especialista em Estética e Implantodontia, atendendo Manhuaçu e região desde 1997.</div>
        </div>
        <div>
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Links Úteis</h4>
          <Link to="/" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Início</Link>
          <Link to="/agendamento" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Agendamento</Link>
          <Link to="/feedback" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Feedback</Link>
        </div>
        <div>
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Contato</h4>
          <a href="https://wa.me/5533984143239" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">WhatsApp: (33) 98414-3239</a>
          <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">Instagram: @dr.valdeciralves</a>
        </div>
      </footer>
    </div>
  );
}
