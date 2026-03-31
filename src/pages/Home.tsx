import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Instagram, Calendar, ArrowRight, MapPin, Clock, Phone, Menu, X } from 'lucide-react';
import { services } from '../data/content';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Scroll reveal logic
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => (entry.target as HTMLElement).classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(el => observer.observe(el));

    // Nav shrink on scroll
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (nav) {
        nav.style.padding = window.scrollY > 40 ? '12px 48px' : '20px 48px';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#FDFBF8] text-[#2A2420] font-['DM_Sans'] overflow-x-hidden">
      <style>{`
        :root {
          --cream: #F7F4EF;
          --warm-white: #FDFBF8;
          --taupe: #C4B5A0;
          --dark-taupe: #8A7866;
          --charcoal: #2A2420;
          --soft-black: #1A1512;
          --gold: #C9A96E;
          --gold-light: #E8D5B0;
          --green-wa: #25D366;
        }

        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }

        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 6px 24px rgba(37,211,102,0.4); }
          50% { box-shadow: 0 6px 40px rgba(37,211,102,0.7); }
        }
      `}</style>

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-12 py-3 bg-[rgba(253,251,248,0.92)] backdrop-blur-md border-b border-[rgba(196,181,160,0.2)] transition-[padding] duration-300 max-md:px-6" role="navigation" aria-label="Navegação principal">
        <Link to="/" className="flex items-center no-underline focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">
          <img 
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/2.png" 
            alt="Logo Dr. Valdecir Alves" 
            className="h-12 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        
        {/* Desktop Menu */}
        <ul className="flex gap-9 items-center list-none max-md:hidden">
          <li><a href="#servicos" className="text-[0.8rem] font-normal tracking-[0.12em] uppercase text-[#2A2420] no-underline opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">Serviços</a></li>
          <li><a href="#sobre" className="text-[0.8rem] font-normal tracking-[0.12em] uppercase text-[#2A2420] no-underline opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">Sobre</a></li>
          <li><a href="#depoimentos" className="text-[0.8rem] font-normal tracking-[0.12em] uppercase text-[#2A2420] no-underline opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">Depoimentos</a></li>
          <li><Link to="/blog" className="text-[0.8rem] font-normal tracking-[0.12em] uppercase text-[#2A2420] no-underline opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm">Blog</Link></li>
          <li className="flex items-center">
            <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[#2A2420] opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-full p-1" aria-label="Instagram do Dr. Valdecir">
              <Instagram size={20} />
            </a>
          </li>
          <li><Link to="/agendamento" className="bg-[#2A2420] text-[#FDFBF8] px-6 py-2.5 rounded-[2px] tracking-[0.1em] text-[0.75rem] uppercase no-underline hover:bg-[#1A1512] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B8935A] focus:ring-offset-2">Agendamento</Link></li>
        </ul>

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
          <a href="#servicos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Serviços</a>
          <a href="#sobre" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Sobre</a>
          <a href="#depoimentos" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Depoimentos</a>
          <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium tracking-[0.1em] uppercase text-[#2A2420] no-underline border-b border-[#F2EDE4] pb-4">Blog</Link>
          <div className="flex gap-6 mt-4">
            <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[#2A2420] hover:text-[#B8935A] transition-colors" aria-label="Instagram">
              <Instagram size={28} />
            </a>
          </div>
          <Link to="/agendamento" onClick={() => setIsMenuOpen(false)} className="mt-auto bg-[#2A2420] text-[#FDFBF8] px-6 py-4 rounded-[2px] tracking-[0.1em] text-sm text-center uppercase no-underline hover:bg-[#1A1512] transition-colors">Agendamento</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-screen grid grid-cols-2 pt-20 relative overflow-hidden max-md:grid-cols-1 max-md:min-h-0">
        <div className="flex flex-col justify-center px-20 py-20 pr-16 relative z-[2] max-md:px-6 max-md:pt-[100px] max-md:pb-[60px]">
          <div className="inline-flex items-center gap-2 text-[0.7rem] tracking-[0.18em] uppercase text-[#8A7866] mb-8 opacity-0 animate-[fadeUp_0.8s_ease_forwards_0.2s] before:content-[''] before:block before:w-7 before:h-[1px] before:bg-[#C9A96E]">
            Manhuaçu, MG — CRO/MG 22.503
          </div>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(3rem,5vw,5.5rem)] font-light leading-[1.05] text-[#1A1512] mb-7 opacity-0 animate-[fadeUp_0.9s_ease_forwards_0.4s]">
            O sorriso que<br />
            <em className="italic text-[#8A7866] font-light">você merece</em><br />
            <strong className="font-semibold block">começa aqui.</strong>
          </h1>
          <p className="text-base font-light leading-[1.7] text-[#2A2420] opacity-0 max-w-[400px] mb-12 animate-[fadeUp_1s_ease_forwards_0.6s]">
            Clareamento, estética e implantodontia com atenção individualizada. 
            Mais de 28 anos cuidando do sorriso de Manhuaçu e região.
          </p>
          <div className="flex gap-4 flex-wrap opacity-0 animate-[fadeUp_1s_ease_forwards_0.8s]">
            <Link to="/agendamento" className="inline-flex items-center gap-2.5 bg-[#2A2420] text-[#FDFBF8] no-underline px-8 py-4 text-[0.82rem] font-normal tracking-[0.1em] uppercase rounded-[2px] hover:bg-[#1A1512] hover:-translate-y-0.5 transition-all">
              📅 Agendamento
            </Link>
            <a href="#servicos" className="inline-flex items-center gap-2.5 bg-transparent text-[#2A2420] no-underline px-8 py-4 text-[0.82rem] font-normal tracking-[0.1em] uppercase border border-[rgba(42,36,32,0.25)] rounded-[2px] hover:border-[#2A2420] hover:bg-[rgba(42,36,32,0.04)] transition-all">
              Ver serviços →
            </a>
          </div>
          <div className="flex gap-12 mt-[72px] pt-10 border-t border-[rgba(196,181,160,0.3)] opacity-0 animate-[fadeUp_1s_ease_forwards_1s] max-md:gap-8">
            <div className="stat-item">
              <div className="font-['Cormorant_Garamond'] text-[2.8rem] font-light text-[#1A1512] leading-none">28+</div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-[#8A7866] mt-1">Anos de experiência</div>
            </div>
            <div className="stat-item">
              <div className="font-['Cormorant_Garamond'] text-[2.8rem] font-light text-[#1A1512] leading-none">5★</div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-[#8A7866] mt-1">Avaliação Google</div>
            </div>
            <div className="stat-item">
              <div className="font-['Cormorant_Garamond'] text-[2.8rem] font-light text-[#1A1512] leading-none">UFJF</div>
              <div className="text-[0.72rem] tracking-[0.1em] uppercase text-[#8A7866] mt-1">Graduação Federal</div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden opacity-0 animate-[fadeIn_1.2s_ease_forwards_0.5s] max-md:h-[50vh]">
          <div className="absolute inset-0 bg-[#F7F4EF]">
            <img
              src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/1.png"
              alt="Dr. Valdecir Alves sorrindo no consultório em Manhuaçu"
              className="w-full h-full object-cover object-center grayscale-[5%] contrast-[1.02]"
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#FDFBF8] via-transparent to-transparent max-md:bg-gradient-to-b"></div>
          <div className="absolute bottom-[60px] right-10 bg-[rgba(253,251,248,0.95)] backdrop-blur-[8px] border border-[rgba(196,181,160,0.3)] px-6 py-5 rounded-[4px] max-w-[220px] shadow-[0_16px_48px_rgba(26,21,18,0.12)] max-md:hidden">
            <div className="text-[#C9A96E] text-[0.9rem] mb-2">★★★★★</div>
            <p className="font-['Cormorant_Garamond'] italic text-base text-[#2A2420] leading-[1.5] mb-3">"Fiz meu clareamento e ficou incrível. Me sinto muito mais confiante!"</p>
            <div className="text-[0.7rem] tracking-[0.08em] uppercase text-[#8A7866]">Paciente — Manhuaçu</div>
          </div>
        </div>
      </section>

      {/* LOCATION STRIP */}
      <div className="bg-[#2A2420] text-[rgba(253,251,248,0.7)] px-20 py-3.5 flex items-center justify-between text-[0.75rem] tracking-[0.1em] uppercase max-md:px-6 max-md:flex-col max-md:gap-1.5 max-md:text-center">
        <span className="flex items-center gap-2">📍 Sala 301-A, Edifício Breder — Manhuaçu, MG 36900-085</span>
        <span className="flex items-center gap-2">⏰ Seg–Sex: 8h às 18h &nbsp;|&nbsp; Sáb: 8h às 12h</span>
        <span className="flex items-center gap-2">📞 (33) 98414-3239</span>
      </div>

      {/* SERVICES */}
      <section className="px-20 py-[120px] bg-[#FDFBF8] max-md:px-6 max-md:py-20" id="servicos">
        <div className="flex items-end justify-between mb-[72px] max-md:flex-col max-md:items-start max-md:gap-3">
          <div>
            <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-7 before:h-[1px] before:bg-[#C9A96E]">
              Especialidades
            </div>
            <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.4rem,3.5vw,3.8rem)] font-light leading-[1.1] text-[#1A1512]">
              O que fazemos<br />pelo seu <em className="italic text-[#8A7866]">sorriso</em>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-[2px] bg-[rgba(196,181,160,0.2)] reveal max-md:grid-cols-1" role="list">
          {services.map((s, idx) => (
            <Link 
              key={s.id} 
              to={`/servico/${s.id}`} 
              className="bg-[#FDFBF8] px-10 py-12 relative overflow-hidden group cursor-pointer no-underline hover:bg-[#F7F4EF] transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-[#C9A96E] after:transition-[width] after:duration-400 hover:after:w-full focus:outline-none focus:ring-inset focus:ring-2 focus:ring-[#B8935A]"
              role="listitem"
              aria-labelledby={`service-title-${s.id}`}
            >
              <span className="absolute top-6 right-8 font-['Cormorant_Garamond'] text-[4rem] font-light text-[rgba(196,181,160,0.15)] leading-none pointer-events-none">{(idx + 1).toString().padStart(2, '0')}</span>
              <span className="text-[2rem] mb-6 block text-[#C9A96E]" aria-hidden="true">{s.icon}</span>
              <h3 id={`service-title-${s.id}`} className="font-['Cormorant_Garamond'] text-[1.6rem] font-normal text-[#1A1512] mb-3">{s.name}</h3>
              <p className="text-[0.85rem] leading-[1.7] text-[#2A2420] opacity-65 mb-7">{s.shortDesc}</p>
              <span className="text-[0.72rem] tracking-[0.12em] uppercase text-[#8A7866] no-underline flex items-center gap-2 group-hover:gap-3.5 transition-all">
                Ver detalhes <ArrowRight size={14} />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-20 py-[120px] bg-[#F7F4EF] grid grid-cols-2 gap-[100px] items-center max-md:grid-cols-1 max-md:px-6 max-md:py-20 max-md:gap-[60px]" id="sobre">
        <div className="relative reveal">
          <img
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/1.png"
            alt="Dr. Valdecir Alves — Cirurgião-Dentista Especialista em Implantodontia"
            className="w-full aspect-[4/5] object-cover grayscale-[5%] contrast-[1.02] rounded-[2px]"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
          <img
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/0.png"
            alt="Consultório odontológico moderno do Dr. Valdecir Alves em Manhuaçu"
            className="absolute -bottom-10 -right-10 w-[55%] aspect-[4/3] object-cover border-[6px] border-[#F7F4EF] rounded-[2px] shadow-[0_20px_60px_rgba(26,21,18,0.15)] max-md:-bottom-5 max-md:-right-2.5"
            referrerPolicy="no-referrer"
            loading="lazy"
          />
        </div>

        <div className="reveal">
          <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-7 before:h-[1px] before:bg-[#C9A96E]">
            Sobre o doutor
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.4rem,3.5vw,3.8rem)] font-light leading-[1.1] text-[#1A1512] mb-7">
            Dr. Valdecir<br /><em className="italic text-[#8A7866]">Alves</em>
          </h2>

          <blockquote className="font-['Cormorant_Garamond'] text-[1.6rem] italic font-light leading-[1.5] text-[#1A1512] mb-8 border-l-2 border-[#C9A96E] pl-6">
            "Meu objetivo é devolver confiança através de um sorriso que você tenha orgulho de mostrar."
          </blockquote>

          <p className="text-[0.9rem] leading-[1.85] text-[#2A2420] opacity-75 mb-5">
            Graduado pela Universidade Federal de Juiz de Fora (UFJF) em 1997, o Dr. Valdecir Alves acumula mais de 28 anos de experiência dedicados à saúde bucal e à estética dental em Manhuaçu, MG.
          </p>
          <p className="text-[0.9rem] leading-[1.85] text-[#2A2420] opacity-75 mb-5">
            Especializado em Implantodontia e Estética, atua também como clínico geral com foco no bem-estar completo dos seus pacientes — desde consultas de rotina até reabilitações complexas.
          </p>

          <div className="flex flex-col gap-3 my-9 p-8 bg-[#FDFBF8] rounded-[2px]">
            <div className="flex items-center gap-3 text-[0.82rem] text-[#2A2420] before:content-['✦'] before:text-[#C9A96E] before:text-[0.6rem] before:shrink-0">Cirurgião-Dentista — CRO/MG 22.503</div>
            <div className="flex items-center gap-3 text-[0.82rem] text-[#2A2420] before:content-['✦'] before:text-[#C9A96E] before:text-[0.6rem] before:shrink-0">Graduação em Odontologia — UFJF (1997)</div>
            <div className="flex items-center gap-3 text-[0.82rem] text-[#2A2420] before:content-['✦'] before:text-[#C9A96E] before:text-[0.6rem] before:shrink-0">Especialização em Implantodontia</div>
            <div className="flex items-center gap-3 text-[0.82rem] text-[#2A2420] before:content-['✦'] before:text-[#C9A96E] before:text-[0.6rem] before:shrink-0">Especialização em Estética e Reabilitação Oral</div>
          </div>

          <Link to="/agendamento" className="inline-flex items-center gap-2.5 bg-[#2A2420] text-[#FDFBF8] no-underline px-8 py-4 text-[0.82rem] font-normal tracking-[0.1em] uppercase rounded-[2px] hover:bg-[#1A1512] transition-colors">
            📅 Agendamento
          </Link>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="px-20 py-[120px] bg-[#1A1512] text-[#FDFBF8] max-md:px-6 max-md:py-20" id="depoimentos">
        <div>
          <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-7 before:h-[1px] before:bg-[#C9A96E]">
            Depoimentos
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.4rem,3.5vw,3.8rem)] font-light leading-[1.1] text-[#FDFBF8]">
            O que dizem<br />nossos <em className="italic text-[#8A7866]">pacientes</em>
          </h2>
        </div>

        <div className="grid grid-cols-3 gap-6 mt-[60px] reveal max-md:grid-cols-1">
          {[
            { author: 'Maria Aparecida S.', service: 'Clareamento Dental', text: '"Fiz o clareamento com o Dr. Valdecir e o resultado foi surpreendente. Fiquei com os dentes muito mais brancos e o atendimento foi excelente do início ao fim."' },
            { author: 'José Carlos M.', service: 'Implantodontia', text: '"Profissional muito atencioso e competente. Fiz meu implante aqui e não poderia estar mais satisfeito. Recomendo de olhos fechados para todos da região."' },
            { author: 'Fernanda L.', service: 'Clínica Geral', text: '"Sempre tive medo de dentista, mas o Dr. Valdecir deixou tudo muito tranquilo. Consultório limpo, ambiente acolhedor. Já indiquei para toda minha família."' }
          ].map((t, idx) => (
            <div key={idx} className="bg-[rgba(247,244,239,0.05)] border border-[rgba(247,244,239,0.08)] px-8 py-10 rounded-[2px] hover:bg-[rgba(247,244,239,0.08)] hover:border-[rgba(201,169,110,0.3)] transition-all">
              <div className="text-[#C9A96E] text-[0.85rem] mb-5">★★★★★</div>
              <p className="font-['Cormorant_Garamond'] italic text-[1.15rem] leading-[1.65] text-[rgba(247,244,239,0.85)] mb-6">{t.text}</p>
              <div className="text-[0.72rem] tracking-[0.12em] uppercase text-[#C4B5A0]">{t.author}</div>
              <div className="text-[0.68rem] text-[#C9A96E] mt-1 tracking-[0.08em] uppercase">{t.service}</div>
            </div>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href="https://share.google/JkmqSpsiUcaqmYt9b" target="_blank" className="inline-flex items-center gap-2.5 bg-transparent text-[rgba(247,244,239,0.7)] no-underline px-8 py-4 text-[0.82rem] font-normal tracking-[0.1em] uppercase border border-[rgba(247,244,239,0.2)] rounded-[2px] hover:text-[#FDFBF8] hover:border-[#FDFBF8] transition-all">
            Ver todas as avaliações no Google →
          </a>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="px-20 py-[100px] bg-[#F7F4EF] grid grid-cols-2 gap-20 items-center max-md:grid-cols-1 max-md:px-6 max-md:py-20 max-md:gap-12" id="contato">
        <div className="reveal">
          <div className="text-[0.7rem] tracking-[0.2em] uppercase text-[#C9A96E] flex items-center gap-2.5 mb-4 before:content-[''] before:block before:w-7 before:h-[1px] before:bg-[#C9A96E]">
            Agende agora
          </div>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,3.5vw,4rem)] font-light leading-[1.1] text-[#1A1512] mb-5">
            Pronto para<br />transformar seu<br /><em className="italic text-[#8A7866]">sorriso?</em>
          </h2>
          <p className="text-[0.9rem] leading-[1.7] text-[#2A2420] opacity-65 mb-10 max-w-[400px]">
            Entre em contato para agendar sua consulta. Atendemos em Manhuaçu, MG com horários flexíveis.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link to="/agendamento" className="inline-flex items-center gap-2.5 bg-[#25D366] text-white no-underline px-8 py-4 text-[0.82rem] font-medium tracking-[0.08em] uppercase rounded-[2px] hover:bg-[#20b958] hover:-translate-y-0.5 transition-all">
              📅 Agendamento
            </Link>
            <a href="https://share.google/JkmqSpsiUcaqmYt9b" className="inline-flex items-center gap-2.5 bg-transparent text-[#2A2420] no-underline px-8 py-4 text-[0.82rem] font-normal tracking-[0.1em] uppercase border border-[rgba(42,36,32,0.25)] rounded-[2px] hover:border-[#2A2420] hover:bg-[rgba(42,36,32,0.04)] transition-all" target="_blank">
              Ver avaliações Google
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-6 reveal">
          {[
            { icon: '📍', label: 'Endereço', value: 'Sala 301-A, Edifício Breder\nManhuaçu, MG — 36900-085' },
            { icon: '⏰', label: 'Horários de Atendimento', value: 'Segunda a Sexta: 8h às 18h\nSábado: 8h às 12h' },
            { icon: '📱', label: 'WhatsApp / Telefone', value: '(33) 98414-3239' },
            { icon: '🦷', label: 'CRO', value: 'CRO/MG 22.503' }
          ].map((info, idx) => (
            <div key={idx} className="flex gap-5 items-start">
              <div className="w-11 h-11 bg-[#FDFBF8] border border-[rgba(196,181,160,0.3)] rounded-[2px] flex items-center justify-center text-[1.1rem] shrink-0">{info.icon}</div>
              <div>
                <div className="text-[0.68rem] tracking-[0.12em] uppercase text-[#8A7866] mb-1">{info.label}</div>
                <div className="text-[0.9rem] text-[#2A2420] leading-[1.5] whitespace-pre-line">{info.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-[80] bg-[#B8935A] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-[#A5814A] focus:outline-none focus:ring-2 focus:ring-[#B8935A] focus:ring-offset-2 ${showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="Voltar para o topo"
      >
        <ArrowRight size={24} className="-rotate-90" />
      </button>

      {/* FOOTER */}
      <footer className="bg-[#1A1512] text-[rgba(247,244,239,0.5)] px-20 py-[60px] grid grid-cols-4 gap-12 text-[0.78rem] leading-[1.8] max-md:grid-cols-1 max-md:px-6">
        <div>
          <img 
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/2.png" 
            alt="Logo Dr. Valdecir Alves" 
            className="h-16 w-auto object-contain mb-4"
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
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Links Úteis</h4>
          <Link to="/blog" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Blog</Link>
          <Link to="/agendamento" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Agendamento</Link>
          <Link to="/feedback" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors mb-1">Feedback</Link>
        </div>
        <div>
          <h4 className="text-[0.65rem] tracking-[0.18em] uppercase text-[rgba(247,244,239,0.3)] mb-4">Contato</h4>
          <a href="https://wa.me/5533984143239" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">WhatsApp: (33) 98414-3239</a>
          <a href="https://www.instagram.com/dr.valdeciralves?igsh=MTN2eGdxeGJxcDQzeg==" target="_blank" rel="noopener noreferrer" className="text-[rgba(247,244,239,0.5)] no-underline block hover:text-[#FDFBF8] transition-colors">Instagram: @dr.valdeciralves</a>
          <br />
          <div>Sala 301-A, Edifício Breder<br />Manhuaçu, MG — 36900-085</div>
        </div>
      </footer>
      <div className="bg-[#1A1512] border-t border-[rgba(247,244,239,0.07)] px-20 py-5 flex justify-between text-[0.68rem] text-[rgba(247,244,239,0.25)] tracking-[0.08em] max-md:px-6 max-md:flex-col max-md:gap-2">
        <span>© 2026 Dr. Valdecir Alves — Todos os direitos reservados</span>
        <span>CRO/MG 22.503 · Manhuaçu, MG</span>
      </div>

      {/* WHATSAPP FLOAT */}
      <Link to="/agendamento" className="fixed bottom-8 right-8 z-[999] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_6px_24px_rgba(37,211,102,0.4)] no-underline text-2xl transition-all hover:scale-110 hover:shadow-[0_8px_32px_rgba(37,211,102,0.55)] animate-[pulse_3s_ease_infinite_2s]" title="Agendamento">
        📅
      </Link>
    </div>
  );
}
