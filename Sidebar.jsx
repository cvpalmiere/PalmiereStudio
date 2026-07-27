import React from 'react';
import { 
  LayoutDashboard, 
  CalendarClock, 
  CalendarDays, 
  BookOpen, 
  GraduationCap, 
  LineChart, 
  Settings 
} from 'lucide-react';

const ABAS = [
  { id: 'hoje', label: 'Hoje', Icon: LayoutDashboard },
  { id: 'prazos', label: 'Prazos', Icon: CalendarClock },
  { id: 'calendario', label: 'Calendário', Icon: CalendarDays },
  { id: 'planos-aula', label: 'Planos de Aula', Icon: BookOpen },
  { id: 'planos-estudo', label: 'Planos de Estudo', Icon: GraduationCap },
  { id: 'progresso', label: 'Progresso', Icon: LineChart },
  { id: 'config', label: 'Configurações', Icon: Settings },
];

export default function Sidebar({ abaAtiva, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-text">Palmiere</span>
        <span className="logo-studio">Studio</span>
      </div>
      <nav className="sidebar-nav">
        {ABAS.map(({ id, label, Icon }) => (
          <button
            key={id}
            className={`sidebar-item ${abaAtiva === id ? 'ativo' : ''}`}
            onClick={() => onChange(id)}
          >
            <Icon className="sidebar-icone" size={18} />
            <span className="sidebar-label">{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-footer">
        <span>2026 · 2º Semestre</span>
      </div>
    </aside>
  );
}
