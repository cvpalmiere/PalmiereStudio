// ============================================================
// PALMIERE STUDIO – Aba Hoje (Dashboard Diário)
// ============================================================

import React, { useMemo } from 'react';
import {
  hojeISO, formatDateBR, gerarBlocoManha, getProximosPrazos,
  diasRestantes, tipoLabel, corBloco, getDisciplina
} from './plano.js';
import { AULAS } from './dados.js';

const DIAS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function saudacao(nome) {
  const h = new Date().getHours();
  if (h < 12) return `Bom dia, ${nome}!`;
  if (h < 18) return `Boa tarde, ${nome}!`;
  return `Boa noite, ${nome}!`;
}

export default function Hoje({
  eventos, config, edicoesManha, editarManha, abrirZen,
  estudosConcluidos, marcarEstudoConcluido, concluirEvento
}) {
  const hoje = hojeISO();
  const dateObj = new Date();
  const diaStr = `${DIAS_PT[dateObj.getDay()]}, ${dateObj.getDate()} de ${MESES_PT[dateObj.getMonth()]} de ${dateObj.getFullYear()}`;

  const aula = useMemo(() => AULAS.find(a => a.data === hoje) || null, [hoje]);
  const disc = aula ? getDisciplina(aula.disciplinaId) : null;

  const manha = useMemo(
    () => edicoesManha[hoje] || gerarBlocoManha(hoje, eventos),
    [hoje, edicoesManha, eventos]
  );

  const proximos = useMemo(() => getProximosPrazos(eventos, 3), [eventos]);
  const estudouHoje = estudosConcluidos[hoje] || false;

  return (
    <div className="aba-container">
      <div className="hoje-header">
        <h1 className="saudacao">{saudacao(config.nome)}</h1>
        <p className="data-hoje">{diaStr}</p>
      </div>

      <div className="hoje-grid">
        <div className="hoje-principal">
          <div className="card card-aula" style={{ borderLeft: `4px solid ${disc?.cor || '#444'}` }}>
            <div className="card-header">
              <span className="card-tag" style={{ background: disc?.cor || '#444' }}>
                {aula ? `Aula às ${disc?.horario}` : 'Sem aula presencial hoje'}
              </span>
            </div>
            {aula ? (
              <>
                <h2 className="card-titulo">{disc?.nome}</h2>
                <p className="card-sub">Prof. {disc?.professor}</p>
                <p className="card-conteudo">📌 {aula.tema}</p>
                <p className="card-desc">{aula.conteudo}</p>
              </>
            ) : (
              <>
                <h2 className="card-titulo">EAD – Estudo Autônomo</h2>
                <p className="card-desc">Hoje é dia de Bootcamp e Fundamentos de Engenharia.</p>
              </>
            )}
          </div>

          <div className="card card-manha" style={{ borderLeft: `4px solid ${corBloco(manha.tipo)}` }}>
            <div className="card-header">
              <span className="card-tag" style={{ background: corBloco(manha.tipo) }}>
                ☀️ Sua manhã (2h)
              </span>
              <span className="tipo-badge">{tipoLabel(manha.tipo)}</span>
            </div>
            <p className="card-conteudo">{manha.conteudo}</p>
            <div className="card-acoes">
              <button className="btn-primario" onClick={() => abrirZen(manha.conteudo)}>
                🎯 Iniciar foco
              </button>
              <button
                className={`btn-secundario ${estudouHoje ? 'concluido' : ''}`}
                onClick={() => marcarEstudoConcluido(hoje, !estudouHoje)}
              >
                {estudouHoje ? '✅ Estudei hoje' : '○ Marcar como estudado'}
              </button>
            </div>
          </div>

          <div className="card card-livre">
            <div className="card-header">
              <span className="card-tag" style={{ background: '#6FCF97' }}>🎓 30min livres</span>
            </div>
            <p className="card-conteudo">{config.estudoLivre}</p>
            <p className="card-sub">{config.cc50Modulo}</p>
            <button className="btn-outline" onClick={() => abrirZen(`${config.estudoLivre} – ${config.cc50Modulo}`)}>
              ▶ Iniciar (30 min)
            </button>
          </div>
        </div>

        <aside className="hoje-lateral">
          <div className="card card-prazos">
            <h3 className="lateral-titulo">⏰ Próximos prazos</h3>
            {proximos.length === 0 ? (
              <p className="vazio">Nenhum prazo próximo! 🎉</p>
            ) : (
              <ul className="lista-prazos">
                {proximos.map(ev => {
                  const d = getDisciplina(ev.disciplinaId);
                  const restam = diasRestantes(ev.data);
                  const urgente = restam <= 3;
                  return (
                    <li key={ev.id} className={`prazo-item ${urgente ? 'urgente' : ''}`}>
                      <div className="prazo-dot" style={{ background: d?.cor }} />
                      <div className="prazo-info">
                        <span className="prazo-titulo">{ev.titulo}</span>
                        <span className="prazo-sub">{d?.nome}</span>
                        <span className="prazo-data">{formatDateBR(ev.data)}</span>
                      </div>
                      <div className="prazo-dias" style={{ color: urgente ? '#E67E22' : '#A0A0A0' }}>
                        {restam === 0 ? 'Hoje' : restam < 0 ? 'Atrasado' : `${restam}d`}
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
          <MiniSemana hoje={hoje} eventos={eventos} />
        </aside>
      </div>
    </div>
  );
}

function MiniSemana({ hoje, eventos }) {
  const diasSemana = [];
  const cur = new Date();
  const dow = cur.getDay();
  const diff = dow === 0 ? -6 : 1 - dow;
  cur.setDate(cur.getDate() + diff);

  for (let i = 0; i < 5; i++) {
    const d = new Date(cur);
    const iso = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
    const temEvento = eventos.some(e => e.data === iso && !e.concluido);
    diasSemana.push({ iso, num: d.getDate(), dow: i });
    cur.setDate(cur.getDate() + 1);
  }

  const labels = ['Seg','Ter','Qua','Qui','Sex'];

  return (
    <div className="card mini-semana">
      <h3 className="lateral-titulo">📅 Esta semana</h3>
      <div className="mini-semana-grid">
        {diasSemana.map((dia, i) => (
          <div key={dia.iso} className={`mini-dia ${dia.iso === hoje ? 'mini-hoje' : ''}`}>
            <span className="mini-label">{labels[i]}</span>
            <span className="mini-num">{dia.num}</span>
            {dia.temEvento && <span className="mini-ponto" />}
          </div>
        ))}
      </div>
    </div>
  );
}