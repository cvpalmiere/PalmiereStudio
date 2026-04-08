// ============================================================
// PALMIERE STUDIO – DADOS PRÉ-CARREGADOS
// ============================================================

export const DISCIPLINAS = [
  {
    id: 'es',
    nome: 'Engenharia de Software',
    professor: 'Eduardo Castro',
    diaSemana: 2, // 0=Dom, 1=Seg, 2=Ter, 3=Qua, 4=Qui, 5=Sex, 6=Sáb
    horario: '14h',
    cor: '#6FCF97',
    ead: false,
  },
  {
    id: 'ic',
    nome: 'Introdução à Computação',
    professor: 'Roberto Paldes',
    diaSemana: 3,
    horario: '14h',
    cor: '#BB6BD9',
    ead: false,
  },
  {
    id: 'lp',
    nome: 'Lógica de Programação',
    professor: 'Cleber Pinheiro',
    diaSemana: 4,
    horario: '14h',
    cor: '#F2994A',
    ead: false,
  },
  {
    id: 'bd',
    nome: 'Banco de Dados I',
    professor: 'Deusdeth Mariano',
    diaSemana: 5,
    horario: '14h',
    cor: '#4A9EFF',
    ead: false,
  },
  {
    id: 'boot',
    nome: 'Bootcamp I',
    professor: '—',
    diaSemana: 1,
    horario: 'livre',
    cor: '#56CCF2',
    ead: true,
  },
  {
    id: 'fund',
    nome: 'Fundamentos de Engenharia',
    professor: '—',
    diaSemana: 1,
    horario: 'livre',
    cor: '#EB5757',
    ead: true,
  },
];

// ============================================================
// AULAS (plano de aula de cada disciplina)
// ============================================================

export const AULAS = [
  // --- Engenharia de Software (terças) ---
  { id: 'es_1',  disciplinaId: 'es', data: '2026-02-10', tema: 'Visão geral', conteudo: 'Histórico, definição, qualidade de software', estrategia: 'Aula expositiva', preparacao: 'Leia sobre definições de software', avaliacao: '' },
  { id: 'es_2',  disciplinaId: 'es', data: '2026-02-24', tema: 'Visão geral (cont.)', conteudo: 'Sistemas e seus elementos', estrategia: 'Aula expositiva', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'es_3',  disciplinaId: 'es', data: '2026-03-03', tema: 'Modelos de processos', conteudo: 'Processos, ciclo de vida, métodos tradicionais vs ágeis', estrategia: 'Discussão em grupo', preparacao: 'Pesquisar metodologias ágeis', avaliacao: '' },
  { id: 'es_4',  disciplinaId: 'es', data: '2026-03-10', tema: 'Modelos de processos (cont.)', conteudo: 'Aprofundamento em modelos de processo', estrategia: 'Exercícios práticos', preparacao: 'Revisar Scrum e Kanban', avaliacao: '' },
  { id: 'es_5',  disciplinaId: 'es', data: '2026-03-17', tema: 'Identificação de requisitos', conteudo: 'Definição, documentos, engenharia de requisitos', estrategia: 'Aula expositiva', preparacao: 'Ler sobre casos de uso', avaliacao: '' },
  { id: 'es_6',  disciplinaId: 'es', data: '2026-03-24', tema: 'Identificação de requisitos (exercícios)', conteudo: 'Exercícios práticos de levantamento de requisitos', estrategia: 'Exercícios', preparacao: 'Revisar documentação de requisitos', avaliacao: '' },
  { id: 'es_7',  disciplinaId: 'es', data: '2026-03-31', tema: 'Projeto do sistema', conteudo: 'Abstração, refinamento, modularização, acoplamento, coesão', estrategia: 'Aula expositiva', preparacao: 'Estudar princípios SOLID', avaliacao: '' },
  { id: 'es_8',  disciplinaId: 'es', data: '2026-04-07', tema: 'Projeto do sistema (cont.)', conteudo: 'Continuação de abstração e modularização', estrategia: 'Aula expositiva', preparacao: 'Revisar UML', avaliacao: '' },
  { id: 'es_9',  disciplinaId: 'es', data: '2026-04-14', tema: 'Seminário 01', conteudo: 'Apresentação do trabalho sobre Métodos Ágeis', estrategia: 'Seminário', preparacao: 'Preparar apresentação do grupo', avaliacao: 'Seminário 01' },
  { id: 'es_10', disciplinaId: 'es', data: '2026-04-21', tema: 'Prova 1', conteudo: '1º bimestre – conteúdo integral', estrategia: 'Avaliação', preparacao: 'Revisar todo o conteúdo do bimestre', avaliacao: 'Prova 1' },
  { id: 'es_11', disciplinaId: 'es', data: '2026-04-28', tema: 'Gerenciamento de projetos', conteudo: 'Escopo, cronograma, riscos', estrategia: 'Aula expositiva', preparacao: 'Pesquisar PMBOK', avaliacao: '' },
  { id: 'es_12', disciplinaId: 'es', data: '2026-05-05', tema: 'Implementação', conteudo: 'Padrões de programação, diretrizes', estrategia: 'Aula prática', preparacao: 'Ler sobre clean code', avaliacao: '' },
  { id: 'es_13', disciplinaId: 'es', data: '2026-05-12', tema: 'Teste do sistema', conteudo: 'Erro, falha, depuração, fases de teste', estrategia: 'Aula expositiva', preparacao: 'Pesquisar tipos de teste', avaliacao: '' },
  { id: 'es_14', disciplinaId: 'es', data: '2026-05-19', tema: 'Teste (continuação)', conteudo: 'Técnicas e critérios de teste', estrategia: 'Exercícios', preparacao: 'Revisar TDD', avaliacao: '' },
  { id: 'es_15', disciplinaId: 'es', data: '2026-05-26', tema: 'Implantação e manutenção', conteudo: 'Ambientes de desenvolvimento e produção', estrategia: 'Aula expositiva', preparacao: 'Pesquisar DevOps', avaliacao: '' },
  { id: 'es_16', disciplinaId: 'es', data: '2026-06-02', tema: 'Implantação (cont.)', conteudo: 'Evolução e declínio de sistemas', estrategia: 'Discussão', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'es_17', disciplinaId: 'es', data: '2026-06-09', tema: 'Seminário 02', conteudo: 'Apresentação do Plano de Projeto de Software (PPS)', estrategia: 'Seminário', preparacao: 'Preparar PPS', avaliacao: 'Seminário 02' },
  { id: 'es_18', disciplinaId: 'es', data: '2026-06-16', tema: 'Prova 2', conteudo: '2º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'es_19', disciplinaId: 'es', data: '2026-06-23', tema: 'Estudos de caso', conteudo: 'Feedback e refinamento', estrategia: 'Discussão', preparacao: '', avaliacao: '' },
  { id: 'es_20', disciplinaId: 'es', data: '2026-06-30', tema: 'Encerramento', conteudo: 'Coleta de críticas e sugestões', estrategia: 'Discussão', preparacao: '', avaliacao: '' },

  // --- Introdução à Computação (quartas) ---
  { id: 'ic_1',  disciplinaId: 'ic', data: '2026-02-11', tema: 'Apresentação', conteudo: 'Plano de ensino, metodologia PBL/ACES', estrategia: 'Expositiva', preparacao: '', avaliacao: '' },
  { id: 'ic_2',  disciplinaId: 'ic', data: '2026-02-25', tema: 'Apresentação (cont.)', conteudo: 'Continuação da apresentação do curso', estrategia: 'Expositiva', preparacao: '', avaliacao: '' },
  { id: 'ic_3',  disciplinaId: 'ic', data: '2026-03-04', tema: 'História da computação', conteudo: 'Evolução dos computadores, máquina de Turing', estrategia: 'Expositiva', preparacao: 'Pesquisar sobre Alan Turing', avaliacao: '' },
  { id: 'ic_4',  disciplinaId: 'ic', data: '2026-03-11', tema: 'História (cont.)', conteudo: 'Pesquisa sobre precursores da computação', estrategia: 'Pesquisa', preparacao: 'Ler sobre Von Neumann e Ada Lovelace', avaliacao: '' },
  { id: 'ic_5',  disciplinaId: 'ic', data: '2026-03-18', tema: 'Arquitetura de hardware/software', conteudo: 'Von Neumann, CPU, memória RAM/ROM', estrategia: 'Expositiva', preparacao: 'Pesquisar arquitetura Von Neumann', avaliacao: '' },
  { id: 'ic_6',  disciplinaId: 'ic', data: '2026-03-25', tema: 'Arquitetura (cont.)', conteudo: 'Periféricos, sistemas operacionais', estrategia: 'Expositiva', preparacao: 'Revisar conceitos de SO', avaliacao: '' },
  { id: 'ic_7',  disciplinaId: 'ic', data: '2026-04-01', tema: 'Informação e sistemas', conteudo: 'Dado, informação, conhecimento – diferenças e aplicações', estrategia: 'Discussão', preparacao: 'Pensar em exemplos do cotidiano', avaliacao: '' },
  { id: 'ic_8',  disciplinaId: 'ic', data: '2026-04-08', tema: 'Informação (cont.)', conteudo: 'Sistemas de informação – tipos e funções', estrategia: 'Expositiva', preparacao: 'Pesquisar ERP e CRM', avaliacao: '' },
  { id: 'ic_9',  disciplinaId: 'ic', data: '2026-04-15', tema: 'Prova 1', conteudo: 'Conteúdo integral do 1º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar todo o conteúdo', avaliacao: 'Prova 1' },
  { id: 'ic_10', disciplinaId: 'ic', data: '2026-04-22', tema: 'Redes de computadores', conteudo: 'Histórico, classificação, topologia de redes', estrategia: 'Expositiva', preparacao: 'Pesquisar redes LAN, WAN, MAN', avaliacao: '' },
  { id: 'ic_11', disciplinaId: 'ic', data: '2026-04-29', tema: 'Redes (cont.)', conteudo: 'Internet, protocolos TCP/IP, HTTP', estrategia: 'Expositiva', preparacao: 'Pesquisar modelo OSI', avaliacao: '' },
  { id: 'ic_12', disciplinaId: 'ic', data: '2026-05-06', tema: 'Segurança da informação', conteudo: 'Atributos CIA, ameaças, tipos de ataques', estrategia: 'Expositiva', preparacao: 'Pesquisar sobre phishing e malware', avaliacao: '' },
  { id: 'ic_13', disciplinaId: 'ic', data: '2026-05-13', tema: 'Segurança (cont.)', conteudo: 'Mecanismos de segurança – criptografia, firewall', estrategia: 'Exercícios', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'ic_14', disciplinaId: 'ic', data: '2026-05-20', tema: 'Governança e gestão de TI', conteudo: 'COBIT, ITIL, PMBOK – frameworks de governança', estrategia: 'Expositiva', preparacao: 'Pesquisar ITIL', avaliacao: '' },
  { id: 'ic_15', disciplinaId: 'ic', data: '2026-05-27', tema: 'Governança (cont.)', conteudo: 'Planejamento estratégico de TI', estrategia: 'Discussão', preparacao: 'Revisar frameworks', avaliacao: '' },
  { id: 'ic_16', disciplinaId: 'ic', data: '2026-06-03', tema: 'Tendências e novas tecnologias', conteudo: 'Transformação digital, IA, cloud, mercado de trabalho', estrategia: 'Expositiva', preparacao: 'Pesquisar tendências de TI', avaliacao: '' },
  { id: 'ic_17', disciplinaId: 'ic', data: '2026-06-10', tema: 'Prova 2', conteudo: 'Conteúdo do 2º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'ic_18', disciplinaId: 'ic', data: '2026-06-17', tema: 'ACE – entrega', conteudo: 'Finalização e entrega do projeto de extensão ACE', estrategia: 'Apresentação', preparacao: 'Finalizar projeto ACE', avaliacao: 'ACE – Projeto de Extensão' },
  { id: 'ic_19', disciplinaId: 'ic', data: '2026-06-24', tema: 'Apresentação de resultados', conteudo: 'Feedback das avaliações', estrategia: 'Discussão', preparacao: '', avaliacao: '' },
  { id: 'ic_20', disciplinaId: 'ic', data: '2026-07-01', tema: 'Encerramento', conteudo: 'Resultados finais e encerramento', estrategia: 'Expositiva', preparacao: '', avaliacao: '' },

  // --- Lógica de Programação (quintas) ---
  { id: 'lp_1',  disciplinaId: 'lp', data: '2026-03-05', tema: 'Elementos básicos', conteudo: 'Algoritmos, pseudocódigo, fluxogramas', estrategia: 'Expositiva + prática', preparacao: 'Pesquisar o que são algoritmos', avaliacao: '' },
  { id: 'lp_2',  disciplinaId: 'lp', data: '2026-03-12', tema: 'Elementos básicos (cont.)', conteudo: 'Tipos de dados, variáveis, expressões aritméticas', estrategia: 'Prática', preparacao: 'Revisar tipos primitivos', avaliacao: '' },
  { id: 'lp_3',  disciplinaId: 'lp', data: '2026-03-19', tema: 'Elementos básicos (cont.)', conteudo: 'Comandos de atribuição, entrada e saída', estrategia: 'Exercícios', preparacao: 'Praticar pseudocódigo', avaliacao: '' },
  { id: 'lp_4',  disciplinaId: 'lp', data: '2026-03-26', tema: 'Estruturas condicionais', conteudo: 'If/else, estruturas aninhadas, switch/case', estrategia: 'Exercícios', preparacao: 'Revisar operadores lógicos', avaliacao: '' },
  { id: 'lp_5',  disciplinaId: 'lp', data: '2026-04-09', tema: 'Prova 1', conteudo: 'Verificação de aprendizagem – 1º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar todo o conteúdo', avaliacao: 'Prova 1' },
  { id: 'lp_6',  disciplinaId: 'lp', data: '2026-04-16', tema: 'Estruturas de repetição', conteudo: 'Laços for e while', estrategia: 'Prática', preparacao: 'Pensar em problemas de repetição', avaliacao: '' },
  { id: 'lp_7',  disciplinaId: 'lp', data: '2026-04-23', tema: 'Estruturas de repetição (cont.)', conteudo: 'Laço do...while, diferenças entre laços', estrategia: 'Exercícios', preparacao: 'Praticar for e while', avaliacao: '' },
  { id: 'lp_8',  disciplinaId: 'lp', data: '2026-04-30', tema: 'Estruturas de repetição (exercícios)', conteudo: 'Exercícios de fixação com laços', estrategia: 'Exercícios', preparacao: 'Revisar laços', avaliacao: '' },
  { id: 'lp_9',  disciplinaId: 'lp', data: '2026-05-07', tema: 'Vetores e matrizes', conteudo: 'Representação, operações, acesso por índice', estrategia: 'Prática', preparacao: 'Pesquisar arrays', avaliacao: '' },
  { id: 'lp_10', disciplinaId: 'lp', data: '2026-05-14', tema: 'Vetores e matrizes (exercícios)', conteudo: 'Exercícios com vetores e matrizes', estrategia: 'Exercícios', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'lp_11', disciplinaId: 'lp', data: '2026-05-21', tema: 'Prova 2', conteudo: 'Verificação de aprendizagem – 2º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar laços e vetores', avaliacao: 'Prova 2' },
  { id: 'lp_12', disciplinaId: 'lp', data: '2026-05-28', tema: 'Modularização', conteudo: 'Funções, variáveis globais e locais, escopo', estrategia: 'Expositiva', preparacao: 'Pesquisar funções em programação', avaliacao: '' },
  { id: 'lp_13', disciplinaId: 'lp', data: '2026-06-11', tema: 'Modularização (exercícios)', conteudo: 'Exercícios com funções', estrategia: 'Exercícios', preparacao: 'Revisar funções', avaliacao: '' },
  { id: 'lp_14', disciplinaId: 'lp', data: '2026-06-18', tema: 'Modularização (cont.)', conteudo: 'Passagem de parâmetros por valor e referência', estrategia: 'Prática', preparacao: 'Revisar diferenças de passagem', avaliacao: '' },
  { id: 'lp_15', disciplinaId: 'lp', data: '2026-06-25', tema: 'Prova 3', conteudo: 'Verificação de aprendizagem – 3º bimestre', estrategia: 'Avaliação', preparacao: 'Revisar modularização', avaliacao: 'Prova 3' },
  { id: 'lp_16', disciplinaId: 'lp', data: '2026-07-02', tema: 'Revisão geral', conteudo: 'Revisão de todos os conteúdos do semestre', estrategia: 'Revisão', preparacao: '', avaliacao: '' },

  // --- Banco de Dados I (sextas) ---
  { id: 'bd_1',  disciplinaId: 'bd', data: '2026-02-13', tema: 'Apresentação', conteudo: 'Conceitos de banco de dados, modelo ER introdução', estrategia: 'Expositiva', preparacao: '', avaliacao: '' },
  { id: 'bd_2',  disciplinaId: 'bd', data: '2026-02-20', tema: 'Abordagem ER', conteudo: 'Entidades, atributos, tipos de atributos', estrategia: 'Expositiva', preparacao: 'Pesquisar modelo entidade-relacionamento', avaliacao: '' },
  { id: 'bd_3',  disciplinaId: 'bd', data: '2026-02-27', tema: 'Abordagem ER (cont.)', conteudo: 'Relacionamentos entre entidades', estrategia: 'Exercícios', preparacao: 'Revisar entidades', avaliacao: '' },
  { id: 'bd_4',  disciplinaId: 'bd', data: '2026-03-06', tema: 'Conceitos e ER', conteudo: 'Cardinalidades: 1:1, 1:N, N:M', estrategia: 'Exercícios', preparacao: 'Praticar modelagem', avaliacao: '' },
  { id: 'bd_5',  disciplinaId: 'bd', data: '2026-03-13', tema: 'Abordagem ER (cont.)', conteudo: 'Entidades associativas e especialização', estrategia: 'Expositiva', preparacao: 'Revisar cardinalidades', avaliacao: '' },
  { id: 'bd_6',  disciplinaId: 'bd', data: '2026-03-20', tema: 'Exercícios de modelagem', conteudo: 'Modelagem conceitual completa', estrategia: 'Exercícios práticos', preparacao: 'Trazer exemplos de sistemas reais', avaliacao: '' },
  { id: 'bd_7',  disciplinaId: 'bd', data: '2026-03-27', tema: 'Revisão', conteudo: 'Preparação para prova – revisão do 1º bimestre', estrategia: 'Revisão', preparacao: 'Rever todos os diagramas', avaliacao: '' },
  { id: 'bd_8',  disciplinaId: 'bd', data: '2026-04-03', tema: 'Exercícios de modelagem', conteudo: 'Modelagem conceitual – exercícios avançados', estrategia: 'Exercícios', preparacao: 'Revisar modelagem', avaliacao: '' },
  { id: 'bd_9',  disciplinaId: 'bd', data: '2026-04-10', tema: 'Revisão', conteudo: 'Últimos ajustes antes da prova', estrategia: 'Revisão', preparacao: 'Tirar dúvidas', avaliacao: '' },
  { id: 'bd_10', disciplinaId: 'bd', data: '2026-04-24', tema: 'Prova 1', conteudo: '1º bimestre – modelagem ER', estrategia: 'Avaliação', preparacao: 'Revisão completa do 1º bimestre', avaliacao: 'Prova 1' },
  { id: 'bd_11', disciplinaId: 'bd', data: '2026-05-08', tema: 'SQL DDL', conteudo: 'CREATE TABLE, ALTER TABLE, DROP – DDL no SGBD', estrategia: 'Prática', preparacao: 'Instalar MySQL ou PostgreSQL', avaliacao: '' },
  { id: 'bd_12', disciplinaId: 'bd', data: '2026-05-15', tema: 'SQL DML', conteudo: 'SELECT, INSERT, UPDATE, DELETE – manipulação de dados', estrategia: 'Prática', preparacao: 'Revisar DDL', avaliacao: '' },
  { id: 'bd_13', disciplinaId: 'bd', data: '2026-05-22', tema: 'Normalização', conteudo: '1FN, 2FN, 3FN – normalização de banco de dados', estrategia: 'Expositiva + exercícios', preparacao: 'Pesquisar formas normais', avaliacao: '' },
  { id: 'bd_14', disciplinaId: 'bd', data: '2026-05-29', tema: 'Modelagem lógica', conteudo: 'Star Schema – modelo dimensional', estrategia: 'Expositiva', preparacao: 'Revisar normalização', avaliacao: '' },
  { id: 'bd_15', disciplinaId: 'bd', data: '2026-06-05', tema: 'Projeto BD', conteudo: 'Modelagem completa de um BD real', estrategia: 'Projeto prático', preparacao: 'Definir sistema a modelar', avaliacao: '' },
  { id: 'bd_16', disciplinaId: 'bd', data: '2026-06-12', tema: 'SQL avançado', conteudo: 'JOINs, subconsultas, funções agregadas', estrategia: 'Prática', preparacao: 'Revisar SELECT básico', avaliacao: '' },
  { id: 'bd_17', disciplinaId: 'bd', data: '2026-06-19', tema: 'SQL prático', conteudo: 'Exercícios de DQL – consultas complexas', estrategia: 'Exercícios', preparacao: 'Praticar JOINs', avaliacao: '' },
  { id: 'bd_18', disciplinaId: 'bd', data: '2026-06-26', tema: 'Prova 2', conteudo: '2º bimestre – SQL e normalização', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'bd_19', disciplinaId: 'bd', data: '2026-07-03', tema: 'Encerramento', conteudo: 'Resultados finais e encerramento', estrategia: 'Discussão', preparacao: '', avaliacao: '' },
];

// ============================================================
// EVENTOS (provas, trabalhos, seminários, etc.)
// ============================================================

export const EVENTOS_INICIAIS = [
  // Engenharia de Software
  { id: 'ev_es_sem1', disciplinaId: 'es', tipo: 'seminario', titulo: 'Seminário 01 – Métodos Ágeis', data: '2026-04-14', prioridadeEstudo: '2026-04-07', concluido: false },
  { id: 'ev_es_p1',   disciplinaId: 'es', tipo: 'prova',     titulo: 'Prova 1 – 1º Bimestre',        data: '2026-04-21', prioridadeEstudo: null, concluido: false },
  { id: 'ev_es_sem2', disciplinaId: 'es', tipo: 'seminario', titulo: 'Seminário 02 – PPS',            data: '2026-06-09', prioridadeEstudo: '2026-06-02', concluido: false },
  { id: 'ev_es_p2',   disciplinaId: 'es', tipo: 'prova',     titulo: 'Prova 2 – 2º Bimestre',        data: '2026-06-16', prioridadeEstudo: null, concluido: false },

  // Introdução à Computação
  { id: 'ev_ic_p1',   disciplinaId: 'ic', tipo: 'prova',    titulo: 'Prova 1 – 1º Bimestre',         data: '2026-04-15', prioridadeEstudo: null, concluido: false },
  { id: 'ev_ic_p2',   disciplinaId: 'ic', tipo: 'prova',    titulo: 'Prova 2 – 2º Bimestre',         data: '2026-06-10', prioridadeEstudo: null, concluido: false },
  { id: 'ev_ic_ace',  disciplinaId: 'ic', tipo: 'trabalho', titulo: 'ACE – Projeto de Extensão',     data: '2026-06-17', prioridadeEstudo: '2026-06-10', concluido: false },

  // Lógica de Programação
  { id: 'ev_lp_p1', disciplinaId: 'lp', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-04-09', prioridadeEstudo: null, concluido: false },
  { id: 'ev_lp_p2', disciplinaId: 'lp', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-05-21', prioridadeEstudo: null, concluido: false },
  { id: 'ev_lp_p3', disciplinaId: 'lp', tipo: 'prova', titulo: 'Prova 3 – 3º Bimestre', data: '2026-06-25', prioridadeEstudo: null, concluido: false },

  // Banco de Dados I
  { id: 'ev_bd_p1', disciplinaId: 'bd', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-04-24', prioridadeEstudo: null, concluido: false },
  { id: 'ev_bd_p2', disciplinaId: 'bd', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-06-26', prioridadeEstudo: null, concluido: false },

  // Bootcamp I
  { id: 'ev_boot_ei',  disciplinaId: 'boot', tipo: 'trabalho', titulo: 'Desafio – Entrega Inicial',       data: '2026-04-12', prioridadeEstudo: '2026-04-05', concluido: false },
  { id: 'ev_boot_em',  disciplinaId: 'boot', tipo: 'trabalho', titulo: 'Desafio – Entrega Intermediária', data: '2026-05-17', prioridadeEstudo: '2026-05-10', concluido: false },
  { id: 'ev_boot_ef',  disciplinaId: 'boot', tipo: 'trabalho', titulo: 'Desafio – Entrega Final',         data: '2026-06-14', prioridadeEstudo: '2026-06-07', concluido: false },

  // Fundamentos de Engenharia
  { id: 'ev_fund_e12', disciplinaId: 'fund', tipo: 'trabalho', titulo: 'Exercícios Avaliativos (Un. 1 e 2)', data: '2026-03-29', prioridadeEstudo: '2026-03-22', concluido: false },
  { id: 'ev_fund_s1',  disciplinaId: 'fund', tipo: 'trabalho', titulo: 'Sistematização 01',                  data: '2026-04-12', prioridadeEstudo: '2026-04-05', concluido: false },
  { id: 'ev_fund_p1',  disciplinaId: 'fund', tipo: 'prova',    titulo: 'Prova Presencial 01',                data: '2026-04-17', prioridadeEstudo: null, concluido: false },
  { id: 'ev_fund_e34', disciplinaId: 'fund', tipo: 'trabalho', titulo: 'Exercícios Avaliativos (Un. 3 e 4)', data: '2026-05-03', prioridadeEstudo: '2026-04-26', concluido: false },
  { id: 'ev_fund_s2',  disciplinaId: 'fund', tipo: 'trabalho', titulo: 'Sistematização 02',                  data: '2026-05-31', prioridadeEstudo: '2026-05-24', concluido: false },
  { id: 'ev_fund_ao',  disciplinaId: 'fund', tipo: 'prova',    titulo: 'Avaliação Online',                   data: '2026-06-05', prioridadeEstudo: null, concluido: false },
];

// ============================================================
// MÓDULOS CC50 (estudo livre)
// ============================================================
export const MODULOS_CC50 = [
  'Módulo 0 – Scratch',
  'Módulo 1 – C',
  'Módulo 2 – Arrays',
  'Módulo 3 – Algoritmos',
  'Módulo 4 – Memória',
  'Módulo 5 – Estruturas de dados',
  'Módulo 6 – Python',
  'Módulo 7 – SQL',
  'Módulo 8 – HTML, CSS, JavaScript',
  'Módulo 9 – Flask',
  'Módulo 10 – Projeto final',
];