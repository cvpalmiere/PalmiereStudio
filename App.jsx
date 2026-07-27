// ============================================================
// PALMIERE STUDIO – App Principal
// ============================================================

import React, { useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { EVENTOS_INICIAIS } from './dados.js';
import { hojeISO } from './plano.js';

import Sidebar from './Sidebar.jsx';
import Hoje from './Hoje.jsx';
import Prazos from './Prazos.jsx';
import Calendario from './Calendario.jsx';
import PlanosAula from './PlanosAula.jsx';
import PlanosEstudo from './PlanosEstudo.jsx';
import Progresso from './Progresso.jsx';
import Configuracoes from './Configuracoes.jsx';

export default function App() {
  const [aba, setAba] = useState('hoje');
  const [eventos, setEventos] = useLocalStorage('ps_eventos', EVENTOS_INICIAIS);
  const [aulasAssistidas, setAulasAssistidas] = useLocalStorage('ps_aulas', {});
  const [estudosConcluidos, setEstudosConcluidos] = useLocalStorage('ps_estudos', {});
  const [edicoesManha, setEdicoesManha] = useLocalStorage('ps_edicoes', {});
  const [config, setConfig] = useLocalStorage('ps_config', {
    nome: 'Carla',
    estudoLivre: 'Cibersegurança',
    cc50Modulo: 'Módulo 1 – Introdução à Cibersegurança',
    cargaHoraria: 2,
    fontSize: 16,
  });
  const [notificacao, setNotificacao] = useState(null);
  const [dataSelecionada, setDataSelecionada] = useState(hojeISO());

  function mostrarNotificacao(msg) {
    setNotificacao(msg);
    setTimeout(() => setNotificacao(null), 5000);
  }

  function concluirEvento(eventoId) {
    const ev = eventos.find(e => e.id === eventoId);
    if (!ev) return;
    const hoje = hojeISO();
    const antecipado = ev.data > hoje;

    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, concluido: true } : e));

    if (antecipado) {
      mostrarNotificacao(`Plano reorganizado! "${ev.titulo}" marcado como concluído antecipadamente. Os dias reservados agora serão usados para pré-aula.`);
    } else {
      mostrarNotificacao(`"${ev.titulo}" marcado como concluído.`);
    }
  }

  function reabrirEvento(eventoId) {
    setEventos(prev => prev.map(e => e.id === eventoId ? { ...e, concluido: false } : e));
  }

  function marcarAulaAssistida(aulaId, val) {
    setAulasAssistidas(prev => ({ ...prev, [aulaId]: val }));
  }

  function marcarEstudoConcluido(dateStr, val) {
    setEstudosConcluidos(prev => ({ ...prev, [dateStr]: val }));
  }

  function editarManha(dateStr, bloco) {
    setEdicoesManha(prev => ({ ...prev, [dateStr]: bloco }));
  }

  const props = {
    eventos,
    setEventos,
    concluirEvento,
    reabrirEvento,
    aulasAssistidas,
    marcarAulaAssistida,
    estudosConcluidos,
    marcarEstudoConcluido,
    edicoesManha,
    editarManha,
    config,
    setConfig,
    dataSelecionada,
    setDataSelecionada,
    mostrarNotificacao,
    navegarPara: setAba,
  };

  return (
    <div className="app">
      <Sidebar abaAtiva={aba} onChange={setAba} />
      <main className="main-content">
        {notificacao && (
          <div className="notificacao" onClick={() => setNotificacao(null)}>
            {notificacao}
          </div>
        )}
        {aba === 'hoje' && <Hoje {...props} />}
        {aba === 'prazos' && <Prazos {...props} />}
        {aba === 'calendario' && <Calendario {...props} />}
        {aba === 'planos-aula' && <PlanosAula {...props} />}
        {aba === 'planos-estudo' && <PlanosEstudo {...props} />}
        {aba === 'progresso' && <Progresso {...props} />}
        {aba === 'config' && <Configuracoes {...props} />}
      </main>
    </div>
  );
}