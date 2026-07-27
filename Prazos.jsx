import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  MoreVertical, 
  Circle, 
  CheckCircle,
  X
} from 'lucide-react';
import { getDisciplina, diasRestantes, formatDateBR, tipoEventoLabel } from './plano.js';
import { DISCIPLINAS } from './dados.js';

export default function Prazos({ eventos, concluirEvento, reabrirEvento, setEventos }) {
  const [filtroDisciplina, setFiltroDisciplina] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('pendente');
  const [confirmando, setConfirmando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [novoPrazo, setNovoPrazo] = useState({
    disciplinaId: '',
    titulo: '',
    tipo: 'prova',
    data: '',
    prioridadeEstudo: '',
  });

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

  function criarPrazo() {
    if (!novoPrazo.disciplinaId || !novoPrazo.titulo || !novoPrazo.data) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const novoId = `manual_${Date.now()}`;
    const novoEvento = {
      id: novoId,
      disciplinaId: novoPrazo.disciplinaId,
      tipo: novoPrazo.tipo,
      titulo: novoPrazo.titulo,
      data: novoPrazo.data,
      prioridadeEstudo: novoPrazo.prioridadeEstudo || null,
      concluido: false,
    };

    setEventos(prev => [...prev, novoEvento]);
    setModalAberto(false);
    setNovoPrazo({
      disciplinaId: '',
      titulo: '',
      tipo: 'prova',
      data: '',
      prioridadeEstudo: '',
    });
  }

  return (
    <div className="aba-container">
      <div className="aba-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 className="aba-titulo">Prazos</h1>
          <p className="aba-sub">Todos os eventos avaliativos do semestre</p>
        </div>
        <button className="btn-primario" onClick={() => setModalAberto(true)}>
          <Plus size={16} style={{ display: 'inline', marginRight: 6 }} /> Criar Prazo
        </button>
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
                  <td>{ev.concluido ? <span className="tag-concluido">Concluído</span> : atrasado ? <span className="tag-atrasado">Atrasado</span> : restam === 0 ? <span className="tag-urgente">Hoje!</span> : <span style={{ color: urgente ? '#C47B3A' : '#A88085' }}>{restam} dia{restam !== 1 ? 's' : ''}</span>}</td>
                  <td><span className={`status-dot ${ev.concluido ? 'done' : 'pending'}`}>{ev.concluido ? 'Concluído' : 'Pendente'}</span></td>
                  <td>{ev.concluido ? <button className="btn-outline btn-sm" onClick={() => reabrirEvento(ev.id)}>Reabrir</button> : <button className="btn-primario btn-sm" onClick={() => handleConcluir(ev)}>Concluir</button>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmação */}
      {confirmando && (
        <div className="modal-overlay" onClick={() => setConfirmando(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>Confirmar conclusão</h3>
            <p>Marcar <strong>"{confirmando.titulo}"</strong> como concluído?</p>
            {diasRestantes(confirmando.data) > 0 && <p className="modal-aviso">Como ainda faltam {diasRestantes(confirmando.data)} dias, o plano será reorganizado automaticamente.</p>}
            <div className="modal-acoes">
              <button className="btn-secundario" onClick={() => setConfirmando(null)}>Cancelar</button>
              <button className="btn-primario" onClick={confirmarConclusao}>Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de criar prazo */}
      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3>Criar Novo Prazo</h3>
              <button onClick={() => setModalAberto(false)} style={{ background: 'none', border: 'none', color: '#A88085', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div>
                <label style={{ fontSize: 12, color: '#A88085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Disciplina *</label>
                <select 
                  className="filtro-select" 
                  style={{ width: '100%' }}
                  value={novoPrazo.disciplinaId}
                  onChange={e => setNovoPrazo(prev => ({ ...prev, disciplinaId: e.target.value }))}
                >
                  <option value="">Selecione uma disciplina</option>
                  {DISCIPLINAS.map(d => <option key={d.id} value={d.id}>{d.nome}</option>)}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#A88085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Descrição *</label>
                <input 
                  type="text" 
                  className="config-input" 
                  placeholder="Ex: Lista de Exercícios 5"
                  value={novoPrazo.titulo}
                  onChange={e => setNovoPrazo(prev => ({ ...prev, titulo: e.target.value }))}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12, color: '#A88085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Data *</label>
                  <input 
                    type="date" 
                    className="config-input" 
                    value={novoPrazo.data}
                    onChange={e => setNovoPrazo(prev => ({ ...prev, data: e.target.value }))}
                  />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: '#A88085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Tipo *</label>
                  <select 
                    className="filtro-select" 
                    style={{ width: '100%' }}
                    value={novoPrazo.tipo}
                    onChange={e => setNovoPrazo(prev => ({ ...prev, tipo: e.target.value }))}
                  >
                    <option value="prova">Prova</option>
                    <option value="trabalho">Trabalho</option>
                    <option value="seminario">Seminário</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12, color: '#A88085', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 4 }}>Prioridade de Estudo (opcional)</label>
                <input 
                  type="date" 
                  className="config-input" 
                  value={novoPrazo.prioridadeEstudo}
                  onChange={e => setNovoPrazo(prev => ({ ...prev, prioridadeEstudo: e.target.value }))}
                />
                <p style={{ fontSize: 11, color: '#A88085', marginTop: 4 }}>Data em que o estudo para este prazo deve começar.</p>
              </div>
            </div>

            <div className="modal-acoes">
              <button className="btn-secundario" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-primario" onClick={criarPrazo}>Salvar Prazo</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
