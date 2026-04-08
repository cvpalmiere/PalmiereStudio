// ============================================================
// PALMIERE STUDIO – Aba Prazos
// ============================================================

import React, { useState, useMemo } from 'react';
import { getDisciplina, diasRestantes, formatDateBR, tipoEventoLabel } from './plano.js';
import { DISCIPLINAS } from './dados.js';

export default function Prazos({ eventos, concluirEvento, reabrirEvento }) {
  const [filtroDisciplina, setFiltroDisciplina] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('pendente');
  const [confirmando, setConfirmando] = useState(null);

  const eventosFiltrados = useMemo(() => {
    return [...eventos]
      .filter(e => !filtroDisciplina || e.disciplinaId === filtroDisciplina)
      .filter(e => !filtroTipo || e.tipo === filtroTipo)
      .filter(e => {
        if (filtroStatus === 'pendente') return !e.concluido;
        if (filtroStatus === 'concluido') return e.concluido;
        return true;
      })
      .sort((a, b) => a.data.localeCompare(b.data));
  }, [eventos, filtroDisciplina, filtroTipo, filtroStatus]);

  function handleConcluir(ev) {
    setConfirmando(ev);
  }

  function confirmarConclusao() {
    if (confirmando) {
      concluirEvento(confirmando.id);
      setConfirmando(null);
    }
  }

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">📋 Prazos</h1>
        <p className="aba-sub">Todos os eventos avaliativos do semestre</p>
      </div>

      <div className="filtros">
        <select className="filtro-select" value={filtroDisciplina} onChange={e => setFiltroDisciplina(e.target.value)}>
          <option value="">Todas as disciplinas</option>
          {DISCIPLINAS.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
        </select>
        <select className="filtro-select" value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}>
          <option value="">Todos os tipos</option>
          <option value="prova">Prova</option>
          <option value="trabalho">Trabalho</option>
          <option value="seminario">Seminário</option>
        </select>
        <select className="filtro-select" value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos</option>
          <option value="pendente">Pendentes</option>
          <option value="concluido">Concluídos</option>
        </select>
      </div>

      <div className="tabela-container">
        <table className="tabela-prazos">
          <thead>
            <tr>
              <th>Disciplina</th>
              <th>Evento</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Dias restantes</th>
              <th>Status</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {eventosFiltrados.length === 0 && (
              <tr><td colSpan={7} className="tabela-vazio">Nenhum evento encontrado.</td></tr>
            )}
            {eventosFiltrados.map(ev => {
              const disc = getDisciplina(ev.disciplinaId);
              const restam = diasRestantes(ev.data);
              const urgente = !ev.concluido && restam <= 3 && restam >= 0;
              const atrasado = !ev.concluido && restam < 0;
              return (
                <tr key={ev.id} className={ev.concluido ? 'concluido-row' : urgente ? 'urgente-row' : ''}>
                  <td><span className="disc-badge" style={{ background: disc?.cor + '33', color: disc?.cor, border: `1px solid ${disc?.cor}` }}>{disc?.nome}</span></td>
                  <td className="ev-titulo">{ev.titulo}</td>
                  <td><span className={`tipo-tag tipo-${ev.tipo}`}>{tipoEventoLabel(ev.tipo)}</span></td>
                  <td>{formatDateBR(ev.data)}</td>
                  <td>{ev.concluido ? <span className="tag-concluido">✓ Concluído</span> : atrasado ? <span className="tag-atrasado">Atrasado</span> : restam === 0 ? <span className="tag-urgente">Hoje!</span> : <span style={{ color: urgente ? '#E67E22' : '#E0E0E0' }}>{restam} dia{restam !== 1 ? 's' : ''}</span>}</td>
                  <td><span className={`status-dot ${ev.concluido ? 'done' : 'pending'}`}>{ev.concluido ? 'Concluído' : 'Pendente'}</span></td>
                  <td>{ev.concluido ? <button className="btn-outline btn-sm" onClick={() => reabrirEvento(ev.id)}>Reabrir</button> : <button className="btn-primario btn-sm" onClick={() => handleConcluir(ev)}>Concluir</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Confirmar conclusão</h3>
            <p>Marcar <strong>"{confirmando.titulo}"</strong> como concluído?</p>
            {diasRestantes(confirmando.data) > 0 && <p className="modal-aviso">⚡ Como ainda faltam {diasRestantes(confirmando.data)} dias, o plano será reorganizado automaticamente.</p>}
            <div className="modal-acoes">
              <button className="btn-secundario" onClick={() => setConfirmando(null)}>Cancelar</button>
              <button className="btn-primario" onClick={confirmarConclusao}>Confirmar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}