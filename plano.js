import { AULAS, EVENTOS_INICIAIS, DISCIPLINAS, MODULOS_CYBER } from './dados.js';

// ── Formatação de datas ──────────────────────────────────────

export function parseDate(str) {
  const [y, m, d] = str.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function formatDateISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function formatDateBR(str) {
  const [y, m, d] = str.split('-');
  return `${d}/${m}/${y}`;
}

export function diaSemanaStr(str) {
  const dias = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];
  return dias[parseDate(str).getDay()];
}

export function diasRestantes(dataStr) {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  const alvo = parseDate(dataStr);
  alvo.setHours(0, 0, 0, 0);
  return Math.ceil((alvo - hoje) / (1000 * 60 * 60 * 24));
}

export function hojeISO() {
  return formatDateISO(new Date());
}

// ── Recuperar dados ─────────────────────────────────────────

export function getDisciplina(id) {
  return DISCIPLINAS.find(d => d.id === id);
}

export function getAulasDia(dateStr) {
  return AULAS.filter(a => a.data === dateStr);
}

export function getAulasDisciplina(discId) {
  return AULAS.filter(a => a.disciplinaId === discId).sort((a, b) => a.data.localeCompare(b.data));
}

export function getEventosOrdenados(eventos) {
  return [...eventos].sort((a, b) => a.data.localeCompare(b.data));
}

export function getEventosPendentes(eventos) {
  const hoje = hojeISO();
  return eventos.filter(e => !e.concluido && e.data >= hoje);
}

export function getProximosPrazos(eventos, n = 3) {
  return getEventosPendentes(eventos)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, n);
}

// ── Geração do plano de estudos ──────────────────────────────

function diasRestantesStr(fromStr, toStr) {
  const from = parseDate(fromStr);
  from.setHours(0, 0, 0, 0);
  const to = parseDate(toStr);
  to.setHours(0, 0, 0, 0);
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24));
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

export function gerarBlocoManha(dateStr, eventos) {
  const date = parseDate(dateStr);
  const diaSemana = date.getDay();

  // ==========================================================
  // BLOCO 1: PRÉ-AULA DA DISCIPLINA DO DIA (sempre 1h)
  // ==========================================================
  const aula = AULAS.find(a => a.data === dateStr);
  const disc = aula ? getDisciplina(aula.disciplinaId) : null;

  let bloco1;
  if (aula && disc) {
    bloco1 = {
      tipo: 'pre_aula',
      titulo: `Pré-aula ${disc.nome}`,
      conteudo: aula.tema,
      descricao: aula.conteudo,
    };
  } else {
    const disciplinasDia = DISCIPLINAS.filter(d => d.diaSemana === diaSemana);
    const nomeDisciplina = disciplinasDia.length > 0 ? disciplinasDia[0].nome : 'disciplina do dia';
    bloco1 = {
      tipo: 'pre_aula',
      titulo: `Pré-aula ${nomeDisciplina}`,
      conteudo: 'Revisão geral da matéria',
      descricao: 'Sem aula presencial hoje, revise o conteúdo da disciplina.',
    };
  }

  // ==========================================================
  // BLOCO 2: TRABALHO/PROVA OU MAIS PRÉ-AULA (1h)
  // ==========================================================
  
  // Verifica se tem algum evento (prova ou trabalho) nos próximos 30 dias
  const eventosProximos = eventos.filter(e => {
    if (e.concluido) return false;
    const diff = diasRestantesStr(dateStr, e.data);
    return diff >= 0 && diff <= 30; // 1 mês
  }).sort((a, b) => a.data.localeCompare(b.data));

  let bloco2;
  if (eventosProximos.length > 0) {
    const ev = eventosProximos[0];
    const discEv = getDisciplina(ev.disciplinaId);
    const tipoLabel = ev.tipo === 'prova' ? 'Prova' : 'Trabalho';
    const dias = diasRestantesStr(dateStr, ev.data);
    
    bloco2 = {
      tipo: ev.tipo,
      titulo: `${tipoLabel}: ${ev.titulo}`,
      conteudo: ev.titulo,
      descricao: `Entrega em ${dias} dias (${discEv?.nome})`,
      eventoId: ev.id,
    };
  } else {
    // Sem trabalhos/provas → mais pré-aula da disciplina do dia
    const discNome = disc ? disc.nome : 'matéria do dia';
    bloco2 = {
      tipo: 'revisao',
      titulo: `Revisão de ${discNome}`,
      conteudo: `Aprofundamento em ${discNome}`,
      descricao: 'Reforce o conteúdo da aula de hoje',
    };
  }

  // ==========================================================
  // BLOCO 3: CURSO EXTRA (1h) - usa o mapa do dados.js
  // ==========================================================
  const cursosExtras = {
    1: 'Java (Coddy)',
    2: 'SQL (Coddy)',
    3: 'Java (Curso com certificado)',
    4: 'HTML/CSS/JS (Coddy)',
    5: 'Java (Coddy)',
  };

  const bloco3 = {
    tipo: 'extra',
    titulo: 'Curso Extra',
    conteudo: cursosExtras[diaSemana] || 'Curso livre',
    descricao: 'Aprofundamento em tecnologia',
  };

  // ==========================================================
  // RETORNO
  // ==========================================================
  return {
    blocos: [bloco1, bloco2, bloco3],
    // Compatibilidade com sistema antigo
    tipo: bloco2.tipo === 'prova' ? 'prova' : bloco1.tipo,
    conteudo: `${bloco1.titulo}: ${bloco1.conteudo} | ${bloco2.titulo}: ${bloco2.conteudo} | ${bloco3.titulo}: ${bloco3.conteudo}`,
    aulaId: aula?.id,
    eventoId: bloco2.eventoId,
  };
}

// ── Estudo noturno (sextas) ──────────────────────────────────

export function gerarBlocoNoturno(dateStr, eventos) {
  const date = parseDate(dateStr);
  const diaSemana = date.getDay();

  if (diaSemana !== 5) return null;

  const eventosProva = eventos.filter(e => {
    if (e.concluido || e.tipo !== 'prova') return false;
    const diff = diasRestantesStr(dateStr, e.data);
    return diff >= 0 && diff <= 7;
  }).sort((a, b) => a.data.localeCompare(b.data));

  if (eventosProva.length > 0) {
    const ev = eventosProva[0];
    const disc = getDisciplina(ev.disciplinaId);
    return {
      titulo: 'Revisão Noturna',
      conteudo: `Revisão para ${ev.titulo} – ${disc.nome}`,
      tipo: 'prova',
    };
  }

  const eventosTrabalho = eventos.filter(e => {
    if (e.concluido || e.tipo === 'prova') return false;
    const alvoDate = e.prioridadeEstudo || e.data;
    const diff = diasRestantesStr(dateStr, alvoDate);
    const diffFinal = diasRestantesStr(dateStr, e.data);
    return diffFinal >= 0 && diff <= 7 && diff >= 0;
  }).sort((a, b) => a.data.localeCompare(b.data));

  if (eventosTrabalho.length > 0) {
    const ev = eventosTrabalho[0];
    const disc = getDisciplina(ev.disciplinaId);
    return {
      titulo: 'Preparação Noturna',
      conteudo: `Preparação para ${ev.titulo} – ${disc.nome}`,
      tipo: 'trabalho',
    };
  }

  return {
    titulo: 'Estudo Livre Noturno',
    conteudo: 'Tempo livre para organizar materiais, revisar anotações ou estudar temas de interesse',
    tipo: 'livre',
  };
}

export function gerarDiasUteisDoSemestre() {
  const inicio = parseDate('2026-07-27');
  const fim = parseDate('2026-12-18');
  const dias = [];
  const cur = new Date(inicio);
  while (cur <= fim) {
    const dow = cur.getDay();
    if (dow >= 1 && dow <= 5) {
      dias.push(formatDateISO(cur));
    }
    cur.setDate(cur.getDate() + 1);
  }
  return dias;
}

export function gerarSemana(dataInicio, eventos, edicoes = {}) {
  const semana = [];
  const cur = new Date(parseDate(dataInicio));
  const dow = cur.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  cur.setDate(cur.getDate() + diff);

  for (let i = 0; i < 5; i++) {
    const dateStr = formatDateISO(cur);
    const aula = AULAS.find(a => a.data === dateStr) || null;
    const disc = aula ? getDisciplina(aula.disciplinaId) : null;
    const manha = edicoes[dateStr] || gerarBlocoManha(dateStr, eventos);
    const noturno = gerarBlocoNoturno(dateStr, eventos);
    const eventosNoDia = eventos.filter(e => e.data === dateStr);

    semana.push({ date: dateStr, aula, disciplina: disc, manha, noturno, eventosNoDia });
    cur.setDate(cur.getDate() + 1);
  }
  return semana;
}

export function tipoLabel(tipo) {
  const map = {
    pre_aula: 'Pré-aula',
    prova: 'Prova',
    trabalho: 'Trabalho',
    seminario: 'Seminário',
    revisao: 'Revisão',
    extra: 'Curso Extra',
    ead: 'EAD',
    livre: 'Estudo livre',
  };
  return map[tipo] || tipo;
}

export function tipoEventoLabel(tipo) {
  const map = { prova: 'Prova', trabalho: 'Trabalho', seminario: 'Seminário', ace: 'ACE' };
  return map[tipo] || tipo;
}

export function corBloco(tipo) {
  const map = {
    pre_aula: '#4A6FA5',
    prova: '#B31B2B',
    trabalho: '#C47B3A',
    seminario: '#8B5A8B',
    revisao: '#5C8A6E',
    extra: '#8B6B8B',
    ead: '#56CCF2',
    livre: '#7A8B6E',
  };
  return map[tipo] || '#888';
}

// ============================================================
// PLANO DE ESTUDO DO CURSO CISCO ETHICAL HACKER
// ============================================================

/**
 * Gera o plano de estudo diário para o curso de Cibersegurança
 * Baseado em: 1 hora por dia, 5 dias por semana, 16 semanas
 */
export function gerarPlanoCyber() {
  const planoSemanal = [];
  const dataInicio = new Date('2026-08-03');
  let semanaAtual = 0;

  MODULOS_CYBER.forEach(modulo => {
    for (let s = 0; s < modulo.semanas; s++) {
      const semana = {
        modulo: modulo.nome,
        numero: semanaAtual + 1,
        dias: []
      };

      const topicos = modulo.topicos;
      const diasTeoria = [0, 1, 2];
      const diasPratica = [3, 4];

      diasTeoria.forEach((diaIdx, i) => {
        const idx = i * 2;
        const topico1 = topicos[idx] || topicos[topicos.length - 1];
        const topico2 = topicos[idx + 1] || null;
        const data = new Date(dataInicio);
        data.setDate(data.getDate() + (semanaAtual * 7) + diaIdx);

        semana.dias.push({
          data: formatDateISO(data),
          diaSemana: ['Segunda', 'Terça', 'Quarta'][i],
          tipo: 'teoria',
          conteudo: topico1,
          conteudoExtra: topico2,
          modulo: modulo.nome,
          duracao: '1h (teoria)'
        });
      });

      diasPratica.forEach((diaIdx, i) => {
        const data = new Date(dataInicio);
        data.setDate(data.getDate() + (semanaAtual * 7) + diaIdx);

        const topicoPratica = topicos[i * 3 + 1] || topicos[0];
        semana.dias.push({
          data: formatDateISO(data),
          diaSemana: ['Quinta', 'Sexta'][i],
          tipo: 'pratica',
          conteudo: `Prática: ${topicoPratica}`,
          conteudoExtra: 'Laboratório / Exercícios',
          modulo: modulo.nome,
          duracao: '1h (prática)'
        });
      });

      semana.dias.sort((a, b) => a.data.localeCompare(b.data));
      planoSemanal.push(semana);
      semanaAtual++;
    }
  });

  return planoSemanal;
}

/**
 * Retorna o conteúdo de estudo para HOJE (1 hora)
 */
export function getEstudoCyberHoje(planos) {
  const hoje = hojeISO();
  for (const semana of planos) {
    for (const dia of semana.dias) {
      if (dia.data === hoje) {
        return {
          modulo: dia.modulo,
          tipo: dia.tipo,
          conteudo: dia.conteudo,
          extra: dia.conteudoExtra || null,
          duracao: dia.duracao
        };
      }
    }
  }
  return null;
}

/**
 * Retorna o conteúdo de estudo para UMA DATA ESPECÍFICA
 */
export function getEstudoCyberPorData(planos, dataStr) {
  for (const semana of planos) {
    for (const dia of semana.dias) {
      if (dia.data === dataStr) {
        return dia;
      }
    }
  }
  return null;
}

/**
 * Retorna a semana atual do curso Cyber
 */
export function getSemanaCyberAtual(planos) {
  const hoje = hojeISO();
  for (const semana of planos) {
    for (const dia of semana.dias) {
      if (dia.data === hoje) {
        return `Semana ${semana.numero} – ${semana.modulo}`;
      }
    }
  }
  return 'Curso concluído ou não iniciado';
}
