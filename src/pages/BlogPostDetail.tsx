import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { blogPosts } from '../data/content';
import { ArrowLeft, Calendar, User, Instagram, Share2, Menu, X } from 'lucide-react';

export default function BlogPostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogPosts.find(p => p.id === id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF8] p-6 text-center">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-[#B8935A] hover:underline">Voltar para o Blog</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF8] text-[#2A2420] font-['DM_Sans'] min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-3 bg-[rgba(253,251,248,0.92)] backdrop-blur-md border-b border-[rgba(196,181,160,0.2)] transition-[padding] duration-300 max-md:px-6">
        <Link to="/" className="flex items-center no-underline focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm" aria-label="Voltar para o início">
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
          <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Blog</Link>
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[#2A2420] hover:text-[#B8935A] transition-colors" aria-label="Instagram">
              <Instagram size={28} />
            </a>
          </div>
          <Link to="/agendamento" onClick={() => setIsMenuOpen(false)} className="mt-auto bg-[#2A2420] text-[#FDFBF8] px-6 py-4 rounded-[2px] tracking-[0.1em] text-sm text-center uppercase no-underline hover:bg-[#1A1512] transition-colors">Agendamento</Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[#8A7866] mb-8 hover:text-[#2A2420] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm"
          aria-label="Voltar para a página anterior"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </button>

        <article className="space-y-10">
          <header className="space-y-6">
            <div className="flex items-center gap-4 text-[0.7rem] text-[#B8935A] uppercase tracking-widest font-semibold">
              <span className="bg-[#F7F4EF] px-3 py-1 rounded-sm">{post.category}</span>
            </div>
            
            <h1 className="font-['Cormorant_Garamond'] text-4xl md:text-6xl font-light leading-tight text-[#1A1512]">
              {post.title}
            </h1>

            <div className="flex items-center gap-8 text-[0.75rem] text-[#8A7866] uppercase tracking-widest border-y border-[rgba(196,181,160,0.2)] py-4">
              <span className="flex items-center gap-2">
                <Calendar size={16} className="text-[#C9A96E]" />
                {post.date}
              </span>
              <span className="flex items-center gap-2">
                <User size={16} className="text-[#C9A96E]" />
                {post.author}
              </span>
            </div>
          </header>

          <div className="aspect-video overflow-hidden rounded-sm shadow-xl">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-lg max-w-none text-[#2A2420] opacity-85 leading-relaxed space-y-6">
            {post.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <footer className="pt-12 border-t border-[rgba(196,181,160,0.2)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-[#8A7866]">Compartilhar:</span>
              <button className="p-2 hover:bg-[#F7F4EF] rounded-full transition-colors text-[#2A2420]" aria-label="Compartilhar artigo">
                <Share2 size={20} />
              </button>
            </div>
            
            <Link to="/blog" className="text-sm font-medium text-[#B8935A] hover:underline">
              Ver mais artigos
            </Link>
          </footer>
        </article>

        <section className="mt-20 bg-[#F7F4EF] p-10 rounded-sm text-center space-y-6">
          <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#1A1512]">Gostou do conteúdo?</h2>
          <p className="text-[#2A2420] opacity-70 max-w-md mx-auto">Agende uma consulta com o Dr. Valdecir e cuide da saúde do seu sorriso com quem entende do assunto.</p>
          <Link to="/agendamento" className="inline-flex items-center gap-3 bg-[#2A2420] text-[#FDFBF8] px-10 py-5 rounded-[2px] tracking-[0.1em] text-sm uppercase no-underline hover:bg-[#1A1512] transition-all hover:-translate-y-1">
            Agendar minha avaliação
          </Link>
        </section>
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
          <Link to="/blog" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Blog</Link>
          <Link to="/agendamento" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Agendamento</Link>
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
