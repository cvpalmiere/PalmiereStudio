import { AULAS, EVENTOS_INICIAIS, DISCIPLINAS } from './dados.js';

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

  // Já não temos mais EAD (Bootcamp/Fundamentos) no 2º semestre
  // Todas as disciplinas são presenciais

  // 1. Prioridade máxima: provas em até 7 dias
  const eventosProva = eventos.filter(e => {
    if (e.concluido || e.tipo !== 'prova') return false;
    const diff = diasRestantesStr(dateStr, e.data);
    return diff >= 0 && diff <= 7;
  }).sort((a, b) => a.data.localeCompare(b.data));

  if (eventosProva.length > 0) {
    if (eventosProva.length === 1) {
      const ev = eventosProva[0];
      const disc = getDisciplina(ev.disciplinaId);
      return {
        tipo: 'prova',
        conteudo: `Revisão para ${ev.titulo} – ${disc.nome}`,
        eventoId: ev.id,
      };
    }
    const nomes = eventosProva.map(ev => {
      const d = getDisciplina(ev.disciplinaId);
      return `${ev.titulo} (${d.nome})`;
    }).join(' e ');
    return {
      tipo: 'prova',
      conteudo: `Divisão de tempo: revisão para ${nomes}`,
      eventoId: eventosProva[0].id,
    };
  }

  // 2. Trabalhos/seminários em até 7 dias (usando prioridadeEstudo)
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
      tipo: 'trabalho',
      conteudo: `Preparação para ${ev.titulo} – ${disc.nome}`,
      eventoId: ev.id,
    };
  }

  // 3. Aula no dia → pré-aula
  const aula = AULAS.find(a => a.data === dateStr);
  if (aula) {
    const disc = getDisciplina(aula.disciplinaId);
    return {
      tipo: 'pre_aula',
      conteudo: `Pré-aula ${disc.nome}: ${aula.conteudo}`,
      aulaId: aula.id,
    };
  }

  // 4. Fallback
  return {
    tipo: 'livre',
    conteudo: 'Revisão geral ou leitura complementar',
  };
}

// ── Estudo noturno (sextas) ──────────────────────────────────

export function gerarBlocoNoturno(dateStr, eventos) {
  const date = parseDate(dateStr);
  const diaSemana = date.getDay();

  // Só funciona nas sextas (dia 5)
  if (diaSemana !== 5) return null;

  // Verifica se tem prova próxima (para sugerir revisão)
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

  // Verifica se tem trabalho próximo
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

  // Fallback: estudo livre noturno
  return {
    titulo: 'Estudo Livre Noturno',
    conteudo: 'Tempo livre para organizar materiais, revisar anotações ou estudar temas de interesse',
    tipo: 'livre',
  };
}

export function gerarDiasUteisDoSemestre() {
  const inicio = parseDate('2026-07-27'); // 2º semestre
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
    prova: 'Revisão para prova',
    trabalho: 'Preparação de trabalho',
    seminario: 'Preparação de seminário',
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
    ead: '#56CCF2',
    livre: '#7A8B6E',
  };
  return map[tipo] || '#888';
}
