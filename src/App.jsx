import { useState, useEffect, useRef } from "react";
import { decks } from "./cards";

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ── Modal overlay ──────────────────────────────────────────────────────────────
function Modal({ children }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      background: 'rgba(0,0,0,0.65)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '1rem',
    }}>
      {children}
    </div>
  );
}

// ── End-of-turn popup ──────────────────────────────────────────────────────────
function TurnEndModal({ team, roundScores, roundTaboo, onContinue, onEndGame }) {
  const net = (roundScores[team] || 0) - (roundTaboo[team] || 0);
  return (
    <Modal>
      <div style={{
        background: '#fff', borderRadius: 24, padding: '2rem',
        maxWidth: 380, width: '100%', textAlign: 'center',
        boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
      }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>⏱️</div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          Tempo scaduto!
        </h2>
        <p style={{ color: '#555', marginBottom: 20 }}>
          Fine turno — <strong>Squadra {team}</strong>
        </p>

        <div style={{
          background: '#f5f5f5', borderRadius: 14, padding: '1rem',
          marginBottom: 24, display: 'flex', justifyContent: 'space-around',
        }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#16a34a' }}>
              +{roundScores[team] || 0}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>Corrette</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800, color: '#dc2626' }}>
              -{roundTaboo[team] || 0}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>Taboo</div>
          </div>
          <div>
            <div style={{ fontSize: 28, fontWeight: 800 }}>
              {net >= 0 ? '+' : ''}{net}
            </div>
            <div style={{ fontSize: 12, color: '#888' }}>Netto</div>
          </div>
        </div>

        <button
          onClick={onContinue}
          style={{
            width: '100%', padding: '14px', borderRadius: 14,
            background: '#111', color: '#fff', fontWeight: 700,
            fontSize: 16, border: 'none', cursor: 'pointer', marginBottom: 10,
          }}
        >
          ▶ Avvia turno Squadra {team === 1 ? 2 : 1}
        </button>
        <button
          onClick={onEndGame}
          style={{
            width: '100%', padding: '12px', borderRadius: 14,
            background: 'transparent', color: '#888', fontWeight: 500,
            fontSize: 14, border: '1px solid #ddd', cursor: 'pointer',
          }}
        >
          Termina partita
        </button>
      </div>
    </Modal>
  );
}

// ── Winner screen components ───────────────────────────────────────────────────
function MedalComponent({ team, net, correct, taboo, isWinner }) {
  return (
    <div style={{
      background: isWinner ? '#111' : '#f5f5f5',
      color: isWinner ? '#fff' : '#333',
      borderRadius: 20, padding: '1.5rem 1rem',
      flex: 1, textAlign: 'center',
      border: isWinner ? 'none' : '1.5px solid #e5e5e5',
      position: 'relative',
    }}>
      {isWinner && (
        <div style={{ fontSize: 32, marginBottom: 4 }}>🏆</div>
      )}
      <div style={{ fontSize: 13, fontWeight: 600, opacity: 0.6, marginBottom: 4 }}>
        SQUADRA {team}
      </div>
      <div style={{ fontSize: 48, fontWeight: 900, lineHeight: 1 }}>
        {net >= 0 ? '+' : ''}{net}
      </div>
      <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>punti netti</div>
      <div style={{
        marginTop: 16, display: 'flex', justifyContent: 'space-around',
        borderTop: `1px solid ${isWinner ? 'rgba(255,255,255,0.15)' : '#e5e5e5'}`,
        paddingTop: 12,
      }}>
        <div>
          <div style={{ fontWeight: 700, color: isWinner ? '#86efac' : '#16a34a' }}>{correct}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>✓ ok</div>
        </div>
        <div>
          <div style={{ fontWeight: 700, color: isWinner ? '#fca5a5' : '#dc2626' }}>{taboo}</div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>🚫 taboo</div>
        </div>
      </div>
    </div>
  );
}

// ── Winner screen ──────────────────────────────────────────────────────────────
function WinnerScreen({ scores, tabooScores, onRestart }) {
  const net1 = scores[1] - tabooScores[1];
  const net2 = scores[2] - tabooScores[2];
  const tied = net1 === net2;
  const winner = net1 > net2 ? 1 : 2;
  const loser = winner === 1 ? 2 : 1;

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      justifyContent: 'center', background: '#fafafa', padding: '1.5rem',
    }}>
      <div style={{ maxWidth: 440, width: '100%', textAlign: 'center' }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>
          {tied ? '🤝' : '🎉'}
        </div>
        <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 4 }}>
          {tied ? 'Pareggio!' : `Vince la Squadra ${winner}!`}
        </h1>
        <p style={{ color: '#888', marginBottom: 32, fontSize: 15 }}>
          {tied
            ? 'Nessuno dei due merita la vittoria 😄'
            : `La Squadra ${loser} ci riproverà la prossima volta`}
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
          {tied ? (
            <>
              <MedalComponent team={1} net={net1} correct={scores[1]} taboo={tabooScores[1]} isWinner={false} />
              <MedalComponent team={2} net={net2} correct={scores[2]} taboo={tabooScores[2]} isWinner={false} />
            </>
          ) : (
            <>
              <MedalComponent team={winner} net={winner === 1 ? net1 : net2} correct={scores[winner]} taboo={tabooScores[winner]} isWinner={true} />
              <MedalComponent team={loser} net={loser === 1 ? net1 : net2} correct={scores[loser]} taboo={tabooScores[loser]} isWinner={false} />
            </>
          )}
        </div>

        <button
          onClick={onRestart}
          style={{
            width: '100%', padding: '16px', borderRadius: 16,
            background: '#111', color: '#fff', fontWeight: 700,
            fontSize: 17, border: 'none', cursor: 'pointer',
          }}
        >
          🔄 Nuova partita
        </button>
      </div>
    </div>
  );
}

// ── Main game ──────────────────────────────────────────────────────────────────
export default function TabooGameApp() {
  const [roundTime, setRoundTime] = useState(60);
  const [maxPasses, setMaxPasses] = useState(3);
  const [selectedDeck, setSelectedDeck] = useState('Facile');

  // game phases: 'setup' | 'playing' | 'turnEnd' | 'finished'
  const [phase, setPhase] = useState('setup');

  const [cardsState, setCardsState] = useState([]);
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState(1);                     // active team
  const [scores, setScores] = useState({ 1: 0, 2: 0 });   // cumulative
  const [tabooScores, setTabooScores] = useState({ 1: 0, 2: 0 });

  // per-turn accumulators (reset each turn, shown in TurnEndModal)
  const [turnScores, setTurnScores] = useState({ 1: 0, 2: 0 });
  const [turnTaboo, setTurnTaboo] = useState({ 1: 0, 2: 0 });

  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [passesLeft, setPassesLeft] = useState(3);

  const timerRef = useRef(null);

  // Fix: Evitiamo letture undefined estraendo in sicurezza
  const current = cardsState.length > 0 ? cardsState[index] : null;

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || isPaused) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase('turnEnd');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [phase, isPaused]);

  // ── Actions ────────────────────────────────────────────────────────────────
  const nextCard = () => {
    if (cardsState.length > 0) {
      setIndex((i) => (i + 1) % cardsState.length);
    }
  };

  const correct = () => {
    setScores((s) => ({ ...s, [team]: s[team] + 1 }));
    setTurnScores((s) => ({ ...s, [team]: s[team] + 1 }));
    nextCard();
  };

  const tabooHit = () => {
    setTabooScores((s) => ({ ...s, [team]: s[team] + 1 }));
    setTurnTaboo((s) => ({ ...s, [team]: s[team] + 1 }));
    nextCard();
  };

  const pass = () => {
    if (passesLeft <= 0) return;
    setPassesLeft((p) => p - 1);
    nextCard();
  };

  // ── Start game (first team) ────────────────────────────────────────────────
  const startGame = () => {
    setCardsState(shuffle(decks[selectedDeck]));
    setIndex(0);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTurnScores({ 1: 0, 2: 0 });
    setTurnTaboo({ 1: 0, 2: 0 });
    setTeam(1);
    setTimeLeft(roundTime);          
    setPassesLeft(maxPasses);
    setIsPaused(false);
    setPhase('playing');
  };

  // ── Continue to next team's turn ───────────────────────────────────────────
  const continueTurn = () => {
    const nextTeam = team === 1 ? 2 : 1;
    setTeam(nextTeam);
    setTimeLeft(roundTime);          
    setPassesLeft(maxPasses);
    setTurnScores({ 1: 0, 2: 0 });
    setTurnTaboo({ 1: 0, 2: 0 });
    setIsPaused(false);
    nextCard(); // Passa alla parola successiva per il nuovo turno
    setPhase('playing');
  };

  const endGame = () => setPhase('finished');

  const restart = () => {
    setPhase('setup');
    setTeam(1);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTimeLeft(roundTime);
  };

  // ── Timer color ────────────────────────────────────────────────────────────
  const timerColor = timeLeft > 10 ? '#fff' : '#f87171';
  const timerPct = Math.min((timeLeft / roundTime) * 100, 100);

  // ── Render ─────────────────────────────────────────────────────────────────
  if (phase === 'finished') {
    return <WinnerScreen scores={scores} tabooScores={tabooScores} onRestart={restart} />;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">

      {/* Turn-end modal */}
      {phase === 'turnEnd' && (
        <TurnEndModal
          team={team}
          roundScores={turnScores}
          roundTaboo={turnTaboo}
          onContinue={continueTurn}
          onEndGame={endGame}
        />
      )}

      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-6">🎭 Taboo Game</h1>

        {/* Setup + scoreboard */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <h2 className="font-bold mb-3">⚙️ Setup</h2>
            <label className="text-sm text-gray-500 block mb-1">Secondi per turno</label>
            <input
              type="number"
              value={roundTime}
              onChange={(e) => {
                const val = Math.max(5, Number(e.target.value));
                setRoundTime(val);
                if (phase === 'setup') setTimeLeft(val);
              }}
              disabled={phase === 'playing'}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <label className="text-sm text-gray-500 block mb-1">Passaggi massimi</label>
            <input
              type="number"
              value={maxPasses}
              onChange={(e) => setMaxPasses(Math.max(0, Number(e.target.value)))}
              disabled={phase === 'playing'}
              className="w-full p-2 border rounded-xl mb-3"
            />
            <label className="text-sm text-gray-500 block mb-1">Seleziona Mazzo (Deck)</label>
            <select
              value={selectedDeck}
              onChange={(e) => setSelectedDeck(e.target.value)}
              disabled={phase === 'playing'}
              className="w-full p-2 bg-white border rounded-xl mb-3 font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="Facile">🟢 Facile (100 parole)</option>
              <option value="Difficile">🔴 Difficile (100 parole)</option>
            </select>
            <button
              onClick={startGame}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold"
            >
              {phase === 'setup' ? 'Inizia partita' : '🔄 Ricomincia'}
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl">
            <h2 className="font-bold mb-3">🏆 Punteggio totale</h2>
            {[1, 2].map((t) => (
              <div key={t} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0',
                borderBottom: t === 1 ? '1px solid #eee' : 'none',
              }}>
                <span style={{ fontWeight: team === t && phase === 'playing' ? 700 : 400 }}>
                  {team === t && phase === 'playing' ? '▶ ' : ''}Squadra {t}
                </span>
                <span>
                  <span style={{ color: '#16a34a', fontWeight: 600 }}>{scores[t]}</span>
                  {tabooScores[t] > 0 && (
                    <span style={{ color: '#dc2626', fontWeight: 600 }}> -{tabooScores[t]}</span>
                  )}
                  <span style={{ marginLeft: 8, fontWeight: 700 }}>
                    = {scores[t] - tabooScores[t]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Game card */}
        <div className="bg-black text-white p-6 rounded-3xl text-center">
          {/* Timer bar */}
          <div style={{
            height: 4, borderRadius: 2,
            background: 'rgba(255,255,255,0.15)',
            marginBottom: 14,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${timerPct}%`,
              background: timeLeft > 10 ? '#fff' : '#f87171',
              transition: 'width 1s linear, background 0.3s',
            }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, alignItems: 'center' }}>
            <span style={{ fontWeight: 600, fontSize: 15 }}>
              {phase === 'playing' ? `Squadra ${team}` : '—'}
            </span>
            <span style={{ fontSize: 28, fontWeight: 900, color: timerColor }}>
              {timeLeft}s
            </span>
          </div>

          <h2 className="text-4xl font-bold mb-4">
            {phase === 'playing' && current ? current.word : '?'}
          </h2>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {(phase === 'playing' && current ? current.taboo : ['—', '—', '—', '—', '—']).map((w, i) => (
              <div key={i} className="bg-red-500 p-2 rounded-xl text-sm font-medium">
                🚫 {w}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={pass}
              disabled={phase !== 'playing' || passesLeft <= 0 || isPaused}
              className="bg-yellow-400 text-black rounded-xl p-3 font-semibold disabled:opacity-40"
            >
              Passo ({phase === 'playing' ? passesLeft : maxPasses})
            </button>
            <button
              onClick={tabooHit}
              disabled={phase !== 'playing' || isPaused}
              className="bg-red-600 rounded-xl p-3 font-semibold disabled:opacity-40"
            >
              TABOO
            </button>
            <button
              onClick={correct}
              disabled={phase !== 'playing' || isPaused}
              className="bg-green-600 rounded-xl p-3 font-semibold disabled:opacity-40"
            >
              ✓ OK
            </button>
          </div>

          <button
            onClick={() => setIsPaused((p) => !p)}
            disabled={phase !== 'playing'}
            className="bg-gray-700 px-5 py-2 rounded-xl text-sm disabled:opacity-40"
          >
            {isPaused ? '▶ Riprendi' : '⏸ Pausa'}
          </button>
        </div>
      </div>
    </div>
  );
}