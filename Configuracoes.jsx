import React, { useState, useMemo } from 'react';
import { MODULOS_CYBER } from './dados.js';
import { gerarPlanoCyber, getSemanaCyberAtual } from './plano.js';

export default function Configuracoes({ config, setConfig, mostrarNotificacao }) {
  const [form, setForm] = useState({ ...config });

  const planosCyber = useMemo(() => gerarPlanoCyber(), []);
  const semanaAtual = useMemo(() => getSemanaCyberAtual(planosCyber), [planosCyber]);

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

  // Extrai apenas os nomes dos módulos para o dropdown
  const nomesModulos = MODULOS_CYBER.map(m => m.nome);

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
          <h3 className="config-titulo">Estudo livre (1h)</h3>
          <label className="config-label">Curso</label>
          <input className="config-input" value={form.estudoLivre} onChange={e => upd('estudoLivre', e.target.value)} />
          <label className="config-label" style={{marginTop:12}}>Módulo atual (Cisco Ethical Hacker)</label>
          <select className="filtro-select config-select" value={form.cc50Modulo} onChange={e => upd('cc50Modulo', e.target.value)}>
            {nomesModulos.map(m => <option key={m} value={m}>{m}</option>)}
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

        {/* Plano do Curso Cyber */}
        <div className="card config-secao" style={{ gridColumn: 'span 2', marginTop: 0 }}>
          <h3 className="config-titulo">📋 Plano do Curso Cisco Ethical Hacker</h3>
          <p className="config-label" style={{ textTransform: 'none', color: '#C9A8AC', marginBottom: 12 }}>
            {semanaAtual}
          </p>
          <div style={{ maxHeight: 300, overflowY: 'auto', background: '#1A1415', borderRadius: 8, padding: 12 }}>
            {planosCyber.map((semana, idx) => (
              <div key={idx} style={{ marginBottom: 12, borderBottom: '1px solid #3D2025', paddingBottom: 10 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#F5E6E6' }}>
                  Semana {semana.numero} – {semana.modulo}
                </p>
                {semana.dias.map((dia, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#A88085', padding: '2px 0 2px 12px', borderLeft: dia.tipo === 'teoria' ? '2px solid #6B2A30' : '2px solid #8B1A2B' }}>
                    {dia.diaSemana}: {dia.tipo === 'teoria' ? '📖' : '💻'} {dia.conteudo}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button className="btn-primario" style={{marginTop:24}} onClick={salvar}>Salvar configurações</button>
    </div>
  );
}
