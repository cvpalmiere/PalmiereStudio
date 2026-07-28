import React, { useMemo } from 'react';
import { 
  Clock, 
  CheckCircle, 
  Circle, 
  Calendar,
  Moon
} from 'lucide-react';
import {
  hojeISO, formatDateBR, gerarBlocoManha, gerarBlocoNoturno,
  getProximosPrazos, diasRestantes, tipoLabel, corBloco, getDisciplina
} from './plano.js';
import { AULAS } from './dados.js';

const DIAS_PT = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const MESES_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];

function saudacao(nome) {
  const h = new Date().getHours();
  if (h < 12) return `Bom dia, ${nome}`;
  if (h < 18) return `Boa tarde, ${nome}`;
  return `Boa noite, ${nome}`;
}

export default function Hoje({
  eventos, config, edicoesManha, editarManha,
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

  const noturno = useMemo(
    () => gerarBlocoNoturno(hoje, eventos),
    [hoje, eventos]
  );

  const proximos = useMemo(() => getProximosPrazos(eventos, 3), [eventos]);
  const estudouHoje = estudosConcluidos[hoje] || false;

  return (
    <div className="aba-container">
      <div className="hoje-header">
        <h1 className="saudacao">{saudacao(config.nome)}.</h1>
        <p className="data-hoje">{diaStr}</p>
      </div>

      <div className="hoje-grid">
        <div className="hoje-principal">
          {/* Aula do dia */}
          <div className="card card-aula" style={{ borderLeftColor: disc?.cor || '#444' }}>
            <div className="card-header">
              <span className="card-tag" style={{ background: disc?.cor || '#444' }}>
                {aula ? `Aula às ${disc?.horario}` : 'Sem aula presencial hoje'}
              </span>
            </div>
            {aula ? (
              <>
                <h2 className="card-titulo">{disc?.nome}</h2>
                <p className="card-sub">Prof. {disc?.professor}</p>
                <p className="card-conteudo">{aula.tema}</p>
                <p className="card-desc">{aula.conteudo}</p>
              </>
            ) : (
              <>
                <h2 className="card-titulo">Estudo Autônomo</h2>
                <p className="card-desc">Aproveite o dia para estudar livremente.</p>
              </>
            )}
          </div>

          {/* Manhã - 3h de estudo */}
          <div className="card card-manha" style={{ borderLeftColor: corBloco(manha.tipo) }}>
            <div className="card-header">
              <span className="card-tag" style={{ background: corBloco(manha.tipo) }}>
                <Clock size={14} style={{ display: 'inline', marginRight: 6 }} /> Manhã (3h)
              </span>
            </div>
            
            {manha.blocos && manha.blocos.map((bloco, index) => (
              <div key={index} className="bloco-manha-item" style={{ 
                borderLeft: `3px solid ${corBloco(bloco.tipo)}`,
                padding: '10px 14px',
                marginBottom: '8px',
                background: 'var(--bg-card-2)',
                borderRadius: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="tipo-badge" style={{ color: corBloco(bloco.tipo) }}>
                    {tipoLabel(bloco.tipo)}
                  </span>
                  {bloco.descricao && (
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                      {bloco.descricao}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '14px', marginTop: '4px', fontWeight: 500 }}>
                  {bloco.titulo}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--text-sub)' }}>
                  {bloco.conteudo}
                </p>
              </div>
            ))}
            
            <div className="card-acoes">
              <button
                className={`btn-secundario ${estudouHoje ? 'concluido' : ''}`}
                onClick={() => marcarEstudoConcluido(hoje, !estudouHoje)}
              >
                {estudouHoje ? <CheckCircle size={16} style={{ display: 'inline', marginRight: 6 }} /> : <Circle size={16} style={{ display: 'inline', marginRight: 6 }} />}
                {estudouHoje ? 'Estudei hoje' : 'Marcar como estudado'}
              </button>
            </div>
          </div>

          {/* Estudo Noturno (sextas) */}
          {noturno && (
            <div className="card card-noturno" style={{ borderLeftColor: '#6B2A30' }}>
              <div className="card-header">
                <span className="card-tag" style={{ background: '#6B2A30' }}>
                  <Moon size={14} style={{ display: 'inline', marginRight: 6 }} /> Noite (Livre)
                </span>
                <span className="tipo-badge">{noturno.titulo}</span>
              </div>
              <p className="card-conteudo">{noturno.conteudo}</p>
            </div>
          )}
        </div>

        {/* Lateral */}
        <aside className="hoje-lateral">
          <div className="card card-prazos">
            <h3 className="lateral-titulo">Próximos Prazos</h3>
            {proximos.length === 0 ? (
              <p className="vazio">Nenhum prazo próximo!</p>
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
                      <div className="prazo-dias" style={{ color: urgente ? '#C47B3A' : '#A88085' }}>
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

  const labels = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex'];

  return (
    <div className="card mini-semana">
      <h3 className="lateral-titulo"><Calendar size={14} style={{ display: 'inline', marginRight: 6 }} /> Esta semana</h3>
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
