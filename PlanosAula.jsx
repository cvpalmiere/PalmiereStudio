import React, { useState } from 'react';
import { DISCIPLINAS, AULAS } from './dados.js';
import { formatDateBR } from './plano.js';
import { CheckCircle, Circle, ChevronDown, ChevronUp } from 'lucide-react';

export default function PlanosAula({ aulasAssistidas, marcarAulaAssistida }) {
  const [disciplinaAberta, setDisciplinaAberta] = useState('poo');

  const discPresenciais = DISCIPLINAS.filter(d => !d.ead);

  function AulaTabela({ discId, cor }) {
    const aulas = AULAS.filter(a => a.disciplinaId === discId).sort((a, b) => a.data.localeCompare(b.data));
    const total = aulas.length;
    const assistidas = aulas.filter(a => aulasAssistidas[a.id]).length;

    return (
      <div>
        <div className="progresso-mini">
          <div className="progresso-barra-cont">
            <div className="progresso-barra" style={{ width: `${(assistidas/total)*100}%`, background: cor }} />
          </div>
          <span className="progresso-label">{assistidas}/{total} aulas assistidas</span>
        </div>
        <div className="tabela-container">
          <table className="tabela-aulas">
            <thead>
              <tr>
                <th style={{width:40}}></th>
                <th>Data</th>
                <th>Tema</th>
                <th>Conteúdo</th>
                <th>Preparação</th>
                <th>Avaliação</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map(aula => (
                <tr key={aula.id} className={aulasAssistidas[aula.id] ? 'aula-assistida' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={!!aulasAssistidas[aula.id]}
                      onChange={e => marcarAulaAssistida(aula.id, e.target.checked)}
                      className="checkbox-aula"
                    />
                  </td>
                  <td style={{whiteSpace:'nowrap', color:'#A88085'}}>{formatDateBR(aula.data)}</td>
                  <td style={{fontWeight: 500}}>{aula.tema}</td>
                  <td style={{color:'#C9A8AC', fontSize:13}}>{aula.conteudo}</td>
                  <td style={{color:'#C9A8AC', fontSize:13}}>{aula.preparacao || '—'}</td>
                  <td>
                    {aula.avaliacao ? (
                      <span className="tag-avaliacao">{aula.avaliacao}</span>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="aba-container">
      <div className="aba-header">
        <h1 className="aba-titulo">Planos de Aula</h1>
        <p className="aba-sub">Cronograma completo de cada disciplina</p>
      </div>

      <div className="acordeon">
        {discPresenciais.map(disc => (
          <div key={disc.id} className="acordeon-item">
            <button
              className={`acordeon-header ${disciplinaAberta === disc.id ? 'aberto' : ''}`}
              style={{ borderLeft: `4px solid ${disc.cor}` }}
              onClick={() => setDisciplinaAberta(disciplinaAberta === disc.id ? null : disc.id)}
            >
              <div>
                <span className="acordeon-titulo">{disc.nome}</span>
                <span className="acordeon-sub">Prof. {disc.professor} · {['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'][disc.diaSemana]} às {disc.horario}</span>
              </div>
              <span className="acordeon-seta">{disciplinaAberta === disc.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}</span>
            </button>
            {disciplinaAberta === disc.id && (
              <div className="acordeon-body">
                <AulaTabela discId={disc.id} cor={disc.cor} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
