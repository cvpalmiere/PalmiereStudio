import React, { useState } from 'react';

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
          <h3 className="config-titulo">Cursos Extras (Bloco 3 da Manhã)</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
            Seus cursos extras já estão definidos para cada dia da semana.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <div style={{ background: 'var(--bg-card-2)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Segunda</span>
              <p style={{ fontSize: '13px' }}>Java (Coddy)</p>
            </div>
            <div style={{ background: 'var(--bg-card-2)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Terça</span>
              <p style={{ fontSize: '13px' }}>SQL (Coddy)</p>
            </div>
            <div style={{ background: 'var(--bg-card-2)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quarta</span>
              <p style={{ fontSize: '13px' }}>Java (Certificado)</p>
            </div>
            <div style={{ background: 'var(--bg-card-2)', padding: '8px 12px', borderRadius: '6px' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quinta</span>
              <p style={{ fontSize: '13px' }}>HTML/CSS/JS (Coddy)</p>
            </div>
            <div style={{ background: 'var(--bg-card-2)', padding: '8px 12px', borderRadius: '6px', gridColumn: 'span 2' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Sexta</span>
              <p style={{ fontSize: '13px' }}>Java (Coddy)</p>
            </div>
          </div>
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
