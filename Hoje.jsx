import React, { useMemo } from 'react';
import { 
  Clock, 
  BookOpen, 
  CheckCircle, 
  Circle, 
  Calendar,
  Moon
} from 'lucide-react';
import {
  hojeISO, formatDateBR, gerarBlocoManha, gerarBlocoNoturno,
  getProximosPrazos, diasRestantes, tipoLabel, corBloco, getDisciplina,
  gerarPlanoCyber, getEstudoCyberHoje
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

  // Plano do curso Cisco Ethical Hacker
  const planosCyber = useMemo(() => gerarPlanoCyber(), []);
  const estudoCyber = useMemo(() => getEstudoCyberHoje(planosCyber), [planosCyber]);

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

          {/* Manhã - 2h de estudo */}
          <div className="card card-manha" style={{ borderLeftColor: corBloco(manha.tipo) }}>
            <div className="card-header">
              <span className="card-tag" style={{ background: corBloco(manha.tipo) }}>
                <Clock size={14} style={{ display: 'inline', marginRight: 6 }} /> Manhã (2h)
              </span>
              <span className="tipo-badge">{tipoLabel(manha.tipo)}</span>
            </div>
            <p className="card-conteudo">{manha.conteudo}</p>
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

          {/* Estudo Livre - Cisco Ethical Hacker (1h) */}
          <div className="card card-livre">
            <div className="card-header">
              <span className="card-tag" style={{ background: '#7A8B6E' }}>
                <BookOpen size={14} style={{ display: 'inline', marginRight: 6 }} /> 
                Cisco Ethical Hacker (1h)
              </span>
            </div>
            <p className="card-conteudo">
              <strong>{config.cc50Modulo}</strong>
            </p>
            <p className="card-desc">
              {estudoCyber ? (
                <>
                  <span className="tipo-badge">{estudoCyber.tipo === 'teoria' ? '📖 Teoria' : '💻 Prática'}</span>
                  <span style={{ display: 'block', marginTop: 4, fontSize: 14, color: '#C9A8AC' }}>
                    {estudoCyber.conteudo}
                    {estudoCyber.extra && <span style={{ display: 'block', fontSize: 12, color: '#A88085' }}>{estudoCyber.extra}</span>}
                  </span>
                </>
              ) : (
                'Curso concluído ou pausado'
              )}
            </p>
            <p className="card-sub" style={{ marginTop: 8, fontSize: 11, color: '#A88085' }}>
              {estudoCyber ? `⏱ ${estudoCyber.duracao}` : '⏱ 1h diária'}
            </p>
          </div>
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
