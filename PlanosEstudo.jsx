import React, { useState, useMemo } from 'react';
import { 
  gerarSemana, formatDateBR, tipoLabel, corBloco, hojeISO, parseDate, formatDateISO 
} from './plano.js';
import { Calendar, Edit, Moon } from 'lucide-react';

const DIAS_LABELS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

function getSemanas() {
  const semanas = [];
  const inicio = new Date(2026, 6, 27); // 27/07/2026
  const fim = new Date(2026, 11, 18);  // 18/12/2026
  const cur = new Date(inicio);
  while (cur <= fim) {
    semanas.push(formatDateISO(cur));
    cur.setDate(cur.getDate() + 7);
  }
  return semanas;
}

function semanaLabel(iso) {
  const d = new Date(iso + 'T12:00');
  const fim = new Date(d);
  fim.setDate(fim.getDate() + 4);
  return `${d.getDate()}/${d.getMonth()+1} – ${fim.getDate()}/${fim.getMonth()+1}`;
}

function getSemanaAtual() {
  const hoje = new Date();
  const dow = hoje.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  hoje.setDate(hoje.getDate() + diff);
  return formatDateISO(hoje);
}

export default function PlanosEstudo({ eventos, edicoesManha, editarManha }) {
  const semanas = useMemo(() => getSemanas(), []);
  const [semanaSelecionada, setSemanaSelecionada] = useState(getSemanaAtual);
  const [editando, setEditando] = useState(null);

  const diasSemana = useMemo(
    () => gerarSemana(semanaSelecionada, eventos, edicoesManha),
    [semanaSelecionada, eventos, edicoesManha]
  );

  function salvarEdicao() {
    if (!editando) return;
    editarManha(editando.dateStr, {
      tipo: 'livre',
      conteudo: editando.conteudo,
    });
    setEditando(null);
  }

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">Planos de Estudo</h1>
        <p className="aba-sub">Visualize e ajuste o plano gerado automaticamente</p>
      </div>

      <div className="plano-controles">
        <label className="filtro-label">
          <Calendar size={14} style={{ display: 'inline', marginRight: 6 }} />
          Semana:
        </label>
        <select
          className="filtro-select"
          value={semanaSelecionada}
          onChange={e => setSemanaSelecionada(e.target.value)}
        >
          {semanas.map(s => (
            <option key={s} value={s}>{semanaLabel(s)}</option>
          ))}
        </select>
      </div>

      <div className="plano-semana">
        {diasSemana.map((dia, i) => {
          const isHoje = dia.date === hojeISO();
          return (
            <div key={dia.date} className={`plano-card card ${isHoje ? 'plano-hoje' : ''}`}>
              <div className="plano-card-header">
                <span className="plano-dia-label">{DIAS_LABELS[i]}</span>
                <span className="plano-data">{formatDateBR(dia.date)}</span>
                {isHoje && <span className="hoje-badge">Hoje</span>}
              </div>

              {/* Manhã - 3 blocos */}
              <div className="plano-bloco" style={{ borderLeft: `3px solid ${corBloco(dia.manha.tipo)}` }}>
                <div className="plano-bloco-header">
                  <span className="plano-bloco-label">Manhã (3h)</span>
                  <button className="btn-outline btn-xs" onClick={() => setEditando({ dateStr: dia.date, conteudo: dia.manha.conteudo })}>
                    <Edit size={12} style={{ display: 'inline', marginRight: 4 }} /> Editar
                  </button>
                </div>
                
                {dia.manha.blocos && dia.manha.blocos.map((bloco, index) => (
                  <div key={index} style={{ 
                    padding: '6px 10px',
                    marginBottom: '6px',
                    background: 'var(--bg-card)',
                    borderRadius: '4px',
                    borderLeft: `3px solid ${corBloco(bloco.tipo)}`
                  }}>
                    <span className="plano-tipo" style={{ color: corBloco(bloco.tipo), fontSize: '10px' }}>
                      {tipoLabel(bloco.tipo)}
                    </span>
                    <p className="plano-conteudo" style={{ fontSize: '12px', fontWeight: 500 }}>
                      {bloco.titulo}
                    </p>
                    <p className="plano-conteudo" style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {bloco.conteudo}
                    </p>
                  </div>
                ))}
              </div>

              {/* Tarde - Aula presencial ou livre */}
              {dia.aula ? (
                <div className="plano-bloco" style={{ borderLeft: `3px solid ${dia.disciplina?.cor}` }}>
                  <span className="plano-bloco-label">Tarde (14h)</span>
                  <p className="plano-conteudo">
                    <strong>{dia.disciplina?.nome}</strong> – {dia.aula.tema}
                  </p>
                </div>
              ) : (
                <div className="plano-bloco plano-bloco-ead">
                  <span className="plano-bloco-label">Tarde</span>
                  <p className="plano-conteudo">Sem aula presencial</p>
                </div>
              )}

              {/* Noturno - Estudo livre nas sextas */}
              {dia.noturno && (
                <div className="plano-bloco" style={{ borderLeft: '3px solid #6B2A30', marginTop: 4 }}>
                  <div className="plano-bloco-header">
                    <span className="plano-bloco-label">
                      <Moon size={12} style={{ display: 'inline', marginRight: 4 }} /> Noite (Livre)
                    </span>
                  </div>
                  <p className="plano-conteudo">{dia.noturno.conteudo}</p>
                </div>
              )}

              {/* Eventos do dia */}
              {dia.eventosNoDia.length > 0 && (
                <div className="plano-eventos">
                  {dia.eventosNoDia.map(ev => (
                    <span key={ev.id} className={`plano-ev-tag ${ev.tipo}`}>
                      {ev.titulo}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal de edição da manhã */}
      {editando && (
        <div className="modal-overlay" onClick={() => setEditando(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Editar bloco de manhã</h3>
            <p style={{ color: '#A88085', marginBottom: 12 }}>
              {formatDateBR(editando.dateStr)}
            </p>
            <textarea
              className="textarea-edicao"
              value={editando.conteudo}
              onChange={e => setEditando(prev => ({ ...prev, conteudo: e.target.value }))}
              rows={4}
            />
            <div className="modal-acoes">
              <button className="btn-secundario" onClick={() => setEditando(null)}>Cancelar</button>
              <button className="btn-primario" onClick={salvarEdicao}>Salvar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
