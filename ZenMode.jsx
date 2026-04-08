// ============================================================
// PALMIERE STUDIO – Modo Zen (foco)
// ============================================================

import React, { useState, useEffect, useCallback } from 'react';

export default function ZenMode({ conteudo, onSair }) {
  const [minutos, setMinutos] = useState(25);
  const [segundos, setSegundos] = useState(0);
  const [rodando, setRodando] = useState(false);
  const [duracao, setDuracao] = useState(25); // minutos totais

  const totalSeg = duracao * 60;
  const restante = minutos * 60 + segundos;
  const pct = rodando || restante < totalSeg ? ((totalSeg - restante) / totalSeg) * 100 : 0;

  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onSair(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onSair]);

  useEffect(() => {
    if (!rodando) return;
    const id = setInterval(() => {
      setSegundos(s => {
        if (s > 0) return s - 1;
        setMinutos(m => {
          if (m > 0) return m - 1;
          setRodando(false);
          try {
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(528, ctx.currentTime);
            gain.gain.setValueAtTime(0.3, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
            osc.start();
            osc.stop(ctx.currentTime + 1.5);
          } catch {}
          return 0;
        });
        return 59;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [rodando]);

  function resetar() {
    setRodando(false);
    setMinutos(duracao);
    setSegundos(0);
  }

  function mudarDuracao(mins) {
    setDuracao(mins);
    setMinutos(mins);
    setSegundos(0);
    setRodando(false);
  }

  const pad = n => String(n).padStart(2, '0');
  const R = 90;
  const circunferencia = 2 * Math.PI * R;
  const dash = circunferencia - (pct / 100) * circunferencia;
  const concluido = restante === 0 && (rodando === false);

  return (
    <div className="zen-overlay">
      <button className="zen-sair" onClick={onSair}>✕ Sair (ESC)</button>

      <div className="zen-conteudo">
        <p className="zen-label">Estudando agora:</p>
        <p className="zen-texto">{conteudo}</p>
      </div>

      <div className="zen-timer-area">
        <svg className="zen-circulo" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r={R} className="zen-circulo-bg" />
          <circle cx="100" cy="100" r={R} className="zen-circulo-prog" strokeDasharray={circunferencia} strokeDashoffset={dash} transform="rotate(-90 100 100)" />
          <text x="100" y="108" textAnchor="middle" className="zen-tempo-svg">{pad(minutos)}:{pad(segundos)}</text>
        </svg>

        {concluido && <p className="zen-concluido">🎉 Tempo concluído! Ótimo trabalho!</p>}

        <div className="zen-botoes">
          <button className="zen-btn" onClick={() => setRodando(r => !r)}>{rodando ? '⏸ Pausar' : '▶ Iniciar'}</button>
          <button className="zen-btn zen-btn-outline" onClick={resetar}>⟳ Resetar</button>
        </div>

        <div className="zen-duracao">
          {[15, 25, 30, 50].map(m => (
            <button key={m} className={`zen-dur-btn ${duracao === m ? 'ativo' : ''}`} onClick={() => mudarDuracao(m)}>{m}min</button>
          ))}
        </div>
      </div>
    </div>
  );
}