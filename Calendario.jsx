import React, { useState, useMemo } from 'react';
import { AULAS } from './dados.js';
import { getDisciplina, formatDateISO, gerarBlocoManha, tipoLabel, corBloco } from './plano.js';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const MESES = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
const DIAS_SEMANA = ['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'];

export default function Calendario({ eventos, edicoesManha }) {
  const hoje = new Date();
  const [ano, setAno] = useState(hoje.getFullYear());
  const [mes, setMes] = useState(hoje.getMonth());
  const [diaSelecionado, setDiaSelecionado] = useState(null);

  const diasDoMes = useMemo(() => {
    const resultado = [];
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);

    let dowInicio = primeiroDia.getDay();
    if (dowInicio === 0) dowInicio = 7;
    dowInicio -= 1;

    for (let i = 0; i < dowInicio; i++) resultado.push(null);

    for (let d = 1; d <= ultimoDia.getDate(); d++) {
      const date = new Date(ano, mes, d);
      const iso = formatDateISO(date);
      const evsDia = eventos.filter(e => e.data === iso);
      const aulasDia = AULAS.filter(a => a.data === iso);
      resultado.push({ dia: d, iso, dow: date.getDay(), evsDia, aulasDia });
    }

    return resultado;
  }, [ano, mes, eventos]);

  function navMes(delta) {
    let m = mes + delta;
    let a = ano;
    if (m < 0) { m = 11; a--; }
    if (m > 11) { m = 0; a++; }
    setMes(m);
    setAno(a);
  }

  const diaInfo = useMemo(() => {
    if (!diaSelecionado) return null;
    const evs = eventos.filter(e => e.data === diaSelecionado);
    const aulas = AULAS.filter(a => a.data === diaSelecionado);
    const manha = edicoesManha[diaSelecionado] || gerarBlocoManha(diaSelecionado, eventos);
    return { evs, aulas, manha };
  }, [diaSelecionado, eventos, edicoesManha]);

  const hojIso = formatDateISO(hoje);

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">Calendário</h1>
      </div>

      <div className="cal-layout">
        <div className="cal-principal">
          <div className="cal-nav">
            <button className="btn-outline" onClick={() => navMes(-1)}><ChevronLeft size={18} /></button>
            <h2 className="cal-mes-titulo">{MESES[mes]} {ano}</h2>
            <button className="btn-outline" onClick={() => navMes(1)}><ChevronRight size={18} /></button>
          </div>

          <div className="cal-grid">
            {DIAS_SEMANA.map(d => (
              <div key={d} className="cal-header-dia">{d}</div>
            ))}
            {diasDoMes.map((item, i) => {
              if (!item) return <div key={`vazio-${i}`} />
              const isHoje = item.iso === hojIso;
              const isSelecionado = item.iso === diaSelecionado;
              const isWeekend = item.dow === 0 || item.dow === 6;

              return (
                <div
                  key={item.iso}
                  className={`cal-dia ${isHoje ? 'cal-hoje' : ''} ${isSelecionado ? 'cal-selecionado' : ''} ${isWeekend ? 'cal-weekend' : ''}`}
                  onClick={() => setDiaSelecionado(isSelecionado ? null : item.iso)}
                >
                  <span className="cal-num">{item.dia}</span>
                  <div className="cal-pontos">
                    {item.evsDia.slice(0, 3).map(ev => {
                      const disc = getDisciplina(ev.disciplinaId);
                      return (
                        <span
                          key={ev.id}
                          className="cal-ponto"
                          style={{ background: disc?.cor || '#888' }}
                          title={ev.titulo}
                        />
                      );
                    })}
                    {item.aulasDia.map(a => {
                      const disc = getDisciplina(a.disciplinaId);
                      return (
                        <span
                          key={a.id}
                          className="cal-ponto cal-ponto-aula"
                          style={{ background: disc?.cor + '88' }}
                          title={`Aula: ${a.tema}`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="cal-legenda">
            <span className="legenda-item"><span className="cal-ponto" style={{ background: '#8B1A2B' }} /> Evento avaliativo</span>
            <span className="legenda-item"><span className="cal-ponto" style={{ background: '#6B2A30' }} /> Aula</span>
          </div>
        </div>

        {diaSelecionado && diaInfo && (
          <div className="cal-detalhe card">
            <h3 className="cal-detalhe-titulo">
              {new Date(diaSelecionado + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </h3>

            {diaInfo.aulas.length > 0 && (
              <div className="cal-secao">
                <p className="cal-secao-label">Aulas</p>
                {diaInfo.aulas.map(a => {
                  const disc = getDisciplina(a.disciplinaId);
                  return (
                    <div key={a.id} className="cal-item-aula" style={{ borderLeft: `3px solid ${disc?.cor}` }}>
                      <strong>{disc?.nome}</strong> – {a.tema}
                      <p style={{ fontSize: 13, color: '#A88085', margin: '4px 0 0' }}>{a.conteudo}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {diaInfo.evs.length > 0 && (
              <div className="cal-secao">
                <p className="cal-secao-label">Eventos avaliativos</p>
                {diaInfo.evs.map(ev => {
                  const disc = getDisciplina(ev.disciplinaId);
                  return (
                    <div key={ev.id} className="cal-item-ev">
                      <span className="cal-ponto" style={{ background: disc?.cor }} />
                      <span>{ev.titulo}</span>
                      {ev.concluido && <span className="tag-concluido" style={{ marginLeft: 6 }}>Concluído</span>}
                    </div>
                  );
                })}
              </div>
            )}

            <div className="cal-secao">
              <p className="cal-secao-label">Estudo da manhã</p>
              <div className="cal-item-manha" style={{ borderLeft: `3px solid ${corBloco(diaInfo.manha.tipo)}` }}>
                <strong style={{ color: corBloco(diaInfo.manha.tipo) }}>
                  {tipoLabel(diaInfo.manha.tipo)}
                </strong>
                <p style={{ margin: '4px 0 0', color: '#C9A8AC', fontSize: 13 }}>
                  {diaInfo.manha.conteudo}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
