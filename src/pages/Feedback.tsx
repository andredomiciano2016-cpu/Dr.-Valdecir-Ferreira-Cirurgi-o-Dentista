import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Menu, X, Instagram } from 'lucide-react';

export default function Feedback() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, selecione uma nota.');
      return;
    }
    // Here you would typically send the feedback to a backend
    console.log({ rating, comment });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-[#FAF7F2] min-h-screen flex items-center justify-center p-5 font-['DM_Sans']">
        <div className="bg-white p-10 rounded-2xl shadow-xl max-w-md w-full text-center animate-[fadeIn_0.5s_ease]">
          <div className="w-20 h-20 bg-[#B8935A] rounded-full flex items-center justify-center text-4xl mx-auto mb-6 text-white">❤️</div>
          <h2 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#1A1714] mb-4">Obrigado pelo seu feedback!</h2>
          <p className="text-[#A09288] mb-8">Sua opinião é fundamental para continuarmos oferecendo o melhor cuidado para o seu sorriso.</p>
          <Link to="/" className="inline-flex items-center justify-center bg-[#B8935A] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#A5814A] transition-all max-md:w-full">
            Voltar ao Início
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFBF8] min-h-screen font-['DM_Sans'] text-[#2A2420]">
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

      <main className="max-w-2xl mx-auto px-5 pt-32 pb-16">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <h2 className="font-['Cormorant_Garamond'] text-4xl font-normal text-[#1A1714] mb-2">Como foi sua experiência?</h2>
          <p className="text-[#A09288] mb-10">Conte-nos o que você achou do seu atendimento hoje.</p>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-4">
              <label id="rating-label" className="text-sm font-medium text-[#6B6158] uppercase tracking-widest block">Sua Avaliação</label>
              <div className="flex gap-2" role="radiogroup" aria-labelledby="rating-label">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className="focus:outline-none transition-transform hover:scale-110 focus:ring-2 focus:ring-[#B8935A] rounded-full p-1"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHover(star)}
                    onMouseLeave={() => setHover(0)}
                    aria-label={`Avaliar com ${star} estrelas`}
                    aria-checked={rating === star}
                    role="radio"
                  >
                    <Star
                      size={40}
                      className={`${
                        (hover || rating) >= star ? 'fill-[#B8935A] text-[#B8935A]' : 'text-[#F2EDE4]'
                      } transition-colors`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#A09288] italic">
                {rating === 1 && 'Poderia ser melhor'}
                {rating === 2 && 'Regular'}
                {rating === 3 && 'Bom'}
                {rating === 4 && 'Muito Bom'}
                {rating === 5 && 'Excelente!'}
              </p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-medium text-[#6B6158] uppercase tracking-widest block">Comentários Adicionais</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full bg-[#FAF7F2] border-2 border-[#F2EDE4] rounded-2xl p-4 text-sm text-[#1A1714] outline-none focus:border-[#B8935A] transition-colors min-h-[150px] resize-none"
                placeholder="O que você mais gostou? O que podemos melhorar?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B8935A] text-white py-4 rounded-2xl font-medium shadow-[0_4px_16px_rgba(184,147,90,0.35)] hover:bg-[#A5814A] hover:shadow-[0_6px_20px_rgba(184,147,90,0.45)] transition-all"
            >
              Enviar Feedback
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
