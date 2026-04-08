// ============================================================
// PALMIERE STUDIO – Aba Progresso
// ============================================================

import React, { useMemo, useState } from 'react';
import { DISCIPLINAS, AULAS, EVENTOS_INICIAIS } from './dados.js';
import { gerarDiasUteisDoSemestre, gerarBlocoManha, hojeISO } from './plano.js';

export default function Progresso({ eventos, aulasAssistidas, estudosConcluidos }) {
  const [mencoes, setMencoes] = useState({});

  const hojStr = hojeISO();

  // Aulas assistidas por disciplina
  const aulasPorDisc = useMemo(() => {
    return DISCIPLINAS.map(disc => {
      const aulas = AULAS.filter(a => a.disciplinaId === disc.id);
      const assistidas = aulas.filter(a => aulasAssistidas[a.id]).length;
      return { disc, total: aulas.length, assistidas };
    });
  }, [aulasAssistidas]);

  // Dias estudados
  const diasEstudados = useMemo(() => Object.values(estudosConcluidos).filter(Boolean).length, [estudosConcluidos]);

  // Prazos concluídos e pendentes
  const prazosConcluidos = eventos.filter(e => e.concluido).length;
  const prazosPendentes  = eventos.filter(e => !e.concluido && e.data < hojStr).length;
  const totalEventos     = eventos.length;

  // Pré-aulas
  const diasComPreAula = useMemo(() => {
    const dias = gerarDiasUteisDoSemestre().filter(d => d <= hojStr);
    return dias.filter(d => {
      const bloco = gerarBlocoManha(d, EVENTOS_INICIAIS);
      return bloco.tipo === 'pre_aula';
    });
  }, [hojStr]);

  const preAulasConcluidas = diasComPreAula.filter(d => estudosConcluidos[d]).length;

  const MENCAO_OPTIONS = ['SS', 'MS', 'MM', 'MI', 'II', 'SR'];

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">📊 Progresso</h1>
        <p className="aba-sub">Acompanhe sua evolução no semestre</p>
      </div>

      {/* Resumo rápido */}
      <div className="stats-grid">
        <div className="stat-card card">
          <span className="stat-num">{diasEstudados}</span>
          <span className="stat-label">Dias estudados</span>
        </div>
        <div className="stat-card card">
          <span className="stat-num">{prazosConcluidos}</span>
          <span className="stat-label">Prazos concluídos</span>
        </div>
        <div className="stat-card card" style={{ borderTop: prazosPendentes > 0 ? '3px solid #E74C3C' : '3px solid #6FCF97' }}>
          <span className="stat-num" style={{ color: prazosPendentes > 0 ? '#E74C3C' : '#6FCF97' }}>
            {prazosPendentes}
          </span>
          <span className="stat-label">Em atraso</span>
        </div>
        <div className="stat-card card">
          <span className="stat-num">
            {diasComPreAula.length > 0 ? Math.round((preAulasConcluidas / diasComPreAula.length) * 100) : 0}%
          </span>
          <span className="stat-label">Pré-aulas feitas</span>
        </div>
      </div>

      {/* Frequência por disciplina */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 className="card-titulo" style={{ marginBottom: 16 }}>Frequência por disciplina</h3>
        {aulasPorDisc.filter(d => d.total > 0).map(({ disc, total, assistidas }) => {
          const pct = total > 0 ? (assistidas / total) * 100 : 0;
          const baixa = pct < 75;
          return (
            <div key={disc.id} className="freq-row">
              <div className="freq-nome">
                <span className="freq-dot" style={{ background: disc.cor }} />
                <span>{disc.nome}</span>
              </div>
              <div className="freq-barra-cont">
                <div
                  className="freq-barra"
                  style={{ width: `${pct}%`, background: baixa ? '#E74C3C' : disc.cor }}
                />
              </div>
              <span className="freq-num" style={{ color: baixa ? '#E74C3C' : '#E0E0E0' }}>
                {assistidas}/{total} ({Math.round(pct)}%)
              </span>
            </div>
          );
        })}
      </div>

      {/* Menções (notas) */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 className="card-titulo" style={{ marginBottom: 16 }}>Menções por disciplina</h3>
        <p className="card-desc" style={{ marginBottom: 16 }}>Insira suas notas para acompanhar a situação de aprovação.</p>
        <div className="mencoes-grid">
          {DISCIPLINAS.map(disc => (
            <div key={disc.id} className="mencao-item">
              <span className="mencao-disc" style={{ color: disc.cor }}>{disc.nome}</span>
              <select
                className="filtro-select mencao-select"
                value={mencoes[disc.id] || ''}
                onChange={e => setMencoes(prev => ({ ...prev, [disc.id]: e.target.value }))}
              >
                <option value="">— Sem nota —</option>
                {MENCAO_OPTIONS.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              {mencoes[disc.id] && (
                <span className={`mencao-status ${['SS', 'MS', 'MM'].includes(mencoes[disc.id]) ? 'aprovado' : 'atencao'}`}>
                  {['SS', 'MS', 'MM'].includes(mencoes[disc.id]) ? '✓ Aprovado' : '⚠ Atenção'}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}