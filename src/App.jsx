import { useState, useEffect, useRef } from "react";
import {
  Play, Pause, SkipForward, Ban, Check, Trophy,
  RotateCcw, Settings, Plus, Minus, Flag,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// 🔧 NOTA per il tuo progetto:
// Nel tuo progetto reale hai già `import { decks } from "./cards";` con i tuoi
// 100 termini per mazzo. Questa anteprima (artifact) non ha accesso al tuo file
// cards.js, quindi qui sotto ho messo un mazzo ridotto SOLO per far funzionare
// la demo. Quando riporti questo file nel tuo progetto:
//   1) cancella il blocco `const decks = {...}` qui sotto
//   2) decommenta la riga:  import { decks } from "./cards";
// Tutta la logica di gioco (punteggi, timer, passaggi, turni) è rimasta identica.
// ─────────────────────────────────────────────────────────────────────────────
// import { decks } from "./cards";

const decks = {
  "Facile": [
    { word: "Cane", taboo: ["Animale", "Abbaiare", "Gatto", "Zampa", "Cucciolo"] },
    { word: "Sole", taboo: ["Caldo", "Cielo", "Luce", "Giorno", "Estate"] },
    { word: "Pizza", taboo: ["Italiana", "Formaggio", "Forno", "Pomodoro", "Napoli"] },
    { word: "Scuola", taboo: ["Studenti", "Maestro", "Libri", "Compiti", "Banco"] },
    { word: "Mare", taboo: ["Acqua", "Spiaggia", "Onde", "Pesce", "Blu"] },
    { word: "Bicicletta", taboo: ["Ruote", "Pedalare", "Sella", "Casco", "Catena"] },
    { word: "Gelato", taboo: ["Freddo", "Cono", "Estate", "Cioccolato", "Vaniglia"] },
    { word: "Calcio", taboo: ["Pallone", "Squadra", "Rete", "Stadio", "Arbitro"] },
  ],
  "Facile 2": [
    { word: "Telefono", taboo: ["Chiamare", "Numero", "Schermo", "App", "Squillo"] },
    { word: "Libro", taboo: ["Leggere", "Pagine", "Autore", "Biblioteca", "Copertina"] },
    { word: "Cucina", taboo: ["Cibo", "Fornello", "Pentola", "Chef", "Ricetta"] },
    { word: "Aeroporto", taboo: ["Aereo", "Volo", "Valigia", "Pilota", "Bagaglio"] },
    { word: "Natale", taboo: ["Albero", "Regali", "Babbo", "Dicembre", "Neve"] },
    { word: "Chitarra", taboo: ["Corde", "Musica", "Suonare", "Concerto", "Rock"] },
    { word: "Ospedale", taboo: ["Medico", "Malato", "Infermiere", "Pronto Soccorso", "Ambulanza"] },
    { word: "Vacanza", taboo: ["Viaggio", "Mare", "Valigia", "Relax", "Estate"] },
  ],
  "Intermedio": [
    { word: "Gelosia", taboo: ["Sentimento", "Coppia", "Invidia", "Tradimento", "Emozione"] },
    { word: "Democrazia", taboo: ["Voto", "Governo", "Popolo", "Elezioni", "Politica"] },
    { word: "Nostalgia", taboo: ["Ricordo", "Passato", "Malinconia", "Infanzia", "Emozione"] },
    { word: "Innovazione", taboo: ["Tecnologia", "Nuovo", "Idea", "Progresso", "Invenzione"] },
    { word: "Equilibrio", taboo: ["Bilancia", "Stabilità", "Yoga", "Centro", "Peso"] },
    { word: "Coraggio", taboo: ["Paura", "Eroe", "Forza", "Affrontare", "Valore"] },
    { word: "Sostenibilità", taboo: ["Ambiente", "Ecologia", "Riciclo", "Pianeta", "Verde"] },
    { word: "Curiosità", taboo: ["Domanda", "Scoprire", "Interesse", "Bambino", "Perché"] },
  ],
  "Difficile": [
    { word: "Serendipità", taboo: ["Caso", "Fortuna", "Scoperta", "Inaspettato", "Coincidenza"] },
    { word: "Procrastinazione", taboo: ["Rimandare", "Pigrizia", "Domani", "Scadenza", "Ritardo"] },
    { word: "Paradosso", taboo: ["Contraddizione", "Logica", "Illogico", "Assurdo", "Filosofia"] },
    { word: "Empatia", taboo: ["Comprendere", "Emozioni", "Altri", "Sentire", "Compassione"] },
    { word: "Burocrazia", taboo: ["Uffici", "Documenti", "Modulo", "Attesa", "Timbro"] },
    { word: "Algoritmo", taboo: ["Computer", "Passi", "Programma", "Calcolo", "Codice"] },
    { word: "Meritocrazia", taboo: ["Merito", "Talento", "Successo", "Lavoro", "Giusto"] },
    { word: "Dilemma", taboo: ["Scelta", "Difficile", "Decisione", "Due", "Problema"] },
  ],
};

const DECKS_META = [
  { key: "Facile", label: "Facile", hex: "#3FCF7F" },
  { key: "Facile 2", label: "Facile 2", hex: "#3FCF7F" },
  { key: "Intermedio", label: "Intermedio", hex: "#F4B400" },
  { key: "Difficile", label: "Difficile", hex: "#E63950" },
];

const TEAM_COLORS = {
  1: { css: "var(--gold)", hex: "#F4B400", dark: "var(--gold-dark)" },
  2: { css: "var(--teal)", hex: "#17C3B2", dark: "var(--teal-dark)" },
};

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

// ── Global styles (fonts, tokens, keyframes) ────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700;800&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600;700&display=swap');

      :root {
        --ink: #15141b;
        --ink-panel: #1f1e28;
        --ink-panel-light: #2b2a35;
        --paper: #fbf6ea;
        --paper-line: #e4dcc6;
        --gold: #f4b400;
        --gold-dark: #c28e00;
        --teal: #17c3b2;
        --teal-dark: #0f9585;
        --crimson: #e63950;
        --crimson-dark: #b9243a;
        --leaf: #3fcf7f;
        --leaf-dark: #279c5c;
        --cream: #f7f3e8;
        --muted: #a79f8c;
      }
      .font-display { font-family: 'Space Grotesk', sans-serif; }
      .font-mono { font-family: 'JetBrains Mono', monospace; font-variant-numeric: tabular-nums; }
      .font-body { font-family: 'Inter', sans-serif; }

      @keyframes popIn {
        0% { opacity: 0; transform: scale(.94) translateY(6px); }
        100% { opacity: 1; transform: scale(1) translateY(0); }
      }
      .animate-popIn { animation: popIn .28s cubic-bezier(.2,.9,.3,1.2); }

      @keyframes scaleIn {
        0% { opacity: 0; transform: scale(.85); }
        100% { opacity: 1; transform: scale(1); }
      }
      .animate-scaleIn { animation: scaleIn .32s cubic-bezier(.2,.9,.3,1.2); }

      @keyframes floatUp {
        0% { opacity: 0; transform: translateY(6px) scale(.8); }
        15% { opacity: 1; transform: translateY(-4px) scale(1); }
        100% { opacity: 0; transform: translateY(-46px) scale(1); }
      }
      .animate-floatUp { animation: floatUp .7s ease-out forwards; pointer-events: none; }

      @keyframes pulseRing {
        0%, 100% { box-shadow: 0 0 0 0 rgba(230,57,80,.45); }
        50% { box-shadow: 0 0 0 10px rgba(230,57,80,0); }
      }
      .pulse-danger { animation: pulseRing 1s ease-out infinite; }

      @keyframes bulbGlow {
        0%, 100% { opacity: .35; }
        50% { opacity: 1; }
      }
      .bulb { animation: bulbGlow 3.2s ease-in-out infinite; }

      @keyframes dotPulse {
        0%, 100% { opacity: 1; }
        50% { opacity: .35; }
      }
      .dot-pulse { animation: dotPulse 1.4s ease-in-out infinite; }

      ::selection { background: var(--gold); color: var(--ink); }
    `}</style>
  );
}

// ── Tactile pressable button (used everywhere) ──────────────────────────────
function PressableButton({ onClick, disabled, colorBg, colorShadow, colorText = "var(--ink)", children, className = "", style = {} }) {
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lift = disabled ? 0 : pressed ? 3 : hovered ? -2 : 0;
  const shadowSize = disabled ? 0 : pressed ? 2 : hovered ? 7 : 5;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => { setPressed(false); setHovered(false); }}
      onMouseEnter={() => setHovered(true)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      className={`flex items-center justify-center gap-2 font-body font-bold select-none transition-transform duration-100 ease-out ${className}`}
      style={{
        borderRadius: 16,
        padding: "13px 10px",
        fontSize: 14,
        background: colorBg,
        color: colorText,
        border: "none",
        boxShadow: `0 ${shadowSize}px 0 ${colorShadow}`,
        transform: `translateY(${lift}px)`,
        opacity: disabled ? 0.35 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        ...style,
      }}
    >
      {children}
    </button>
  );
}

// ── Marquee bulb row (signature decorative element) ─────────────────────────
function MarqueeBulbs({ count = 16 }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="bulb"
          style={{
            width: 6, height: 6, borderRadius: 999,
            background: i % 2 === 0 ? "var(--gold)" : "var(--teal)",
            boxShadow: `0 0 6px ${i % 2 === 0 ? "rgba(244,180,0,.8)" : "rgba(23,195,178,.8)"}`,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}

// ── Segmented timer meter (energy-bar style) ────────────────────────────────
function SegmentMeter({ pct, danger, teamColor, count = 24 }) {
  const filled = Math.round((pct / 100) * count);
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1, height: 8, borderRadius: 3,
            background: i < filled ? (danger ? "var(--crimson)" : teamColor) : "var(--ink-panel-light)",
            transition: "background .25s",
          }}
        />
      ))}
    </div>
  );
}

// ── Taboo word chip (ticket-stub style) ──────────────────────────────────────
function TabooChip({ word, i }) {
  const rotate = i % 2 === 0 ? -1.5 : 1.5;
  return (
    <div
      className="font-body"
      style={{
        background: "linear-gradient(155deg, var(--crimson), var(--crimson-dark))",
        color: "var(--cream)",
        borderRadius: 10,
        padding: "9px 10px",
        fontSize: 13,
        fontWeight: 700,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 3px 0 rgba(0,0,0,.25)",
        display: "flex", alignItems: "center", gap: 6,
        borderTop: "2px dashed rgba(255,255,255,.35)",
      }}
    >
      <Ban size={13} strokeWidth={3} style={{ flexShrink: 0 }} />
      <span style={{ textTransform: "uppercase", letterSpacing: 0.2 }}>{word}</span>
    </div>
  );
}

// ── Numeric stepper (replaces raw number inputs) ────────────────────────────
function Stepper({ label, value, min = 0, step = 1, unit = "", onChange, disabled }) {
  return (
    <div className="mb-3">
      <label className="font-body block mb-1" style={{ fontSize: 11, color: "#8a8371", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <PressableButton
          onClick={() => onChange(Math.max(min, value - step))}
          disabled={disabled}
          colorBg="#2a2620" colorShadow="#000" colorText="#fff"
          style={{ width: 40, height: 40, padding: 0, borderRadius: 12, flexShrink: 0 }}
        >
          <Minus size={16} />
        </PressableButton>
        <div className="font-mono flex-1 text-center" style={{ fontSize: 22, fontWeight: 700, color: "#2a2620" }}>
          {value}{unit}
        </div>
        <PressableButton
          onClick={() => onChange(value + step)}
          disabled={disabled}
          colorBg="#2a2620" colorShadow="#000" colorText="#fff"
          style={{ width: 40, height: 40, padding: 0, borderRadius: 12, flexShrink: 0 }}
        >
          <Plus size={16} />
        </PressableButton>
      </div>
    </div>
  );
}

// ── Deck picker card ─────────────────────────────────────────────────────────
function DeckButton({ meta, active, disabled, onClick, count }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="font-body text-left transition-all duration-150"
      style={{
        borderRadius: 14,
        padding: "10px 12px",
        border: `2px solid ${active ? meta.hex : "var(--paper-line)"}`,
        background: active ? `${meta.hex}22` : "#ffffff",
        opacity: disabled && !active ? 0.5 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: meta.hex, flexShrink: 0 }} />
        <span style={{ fontWeight: 700, fontSize: 13, color: "#2a2620" }}>{meta.label}</span>
      </div>
      <div style={{ fontSize: 11, color: "#8a8371" }}>{count} parole</div>
    </button>
  );
}

// ── Modal overlay ────────────────────────────────────────────────────────────
function Modal({ children }) {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 50,
      background: "rgba(10,9,14,0.75)",
      backdropFilter: "blur(2px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "1rem",
    }}>
      {children}
    </div>
  );
}

// ── End-of-turn popup ────────────────────────────────────────────────────────
function TurnEndModal({ team, roundScores, roundTaboo, onContinue, onEndGame }) {
  const net = (roundScores[team] || 0) - (roundTaboo[team] || 0);
  const tc = TEAM_COLORS[team];
  return (
    <Modal>
      <div className="animate-scaleIn font-body" style={{
        background: "var(--ink-panel)", color: "var(--cream)", borderRadius: 26,
        padding: "2rem", maxWidth: 380, width: "100%", textAlign: "center",
        border: "1px solid rgba(255,255,255,.08)",
        boxShadow: "0 20px 60px rgba(0,0,0,.5)",
      }}>
        <div style={{
          width: 64, height: 64, borderRadius: 99, background: tc.css,
          display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px",
        }}>
          <Flag size={28} color="var(--ink)" strokeWidth={2.5} />
        </div>
        <h2 className="font-display" style={{ fontSize: 22, fontWeight: 800, marginBottom: 4 }}>
          Tempo scaduto!
        </h2>
        <p style={{ color: "var(--muted)", marginBottom: 20 }}>
          Fine turno — <strong style={{ color: "var(--cream)" }}>Squadra {team}</strong>
        </p>

        <div style={{
          background: "var(--ink)", borderRadius: 16, padding: "1rem",
          marginBottom: 24, display: "flex", justifyContent: "space-around",
          borderTop: "2px dashed var(--ink-panel-light)",
        }}>
          <div>
            <div className="font-mono" style={{ fontSize: 26, fontWeight: 800, color: "var(--leaf)" }}>
              +{roundScores[team] || 0}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>CORRETTE</div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 26, fontWeight: 800, color: "var(--crimson)" }}>
              -{roundTaboo[team] || 0}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>TABOO</div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 26, fontWeight: 800 }}>
              {net >= 0 ? "+" : ""}{net}
            </div>
            <div style={{ fontSize: 11, color: "var(--muted)" }}>NETTO</div>
          </div>
        </div>

        <PressableButton
          onClick={onContinue}
          colorBg={tc.css} colorShadow={tc.dark}
          className="w-full mb-2.5" style={{ fontSize: 15, width: "100%" }}
        >
          <Play size={17} /> Avvia turno Squadra {team === 1 ? 2 : 1}
        </PressableButton>
        <button
          onClick={onEndGame}
          className="font-body"
          style={{
            width: "100%", padding: "11px", borderRadius: 14,
            background: "transparent", color: "var(--muted)", fontWeight: 600,
            fontSize: 13, border: "1px solid rgba(255,255,255,.14)", cursor: "pointer",
          }}
        >
          Termina partita
        </button>
      </div>
    </Modal>
  );
}

// ── Winner screen components ─────────────────────────────────────────────────
function MedalComponent({ team, net, correct, taboo, isWinner }) {
  const hex = TEAM_COLORS[team].hex;
  const darkHex = team === 1 ? "#c28e00" : "#0f9585";
  return (
    <div className="font-body animate-scaleIn" style={{
      background: isWinner ? `linear-gradient(160deg, ${hex}, ${darkHex})` : "var(--ink-panel)",
      color: isWinner ? "var(--ink)" : "var(--cream)",
      borderRadius: 22, padding: "1.5rem 1rem", flex: 1, textAlign: "center",
      border: isWinner ? "none" : "1.5px solid rgba(255,255,255,.08)",
      boxShadow: isWinner ? `0 10px 30px ${hex}44` : "none",
    }}>
      {isWinner && <Trophy size={34} style={{ margin: "0 auto 6px" }} />}
      <div style={{ fontSize: 12, fontWeight: 700, opacity: 0.7, letterSpacing: 1 }}>
        SQUADRA {team}
      </div>
      <div className="font-display" style={{ fontSize: 44, fontWeight: 900, lineHeight: 1, marginTop: 4 }}>
        {net >= 0 ? "+" : ""}{net}
      </div>
      <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>punti netti</div>
      <div style={{
        marginTop: 14, display: "flex", justifyContent: "space-around",
        borderTop: `1px dashed ${isWinner ? "rgba(0,0,0,.2)" : "rgba(255,255,255,.1)"}`,
        paddingTop: 12,
      }}>
        <div>
          <div className="font-mono" style={{ fontWeight: 700, color: isWinner ? "#1c6b3f" : "var(--leaf)" }}>
            {correct}
          </div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>✓ ok</div>
        </div>
        <div>
          <div className="font-mono" style={{ fontWeight: 700, color: isWinner ? "#7a1626" : "var(--crimson)" }}>
            {taboo}
          </div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>🚫 taboo</div>
        </div>
      </div>
    </div>
  );
}

// ── Winner screen ────────────────────────────────────────────────────────────
function WinnerScreen({ scores, tabooScores, onRestart }) {
  const net1 = scores[1] - tabooScores[1];
  const net2 = scores[2] - tabooScores[2];
  const tied = net1 === net2;
  const winner = net1 > net2 ? 1 : 2;
  const loser = winner === 1 ? 2 : 1;

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "var(--ink)", padding: "1.5rem",
      position: "relative", overflow: "hidden",
    }}>
      <GlobalStyles />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(circle at 50% 15%, rgba(244,180,0,.14), transparent 60%)",
        pointerEvents: "none",
      }} />
      <div className="animate-popIn" style={{ maxWidth: 440, width: "100%", textAlign: "center", position: "relative" }}>
        <div style={{ fontSize: 56, marginBottom: 8 }}>
          {tied ? "🤝" : "🎉"}
        </div>
        <h1 className="font-display" style={{ fontSize: 32, fontWeight: 900, color: "var(--cream)", marginBottom: 4 }}>
          {tied ? "Pareggio!" : `Vince la Squadra ${winner}!`}
        </h1>
        <p className="font-body" style={{ color: "var(--muted)", marginBottom: 32, fontSize: 15 }}>
          {tied
            ? "Nessuno dei due merita la vittoria 😄"
            : `La Squadra ${loser} ci riproverà la prossima volta`}
        </p>

        <div style={{ display: "flex", gap: 12, marginBottom: 32 }}>
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

        <PressableButton
          onClick={onRestart}
          colorBg="var(--gold)" colorShadow="var(--gold-dark)"
          style={{ fontSize: 16, padding: "15px", width: "100%" }}
        >
          <RotateCcw size={18} /> Nuova partita
        </PressableButton>
      </div>
    </div>
  );
}

// ── Main game ─────────────────────────────────────────────────────────────────
export default function TabooGameApp() {
  const [roundTime, setRoundTime] = useState(60);
  const [maxPasses, setMaxPasses] = useState(3);
  const [selectedDeck, setSelectedDeck] = useState("Facile");

  // game phases: 'setup' | 'playing' | 'turnEnd' | 'finished'
  const [phase, setPhase] = useState("setup");

  const [cardsState, setCardsState] = useState([]);
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState(1);                     // active team
  const [scores, setScores] = useState({ 1: 0, 2: 0 });    // cumulative
  const [tabooScores, setTabooScores] = useState({ 1: 0, 2: 0 });

  // per-turn accumulators (reset each turn, shown in TurnEndModal)
  const [turnScores, setTurnScores] = useState({ 1: 0, 2: 0 });
  const [turnTaboo, setTurnTaboo] = useState({ 1: 0, 2: 0 });

  const [timeLeft, setTimeLeft] = useState(60);
  const [isPaused, setIsPaused] = useState(false);
  const [passesLeft, setPassesLeft] = useState(3);

  // transient floating feedback badge ("+1" / "-1" / "PASSO")
  const [popup, setPopup] = useState(null);

  const timerRef = useRef(null);

  const current = cardsState.length > 0 ? cardsState[index] : null;

  // ── Timer ──────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== "playing" || isPaused) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setPhase("turnEnd");
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

  const triggerPopup = (type) => {
    const id = Date.now();
    setPopup({ type, id });
    setTimeout(() => setPopup((p) => (p && p.id === id ? null : p)), 700);
  };

  const onCorrectClick = () => { correct(); triggerPopup("correct"); };
  const onTabooClick = () => { tabooHit(); triggerPopup("taboo"); };
  const onPassClick = () => { pass(); triggerPopup("pass"); };

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
    setPhase("playing");
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
    setPhase("playing");
  };

  const endGame = () => setPhase("finished");

  const restart = () => {
    setPhase("setup");
    setTeam(1);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTimeLeft(roundTime);
  };

  const timerPct = Math.min((timeLeft / roundTime) * 100, 100);
  const isDanger = timeLeft <= 10;
  const teamColor = TEAM_COLORS[team];

  // ── Render ─────────────────────────────────────────────────────────────────
  if (phase === "finished") {
    return <WinnerScreen scores={scores} tabooScores={tabooScores} onRestart={restart} />;
  }

  return (
    <div
      className="min-h-screen p-4 md:p-6 flex flex-col items-center font-body"
      style={{
        background: "var(--ink)",
        backgroundImage: "radial-gradient(circle at 50% -10%, rgba(244,180,0,.08), transparent 55%)",
      }}
    >
      <GlobalStyles />

      {phase === "turnEnd" && (
        <TurnEndModal
          team={team}
          roundScores={turnScores}
          roundTaboo={turnTaboo}
          onContinue={continueTurn}
          onEndGame={endGame}
        />
      )}

      <div
        className="max-w-3xl w-full"
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 32,
          padding: "1.5rem",
        }}
      >
        {/* Marquee header */}
        <div className="text-center mb-6">
          <MarqueeBulbs />
          <h1 className="font-display" style={{ fontSize: 42, fontWeight: 800, color: "var(--cream)", letterSpacing: -1, lineHeight: 1.1, margin: "10px 0 4px" }}>
            TABOO<span style={{ color: "var(--gold)" }}>!</span>
          </h1>
          <p className="font-body" style={{ color: "var(--muted)", fontSize: 12, marginBottom: 10, letterSpacing: 1, textTransform: "uppercase" }}>
            Descrivi la parola senza dire quelle vietate
          </p>
          <MarqueeBulbs />
        </div>

        {/* Setup + scoreboard */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Setup — rulebook paper card */}
          <div style={{
            background: "var(--paper)", borderRadius: 20, padding: "1.25rem",
            position: "relative", boxShadow: "0 8px 0 var(--paper-line), 0 14px 24px rgba(0,0,0,.35)",
            color: "#2a2620",
          }}>
            <div style={{
              position: "absolute", top: -9, left: 22, width: 54, height: 18,
              background: "var(--gold)", opacity: 0.9, transform: "rotate(-4deg)",
              borderRadius: 3, boxShadow: "0 2px 4px rgba(0,0,0,.2)",
            }} />
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 17, marginBottom: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <Settings size={17} /> Regolamento
            </h2>

            <Stepper
              label="Secondi per turno"
              value={roundTime}
              min={5} step={5} unit="s"
              disabled={phase === "playing"}
              onChange={(val) => {
                setRoundTime(val);
                if (phase === "setup") setTimeLeft(val);
              }}
            />
            <Stepper
              label="Passaggi massimi"
              value={maxPasses}
              min={0} step={1}
              disabled={phase === "playing"}
              onChange={(val) => setMaxPasses(Math.max(0, val))}
            />

            <label className="font-body block mb-1" style={{ fontSize: 11, color: "#8a8371", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6 }}>
              Mazzo
            </label>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {DECKS_META.map((meta) => (
                <DeckButton
                  key={meta.key}
                  meta={meta}
                  active={selectedDeck === meta.key}
                  disabled={phase === "playing"}
                  count={decks[meta.key]?.length ?? 0}
                  onClick={() => setSelectedDeck(meta.key)}
                />
              ))}
            </div>

            <PressableButton
              onClick={startGame}
              colorBg="var(--ink)" colorShadow="#000" colorText="var(--cream)"
              style={{ width: "100%", fontSize: 15, padding: "14px" }}
            >
              {phase === "setup" ? <><Play size={18} /> Inizia partita</> : <><RotateCcw size={18} /> Ricomincia</>}
            </PressableButton>
          </div>

          {/* Scoreboard — ticket style */}
          <div style={{ background: "var(--ink-panel)", borderRadius: 20, padding: "1.25rem", color: "var(--cream)" }}>
            <h2 className="font-display" style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
              <Trophy size={17} /> Punteggio totale
            </h2>
            {[1, 2].map((t) => (
              <div key={t} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0",
                borderBottom: t === 1 ? "1px dashed var(--ink-panel-light)" : "none",
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {team === t && phase === "playing" && (
                    <span
                      className="dot-pulse"
                      style={{
                        width: 8, height: 8, borderRadius: 99,
                        background: TEAM_COLORS[t].css,
                        boxShadow: `0 0 8px ${t === 1 ? "rgba(244,180,0,.8)" : "rgba(23,195,178,.8)"}`,
                      }}
                    />
                  )}
                  <span className="font-body" style={{ fontWeight: team === t && phase === "playing" ? 700 : 500 }}>
                    Squadra {t}
                  </span>
                </span>
                <span className="font-mono" style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
                  <span style={{ color: "var(--leaf)", fontWeight: 700 }}>{scores[t]}</span>
                  {tabooScores[t] > 0 && (
                    <span style={{ color: "var(--crimson)", fontWeight: 700 }}> -{tabooScores[t]}</span>
                  )}
                  <span style={{ marginLeft: 4, fontWeight: 800, fontSize: 17, color: TEAM_COLORS[t].css }}>
                    = {scores[t] - tabooScores[t]}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Game stage card */}
        <div style={{ position: "relative" }}>
          <div style={{
            position: "absolute", inset: -18,
            background: `radial-gradient(circle at 50% 0%, ${team === 1 ? "rgba(244,180,0,.22)" : "rgba(23,195,178,.22)"}, transparent 70%)`,
            filter: "blur(10px)", pointerEvents: "none",
            opacity: phase === "playing" ? 1 : 0, transition: "opacity .4s",
          }} />

          <div
            className={isDanger && phase === "playing" && !isPaused ? "pulse-danger" : ""}
            style={{
              position: "relative", background: "var(--ink-panel)", borderRadius: 28,
              padding: "1.5rem", color: "var(--cream)", border: "1px solid rgba(255,255,255,.06)",
            }}
          >
            {/* ring-binder holes */}
            <div style={{ display: "flex", justifyContent: "center", gap: 18, marginBottom: 14 }}>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: 9, height: 9, borderRadius: 99, background: "var(--ink)",
                  boxShadow: "inset 0 2px 3px rgba(0,0,0,.6)",
                }} />
              ))}
            </div>

            {/* team pill + pause badge + timer digits */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <span className="font-body" style={{
                background: phase === "playing" ? teamColor.css : "var(--ink-panel-light)",
                color: phase === "playing" ? "var(--ink)" : "var(--muted)",
                padding: "5px 12px", borderRadius: 99, fontWeight: 700, fontSize: 12,
                whiteSpace: "nowrap",
              }}>
                {phase === "playing" ? `SQUADRA ${team}` : "—"}
              </span>

              {isPaused && phase === "playing" && (
                <span className="font-body" style={{
                  display: "flex", alignItems: "center", gap: 4,
                  background: "rgba(244,180,0,.15)", color: "var(--gold)",
                  padding: "4px 10px", borderRadius: 99, fontWeight: 700, fontSize: 11,
                }}>
                  <Pause size={11} /> PAUSA
                </span>
              )}

              <span className="font-mono" style={{ fontSize: 30, fontWeight: 700, color: isDanger ? "var(--crimson)" : "var(--cream)" }}>
                {timeLeft}<span style={{ fontSize: 15, opacity: 0.6 }}>s</span>
              </span>
            </div>

            <SegmentMeter pct={timerPct} danger={isDanger} teamColor={teamColor.css} />

            {/* word */}
            <div style={{ position: "relative", margin: "24px 0 18px", minHeight: 48 }}>
              <h2 key={index} className="font-display animate-popIn" style={{ fontSize: 38, fontWeight: 800, textAlign: "center", letterSpacing: -1 }}>
                {phase === "playing" && current ? current.word : "?"}
              </h2>
              {popup && (
                <div className="animate-floatUp font-display" style={{
                  position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)",
                  fontWeight: 800, fontSize: 22,
                  color: popup.type === "correct" ? "var(--leaf)" : popup.type === "taboo" ? "var(--crimson)" : "var(--gold)",
                }}>
                  {popup.type === "correct" ? "+1" : popup.type === "taboo" ? "−1" : "⏭ PASSO"}
                </div>
              )}
            </div>

            {/* taboo chips */}
            <div className="grid grid-cols-2 gap-2.5 mb-5">
              {(phase === "playing" && current ? current.taboo : ["—", "—", "—", "—", "—"]).map((w, i) => (
                <TabooChip key={i} word={w} i={i} />
              ))}
            </div>

            {/* action buttons */}
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              <PressableButton
                onClick={onPassClick}
                disabled={phase !== "playing" || passesLeft <= 0 || isPaused}
                colorBg="var(--gold)" colorShadow="var(--gold-dark)"
                style={{ flexDirection: "column", gap: 2, fontSize: 12 }}
              >
                <SkipForward size={18} />
                PASSO ({phase === "playing" ? passesLeft : maxPasses})
              </PressableButton>
              <PressableButton
                onClick={onTabooClick}
                disabled={phase !== "playing" || isPaused}
                colorBg="var(--crimson)" colorShadow="var(--crimson-dark)" colorText="var(--cream)"
                style={{ flexDirection: "column", gap: 2, fontSize: 13 }}
              >
                <Ban size={19} />
                TABOO
              </PressableButton>
              <PressableButton
                onClick={onCorrectClick}
                disabled={phase !== "playing" || isPaused}
                colorBg="var(--leaf)" colorShadow="var(--leaf-dark)"
                style={{ flexDirection: "column", gap: 2, fontSize: 13 }}
              >
                <Check size={19} />
                OK
              </PressableButton>
            </div>

            <PressableButton
              onClick={() => setIsPaused((p) => !p)}
              disabled={phase !== "playing"}
              colorBg="var(--ink-panel-light)" colorShadow="#000" colorText="var(--cream)"
              style={{ width: "100%", fontSize: 13 }}
            >
              {isPaused ? <><Play size={16} /> Riprendi</> : <><Pause size={16} /> Pausa</>}
            </PressableButton>
          </div>
        </div>
      </div>
    </div>
  );
}
