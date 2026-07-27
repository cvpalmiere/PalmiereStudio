// ============================================================
// DISCIPLINAS
// ============================================================

export const DISCIPLINAS = [
  {
    id: 'poo',
    nome: 'Programação Orientada a Objetos',
    professor: 'Antonio Barbosa Junior',
    diaSemana: 1, // Segunda
    horario: '14h',
    cor: '#FF6B6B',
    ead: false,
  },
  {
    id: 'req',
    nome: 'Engenharia de Requisitos',
    professor: 'Leonardo Pol Suarez',
    diaSemana: 2, // Terça
    horario: '14h',
    cor: '#4ECDC4',
    ead: false,
  },
  {
    id: 'bd2',
    nome: 'Banco de Dados II',
    professor: 'Deusdeth Pereira Mariano',
    diaSemana: 3, // Quarta
    horario: '14h',
    cor: '#FFE66D',
    ead: false,
  },
  {
    id: 'alga',
    nome: 'Álgebra Linear e Geometria Analítica',
    professor: 'João Marcos Souza Costa',
    diaSemana: 4, // Quinta
    horario: '14h',
    cor: '#A8E6CF',
    ead: false,
  },
  {
    id: 'di',
    nome: 'Desenvolvimento de Interfaces',
    professor: 'Felipe Batista da Silva',
    diaSemana: 5, // Sexta
    horario: '14h',
    cor: '#FF8A5C',
    ead: false,
  },
];

// ============================================================
// AULAS
// ============================================================

export const AULAS = [
  // =========================================================
  // PROGRAMAÇÃO ORIENTADA A OBJETOS (segundas)
  // =========================================================
  { id: 'poo_1', disciplinaId: 'poo', data: '2026-07-27', tema: 'Apresentação da Disciplina', conteudo: 'Plano de ensino, metodologia, avaliação', estrategia: 'Expositiva', preparacao: 'Ler plano de ensino', avaliacao: '' },
  { id: 'poo_2', disciplinaId: 'poo', data: '2026-08-03', tema: 'Linguagem de Programação', conteudo: 'Características, tipos, classificações, critérios de avaliação e principais paradigmas', estrategia: 'Expositiva', preparacao: 'Pesquisar paradigmas de programação', avaliacao: '' },
  { id: 'poo_3', disciplinaId: 'poo', data: '2026-08-10', tema: 'Programação de Computadores', conteudo: 'Ambiente de execução, entrada/saída, variáveis, constantes, tipos de dados, operadores', estrategia: 'Prática', preparacao: 'Instalar IDE', avaliacao: '' },
  { id: 'poo_4', disciplinaId: 'poo', data: '2026-08-17', tema: 'Programação de Computadores', conteudo: 'Estruturas de controle, fluxo, laços, métodos (passagem por valor/referência), vetores', estrategia: 'Prática', preparacao: 'Revisar estruturas de controle', avaliacao: '' },
  { id: 'poo_5', disciplinaId: 'poo', data: '2026-08-24', tema: 'Orientação a Objetos - Abstração e Encapsulamento', conteudo: 'Motivações, classes, objetos, atributos, métodos, abstração, encapsulamento, ocultação', estrategia: 'Expositiva + prática', preparacao: 'Pesquisar POO', avaliacao: '' },
  { id: 'poo_6', disciplinaId: 'poo', data: '2026-08-31', tema: 'Orientação a Objetos - Abstração e Encapsulamento', conteudo: 'Controle de visibilidade, práticas de encapsulamento', estrategia: 'Prática', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'poo_7', disciplinaId: 'poo', data: '2026-09-14', tema: 'Avaliação 1', conteudo: '1ª Verificação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 1º bimestre', avaliacao: 'Prova 1' },
  { id: 'poo_8', disciplinaId: 'poo', data: '2026-09-21', tema: 'Orientação a Objetos - Herança e Polimorfismo', conteudo: 'Herança, reutilização, especialização, hierarquia de classes', estrategia: 'Expositiva', preparacao: 'Pesquisar herança em POO', avaliacao: '' },
  { id: 'poo_9', disciplinaId: 'poo', data: '2026-09-28', tema: 'Orientação a Objetos - Herança e Polimorfismo', conteudo: 'Polimorfismo, sobrecarga, sobrescrita, utilização polimórfica', estrategia: 'Prática', preparacao: 'Revisar herança', avaliacao: '' },
  { id: 'poo_10', disciplinaId: 'poo', data: '2026-10-05', tema: 'Orientação a Objetos - Herança e Polimorfismo', conteudo: 'Exercícios de fixação - herança e polimorfismo', estrategia: 'Exercícios', preparacao: 'Praticar exercícios', avaliacao: '' },
  { id: 'poo_11', disciplinaId: 'poo', data: '2026-10-19', tema: 'Orientação a Objetos - Classes Abstratas e Interfaces', conteudo: 'Classes abstratas, métodos abstratos, interfaces, implementação', estrategia: 'Expositiva', preparacao: 'Pesquisar classes abstratas', avaliacao: '' },
  { id: 'poo_12', disciplinaId: 'poo', data: '2026-10-26', tema: 'Interface Gráfica (front-end)', conteudo: 'Conceitos fundamentais, componentes visuais, modelo de eventos', estrategia: 'Prática', preparacao: 'Pesquisar GUI', avaliacao: '' },
  { id: 'poo_13', disciplinaId: 'poo', data: '2026-11-09', tema: 'Persistência de Dados (back-end)', conteudo: 'CRUD, armazenamento em arquivos vs bancos, conexão, consultas', estrategia: 'Prática', preparacao: 'Revisar SQL básico', avaliacao: '' },
  { id: 'poo_14', disciplinaId: 'poo', data: '2026-11-16', tema: 'Avaliação 2', conteudo: '2ª Verificação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'poo_15', disciplinaId: 'poo', data: '2026-11-23', tema: 'Inteligência Artificial e Engenharia de Prompt em POO', conteudo: 'Uso de ferramentas de IA no desenvolvimento', estrategia: 'Expositiva + prática', preparacao: 'Pesquisar engenharia de prompt', avaliacao: '' },
  { id: 'poo_16', disciplinaId: 'poo', data: '2026-12-07', tema: 'Avaliação 3', conteudo: '3ª Verificação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar todo o conteúdo', avaliacao: 'Prova 3' },
  { id: 'poo_17', disciplinaId: 'poo', data: '2026-12-14', tema: 'Encerramento', conteudo: 'Resultados finais e encerramento', estrategia: 'Discussão', preparacao: '', avaliacao: '' },

  // =========================================================
  // ENGENHARIA DE REQUISITOS (terças)
  // =========================================================
  { id: 'req_1', disciplinaId: 'req', data: '2026-07-28', tema: 'Apresentação da Disciplina', conteudo: 'Plano de ensino e comentários da disciplina', estrategia: 'Expositiva', preparacao: 'Ler plano de ensino', avaliacao: '' },
  { id: 'req_2', disciplinaId: 'req', data: '2026-08-04', tema: 'Visão Geral da Engenharia de Requisitos', conteudo: 'Motivação e benefícios, exemplos, exercícios', estrategia: 'Expositiva', preparacao: 'Pesquisar sobre ER', avaliacao: '' },
  { id: 'req_3', disciplinaId: 'req', data: '2026-08-11', tema: 'Visão Geral da Engenharia de Requisitos', conteudo: 'O papel da ER no ciclo de vida do software', estrategia: 'Expositiva', preparacao: 'Revisar ciclo de vida do software', avaliacao: '' },
  { id: 'req_4', disciplinaId: 'req', data: '2026-08-18', tema: 'Visão Geral da Engenharia de Requisitos', conteudo: 'Processos de requisitos, papéis e perfis envolvidos', estrategia: 'Debate', preparacao: 'Pesquisar papéis em projetos', avaliacao: '' },
  { id: 'req_5', disciplinaId: 'req', data: '2026-08-25', tema: 'Análise de Negócio - IIBA BABOK', conteudo: 'Conceitos, classificação e níveis de requisitos, áreas de conhecimento', estrategia: 'Expositiva', preparacao: 'Pesquisar BABOK', avaliacao: '' },
  { id: 'req_6', disciplinaId: 'req', data: '2026-09-01', tema: 'Análise de Negócio - IIBA BABOK', conteudo: 'Planejamento, monitoramento, elicitação, gerenciamento, comunicação, análise corporativa', estrategia: 'Expositiva', preparacao: 'Revisar BABOK', avaliacao: '' },
  { id: 'req_7', disciplinaId: 'req', data: '2026-09-08', tema: 'Gerenciamento de Processos de Negócio - BPM CBOK', conteudo: 'Conceitos fundamentais, áreas de conhecimento, ciclo de vida', estrategia: 'Expositiva', preparacao: 'Pesquisar BPM', avaliacao: '' },
  { id: 'req_8', disciplinaId: 'req', data: '2026-09-15', tema: 'Prova 1', conteudo: '1ª Verificação de Aprendizagem bimestral', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 1º bimestre', avaliacao: 'Prova 1' },
  { id: 'req_9', disciplinaId: 'req', data: '2026-09-22', tema: 'Gerenciamento de Processos de Negócio - BPM CBOK', conteudo: 'Análise e modelagem de processos, métodos e ferramentas', estrategia: 'Prática', preparacao: 'Pesquisar modelagem de processos', avaliacao: '' },
  { id: 'req_10', disciplinaId: 'req', data: '2026-09-29', tema: 'Caracterização da Engenharia de Requisitos', conteudo: 'Processo criativo, técnicas de inovação, abordagens', estrategia: 'Expositiva', preparacao: 'Pesquisar inovação em software', avaliacao: '' },
  { id: 'req_11', disciplinaId: 'req', data: '2026-10-06', tema: 'Caracterização da Engenharia de Requisitos', conteudo: 'Requisitos funcionais, qualidade (ISO/IEC 25010), restrições, processos', estrategia: 'Expositiva', preparacao: 'Pesquisar ISO/IEC 25010', avaliacao: '' },
  { id: 'req_12', disciplinaId: 'req', data: '2026-10-20', tema: 'Processo de Produção de Requisitos', conteudo: 'Elicitação de requisitos, técnicas, seleção de técnicas (tradicional e ágil)', estrategia: 'Prática', preparacao: 'Pesquisar técnicas de elicitação', avaliacao: '' },
  { id: 'req_13', disciplinaId: 'req', data: '2026-10-27', tema: 'Processo de Produção de Requisitos', conteudo: 'Especificação, documentação, linguagem natural, modelos, UML', estrategia: 'Expositiva', preparacao: 'Revisar UML', avaliacao: '' },
  { id: 'req_14', disciplinaId: 'req', data: '2026-11-03', tema: 'Processo de Produção de Requisitos', conteudo: 'Abordagens ágeis, backlog, histórias de usuário, critérios de aceite, prototipação, IoT', estrategia: 'Prática', preparacao: 'Pesquisar user stories', avaliacao: '' },
  { id: 'req_15', disciplinaId: 'req', data: '2026-11-10', tema: 'Processo de Produção de Requisitos', conteudo: 'Administração, priorização, configuração, controle de versões', estrategia: 'Expositiva', preparacao: 'Revisar aula anterior', avaliacao: '' },
  { id: 'req_16', disciplinaId: 'req', data: '2026-11-24', tema: 'Prova 2', conteudo: '2ª Verificação de Aprendizagem bimestral', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'req_17', disciplinaId: 'req', data: '2026-12-01', tema: 'Engenharia de Requisitos no Contexto Ágil', conteudo: 'Personas, jornada do usuário, histórias de usuário, critérios de aceite', estrategia: 'Expositiva', preparacao: 'Pesquisar personas', avaliacao: '' },
  { id: 'req_18', disciplinaId: 'req', data: '2026-12-08', tema: 'Engenharia de Requisitos no Contexto Ágil', conteudo: 'Visão, backlog, priorização, story points, sprints, DevOps', estrategia: 'Prática', preparacao: 'Revisar Scrum', avaliacao: '' },
  { id: 'req_19', disciplinaId: 'req', data: '2026-12-15', tema: 'Seminário - TCD', conteudo: 'Apresentação do Trabalho de Conclusão da Disciplina', estrategia: 'Seminário', preparacao: 'Preparar apresentação', avaliacao: 'TCD - Projeto Final' },

  // =========================================================
  // BANCO DE DADOS II (quartas)
  // =========================================================
  { id: 'bd2_1', disciplinaId: 'bd2', data: '2026-07-29', tema: 'Apresentação da Disciplina', conteudo: 'Abertura, motivação, revisão de modelagem, introdução ao BD', estrategia: 'Expositiva', preparacao: 'Ler plano de ensino', avaliacao: '' },
  { id: 'bd2_2', disciplinaId: 'bd2', data: '2026-08-05', tema: 'Tópicos Avançados de Modelagem de Dados', conteudo: 'Projeto de BD, fundamentos, administração, política de segurança', estrategia: 'Expositiva + debate', preparacao: 'Revisar modelagem ER', avaliacao: 'Exercício conceitual' },
  { id: 'bd2_3', disciplinaId: 'bd2', data: '2026-08-12', tema: 'Tópicos Avançados de Modelagem de Dados', conteudo: 'Generalização, especialização, herança, OLAP vs OLTP', estrategia: 'Expositiva', preparacao: 'Pesquisar OLAP e OLTP', avaliacao: 'Exercício' },
  { id: 'bd2_4', disciplinaId: 'bd2', data: '2026-08-19', tema: 'Tópicos Avançados de Modelagem de Dados', conteudo: 'Álgebra relacional básica', estrategia: 'Expositiva', preparacao: 'Revisar álgebra relacional', avaliacao: 'Exercício' },
  { id: 'bd2_5', disciplinaId: 'bd2', data: '2026-08-26', tema: 'Introdução à Administração de Banco de Dados', conteudo: 'Projeto físico, arquitetura Oracle, SQL (DDL, DCL, DML, DQL)', estrategia: 'Expositiva', preparacao: 'Pesquisar arquitetura Oracle', avaliacao: 'Exercício conceitual' },
  { id: 'bd2_6', disciplinaId: 'bd2', data: '2026-09-02', tema: 'SQL Avançado', conteudo: 'Instalação, configuração, DCL, DQL (DD dinâmico), DDL (criação de tabelas, restrições)', estrategia: 'Prática', preparacao: 'Instalar Oracle e SQLDeveloper', avaliacao: 'Exercício DDL' },
  { id: 'bd2_7', disciplinaId: 'bd2', data: '2026-09-09', tema: 'SQL Avançado', conteudo: 'DDL (criação de tabelas e objetos), DML (select, expressões, operadores)', estrategia: 'Prática', preparacao: 'Revisar comandos SQL', avaliacao: 'Exercício DDL' },
  { id: 'bd2_8', disciplinaId: 'bd2', data: '2026-09-16', tema: 'SQL Avançado', conteudo: 'DDL (criação), DML (select, expressões, operadores) - continuação', estrategia: 'Prática', preparacao: 'Revisar aula anterior', avaliacao: 'Exercício DDL/DML' },
  { id: 'bd2_9', disciplinaId: 'bd2', data: '2026-09-23', tema: 'Prova 1', conteudo: '1ª Avaliação - Conceitos, fundamentos, arquitetura, abordagem relacional, álgebra relacional', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 1º bimestre', avaliacao: 'Prova 1' },
  { id: 'bd2_10', disciplinaId: 'bd2', data: '2026-09-30', tema: 'Introdução à Administração de Banco de Dados', conteudo: 'Divulgação de notas, backup, recuperação, segurança, controle de acesso, auditoria', estrategia: 'Expositiva', preparacao: 'Pesquisar backup e recuperação', avaliacao: 'Exercício DTL' },
  { id: 'bd2_11', disciplinaId: 'bd2', data: '2026-10-07', tema: 'Transações e Controle de Concorrência', conteudo: 'ACID, níveis de isolamento, bloqueios, deadlocks, resolução de conflitos', estrategia: 'Expositiva', preparacao: 'Pesquisar ACID', avaliacao: 'Exercício' },
  { id: 'bd2_12', disciplinaId: 'bd2', data: '2026-10-14', tema: 'SQL Avançado', conteudo: 'DTL, recuperação de falhas, segurança e autorização', estrategia: 'Prática', preparacao: 'Revisar DTL', avaliacao: 'Exercício DTL' },
  { id: 'bd2_13', disciplinaId: 'bd2', data: '2026-10-21', tema: 'SQL Avançado', conteudo: 'DTL (continuação), DML e DQL avançados', estrategia: 'Prática', preparacao: 'Revisar aula anterior', avaliacao: 'Exercício DML/DQL' },
  { id: 'bd2_14', disciplinaId: 'bd2', data: '2026-10-28', tema: 'Otimização de Consultas e Desempenho', conteudo: 'Planos de execução, indexação, particionamento, boas práticas', estrategia: 'Expositiva', preparacao: 'Pesquisar indexação', avaliacao: 'Exercício DDL/DML/DQL' },
  { id: 'bd2_15', disciplinaId: 'bd2', data: '2026-11-04', tema: 'SQL Avançado', conteudo: 'DML (insert, delete, update), DQL (funções de grupo, joins, subquery)', estrategia: 'Prática', preparacao: 'Revisar joins e subqueries', avaliacao: 'Exercício DQL' },
  { id: 'bd2_16', disciplinaId: 'bd2', data: '2026-11-11', tema: 'Programação em Banco de Dados', conteudo: 'Procedimentos armazenados, triggers, views, scripts', estrategia: 'Expositiva', preparacao: 'Pesquisar stored procedures', avaliacao: 'Exercício DDL/DQL' },
  { id: 'bd2_17', disciplinaId: 'bd2', data: '2026-11-18', tema: 'Programação em Banco de Dados', conteudo: 'Stored procedures, UDFs, triggers, automação', estrategia: 'Prática', preparacao: 'Revisar aula anterior', avaliacao: 'Exercício DDL/DQL' },
  { id: 'bd2_18', disciplinaId: 'bd2', data: '2026-11-25', tema: 'Agentes Inteligentes para Administração de BD', conteudo: 'Conceitos, automação com IA, geração de consultas e índices', estrategia: 'Expositiva', preparacao: 'Pesquisar IA em BD', avaliacao: 'Exercício teórico' },
  { id: 'bd2_19', disciplinaId: 'bd2', data: '2026-12-02', tema: 'Prova 2', conteudo: '4ª Avaliação - Programação SQL (DDL, DML, DQL)', estrategia: 'Avaliação', preparacao: 'Revisar SQL completo', avaliacao: 'Prova 2' },
  { id: 'bd2_20', disciplinaId: 'bd2', data: '2026-12-09', tema: 'Encerramento', conteudo: 'Divulgação de notas, solução de dúvidas, resultados finais', estrategia: 'Expositiva', preparacao: '', avaliacao: '' },

  // =========================================================
  // ÁLGEBRA LINEAR E GEOMETRIA ANALÍTICA (quintas)
  // =========================================================
  { id: 'alga_1', disciplinaId: 'alga', data: '2026-07-30', tema: 'Apresentação da Disciplina', conteudo: 'Plano de ensino, metodologia, avaliação', estrategia: 'Expositiva', preparacao: 'Ler plano de ensino', avaliacao: '' },
  { id: 'alga_2', disciplinaId: 'alga', data: '2026-08-06', tema: 'Matrizes e Sistemas Lineares', conteudo: 'Operações com matrizes, sistemas lineares, escalonamento', estrategia: 'Expositiva + exercícios', preparacao: 'Revisar matrizes', avaliacao: 'Exercícios' },
  { id: 'alga_3', disciplinaId: 'alga', data: '2026-08-13', tema: 'Matrizes e Sistemas Lineares', conteudo: 'Continuação - sistemas lineares, regra de Cramer', estrategia: 'Exercícios', preparacao: 'Praticar sistemas lineares', avaliacao: 'Exercícios' },
  { id: 'alga_4', disciplinaId: 'alga', data: '2026-08-20', tema: 'Vetores no Plano e no Espaço', conteudo: 'Operações com vetores, combinação linear, dependência linear', estrategia: 'Expositiva', preparacao: 'Pesquisar vetores', avaliacao: 'Exercícios' },
  { id: 'alga_5', disciplinaId: 'alga', data: '2026-08-27', tema: 'Vetores no Plano e no Espaço', conteudo: 'Produto escalar, produto vetorial, aplicações', estrategia: 'Exercícios', preparacao: 'Revisar produtos vetoriais', avaliacao: 'Exercícios' },
  { id: 'alga_6', disciplinaId: 'alga', data: '2026-09-03', tema: 'Retas e Planos', conteudo: 'Equações paramétricas, equações gerais, posições relativas', estrategia: 'Expositiva', preparacao: 'Revisar geometria analítica', avaliacao: 'Exercícios' },
  { id: 'alga_7', disciplinaId: 'alga', data: '2026-09-10', tema: 'Retas e Planos', conteudo: 'Distâncias, ângulos, interseções', estrategia: 'Exercícios', preparacao: 'Praticar exercícios de retas e planos', avaliacao: 'Exercícios' },
  { id: 'alga_8', disciplinaId: 'alga', data: '2026-09-17', tema: 'Avaliação 1', conteudo: '1ª Avaliação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 1º bimestre', avaliacao: 'Prova 1' },
  { id: 'alga_9', disciplinaId: 'alga', data: '2026-09-24', tema: 'Transformações Lineares', conteudo: 'Definição, propriedades, matriz de uma transformação linear', estrategia: 'Expositiva', preparacao: 'Pesquisar transformações lineares', avaliacao: 'Exercícios' },
  { id: 'alga_10', disciplinaId: 'alga', data: '2026-10-01', tema: 'Transformações Lineares', conteudo: 'Núcleo e imagem, isomorfismos, aplicações', estrategia: 'Exercícios', preparacao: 'Revisar aula anterior', avaliacao: 'Exercícios' },
  { id: 'alga_11', disciplinaId: 'alga', data: '2026-10-08', tema: 'Autovalores e Autovetores', conteudo: 'Definição, cálculo, polinômio característico', estrategia: 'Expositiva', preparacao: 'Pesquisar autovalores e autovetores', avaliacao: 'Exercícios' },
  { id: 'alga_12', disciplinaId: 'alga', data: '2026-10-22', tema: 'Autovalores e Autovetores', conteudo: 'Diagonalização, aplicações práticas', estrategia: 'Exercícios', preparacao: 'Praticar diagonalização', avaliacao: 'Exercícios' },
  { id: 'alga_13', disciplinaId: 'alga', data: '2026-10-29', tema: 'Espaços Vetoriais', conteudo: 'Definição, subespaços, base, dimensão', estrategia: 'Expositiva', preparacao: 'Pesquisar espaços vetoriais', avaliacao: 'Exercícios' },
  { id: 'alga_14', disciplinaId: 'alga', data: '2026-11-05', tema: 'Espaços Vetoriais', conteudo: 'Mudança de base, coordenadas', estrategia: 'Exercícios', preparacao: 'Revisar base e dimensão', avaliacao: 'Exercícios' },
  { id: 'alga_15', disciplinaId: 'alga', data: '2026-11-12', tema: 'Avaliação 2', conteudo: '2ª Avaliação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo do 2º bimestre', avaliacao: 'Prova 2' },
  { id: 'alga_16', disciplinaId: 'alga', data: '2026-11-19', tema: 'Produto Interno', conteudo: 'Definição, propriedades, norma, ortogonalidade', estrategia: 'Expositiva', preparacao: 'Pesquisar produto interno', avaliacao: 'Exercícios' },
  { id: 'alga_17', disciplinaId: 'alga', data: '2026-11-26', tema: 'Produto Interno', conteudo: 'Processo de Gram-Schmidt, projeções', estrategia: 'Exercícios', preparacao: 'Revisar ortogonalidade', avaliacao: 'Exercícios' },
  { id: 'alga_18', disciplinaId: 'alga', data: '2026-12-03', tema: 'Cônicas e Quádricas', conteudo: 'Elipse, hipérbole, parábola, quádricas', estrategia: 'Expositiva', preparacao: 'Revisar cônicas', avaliacao: 'Exercícios' },
  { id: 'alga_19', disciplinaId: 'alga', data: '2026-12-10', tema: 'Avaliação 3', conteudo: '3ª Avaliação de Aprendizagem', estrategia: 'Avaliação', preparacao: 'Revisar conteúdo completo', avaliacao: 'Prova 3' },
  { id: 'alga_20', disciplinaId: 'alga', data: '2026-12-17', tema: 'Encerramento', conteudo: 'Resultados finais, encerramento', estrategia: 'Discussão', preparacao: '', avaliacao: '' },

  // =========================================================
  // DESENVOLVIMENTO DE INTERFACES (sextas)
  // =========================================================
  { id: 'di_1', disciplinaId: 'di', data: '2026-07-31', tema: 'Apresentação da Disciplina', conteudo: 'Apresentação da disciplina, uso de IA no curso, apresentações iniciais', estrategia: 'Expositiva', preparacao: 'Ler plano de ensino', avaliacao: '' },
  { id: 'di_2', disciplinaId: 'di', data: '2026-08-07', tema: 'Outros', conteudo: 'Apresentação de tópicos do curso com uso de IA', estrategia: 'Projeto baseado em projetos', preparacao: 'Pesquisar IA em desenvolvimento', avaliacao: '' },
  { id: 'di_3', disciplinaId: 'di', data: '2026-08-14', tema: 'Interação Humano Computador - IHC', conteudo: 'Conceitos, interface, interação, tipografia, cores, usabilidade, acessibilidade, WCAG, ISO 9241', estrategia: 'Expositiva', preparacao: 'Pesquisar Heurísticas de Nielsen', avaliacao: '' },
  { id: 'di_4', disciplinaId: 'di', data: '2026-08-21', tema: 'Interação Humano Computador - IHC', conteudo: 'Análise de protótipos, websites e apps usando heurísticas de Nielsen', estrategia: 'Prática', preparacao: 'Revisar Heurísticas', avaliacao: 'Apresentação de projeto' },
  { id: 'di_5', disciplinaId: 'di', data: '2026-08-28', tema: 'User Experience (UX) e User Interface (UI)', conteudo: 'Definição, Design Thinking, métodos e entregáveis, prototipação', estrategia: 'Expositiva', preparacao: 'Pesquisar Design Thinking', avaliacao: '' },
  { id: 'di_6', disciplinaId: 'di', data: '2026-09-04', tema: 'User Experience (UX) e User Interface (UI)', conteudo: 'Aprendizado baseado em projetos UI/UX, Design Thinking', estrategia: 'Prática', preparacao: 'Preparar projeto UI/UX', avaliacao: '' },
  { id: 'di_7', disciplinaId: 'di', data: '2026-09-11', tema: 'HTML (Hypertext Markup Language)', conteudo: 'Estrutura, componentes, atributos, formulários, WCAG', estrategia: 'Prática', preparacao: 'Pesquisar HTML5', avaliacao: '' },
  { id: 'di_8', disciplinaId: 'di', data: '2026-09-18', tema: 'HTML (Hypertext Markup Language)', conteudo: 'Projeto de criação de páginas HTML', estrategia: 'Projeto', preparacao: 'Praticar HTML', avaliacao: 'Projeto HTML' },
  { id: 'di_9', disciplinaId: 'di', data: '2026-09-25', tema: 'HTML (Hypertext Markup Language)', conteudo: 'Continuação do projeto HTML', estrategia: 'Projeto', preparacao: 'Revisar formulários', avaliacao: 'Projeto HTML' },
  { id: 'di_10', disciplinaId: 'di', data: '2026-10-02', tema: 'Prova 1', conteudo: 'IHC, UI/UX, Design Thinking, WCAG, HTML', estrategia: 'Avaliação', preparacao: 'Revisar todo o conteúdo', avaliacao: 'Prova 1' },
  { id: 'di_11', disciplinaId: 'di', data: '2026-10-09', tema: 'HTML (Hypertext Markup Language)', conteudo: 'Projeto HTML/CSS - integração', estrategia: 'Projeto', preparacao: 'Revisar CSS básico', avaliacao: 'Projeto HTML/CSS' },
  { id: 'di_12', disciplinaId: 'di', data: '2026-10-16', tema: 'CSS (Cascading Style Sheets)', conteudo: 'Folhas de estilo, seletores, propriedades, unidades, design responsivo', estrategia: 'Prática', preparacao: 'Pesquisar Flexbox e Grid', avaliacao: 'Projeto CSS' },
  { id: 'di_13', disciplinaId: 'di', data: '2026-10-23', tema: 'CSS (Cascading Style Sheets)', conteudo: 'Exercícios e revisão de CSS', estrategia: 'Revisão', preparacao: 'Praticar CSS', avaliacao: '' },
  { id: 'di_14', disciplinaId: 'di', data: '2026-10-30', tema: 'CSS (Cascading Style Sheets)', conteudo: 'Bootstrap/Tailwind CSS', estrategia: 'Prática', preparacao: 'Pesquisar Bootstrap e Tailwind', avaliacao: 'Projeto com framework' },
  { id: 'di_15', disciplinaId: 'di', data: '2026-11-06', tema: 'Linguagem JavaScript', conteudo: 'Conceitos básicos, estruturas, DOM', estrategia: 'Prática', preparacao: 'Pesquisar JavaScript', avaliacao: 'Projeto' },
  { id: 'di_16', disciplinaId: 'di', data: '2026-11-13', tema: 'Principais bibliotecas JavaScript', conteudo: 'Projeto HTML, CSS, JS integrado', estrategia: 'Projeto', preparacao: 'Revisar JS', avaliacao: 'Projeto HTML/CSS/JS' },
  { id: 'di_17', disciplinaId: 'di', data: '2026-11-27', tema: 'Outros', conteudo: 'Apresentação de projeto final', estrategia: 'Apresentação', preparacao: 'Preparar apresentação', avaliacao: 'Apresentação projeto final' },
  { id: 'di_18', disciplinaId: 'di', data: '2026-12-04', tema: 'Outros', conteudo: 'Apresentação de projeto final (continuação)', estrategia: 'Apresentação', preparacao: 'Finalizar projeto', avaliacao: 'Apresentação projeto final' },
  { id: 'di_19', disciplinaId: 'di', data: '2026-12-11', tema: 'Outros', conteudo: 'Revisão menção', estrategia: 'Revisão', preparacao: 'Revisar para prova', avaliacao: 'Prova 2' },
  { id: 'di_20', disciplinaId: 'di', data: '2026-12-18', tema: 'Outros', conteudo: 'Revisão de menção, encerramento', estrategia: 'Revisão', preparacao: '', avaliacao: '' },
];

// ============================================================
// EVENTOS (provas, trabalhos, seminários, etc.)
// ============================================================

export const EVENTOS_INICIAIS = [
  // --- POO ---
  { id: 'ev_poo_p1', disciplinaId: 'poo', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-09-14', prioridadeEstudo: null, concluido: false },
  { id: 'ev_poo_p2', disciplinaId: 'poo', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-11-16', prioridadeEstudo: null, concluido: false },
  { id: 'ev_poo_p3', disciplinaId: 'poo', tipo: 'prova', titulo: 'Prova 3 – 3º Bimestre', data: '2026-12-07', prioridadeEstudo: null, concluido: false },

  // --- Engenharia de Requisitos ---
  { id: 'ev_req_p1', disciplinaId: 'req', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-09-15', prioridadeEstudo: null, concluido: false },
  { id: 'ev_req_p2', disciplinaId: 'req', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-11-24', prioridadeEstudo: null, concluido: false },
  { id: 'ev_req_tcd', disciplinaId: 'req', tipo: 'trabalho', titulo: 'TCD – Trabalho de Conclusão da Disciplina', data: '2026-12-15', prioridadeEstudo: '2026-12-08', concluido: false },
  { id: 'ev_req_ace', disciplinaId: 'req', tipo: 'trabalho', titulo: 'ACE – Atividades Curriculares de Extensão', data: '2026-12-15', prioridadeEstudo: '2026-12-01', concluido: false },

  // --- Banco de Dados II ---
  { id: 'ev_bd2_p1', disciplinaId: 'bd2', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-09-23', prioridadeEstudo: null, concluido: false },
  { id: 'ev_bd2_p2', disciplinaId: 'bd2', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre (SQL prático)', data: '2026-12-02', prioridadeEstudo: null, concluido: false },

  // --- Álgebra Linear e GA ---
  { id: 'ev_alga_p1', disciplinaId: 'alga', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-09-17', prioridadeEstudo: null, concluido: false },
  { id: 'ev_alga_p2', disciplinaId: 'alga', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-11-12', prioridadeEstudo: null, concluido: false },
  { id: 'ev_alga_p3', disciplinaId: 'alga', tipo: 'prova', titulo: 'Prova 3 – 3º Bimestre', data: '2026-12-10', prioridadeEstudo: null, concluido: false },

  // --- Desenvolvimento de Interfaces ---
  { id: 'ev_di_p1', disciplinaId: 'di', tipo: 'prova', titulo: 'Prova 1 – 1º Bimestre', data: '2026-10-02', prioridadeEstudo: null, concluido: false },
  { id: 'ev_di_p2', disciplinaId: 'di', tipo: 'prova', titulo: 'Prova 2 – 2º Bimestre', data: '2026-12-11', prioridadeEstudo: null, concluido: false },
  { id: 'ev_di_proj', disciplinaId: 'di', tipo: 'trabalho', titulo: 'Projeto Final – Interface Front-end', data: '2026-12-04', prioridadeEstudo: '2026-11-27', concluido: false },
];

// ============================================================
// MÓDULOS DE CIBERSEGURANÇA (estudo livre)
// ============================================================

export const MODULOS_CYBER = [
  'Módulo 1 – Introdução à Cibersegurança',
  'Módulo 2 – Fundamentos de Redes e Protocolos',
  'Módulo 3 – Criptografia e Segurança da Informação',
  'Módulo 4 – Segurança em Sistemas Operacionais',
  'Módulo 5 – Análise de Vulnerabilidades',
  'Módulo 6 – Testes de Invasão (Pentest) - Conceitos',
  'Módulo 7 – Firewalls e Controles de Acesso',
  'Módulo 8 – Resposta a Incidentes e Forense Digital',
  'Módulo 9 – Segurança em Aplicações Web',
  'Módulo 10 – Engenharia Social e Aspectos Legais',
  'Módulo 11 – Certificações e Mercado de Trabalho',
  'Módulo 12 – Projeto Prático de Cibersegurança',
];