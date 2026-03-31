export interface Service {
  id: string;
  name: string;
  shortDesc: string;
  fullDesc: string;
  benefits: string[];
  procedure: string[];
  image: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: 'clareamento',
    name: 'Clareamento Dental',
    shortDesc: 'Dentes até 8 tons mais brancos com técnicas modernas e seguras.',
    fullDesc: 'O clareamento dental é um dos procedimentos estéticos mais procurados. Utilizamos géis clareadores de alta performance que reagem com as manchas nos dentes, quebrando as moléculas de pigmento e devolvendo a brancura natural do seu sorriso.',
    benefits: [
      'Aumento imediato da autoestima',
      'Procedimento indolor e seguro',
      'Resultados duradouros com os devidos cuidados',
      'Remoção de manchas de café, vinho e tabaco'
    ],
    procedure: [
      'Avaliação inicial da saúde bucal',
      'Proteção da gengiva com barreira protetora',
      'Aplicação do gel clareador',
      'Ativação (se necessário) e monitoramento',
      'Orientações pós-procedimento'
    ],
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
    icon: '🌟'
  },
  {
    id: 'limpeza',
    name: 'Limpeza Profissional',
    shortDesc: 'Remoção completa de tártaro, manchas e placa bacteriana.',
    fullDesc: 'A profilaxia (limpeza) é essencial para prevenir doenças gengivais e cáries. Removemos o tártaro que a escovação comum não alcança, além de realizar o polimento para remover manchas superficiais.',
    benefits: [
      'Prevenção de gengivite e periodontite',
      'Hálito mais fresco',
      'Identificação precoce de outros problemas bucais',
      'Sensação de limpeza profunda'
    ],
    procedure: [
      'Exame clínico detalhado',
      'Raspagem de tártaro com ultrassom',
      'Jateamento de bicarbonato',
      'Polimento coronário',
      'Aplicação de flúor'
    ],
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
    icon: '✨'
  },
  {
    id: 'estetica',
    name: 'Estética do Sorriso',
    shortDesc: 'Facetas, remoção de manchas e harmonização do sorriso.',
    fullDesc: 'A estética dental envolve diversos procedimentos para harmonizar o sorriso, como facetas de resina ou porcelana, fechamento de espaços (diastemas) e correção de imperfeições no formato dos dentes.',
    benefits: [
      'Sorriso harmônico e simétrico',
      'Correção de dentes levemente tortos ou lascados',
      'Fechamento de espaços indesejados',
      'Resultados extremamente naturais'
    ],
    procedure: [
      'Planejamento digital do sorriso',
      'Preparação mínima da superfície dental',
      'Moldagem ou escaneamento',
      'Confecção e cimentação das peças estéticas'
    ],
    image: 'https://images.unsplash.com/photo-1593022356769-11f762e25ed9?w=800&q=80',
    icon: '✦'
  },
  {
    id: 'implantes',
    name: 'Implantodontia',
    shortDesc: 'Reposição de dentes perdidos com implantes de titânio.',
    fullDesc: 'Os implantes dentais são a solução definitiva para a perda de dentes. Atuam como raízes artificiais de titânio sobre as quais são fixadas as coroas, devolvendo 100% da função mastigatória e estética.',
    benefits: [
      'Estabilidade total para mastigar e falar',
      'Preservação do osso alveolar',
      'Não desgasta os dentes vizinhos',
      'Conforto superior às próteses removíveis'
    ],
    procedure: [
      'Exames de imagem (Tomografia)',
      'Cirurgia de instalação do implante',
      'Período de osseointegração',
      'Instalação da coroa definitiva'
    ],
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=800&q=80',
    icon: '🦷'
  },
  {
    id: 'reabilitacao',
    name: 'Reabilitação Oral',
    shortDesc: 'Devolvemos a função e a estética ao sorriso completo.',
    fullDesc: 'A reabilitação oral envolve um conjunto de procedimentos para restaurar a saúde de bocas que sofreram grandes perdas ou desgastes. É um planejamento multidisciplinar que visa o equilíbrio entre estética, função e saúde biológica.',
    benefits: [
      'Melhora na fala e mastigação',
      'Alívio de dores articulares (ATM)',
      'Rejuvenescimento do terço inferior da face',
      'Saúde sistêmica preservada'
    ],
    procedure: [
      'Diagnóstico completo da oclusão',
      'Tratamento de problemas de base',
      'Restauração de dentes desgastados',
      'Instalação de próteses ou coroas',
      'Equilíbrio da mordida'
    ],
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80',
    icon: '🛠️'
  },
  {
    id: 'clinica-geral',
    name: 'Clínica Geral',
    shortDesc: 'Atendimento completo para toda a família: restaurações e prevenção.',
    fullDesc: 'A clínica geral é a base da odontologia. Realizamos desde restaurações estéticas e tratamentos de canal até extrações e acompanhamento preventivo, sempre com foco no acolhimento e na ausência de dor para pacientes de todas as idades.',
    benefits: [
      'Manutenção da saúde bucal em dia',
      'Tratamentos rápidos e eficazes',
      'Prevenção de emergências dentais',
      'Cuidado humanizado e sem medo'
    ],
    procedure: [
      'Check-up preventivo anual',
      'Restaurações em resina composta',
      'Tratamento de sensibilidade',
      'Pequenas cirurgias e extrações',
      'Educação em higiene oral'
    ],
    image: 'https://images.unsplash.com/photo-1593022356769-11f09a79a5cc?w=800&q=80',
    icon: '👨‍👩‍👧‍👦'
  }
];

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'importancia-limpeza',
    title: 'A importância da limpeza profissional a cada 6 meses',
    excerpt: 'Descubra por que a escovação em casa não é suficiente para manter sua saúde bucal em dia.',
    content: 'A saúde bucal vai muito além de dentes brancos. A placa bacteriana que não é removida pela escovação diária acaba se transformando em tártaro, que só pode ser removido pelo dentista...',
    date: '15 de Março, 2026',
    author: 'Dr. Valdecir Alves',
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=800&q=80',
    category: 'Prevenção'
  },
  {
    id: 'clareamento-mitos',
    title: 'Mitos e verdades sobre o clareamento dental',
    excerpt: 'O clareamento estraga o esmalte? Causa sensibilidade permanente? Respondemos tudo aqui.',
    content: 'Muitas pessoas deixam de clarear os dentes por medo de danos ao esmalte. No entanto, quando realizado sob supervisão profissional, o gel clareador atua apenas nos pigmentos...',
    date: '10 de Março, 2026',
    author: 'Dr. Valdecir Alves',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
    category: 'Estética'
  },
  {
    id: 'implantes-vida-nova',
    title: 'Implantes Dentais: Recupere sua confiança para sorrir e comer',
    excerpt: 'Saiba como a tecnologia de implantes evoluiu e por que eles são a melhor opção para repor dentes.',
    content: 'A perda de um dente vai além da estética; ela afeta a mastigação, a fala e até a estrutura óssea do rosto. Os implantes de titânio funcionam como raízes artificiais...',
    date: '05 de Março, 2026',
    author: 'Dr. Valdecir Alves',
    image: 'https://images.unsplash.com/photo-1516062423079-7ca13cdc7f5a?w=800&q=80',
    category: 'Implantodontia'
  }
];
