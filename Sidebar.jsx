// ============================================================
// PALMIERE STUDIO – Sidebar de Navegação
// ============================================================

import React from 'react';

const ABAS = [
  { id: 'hoje',         label: 'Hoje',           icone: '🏠' },
  { id: 'prazos',       label: 'Prazos',          icone: '📋' },
  { id: 'calendario',   label: 'Calendário',      icone: '📅' },
  { id: 'planos-aula',  label: 'Planos de Aula',  icone: '📚' },
  { id: 'planos-estudo',label: 'Planos de Estudo',icone: '📖' },
  { id: 'progresso',    label: 'Progresso',       icone: '📊' },
  { id: 'config',       label: 'Configurações',   icone: '⚙️' },
];

export default function Sidebar({ abaAtiva, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">Palmiere</span>
        <span className="logo-studio">Studio</span>
      </div>
      <nav className="sidebar-nav">
        {ABAS.map(aba => (
          <button
            key={aba.id}
            className={`sidebar-item ${abaAtiva === aba.id ? 'ativo' : ''}`}
            onClick={() => onChange(aba.id)}
          >
            <span className="sidebar-icone">{aba.icone}</span>
            <span className="sidebar-label">{aba.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>2026 · 1º Semestre</span>
      </div>
    </aside>
  );
}