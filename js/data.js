/**
 * Academic Schedule Data 2026/02
 * Licenciatura em Educação Especial
 */

export const COURSE_METADATA = {
  institution: "Universidade Federal de São Carlos - UFSCar",
  department: "Departamento de Psicologia / Educação Especial",
  course: "Licenciatura em Educação Especial",
  semester: "2026/02",
  author: "Gabriel Klaus Aguiar",
  brandName: "PHRONESIS • Φρόνησις",
  lastUpdated: "2026-08-17",
  perfis: [
    {
      id: 2,
      name: "Perfil 2",
      badge: "2º Ano • 4º Semestre",
      description: "Fundamentos dos Processos Investigativos, Desenvolvimento Atípico e Acessibilidade no Ensino Superior.",
      color: "perfil-2",
      themeColor: "#2563eb",
      accentBg: "rgba(37, 99, 235, 0.08)",
      accentBorder: "rgba(37, 99, 235, 0.3)"
    },
    {
      id: 4,
      name: "Perfil 4",
      badge: "3º Ano • 6º Semestre",
      description: "Didática, Tecnologias Instrucionais, Família & Inclusão, Deficiência Auditiva e Ensino Colaborativo.",
      color: "perfil-4",
      themeColor: "#059669",
      accentBg: "rgba(5, 150, 105, 0.08)",
      accentBorder: "rgba(5, 150, 105, 0.3)"
    },
    {
      id: 6,
      name: "Perfil 6",
      badge: "4º Ano • 7º Semestre",
      description: "Planejamento Educacional Individualizado (PEI), Deficiência Física e Letramento para Pessoas com Deficiência.",
      color: "perfil-6",
      themeColor: "#d97706",
      accentBg: "rgba(217, 119, 6, 0.08)",
      accentBorder: "rgba(217, 119, 6, 0.3)"
    },
    {
      id: 8,
      name: "Perfil 8",
      badge: "Final • 8º Semestre",
      description: "Gestão do Trabalho Pedagógico Especializado, CAA, Tecnologias Assistivas, Sistema Braille e Surdocegueira.",
      color: "perfil-8",
      themeColor: "#e11d48",
      accentBg: "rgba(225, 29, 72, 0.08)",
      accentBorder: "rgba(225, 29, 72, 0.3)"
    }
  ]
};

export const COURSES = [
  // --- PERFIL 2 ---
  {
    id: "202754",
    code: "202754",
    name: "PROCESSOS INVESTIG.EM EDU ESPEC II: OBS DE SITUAÇÕES PLANEJADAS",
    shortName: "Processos Investigativos II: Observação de Situações Planejadas",
    perfil: 2,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Lara Ferreira dos Santos",
      "Profa. Me. Amanda Maria dos Santos Silva"
    ],
    dia: "Segunda-feira",
    diaKey: "segunda",
    diaIndex: 1,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 8",
    sala: "Sala 188",
    localFull: "AT 8 • Sala 188",
    ementa: "Metodologia de observação sistemática do comportamento e intervenções pedagógicas em ambientes educacionais inclusivos. Registro de dados observacionais, protocolos estruturados e análise de situações planejadas.",
    area: "Metodologia & Pesquisa"
  },
  {
    id: "202746",
    code: "202746",
    name: "ESTUDO DO DESENVOLVIMENTO ATÍPICO",
    shortName: "Estudo do Desenvolvimento Atípico",
    perfil: 2,
    carater: "Obrigatória",
    professores: [
      "Profa. Me. Amanda Maria dos Santos Silva"
    ],
    dia: "Quarta-feira",
    diaKey: "quarta",
    diaIndex: 3,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 16",
    localFull: "AT 1 • Sala 16",
    ementa: "Trajetórias de desenvolvimento atípico humano, transtornos do neurodesenvolvimento (TEA, TDAH, DI), fatores biológicos e contextuais, e marcos do desenvolvimento cognitivo, socioemocional e psicomotor.",
    area: "Desenvolvimento Humano"
  },
  {
    id: "1002084",
    code: "1002084",
    name: "EDUCAÇÃO SUPERIOR E ACESSIBILIDADE DA PESSOA COM DEFICIÊNCIA",
    shortName: "Educação Superior e Acessibilidade da Pessoa com Deficiência",
    perfil: 2,
    carater: "Optativa",
    professores: [
      "Profa. Dra. Giulia Gomes da Silva"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 03",
    localFull: "AT 1 • Sala 03",
    ementa: "Políticas públicas e diretrizes de inclusão no ensino superior. Barreiras atitudinais, arquitetônicas, pedagógicas e comunicacionais; adaptações curriculares e núcleos de acessibilidade universitária.",
    area: "Políticas & Inclusão"
  },
  {
    id: "201723",
    code: "201723",
    name: "DESENVOLVIMENTO HUMANO E DA APRENDIZAGEM DE CRIANÇAS E JOVENS COM N.E.E.",
    shortName: "Desenvolvimento Humano e Aprendizagem com N.E.E.",
    perfil: 2,
    carater: "Obrigatória",
    professores: [
      "Profa. Me. Mariana Ferraz"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 2",
    sala: "Sala 37",
    localFull: "AT 2 • Sala 37",
    ementa: "Processos de aprendizagem e mediação pedagógica para crianças e jovens com necessidades educacionais especiais. Teorias da aprendizagem aplicadas, funções executivas e estratégias de suporte adaptado.",
    area: "Psicologia da Educação"
  },

  // --- PERFIL 4 ---
  {
    id: "202789",
    code: "202789",
    name: "DIDÁTICA PARA A EDUCAÇÃO ESPECIAL",
    shortName: "Didática para a Educação Especial",
    perfil: 4,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Juliane Ap. de Paula P. Campos"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 2",
    sala: "Sala 30",
    localFull: "AT 2 • Sala 30",
    ementa: "Fundamentos didático-pedagógicos para o atendimento educacional especializado. Planejamento de aulas inclusivas, Desenho Universal para a Aprendizagem (DUA) e diferenciação curricular na sala comum.",
    area: "Prática Pedagógica"
  },
  {
    id: "202010",
    code: "202010",
    name: "TEC. INST. APLICADAS À ED. ESPECIAL: MODELOS INSTRUCIONAIS",
    shortName: "Tecnologias Instrucionais e Modelos Instrucionais",
    perfil: 4,
    carater: "Obrigatória",
    professores: [
      "Prof. Dr. Leonardo Santos Amâncio Cabral"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "14:00 - 18:00",
    startHour: 14,
    endHour: 18,
    duracaoHoras: 4,
    turno: "Tarde",
    at: "AT 1",
    sala: "Sala 07",
    localFull: "AT 1 • Sala 07",
    ementa: "Design instrucional aplicado ao contexto da Educação Especial. Criação de sequências didáticas mediadas por ferramentas tecnológicas, recursos digitais acessíveis e metodologias ativas inclusivas.",
    area: "Tecnologia Educacional"
  },
  {
    id: "202240",
    code: "202240",
    name: "FAMÍLIA E INCLUSÃO",
    shortName: "Família e Inclusão",
    perfil: 4,
    carater: "Optativa",
    professores: [
      "Profa. Me. Mariana Ferraz"
    ],
    dia: "Segunda-feira",
    diaKey: "segunda",
    diaIndex: 1,
    horario: "14:00 - 18:00",
    startHour: 14,
    endHour: 18,
    duracaoHoras: 4,
    turno: "Tarde",
    at: "AT 1",
    sala: "Sala 02",
    localFull: "AT 1 • Sala 02",
    ementa: "Dinâmica familiar no contexto da deficiência e vulnerabilidade. Parceria família-escola, suporte parental, acolhimento psicossocial, redes de apoio e mediação nas fases de transição do estudante.",
    area: "Família & Sociedade"
  },
  {
    id: "202835",
    code: "202835",
    name: "PROCES. INVESTIGATIVOS EM ED.ESPEC. IV: ESCOLA, FAMÍLIA E TRAB.",
    shortName: "Processos Investigativos IV: Escola, Família e Trabalho",
    perfil: 4,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Lídia Maria Marson Postalli"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 2",
    sala: "Sala 28",
    localFull: "AT 2 • Sala 28",
    ementa: "Investigação científica e intervenção na transição escola-trabalho e convivência familiar. Instrumentos de coleta e análise de dados sobre empregabilidade e autonomia da pessoa com deficiência.",
    area: "Metodologia & Pesquisa"
  },
  {
    id: "202770",
    code: "202770",
    name: "ENSINO COLABORATIVO",
    shortName: "Ensino Colaborativo (Co-ensino)",
    perfil: 4,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Enicéia Gonçalves Mendes"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "14:00 - 18:00",
    startHour: 14,
    endHour: 18,
    duracaoHoras: 4,
    turno: "Tarde",
    at: "AT 1",
    sala: "Sala 07",
    localFull: "AT 1 • Sala 07",
    ementa: "Modelos e estratégias de Co-ensino (ensino colaborativo / bidocência) entre o professor de educação especial e o professor do ensino comum. Planejamento conjunto, avaliação compartilhada e gestão da sala de aula.",
    area: "Prática Pedagógica"
  },
  {
    id: "202070",
    code: "202070",
    name: "PROCEDIMENTOS DE ENS. EM ED.ESPECIAL: DEFICIÊNCIA AUDITIVA",
    shortName: "Procedimentos de Ensino: Deficiência Auditiva",
    perfil: 4,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Cristina Broglia Feitosa de Lacerda"
    ],
    dia: "Quarta-feira",
    diaKey: "quarta",
    diaIndex: 3,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 07",
    localFull: "AT 1 • Sala 07",
    ementa: "Práticas e procedimentos pedagógicos para o ensino de alunos surdos ou com deficiência auditiva. Educação bilíngue (Libras / Língua Portuguesa como L2), recursos visuais e tradução-interpretação educacional.",
    area: "Educação de Surdos & Libras"
  },

  // --- PERFIL 6 ---
  {
    id: "202819",
    code: "202819",
    name: "PLANEJAMENTO EDUC.INDIVIDUALIZADO II: INTERVENÇÕES",
    shortName: "Planejamento Educacional Individualizado II: Intervenções",
    perfil: 6,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Rosemeire de Araújo Rangni"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 02",
    localFull: "AT 1 • Sala 02",
    ementa: "Estruturação avançada do PEI (Plano de Ensino Individualizado). Definição de metas, adaptação de conteúdos, seleção de metodologias e instrumentos contínuos de avaliação do progresso escolar.",
    area: "Planejamento & Avaliação"
  },
  {
    id: "202479",
    code: "202479",
    name: "PROCEDIMENTOS DE ENSINO EM EDUC. ESPECIAL: DEFICIÊNCIA FÍSICA",
    shortName: "Procedimentos de Ensino: Deficiência Física",
    perfil: 6,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Adriana Garcia Gonçalves"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 05",
    localFull: "AT 1 • Sala 05",
    ementa: "Adaptações posturais, recursos de mobilidade, mobiliário escolar adaptado e estratégias pedagógicas específicas para alunos com deficiência física e motora (paralisia cerebral, distrofias, etc.).",
    area: "Deficiência Física & Acessibilidade"
  },
  {
    id: "202533",
    code: "202533",
    name: "ENSINO DA LEITURA E ESCRITA PARA PESSOAS COM DEFICIÊNCIAS",
    shortName: "Ensino de Leitura e Escrita para Pessoas com Deficiência",
    perfil: 6,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Cristina Broglia Feitosa de Lacerda"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "14:00 - 18:00",
    startHour: 14,
    endHour: 18,
    duracaoHoras: 4,
    turno: "Tarde",
    at: "AT 1",
    sala: "Sala 04",
    localFull: "AT 1 • Sala 04",
    ementa: "Fundamentos psicogenéticos e metodologias de alfabetização e letramento adaptadas a estudantes com deficiência intelectual, sensorial e transtornos de aprendizagem. Uso de materiais táteis e multissensoriais.",
    area: "Alfabetização & Letramento"
  },

  // --- PERFIL 8 ---
  {
    id: "202690",
    code: "202690",
    name: "GESTÃO E ORGANIZAÇÃO DO TRAB. PEDAGÓG. EM SERV. ESPECIALIZADOS",
    shortName: "Gestão do Trabalho Pedagógico em Serviços Especializados",
    perfil: 8,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Juliane Ap. de Paula P. Campos"
    ],
    dia: "Quinta-feira",
    diaKey: "quinta",
    diaIndex: 4,
    horario: "14:00 - 18:00",
    startHour: 14,
    endHour: 18,
    duracaoHoras: 4,
    turno: "Tarde",
    at: "AT 1",
    sala: "Sala 05",
    localFull: "AT 1 • Sala 05",
    ementa: "Administração e coordenação de Salas de Recursos Multifuncionais (SRM), Centros de Atendimento Especializado (CAE) e redes de apoio intersetoriais (saúde, assistência social e trabalho).",
    area: "Gestão & Políticas"
  },
  {
    id: "202681",
    code: "202681",
    name: "ENSINO DE HABILIDADES DE COMUNICAÇÃO ALTERNATIVA AUMENTATIVA",
    shortName: "Comunicação Alternativa e Aumentativa (CAA)",
    perfil: 8,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Ketilin Mayra Pedro"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "14:00 - 16:00",
    startHour: 14,
    endHour: 16,
    duracaoHoras: 2,
    turno: "Tarde",
    at: "AT 8",
    sala: "Sala 184",
    localFull: "AT 8 • Sala 184",
    ementa: "Sistemas de Comunicação Suplementar e Alternativa (PECS, pranchas de alta e baixa tecnologia, sintetizadores de voz). Avaliação das habilidades comunicativas e implementação no cotidiano escolar.",
    area: "Comunicação & Tecnologia"
  },
  {
    id: "202673",
    code: "202673",
    name: "TECNOLOGIAS APLIC. À EDUC. ESPECIAL II: TECNOLOGIAS ASSISTIVAS",
    shortName: "Tecnologias Assistivas na Educação Especial II",
    perfil: 8,
    carater: "Obrigatória",
    professores: [
      "Profa. Dra. Adriana Garcia Gonçalves"
    ],
    dia: "Terça-feira",
    diaKey: "terca",
    diaIndex: 2,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 2",
    sala: "Sala 42",
    localFull: "AT 2 • Sala 42",
    ementa: "Recursos de alta tecnologia assistiva, leitores de tela, acionadores, softwares educacionais acessíveis, impressão 3D para suportes táteis e prototipagem de soluções de acessibilidade.",
    area: "Tecnologia Assistiva"
  },
  {
    id: "202720",
    code: "202720",
    name: "SISTEMA BRAILLE",
    shortName: "Sistema Braille e Práticas de Escrita Tátil",
    perfil: 8,
    carater: "Optativa",
    professores: [
      "Profa. Dra. Carolina Severino Lopes da Costa",
      "Profa. Dra. Vanessa Cristina Paulino"
    ],
    dia: "Sexta-feira",
    diaKey: "sexta",
    diaIndex: 5,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 8",
    sala: "Sala 184",
    localFull: "AT 8 • Sala 184",
    ementa: "Histórico, código e simbologia do Sistema Braille (língua portuguesa, matemática e ciências). Uso de reglete, punção, máquina de escrever Braille e linhas Braille digitais.",
    area: "Deficiência Visual & Braille"
  },
  {
    id: "202703",
    code: "202703",
    name: "MÚLTIPLAS DEFICIÊNCIAS E SURDOCEGUEIRA",
    shortName: "Múltiplas Deficiências e Surdocegueira",
    perfil: 8,
    carater: "Optativa",
    professores: [
      "Profa. Dra. Lara Ferreira dos Santos"
    ],
    dia: "Segunda-feira",
    diaKey: "segunda",
    diaIndex: 1,
    horario: "08:00 - 12:00",
    startHour: 8,
    endHour: 12,
    duracaoHoras: 4,
    turno: "Manhã",
    at: "AT 1",
    sala: "Sala 16",
    localFull: "AT 1 • Sala 16",
    ementa: "Especificidades da surdocegueira e deficiência múltipla sensorial. Formas de comunicação (Libras tátil, tadoma, alfabeto datilológico na palma da mão, escrita na palma), guia-intérprete e rotinas de autonomia.",
    area: "Surdocegueira & Altas Necessidades"
  }
];

export const DAYS_OF_WEEK = [
  { key: "segunda", label: "Segunda-feira", short: "Seg", datePreview: "17/08" },
  { key: "terca", label: "Terça-feira", short: "Ter", datePreview: "18/08" },
  { key: "quarta", label: "Quarta-feira", short: "Qua", datePreview: "19/08" },
  { key: "quinta", label: "Quinta-feira", short: "Qui", datePreview: "20/08" },
  { key: "sexta", label: "Sexta-feira", short: "Sex", datePreview: "21/08" }
];

export const TIME_BLOCKS = [
  { label: "Manhã", range: "08:00 - 12:00", start: 8, end: 12 },
  { label: "Intervalo", range: "12:00 - 14:00", start: 12, end: 14, isBreak: true },
  { label: "Tarde", range: "14:00 - 18:00", start: 14, end: 18 }
];

export const LOCATIONS = [
  {
    at: "AT 1",
    name: "Anfiteatro 1 (Área Sul)",
    salas: ["Sala 02", "Sala 03", "Sala 04", "Sala 05", "Sala 07", "Sala 16"]
  },
  {
    at: "AT 2",
    name: "Anfiteatro 2 (Área Central)",
    salas: ["Sala 28", "Sala 30", "Sala 37", "Sala 42"]
  },
  {
    at: "AT 8",
    name: "Anfiteatro 8 (Complexo Pedagógico)",
    salas: ["Sala 184", "Sala 188"]
  }
];
