import { useState, useEffect, useRef } from "react";

const cards = [
    { word: 'Pizza', taboo: ['Forno', 'Mozzarella', 'Margherita', 'Impasto', 'Fetta'] },
    { word: 'Computer', taboo: ['Mouse', 'Tastiera', 'Schermo', 'PC', 'Internet'] },
    { word: 'Mare', taboo: ['Spiaggia', 'Acqua', 'Onde', 'Estate', 'Sabbia'] },
    { word: 'Calcio', taboo: ['Pallone', 'Goal', 'Squadra', 'Arbitro', 'Stadio'] },
    { word: 'Telefono', taboo: ['Chiamata', 'Smartphone', 'Messaggio', 'App', 'Schermo'] },
    { word: 'Gelato', taboo: ['Cono', 'Freddo', 'Gusto', 'Estate', 'Crema'] },
    { word: 'Aereo', taboo: ['Volo', 'Pilota', 'Ali', 'Aeroporto', 'Cielo'] },
    { word: 'Bicicletta', taboo: ['Pedali', 'Ruote', 'Catena', 'Casco', 'Bici'] },
    { word: 'Scuola', taboo: ['Professore', 'Classe', 'Compiti', 'Studente', 'Banco'] },
    { word: 'Cinema', taboo: ['Film', 'Popcorn', 'Schermo', 'Attore', 'Sala'] },
    { word: 'Gatto', taboo: ['Miao', 'Felino', 'Coda', 'Baffi', 'Animale'] },
    { word: 'Cane', taboo: ['Bau', 'Guinzaglio', 'Animale', 'Cuccia', 'Pelo'] },
    { word: 'Montagna', taboo: ['Neve', 'Sci', 'Vetta', 'Escursione', 'Roccia'] },
    { word: 'Libro', taboo: ['Pagine', 'Romanzo', 'Leggere', 'Copertina', 'Autore'] },
    { word: 'Treno', taboo: ['Binari', 'Stazione', 'Locomotiva', 'Viaggio', 'Vagone'] },
    { word: 'Musica', taboo: ['Canzone', 'Note', 'Cantante', 'Audio', 'Strumento'] },
    { word: 'Banana', taboo: ['Frutta', 'Gialla', 'Scimmia', 'Buccia', 'Tropicale'] },
    { word: 'Caffè', taboo: ['Espresso', 'Bar', 'Tazzina', 'Bevanda', 'Caffeina'] },
    { word: 'Lampada', taboo: ['Luce', 'Interruttore', 'Tavolo', 'Illuminare', 'Bulbo'] },
    { word: 'Giardino', taboo: ['Fiori', 'Erba', 'Piante', 'Cortile', 'Annaffiare'] },
    { word: 'Orologio', taboo: ['Tempo', 'Lancette', 'Ora', 'Polso', 'Sveglia'] },
    { word: 'Zaino', taboo: ['Spalle', 'Scuola', 'Cerniera', 'Borsa', 'Libri'] },
    { word: 'Chitarra', taboo: ['Corde', 'Musica', 'Suonare', 'Strumento', 'Plettro'] },
    { word: 'Pasta', taboo: ['Spaghetti', 'Pomodoro', 'Forchetta', 'Italia', 'Pranzo'] },
    { word: 'Doctor', taboo: ['Medico', 'Ospedale', 'Paziente', 'Cura', 'Visita'] },
    { word: 'Videogioco', taboo: ['Console', 'Joystick', 'Livello', 'Giocare', 'Schermo'] },
    { word: 'Auto', taboo: ['Macchina', 'Ruote', 'Motore', 'Volante', 'Strada'] },
    { word: 'Fiume', taboo: ['Acqua', 'Ponte', 'Corrente', 'Pesce', 'Lungo'] },
    { word: 'Pane', taboo: ['Forno', 'Farina', 'Crosta', 'Panino', 'Impasto'] },
    { word: 'Occhiali', taboo: ['Vista', 'Lenti', 'Montatura', 'Occhio', 'Sole'] },
    { word: 'Dentista', taboo: ['Denti', 'Trapano', 'Studio', 'Carie', 'Sorriso'] },
    { word: 'Tennis', taboo: ['Racchetta', 'Palla', 'Campo', 'Rete', 'Set'] },
    { word: 'Computer Portatile', taboo: ['Laptop', 'Batteria', 'Schermo', 'Tastiera', 'Mouse'] },
    { word: 'Fotocamera', taboo: ['Foto', 'Obiettivo', 'Scatto', 'Zoom', 'Immagine'] },
    { word: 'Mela', taboo: ['Frutta', 'Rossa', 'Albero', 'Buccia', 'Morsicare'] },
    { word: 'Università', taboo: ['Esame', 'Laurea', 'Studente', 'Professore', 'Facoltà'] },
    { word: 'Farmacia', taboo: ['Medicine', 'Farmacista', 'Ricetta', 'Pillole', 'Croce'] },
    { word: 'Barca', taboo: ['Mare', 'Nave', 'Acqua', 'Vela', 'Porto'] },
    { word: 'Robot', taboo: ['Macchina', 'AI', 'Metallo', 'Automazione', 'Android'] },
    { word: 'Ombrello', taboo: ['Pioggia', 'Acqua', 'Aprire', 'Temporale', 'Manico'] },
    { word: 'Torta', taboo: ['Dolce', 'Candeline', 'Compleanno', 'Fetta', 'Crema'] },
    { word: 'Luna', taboo: ['Notte', 'Spazio', 'Stelle', 'Satellitare', 'Piena'] },
    { word: 'Sedia', taboo: ['Sedersi', 'Legno', 'Tavolo', 'Gambe', 'Schienale'] },
    { word: 'Piscina', taboo: ['Nuotare', 'Acqua', 'Tuffo', 'Cloro', 'Costume'] },
    { word: 'Panino', taboo: ['Pane', 'Prosciutto', 'Snack', 'Hamburger', 'Fast food'] },
    { word: 'Frigorifero', taboo: ['Freddo', 'Cibo', 'Cucina', 'Ghiaccio', 'Porta'] },
    { word: 'Aspirapolvere', taboo: ['Polvere', 'Pulire', 'Casa', 'Pavimento', 'Filtro'] },
    { word: 'Whatsapp', taboo: ['Messaggi', 'Chat', 'Telefono', 'App', 'Online'] },
    { word: 'Instagram', taboo: ['Foto', 'Social', 'Stories', 'Follower', 'Like'] },
    { word: 'TikTok', taboo: ['Video', 'Social', 'Trend', 'Scroll', 'Creator'] },
    { word: 'Netflix', taboo: ['Serie', 'Film', 'Streaming', 'TV', 'Abbonamento'] },
    { word: 'YouTube', taboo: ['Video', 'Canale', 'Creator', 'Streaming', 'Like'] },
    { word: 'Palestra', taboo: ['Allenamento', 'Pesi', 'Fitness', 'Muscoli', 'Cardio'] },
    { word: 'Vacanza', taboo: ['Viaggio', 'Hotel', 'Mare', 'Relax', 'Estate'] },
    { word: 'Sushi', taboo: ['Giappone', 'Riso', 'Pesce', 'Wasabi', 'Bacchette'] },
    { word: 'Cappuccino', taboo: ['Caffè', 'Latte', 'Schiuma', 'Bar', 'Colazione'] },
    { word: 'Hamburger', taboo: ['McDonald', 'Carne', 'Bun', 'Fast food', 'Ketchup'] },
    { word: 'Vino', taboo: ['Bottiglia', 'Uva', 'Bicchiere', 'Rosso', 'Cantina'] },
    { word: 'Cioccolato', taboo: ['Dolce', 'Cacao', 'Tavoletta', 'Fondente', 'Nutella'] },
    { word: 'Risotto', taboo: ['Riso', 'Parmigiano', 'Padella', 'Milano', 'Brodo'] },
    { word: 'Patatine', taboo: ['Fritte', 'Sacchetto', 'Salate', 'Snack', 'Croccanti'] },
    { word: 'Intelligenza Artificiale', taboo: ['Chatbot', 'Algoritmo', 'Robot', 'Macchina', 'Digitale'] },
    { word: 'Podcast', taboo: ['Audio', 'Spotify', 'Episodio', 'Ascolto', 'Microfono'] },
    { word: 'Password', taboo: ['Sicurezza', 'Accesso', 'Login', 'Segreto', 'Account'] },
    { word: 'Stampante', taboo: ['Carta', 'Inchiostro', 'Ufficio', 'Foglio', 'Stampa'] },
    { word: 'Satellite', taboo: ['Spazio', 'Orbita', 'GPS', 'Segnale', 'Antenna'] },
    { word: 'Cuffie', taboo: ['Musica', 'Audio', 'Orecchie', 'Wireless', 'Bluetooth'] },
    { word: 'Nuoto', taboo: ['Piscina', 'Vasche', 'Stile libero', 'Costume', 'Acqua'] },
    { word: 'Sci', taboo: ['Neve', 'Montagna', 'Piste', 'Discesa', 'Slalom'] },
    { word: 'Pallavolo', taboo: ['Rete', 'Pallone', 'Battuta', 'Squadra', 'Campo'] },
    { word: 'Maratona', taboo: ['Corsa', 'Km', 'Fatica', 'Allenamento', 'Gara'] },
    { word: 'Boxe', taboo: ['Pugni', 'Ring', 'Guantoni', 'Knockout', 'Campione'] },
    { word: 'Ciclismo', taboo: ['Bici', 'Giro', 'Salita', 'Maglia', 'Pedalare'] },
    { word: 'Vulcano', taboo: ['Lava', 'Eruzione', 'Fuoco', 'Cenere', 'Etna'] },
    { word: 'Farfalla', taboo: ['Ali', 'Bruco', 'Fiore', 'Volare', 'Insetto'] },
    { word: 'Deserto', taboo: ['Sabbia', 'Caldo', 'Sahara', 'Cammello', 'Sete'] },
    { word: 'Foresta', taboo: ['Alberi', 'Amazonia', 'Animali', 'Bosco', 'Verde'] },
    { word: 'Terremoto', taboo: ['Scossa', 'Richter', 'Crollo', 'Sisma', 'Macerie'] },
    { word: 'Arcobaleno', taboo: ['Colori', 'Pioggia', 'Sole', 'Cielo', 'Spettro'] },
    { word: 'Teatro', taboo: ['Palcoscenico', 'Attori', 'Sipario', 'Commedia', 'Platea'] },
    { word: 'Museo', taboo: ['Quadri', 'Arte', 'Scultura', 'Visita', 'Guida'] },
    { word: 'Fumetto', taboo: ['Vignette', 'Supereroe', 'Balloons', 'Marvel', 'Disegno'] },
    { word: 'Dizionario', taboo: ['Parole', 'Definizione', 'Vocabolario', 'Pagine', 'Alfabeto'] },
    { word: 'Fotografia', taboo: ['Scatto', 'Foto', 'Luce', 'Obiettivo', 'Posa'] },
    { word: 'Scultura', taboo: ['Marmo', 'Arte', 'Statua', 'Scalpello', 'Forma'] },
    { word: 'Matrimonio', taboo: ['Sposi', 'Anello', 'Fede', 'Cerimonia', 'Chiesa'] },
    { word: 'Compleanno', taboo: ['Candeline', 'Torta', 'Anni', 'Regalo', 'Festeggiare'] },
    { word: 'Ospedale', taboo: ['Medico', 'Paziente', 'Corsia', 'Pronto soccorso', 'Infermiere'] },
    { word: 'Supermercato', taboo: ['Spesa', 'Cassa', 'Carrello', 'Scaffale', 'Offerta'] },
    { word: 'Aeroporto', taboo: ['Volo', 'Gate', 'Valigia', 'Check-in', 'Decollo'] },
    { word: 'Banca', taboo: ['Soldi', 'Conto', 'ATM', 'Bancomat', 'Prestito'] },
    { word: 'Ascensore', taboo: ['Piano', 'Bottone', 'Salire', 'Pulsante', 'Cabina'] }
];

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

// ── Winner screen ──────────────────────────────────────────────────────────────
function WinnerScreen({ scores, tabooScores, onRestart }) {
  const net1 = scores[1] - tabooScores[1];
  const net2 = scores[2] - tabooScores[2];
  const tied = net1 === net2;
  const winner = net1 > net2 ? 1 : 2;
  const loser = winner === 1 ? 2 : 1;

  const Medal = ({ team, net, correct, taboo, isWinner }) => (
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
              <Medal team={1} net={net1} correct={scores[1]} taboo={tabooScores[1]} isWinner={false} />
              <Medal team={2} net={net2} correct={scores[2]} taboo={tabooScores[2]} isWinner={false} />
            </>
          ) : (
            <>
              <Medal team={winner} net={winner === 1 ? net1 : net2} correct={scores[winner]} taboo={tabooScores[winner]} isWinner={true} />
              <Medal team={loser} net={loser === 1 ? net1 : net2} correct={scores[loser]} taboo={tabooScores[loser]} isWinner={false} />
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

  const current = cardsState[index] || cardsState[0];

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
  const nextCard = () => setIndex((i) => (i + 1) % cardsState.length);

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
    setCardsState(shuffle(ALL_CARDS));
    setIndex(0);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTurnScores({ 1: 0, 2: 0 });
    setTurnTaboo({ 1: 0, 2: 0 });
    setTeam(1);
    setTimeLeft(roundTime);          // use current roundTime setting
    setPassesLeft(maxPasses);
    setIsPaused(false);
    setPhase('playing');
  };

  // ── Continue to next team's turn ───────────────────────────────────────────
  const continueTurn = () => {
    const nextTeam = team === 1 ? 2 : 1;
    setTeam(nextTeam);
    setTimeLeft(roundTime);          // always reset to the configured roundTime
    setPassesLeft(maxPasses);
    setTurnScores({ 1: 0, 2: 0 });
    setTurnTaboo({ 1: 0, 2: 0 });
    setIsPaused(false);
    setPhase('playing');
  };

  const endGame = () => setPhase('finished');

  const restart = () => {
    setPhase('setup');
    setTeam(1);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
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
              onChange={(e) => setRoundTime(Math.max(5, Number(e.target.value)))}
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
            {phase === 'playing' ? current?.word : '?'}
          </h2>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {(phase === 'playing' ? current?.taboo : ['—', '—', '—', '—', '—']).map((w, i) => (
              <div key={i} className="bg-red-500 p-2 rounded-xl text-sm font-medium">
                🚫 {w}
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <button
              onClick={pass}
              disabled={phase !== 'playing' || passesLeft <= 0}
              className="bg-yellow-400 text-black rounded-xl p-3 font-semibold disabled:opacity-40"
            >
              Passo ({phase === 'playing' ? passesLeft : maxPasses})
            </button>
            <button
              onClick={tabooHit}
              disabled={phase !== 'playing'}
              className="bg-red-600 rounded-xl p-3 font-semibold disabled:opacity-40"
            >
              TABOO
            </button>
            <button
              onClick={correct}
              disabled={phase !== 'playing'}
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
