import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Menu, X, Calendar as CalendarIcon, Clock, User, Phone, MapPin } from 'lucide-react';

export default function Scheduling() {
  const [step, setStep] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [service, setService] = useState<string | null>(null);
  const [serviceDuration, setServiceDuration] = useState<string | null>(null);
  const [servicePrice, setServicePrice] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [formData, setFormData] = useState({
    nome: '',
    tel: '',
    nasc: '',
    plano: '',
    obs: ''
  });
  const [errors, setErrors] = useState({
    nome: '',
    tel: '',
    nasc: ''
  });
  const [confirmCode, setConfirmCode] = useState('');

  const validateField = (name: string, value: string) => {
    let error = '';
    if (name === 'nome') {
      if (value.trim().length < 3) error = 'O nome deve ter pelo menos 3 caracteres.';
    } else if (name === 'tel') {
      const phoneRegex = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
      if (!phoneRegex.test(value)) error = 'Formato de telefone inválido. Ex: (33) 98414-3239';
    } else if (name === 'nasc') {
      if (!value) error = 'Data de nascimento é obrigatória.';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    const fieldName = id.replace('f_', '');
    setFormData(prev => ({ ...prev, [fieldName]: value }));
    if (fieldName in errors) {
      validateField(fieldName, value);
    }
  };

  const ALL_SLOTS = ['08:00','08:30','09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  const MONTHS = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
  const today = new Date();

  const goStep = (n: number) => {
    if (n === 2 && !service) { alert('Por favor, selecione um serviço.'); return; }
    if (n === 3 && (!selectedDate || !selectedTime)) { alert('Por favor, selecione data e horário.'); return; }
    if (n === 4) {
      const isNomeValid = validateField('nome', formData.nome);
      const isTelValid = validateField('tel', formData.tel);
      const isNascValid = validateField('nasc', formData.nasc);
      if (!isNomeValid || !isTelValid || !isNascValid) return;
    }
    setStep(n);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getGoogleCalendarUrl = () => {
    if (!selectedDate || !selectedTime || !service) return '';
    const [year, month, day] = selectedDate.split('-');
    const [hour, minute] = selectedTime.split(':');
    
    // Start time
    const start = `${year}${month}${day}T${hour}${minute}00`;
    
    // End time (assume 1 hour duration)
    const endHour = (parseInt(hour) + 1).toString().padStart(2, '0');
    const end = `${year}${month}${day}T${endHour}${minute}00`;
    
    const text = encodeURIComponent(`Consulta Odontológica - Dr. Valdecir (${service})`);
    const details = encodeURIComponent(`Paciente: ${formData.nome}\nServiço: ${service}\nCódigo: ${confirmCode}`);
    const location = encodeURIComponent('Sala 301-A, Edifício Breder, Manhuaçu, MG');
    
    return `https://www.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  const selectService = (s: string, d: string, p: string) => {
    setService(s);
    setServiceDuration(d);
    setServicePrice(p);
  };

  const changeMonth = (dir: number) => {
    let newMonth = month + dir;
    let newYear = year;
    if (newMonth < 0) { newMonth = 11; newYear--; }
    if (newMonth > 11) { newMonth = 0; newYear++; }
    setMonth(newMonth);
    setYear(newYear);
  };

  const confirmWhatsApp = () => {
    const code = 'AG' + Math.random().toString(36).substr(2,6).toUpperCase();
    setConfirmCode(code);

    const [y, m, d] = (selectedDate || '').split('-');
    const dateLabel = `${d}/${m}/${y}`;

    const msg = encodeURIComponent(
      `🦷 *Solicitação de Agendamento*\n\n` +
      `📋 *Serviço:* ${service}\n` +
      `📅 *Data:* ${dateLabel}\n` +
      `⏰ *Horário:* ${selectedTime}\n` +
      `👤 *Paciente:* ${formData.nome}\n` +
      `📞 *Telefone:* ${formData.tel}\n` +
      `🏥 *Plano:* ${formData.plano || 'Particular'}\n` +
      (formData.obs ? `📝 *Obs:* ${formData.obs}\n` : '') +
      `\n🔑 *Código:* ${code}`
    );

    window.open(`https://wa.me/5533984143239?text=${msg}`, '_blank');
    setStep(5);
  };

  const renderCalendar = () => {
    const grid = [];
    const first = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < first; i++) {
      grid.push(<div key={`empty-${i}`} className="aspect-square cursor-default"></div>);
    }

    // Days
    for (let d = 1; d <= days; d++) {
      const dt = new Date(year, month, d);
      const dow = dt.getDay();
      const isPast = dt < new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const isSun = dow === 0;
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dt.toDateString() === today.toDateString();
      const isSelected = selectedDate === dateStr;

      grid.push(
        <div
          key={d}
          onClick={() => !isPast && !isSun && setSelectedDate(dateStr)}
          className={`aspect-square flex items-center justify-center rounded-xl text-[14px] transition-all border-2 max-w-[48px] mx-auto w-full cursor-pointer
            ${isPast || isSun ? 'text-[#D0C8BE] cursor-default border-transparent' : 'text-[#2E2A25] hover:bg-[#F2EDE4] hover:border-[#D4AA7D] border-transparent'}
            ${isToday ? 'font-medium text-[#B8935A]' : ''}
            ${isSelected ? 'bg-[#B8935A] text-white !border-[#B8935A] shadow-[0_4px_12px_rgba(184,147,90,0.35)]' : ''}
          `}
        >
          {d}
        </div>
      );
    }
    return grid;
  };

  return (
    <div className="bg-[#FAF7F2] text-[#1A1714] font-['DM_Sans'] min-h-screen">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* HEADER */}
      <header className="bg-[#1A1714] px-8 py-3 flex items-center justify-between sticky top-0 z-[100] shadow-[0_2px_20px_rgba(0,0,0,0.3)] max-md:px-4" role="banner">
        <Link to="/" className="flex items-center no-underline focus:outline-none focus:ring-2 focus:ring-[#B8935A] rounded-sm" aria-label="Voltar para o início">
          <img 
            src="https://storage.googleapis.com/static.mira.ai/applet_assets/67ea993f-679e-49b8-809b-6f0275a50785/2.png" 
            alt="Logo Dr. Valdecir Alves" 
            className="h-10 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </Link>
        <div className="flex items-center gap-4">
          <div className="max-md:hidden">
            <div className="bg-[rgba(184,147,90,0.15)] border border-[rgba(184,147,90,0.3)] text-[#D4AA7D] px-3.5 py-1.5 rounded-[20px] text-xs font-light tracking-wider">📍 Manhuaçu, MG</div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="hidden max-md:flex items-center justify-center p-2 text-[#FDFBF8] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

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
          <button onClick={() => setIsMenuOpen(false)} className="mt-auto bg-[#2A2420] text-[#FDFBF8] px-6 py-4 rounded-[2px] tracking-[0.1em] text-sm text-center uppercase no-underline hover:bg-[#1A1512] transition-colors">Fechar</button>
        </div>
      </header>

      {/* HERO */}
      <div className="bg-gradient-to-br from-[#2E2A25] to-[#1A1714] px-8 py-14 pb-12 text-center relative overflow-hidden max-md:px-5 max-md:py-10 max-md:pb-8">
        <div className="absolute -top-[60px] -right-[60px] w-[280px] h-[280px] bg-[radial-gradient(circle,rgba(184,147,90,0.12)_0%,transparent_70%)] rounded-full"></div>
        <h2 className="font-['Cormorant_Garamond'] text-[38px] font-light text-white leading-[1.2] mb-3 relative z-[1] max-md:text-[28px]">
          Agende sua <em className="text-[#B8935A] not-italic font-semibold">consulta</em><br />com facilidade
        </h2>
        <p className="text-[#A09288] text-sm font-light tracking-[0.5px] relative z-[1]">Escolha o serviço, data e horário preferidos</p>
      </div>

      {/* APP */}
      <div className="max-w-[900px] mx-auto px-5">
        {/* STEPPER */}
        <div className="flex items-center justify-center gap-0 px-5 py-8 pb-6">
          {[
            { n: 1, l: 'Serviço' },
            { n: 2, l: 'Data & Hora' },
            { n: 3, l: 'Dados' },
            { n: 4, l: 'Confirmação' }
          ].map((s, i) => (
            <div key={s.n} className="flex items-center">
              <button 
                onClick={() => step > s.n && setStep(s.n)}
                className={`flex items-center gap-2 focus:outline-none ${step > s.n ? 'cursor-pointer' : 'cursor-default'}`}
                disabled={step <= s.n}
                aria-label={`Ir para o passo ${s.n}: ${s.l}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-medium border-2 transition-all duration-500
                  ${step === s.n ? 'bg-[#B8935A] border-[#B8935A] text-white shadow-[0_0_0_4px_rgba(184,147,90,0.2)]' : ''}
                  ${step > s.n ? 'bg-[#2E2A25] border-[#2E2A25] text-[#B8935A]' : ''}
                  ${step < s.n ? 'border-[#F2EDE4] text-[#A09288] bg-[#FAF7F2]' : ''}
                `}>
                  {s.n}
                </div>
                <div className={`text-xs font-light max-md:hidden ${step === s.n ? 'text-[#B8935A] font-medium' : 'text-[#A09288]'}`}>{s.l}</div>
              </button>
              {i < 3 && <div className="w-10 h-[2px] bg-[#F2EDE4] mx-1.5 max-md:w-[20px]"></div>}
            </div>
          ))}
        </div>

        {/* STEP 1 – SERVIÇO */}
        {step === 1 && (
          <div className="animate-[fadeIn_0.4s_ease]">
            <div className="flex items-center gap-3.5 bg-white border-2 border-[#F2EDE4] rounded-2xl px-5 py-4 mb-7">
              <div className="w-12 h-12 bg-gradient-to-br from-[#B8935A] to-[#D4AA7D] rounded-full flex items-center justify-center text-[22px] shrink-0">👨‍⚕️</div>
              <div className="doctor-info">
                <h4 className="font-['Cormorant_Garamond'] text-base font-semibold text-[#2E2A25]">Dr. Valdecir Alves</h4>
                <span className="text-xs text-[#A09288] font-light">Cirurgião-Dentista • Clínica Geral</span>
              </div>
              <div className="ml-auto text-[11px] text-[#B8935A] border border-[rgba(184,147,90,0.4)] px-2.5 py-1 rounded-lg font-light tracking-[0.5px] whitespace-nowrap">CRO-MG</div>
            </div>

            <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2E2A25] mb-1.5">Qual serviço você precisa?</div>
            <div className="text-[13px] text-[#A09288] font-light mb-7">Selecione o procedimento desejado</div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3.5 mb-8" role="list">
              {[
                { name: 'Consulta Inicial', dur: '30 min', price: 'Gratuita', icon: '🔍' },
                { name: 'Limpeza (Profilaxia)', dur: '45 min', price: 'A consultar', icon: '✨' },
                { name: 'Clareamento Dental', dur: '60 min', price: 'A consultar', icon: '🌟' },
                { name: 'Restauração', dur: '60 min', price: 'A consultar', icon: '🔧' },
                { name: 'Extração Dentária', dur: '45 min', price: 'A consultar', icon: '🩺' },
                { name: 'Ortodontia / Aparelho', dur: '30 min', price: 'A consultar', icon: '😁' },
                { name: 'Tratamento de Canal', dur: '90 min', price: 'A consultar', icon: '⚙️' },
                { name: 'Urgência / Dor', dur: '30 min', price: 'Prioritário', icon: '🚨' }
              ].map((s, idx) => (
                <button
                  key={idx}
                  onClick={() => selectService(s.name, s.dur, s.price)}
                  className={`bg-white border-2 rounded-2xl px-[18px] py-[22px] cursor-pointer transition-all relative overflow-hidden group hover:border-[#D4AA7D] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] text-left w-full focus:outline-none focus:ring-2 focus:ring-[#B8935A]
                    ${service === s.name ? 'border-[#B8935A] bg-[#FFFAF4]' : 'border-[#F2EDE4]'}
                  `}
                  role="listitem"
                  aria-pressed={service === s.name}
                >
                  {service === s.name && <div className="absolute top-3 right-3 w-5 h-5 bg-[#B8935A] rounded-full flex items-center justify-center text-white text-[11px]" aria-hidden="true">✓</div>}
                  <div className="text-[28px] mb-2.5" aria-hidden="true">{s.icon}</div>
                  <div className="text-sm font-medium text-[#2E2A25] mb-1">{s.name}</div>
                  <div className="text-xs text-[#A09288] font-light">{s.dur}</div>
                  <div className="mt-2.5 text-[13px] text-[#B8935A] font-medium">{s.price}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-3 justify-end pb-10">
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-none transition-all tracking-[0.3px] bg-[#B8935A] text-white shadow-[0_4px_16px_rgba(184,147,90,0.35)] hover:bg-[#A5814A] hover:shadow-[0_6px_20px_rgba(184,147,90,0.45)] hover:-translate-y-[1px]" onClick={() => goStep(2)}>Continuar →</button>
            </div>
          </div>
        )}

        {/* STEP 2 – DATA & HORA */}
        {step === 2 && (
          <div className="animate-[fadeIn_0.4s_ease]">
            <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2E2A25] mb-1.5">Escolha a data</div>
            <div className="text-[13px] text-[#A09288] font-light mb-7">Selecione um dia disponível no calendário</div>

            <div className="bg-white rounded-[20px] p-7 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-md:p-[18px]">
              <div className="flex items-center justify-between mb-6">
                <button className="bg-none border-2 border-[#F2EDE4] rounded-xl w-[34px] h-[34px] cursor-pointer text-[15px] text-[#6B6158] flex items-center justify-center hover:border-[#B8935A] hover:text-[#B8935A] transition-all" onClick={() => changeMonth(-1)}>‹</button>
                <h3 className="font-['Cormorant_Garamond'] text-xl font-normal capitalize text-[#2E2A25]">{MONTHS[month]} {year}</h3>
                <button className="bg-none border-2 border-[#F2EDE4] rounded-xl w-[34px] h-[34px] cursor-pointer text-[15px] text-[#6B6158] flex items-center justify-center hover:border-[#B8935A] hover:text-[#B8935A] transition-all" onClick={() => changeMonth(1)}>›</button>
              </div>
              <div className="grid grid-cols-7 gap-1.5 max-md:gap-1">
                {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].map(d => (
                  <div key={d} className="text-center text-[11px] font-medium text-[#A09288] tracking-widest uppercase py-1.5 pb-3">{d}</div>
                ))}
                {renderCalendar()}
              </div>
            </div>

            <div className="bg-white rounded-[20px] px-7 py-6 mb-6 shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-md:p-[18px]">
              <h4 className="font-['Cormorant_Garamond'] text-lg font-normal text-[#2E2A25] mb-4">
                {selectedDate ? `Horários disponíveis — ${selectedDate.split('-').reverse().join('/')}` : 'Selecione um dia para ver os horários'}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {selectedDate ? ALL_SLOTS.map(t => (
                  <div
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    className={`px-4 py-2 border-2 rounded-xl text-[13px] font-normal cursor-pointer transition-all bg-[#FAF7F2]
                      ${selectedTime === t ? 'bg-[#B8935A] text-white border-[#B8935A]' : 'border-[#F2EDE4] text-[#2E2A25] hover:border-[#B8935A] hover:text-[#B8935A] hover:bg-[#FFFAF4]'}
                    `}
                  >
                    {t}
                  </div>
                )) : (
                  <p className="text-xs text-[#A09288] italic">Aguardando seleção de data...</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 justify-end pb-10">
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-2 transition-all tracking-[0.3px] bg-transparent border-[#F2EDE4] text-[#6B6158] hover:border-[#D4AA7D] hover:text-[#2E2A25]" onClick={() => goStep(1)}>← Voltar</button>
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-none transition-all tracking-[0.3px] bg-[#B8935A] text-white shadow-[0_4px_16px_rgba(184,147,90,0.35)] hover:bg-[#A5814A] hover:shadow-[0_6px_20px_rgba(184,147,90,0.45)] hover:-translate-y-[1px]" onClick={() => goStep(3)}>Continuar →</button>
            </div>
          </div>
        )}

        {/* STEP 3 – DADOS */}
        {step === 3 && (
          <div className="animate-[fadeIn_0.4s_ease]">
            <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2E2A25] mb-1.5">Seus dados</div>
            <div className="text-[13px] text-[#A09288] font-light mb-7">Preencha seus dados para confirmar o agendamento</div>

    <div className="grid grid-cols-2 gap-4 mb-6 max-md:grid-cols-1">
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#6B6158] uppercase tracking-widest">Nome completo *</label>
        <input type="text" id="f_nome" value={formData.nome} onChange={handleInputChange} className={`bg-white border-2 rounded-xl px-4 py-3 text-sm text-[#1A1714] outline-none transition-colors ${errors.nome ? 'border-red-500' : 'border-[#F2EDE4] focus:border-[#B8935A]'}`} placeholder="Seu nome completo" />
        {errors.nome && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.nome}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#6B6158] uppercase tracking-widest">Telefone / WhatsApp *</label>
        <input type="tel" id="f_tel" value={formData.tel} onChange={handleInputChange} className={`bg-white border-2 rounded-xl px-4 py-3 text-sm text-[#1A1714] outline-none transition-colors ${errors.tel ? 'border-red-500' : 'border-[#F2EDE4] focus:border-[#B8935A]'}`} placeholder="(33) 9 9999-9999" />
        {errors.tel && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.tel}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#6B6158] uppercase tracking-widest">Data de nascimento *</label>
        <input type="date" id="f_nasc" value={formData.nasc} onChange={handleInputChange} className={`bg-white border-2 rounded-xl px-4 py-3 text-sm text-[#1A1714] outline-none transition-colors ${errors.nasc ? 'border-red-500' : 'border-[#F2EDE4] focus:border-[#B8935A]'}`} />
        {errors.nasc && <span className="text-red-500 text-[10px] uppercase font-bold">{errors.nasc}</span>}
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-[#6B6158] uppercase tracking-widest">Plano odontológico</label>
        <select id="f_plano" value={formData.plano} onChange={handleInputChange} className="bg-white border-2 border-[#F2EDE4] rounded-xl px-4 py-3 text-sm text-[#1A1714] outline-none focus:border-[#B8935A] transition-colors">
          <option value="">Particular (sem plano)</option>
          <option value="Unimed">Unimed</option>
          <option value="Bradesco Saúde">Bradesco Saúde</option>
          <option value="SulAmérica">SulAmérica</option>
          <option value="Odontoprev">Odontoprev</option>
          <option value="OdontoClinics">OdontoClinics</option>
          <option value="Porto Seguro">Porto Seguro</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <div className="flex flex-col gap-1.5 col-span-full">
        <label className="text-xs font-medium text-[#6B6158] uppercase tracking-widest">Observações</label>
        <textarea id="f_obs" value={formData.obs} onChange={handleInputChange} className="bg-white border-2 border-[#F2EDE4] rounded-xl px-4 py-3 text-sm text-[#1A1714] outline-none focus:border-[#B8935A] transition-colors resize-vertical min-h-[90px]" placeholder="Alguma informação relevante? Alergias, medo de procedimentos, etc."></textarea>
      </div>
    </div>

            <div className="flex gap-3 justify-end pb-10">
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-2 transition-all tracking-[0.3px] bg-transparent border-[#F2EDE4] text-[#6B6158] hover:border-[#D4AA7D] hover:text-[#2E2A25]" onClick={() => goStep(2)}>← Voltar</button>
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-none transition-all tracking-[0.3px] bg-[#B8935A] text-white shadow-[0_4px_16px_rgba(184,147,90,0.35)] hover:bg-[#A5814A] hover:shadow-[0_6px_20px_rgba(184,147,90,0.45)] hover:-translate-y-[1px]" onClick={() => goStep(4)}>Revisar agendamento →</button>
            </div>
          </div>
        )}

        {/* STEP 4 – CONFIRMAÇÃO */}
        {step === 4 && (
          <div className="animate-[fadeIn_0.4s_ease]">
            <div className="font-['Cormorant_Garamond'] text-[26px] font-normal text-[#2E2A25] mb-1.5">Confirmar agendamento</div>
            <div className="text-[13px] text-[#A09288] font-light mb-7">Verifique os dados e confirme</div>

            <div className="bg-[#1A1714] rounded-[20px] p-7 mb-6 text-white">
              <h3 className="font-['Cormorant_Garamond'] text-[22px] font-light text-[#B8935A] mb-5">Resumo da consulta</h3>
              {[
                { l: 'Serviço', v: service },
                { l: 'Data', v: selectedDate?.split('-').reverse().join('/') },
                { l: 'Horário', v: selectedTime },
                { l: 'Duração', v: serviceDuration },
                { l: 'Paciente', v: formData.nome },
                { l: 'Telefone', v: formData.tel },
                { l: 'Plano', v: formData.plano || 'Particular' }
              ].map((row, idx) => (
                <div key={idx} className="flex justify-between items-start py-2.5 border-b border-[rgba(255,255,255,0.08)] text-sm last:border-none">
                  <span className="text-[#A09288] text-xs uppercase tracking-widest font-light mr-4">{row.l}</span>
                  <span className="text-white text-right font-light">{row.v}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 justify-end pb-10">
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-2 transition-all tracking-[0.3px] bg-transparent border-[#F2EDE4] text-[#6B6158] hover:border-[#D4AA7D] hover:text-[#2E2A25]" onClick={() => goStep(3)}>← Editar</button>
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-none transition-all tracking-[0.3px] bg-[#25D366] text-white shadow-[0_4px_16px_rgba(37,211,102,0.3)] flex items-center gap-2 hover:bg-[#1eb859] hover:-translate-y-[1px]" onClick={confirmWhatsApp}>
                <span>💬</span> Confirmar via WhatsApp
              </button>
            </div>
          </div>
        )}

        {/* STEP 5 – SUCESSO */}
        {step === 5 && (
          <div className="animate-[fadeIn_0.5s_ease] text-center py-10 px-5">
            <div className="w-20 h-20 bg-gradient-to-br from-[#B8935A] to-[#D4AA7D] rounded-full mx-auto mb-6 flex items-center justify-center text-4xl shadow-[0_8px_28px_rgba(184,147,90,0.4)]">✅</div>
            <h2 className="font-['Cormorant_Garamond'] text-[30px] font-normal text-[#2E2A25] mb-2.5">Agendamento Enviado!</h2>
            <p className="text-[#A09288] text-sm font-light mb-2 leading-[1.6]">Sua solicitação foi enviada com sucesso.<br />Em breve a clínica confirmará pelo WhatsApp.</p>
            <div className="inline-block bg-[#1A1714] text-[#B8935A] font-mono text-lg px-6 py-2.5 rounded-xl my-4 mb-7 tracking-[3px]">{confirmCode}</div>
            <p className="text-xs text-[#A09288] mb-8">Guarde este código de confirmação</p>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#F2EDE4] mb-8 max-w-md mx-auto">
              <h4 className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2E2A25] mb-4">Próximos Passos</h4>
              <div className="space-y-4">
                <a 
                  href={getGoogleCalendarUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full bg-[#FAF7F2] border-2 border-[#F2EDE4] py-3 rounded-xl text-sm font-medium text-[#6B6158] hover:border-[#B8935A] hover:text-[#B8935A] transition-all"
                >
                  📅 Adicionar ao meu Google Calendar
                </a>
                <Link 
                  to="/feedback"
                  className="flex items-center justify-center gap-3 w-full bg-[#FAF7F2] border-2 border-[#F2EDE4] py-3 rounded-xl text-sm font-medium text-[#6B6158] hover:border-[#B8935A] hover:text-[#B8935A] transition-all"
                >
                  ⭐ Deixar um feedback
                </Link>
              </div>
            </div>

            <div className="mt-7 flex gap-3 justify-center flex-wrap max-md:flex-col">
              <button className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-2 transition-all tracking-[0.3px] bg-transparent border-[#F2EDE4] text-[#6B6158] hover:border-[#D4AA7D] hover:text-[#2E2A25] max-md:w-full" onClick={() => window.location.reload()}>Novo agendamento</button>
              <Link to="/" className="px-7 py-3.5 rounded-xl font-medium cursor-pointer border-none transition-all tracking-[0.3px] bg-[#B8935A] text-white no-underline max-md:w-full text-center flex items-center justify-center">Voltar ao Início</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
