import React, { useState } from 'react';
import { MODULOS_CYBER } from './dados.js';

export default function Configuracoes({ config, setConfig, mostrarNotificacao }) {
  const [form, setForm] = useState({ ...config });

  function salvar() {
    setConfig(form);
    mostrarNotificacao('Configurações salvas!');
  }

  function resetarDados() {
    if (window.confirm('Tem certeza? Todos os dados de progresso serão apagados.')) {
      localStorage.clear();
      window.location.reload();
    }
  }

  function exportarJSON() {
    const dados = {
      eventos: JSON.parse(localStorage.getItem('ps_eventos') || '[]'),
      aulas: JSON.parse(localStorage.getItem('ps_aulas') || '{}'),
      estudos: JSON.parse(localStorage.getItem('ps_estudos') || '{}'),
    };
    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palmiere-dados.json';
    a.click();
  }

  const upd = (k, v) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">Configurações</h1>
      </div>

      <div className="config-grid">
        <div className="card config-secao">
          <h3 className="config-titulo">Perfil</h3>
          <label className="config-label">Nome</label>
          <input className="config-input" value={form.nome} onChange={e => upd('nome', e.target.value)} />
        </div>

        <div className="card config-secao">
          <h3 className="config-titulo">Estudo livre (30 min)</h3>
          <label className="config-label">Tópico</label>
          <input className="config-input" value={form.estudoLivre} onChange={e => upd('estudoLivre', e.target.value)} />
          <label className="config-label" style={{marginTop:12}}>Módulo atual</label>
          <select className="filtro-select config-select" value={form.cc50Modulo} onChange={e => upd('cc50Modulo', e.target.value)}>
            {MODULOS_CYBER.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div className="card config-secao">
          <h3 className="config-titulo">Aparência</h3>
          <label className="config-label">Tamanho da fonte</label>
          <div className="config-radio-group">
            {[14, 16, 18].map(size => (
              <label key={size} className={`config-radio ${form.fontSize === size ? 'ativo' : ''}`}>
                <input type="radio" name="fontSize" value={size} checked={form.fontSize === size} onChange={() => upd('fontSize', size)} />
                {size}px
              </label>
            ))}
          </div>
        </div>

        <div className="card config-secao">
          <h3 className="config-titulo">Dados</h3>
          <div className="config-acoes">
            <button className="btn-outline" onClick={exportarJSON}>Exportar dados (JSON)</button>
            <button className="btn-danger" onClick={resetarDados}>Resetar semestre</button>
          </div>
          <p className="config-aviso">O reset apaga todo o progresso salvo (prazos concluídos, aulas assistidas, edições). Os dados base das disciplinas permanecem.</p>
        </div>
      </div>

      <button className="btn-primario" style={{marginTop:24}} onClick={salvar}>Salvar configurações</button>
    </div>
  );
}
