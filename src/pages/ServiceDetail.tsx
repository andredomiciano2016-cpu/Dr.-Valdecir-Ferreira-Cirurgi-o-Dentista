import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/content';
import { ArrowLeft, CheckCircle2, Calendar, Instagram, Menu, X } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const service = services.find(s => s.id === id);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FDFBF8] p-6 text-center">
        <h1 className="font-['Cormorant_Garamond'] text-4xl mb-4">Serviço não encontrado</h1>
        <Link to="/" className="text-[#B8935A] hover:underline">Voltar para a página inicial</Link>
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

      <main className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-[#8A7866] mb-8 hover:text-[#2A2420] transition-colors group focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm"
          aria-label="Voltar para a página anterior"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="text-[#C9A96E] text-sm tracking-[0.2em] uppercase font-medium flex items-center gap-3">
                <span className="w-8 h-[1px] bg-[#C9A96E]"></span>
                Especialidade
              </div>
              <h1 className="font-['Cormorant_Garamond'] text-5xl md:text-6xl font-light leading-tight text-[#1A1512]">
                {service.name}
              </h1>
              <p className="text-lg text-[#2A2420] opacity-80 leading-relaxed">
                {service.fullDesc}
              </p>
            </div>

            <div className="space-y-6">
              <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#1A1512]">Principais Benefícios</h2>
              <ul className="space-y-4" role="list">
                {service.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#C9A96E] shrink-0 mt-1" size={20} />
                    <span className="text-[#2A2420] opacity-90">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#F7F4EF] p-8 rounded-sm space-y-6">
              <h2 className="font-['Cormorant_Garamond'] text-3xl text-[#1A1512]">Como funciona o procedimento?</h2>
              <ol className="space-y-6" role="list">
                {service.procedure.map((step, idx) => (
                  <li key={idx} className="flex gap-4">
                    <span className="font-['Cormorant_Garamond'] text-2xl text-[#C9A96E] font-light leading-none">
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-[#2A2420] opacity-80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="pt-8">
              <Link to="/agendamento" className="inline-flex items-center gap-3 bg-[#2A2420] text-[#FDFBF8] px-10 py-5 rounded-[2px] tracking-[0.1em] text-sm uppercase no-underline hover:bg-[#1A1512] transition-all hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#B8935A] focus:ring-offset-2">
                <Calendar size={18} />
                Agendar minha avaliação
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
              <img 
                src={service.image} 
                alt={`${service.name} - Dr. Valdecir Alves`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            <div className="bg-[#1A1512] text-[#FDFBF8] p-10 rounded-sm space-y-6">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#C9A96E]">Dúvidas Frequentes</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">O procedimento dói?</h4>
                  <p className="text-sm opacity-70">Priorizamos o seu conforto. Utilizamos técnicas modernas e, quando necessário, anestesia local para garantir uma experiência indolor.</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Quanto tempo dura o resultado?</h4>
                  <p className="text-sm opacity-70">A durabilidade depende dos cuidados do paciente. Com boa higiene e visitas regulares, os resultados podem durar muitos anos.</p>
                </div>
              </div>
            </div>
          </div>
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
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Serviços</h4>
          {services.map(s => (
            <Link key={s.id} to={`/servico/${s.id}`} className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">{s.name}</Link>
          ))}
        </div>
        <div>
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Contato</h4>
          <a href="https://wa.me/5533984143239" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">WhatsApp: (33) 98414-3239</a>
          <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">Instagram: @dr.valdeciralves</a>
          <br />
          <div>Sala 301-A, Edifício Breder<br />Manhuaçu, MG — 36900-085</div>
        </div>
      </footer>
    </div>
  );
}
