import { useState, useEffect } from "react";

export default function TabooGameApp() {
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

  const [cardsState, setCardsState] = useState(shuffle(cards));
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [tabooScores, setTabooScores] = useState({ 1: 0, 2: 0 });

  const [roundTime, setRoundTime] = useState(60);
  const [timeLeft, setTimeLeft] = useState(60);

  const [maxPasses, setMaxPasses] = useState(3);
  const [passesLeft, setPassesLeft] = useState(3);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const current = cardsState[index];

  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          nextTurn();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, isPaused]);

  const startGame = () => {
    const confirmStart = window.confirm("Vuoi iniziare il round?");
    if (!confirmStart) return;

    setCardsState(shuffle(cards));
    setIndex(0);
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTeam(1);
    setTimeLeft(roundTime);
    setPassesLeft(maxPasses);
    setIsPlaying(true);
    setIsPaused(false);
  };

  const nextCard = () => setIndex((i) => (i + 1) % cardsState.length);

  const correct = () => {
    setScores((s) => ({ ...s, [team]: s[team] + 1 }));
    nextCard();
  };

  const taboo = () => {
    setTabooScores((s) => ({ ...s, [team]: s[team] + 1 }));
    nextCard();
  };

  const pass = () => {
    if (passesLeft <= 0) return;
    setPassesLeft((p) => p - 1);
    nextCard();
  };

  const nextTurn = () => {
    setTeam((t) => (t === 1 ? 2 : 1));
    setTimeLeft(roundTime);
    setPassesLeft(maxPasses);
    setIsPaused(false);
  };

  const togglePause = () => {
    setIsPaused((p) => !p);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-6">🎭 Taboo Game</h1>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-2xl">
            <h2 className="font-bold mb-3">⚙️ Setup</h2>

            <input
              type="number"
              value={roundTime}
              onChange={(e) => setRoundTime(Number(e.target.value))}
              className="w-full p-2 border rounded-xl mb-3"
              placeholder="Tempo round"
            />

            <input
              type="number"
              value={maxPasses}
              onChange={(e) => setMaxPasses(Number(e.target.value))}
              className="w-full p-2 border rounded-xl mb-3"
              placeholder="Passaggi"
            />

            <button
              onClick={startGame}
              className="w-full bg-black text-white py-3 rounded-2xl"
            >
              Inizia round
            </button>
          </div>

          <div className="p-4 bg-gray-50 rounded-2xl">
            <h2 className="font-bold mb-3">🏆 Score</h2>
            <p>Squadra 1: {scores[1]}</p>
            <p>Squadra 2: {scores[2]}</p>
            <p className="text-red-500">Taboo S1: {tabooScores[1]}</p>
            <p className="text-red-500">Taboo S2: {tabooScores[2]}</p>
          </div>
        </div>

        <div className="bg-black text-white p-6 rounded-3xl text-center">
          <div className="flex justify-between mb-3">
            <span>Squadra {team}</span>
            <span>{timeLeft}s</span>
          </div>

          <h2 className="text-4xl font-bold mb-4">{current?.word}</h2>

          <div className="grid grid-cols-2 gap-2 mb-4">
            {current?.taboo.map((w, i) => (
              <div key={i} className="bg-red-500 p-2 rounded-xl">
                🚫 {w}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button onClick={pass} className="bg-yellow-400 text-black rounded-xl p-3">
              Passo ({passesLeft})
            </button>
            <button onClick={taboo} className="bg-red-600 rounded-xl p-3">
              TABOO
            </button>
            <button onClick={correct} className="bg-green-600 rounded-xl p-3">
              OK
            </button>
          </div>

          <button
            onClick={togglePause}
            className="mt-4 bg-gray-700 px-4 py-2 rounded-xl"
          >
            {isPaused ? "Riprendi" : "Pausa"}
          </button>
        </div>
      </div>
    </div>
  );
}