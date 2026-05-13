import {useState, useEffect } from "react";
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
    { word: 'Camicia', taboo: ['Bottoni', 'Colletto', 'Vestiti', 'Maniche', 'Elegante'] },
    { word: 'Scarpe', taboo: ['Piedi', 'Lacci', 'Suola', 'Camminare', 'Sneakers'] },
    { word: 'Profumo', taboo: ['Odore', 'Fragranza', 'Spray', 'Boccetta', 'Essenza'] },
    { word: 'Matrimonio', taboo: ['Sposa', 'Anelli', 'Chiesa', 'Cerimonia', 'Ricevimento'] },
    { word: 'Banca', taboo: ['Soldi', 'Conto', 'Carta', 'Prestito', 'Bancomat'] },
    { word: 'Supermercato', taboo: ['Spesa', 'Carrello', 'Cassa', 'Prodotti', 'Corsia'] },
    { word: 'Polizia', taboo: ['Agente', 'Sirena', 'Legge', 'Divisa', 'Arresto'] },
    { word: 'Fuoco', taboo: ['Caldo', 'Fiamma', 'Bruciare', 'Legna', 'Incendio'] },
    { word: 'Neve', taboo: ['Freddo', 'Bianco', 'Sci', 'Inverno', 'Fiocchi'] },
    { word: 'Computer Fisso', taboo: ['Desktop', 'Monitor', 'Mouse', 'PC', 'Scrivania'] },
    { word: 'Parrucchiere', taboo: ['Capelli', 'Taglio', 'Forbici', 'Pettine', 'Salone'] },
    { word: 'Bambino', taboo: ['Piccolo', 'Giocattolo', 'Scuola', 'Genitori', 'Neonato'] },
    { word: 'Cuscino', taboo: ['Letto', 'Dormire', 'Morbido', 'Testa', 'Federa'] },
    { word: 'Pizza Margherita', taboo: ['Pomodoro', 'Mozzarella', 'Basilico', 'Forno', 'Italia'] },
    { word: 'Arancia', taboo: ['Agrume', 'Spremuta', 'Frutta', 'Vitamina', 'Buccia'] },
    { word: 'Yogurt', taboo: ['Latte', 'Colazione', 'Bianco', 'Frigo', 'Cucchiaio'] },
    { word: 'Pianoforte', taboo: ['Tasti', 'Musica', 'Suonare', 'Nero', 'Bianco'] },
    { word: 'Benzina', taboo: ['Auto', 'Carburante', 'Pompa', 'Diesel', 'Motore'] },
    { word: 'Spiaggia', taboo: ['Mare', 'Sabbia', 'Ombrellone', 'Estate', 'Costume'] },
    { word: 'Albero', taboo: ['Foglie', 'Tronco', 'Rami', 'Foresta', 'Pianta'] },
    { word: 'Cioccolato', taboo: ['Dolce', 'Cacao', 'Barretta', 'Latte', 'Fondente'] },
    { word: 'Hamburger', taboo: ['Panino', 'Carne', 'Fast food', 'Patatine', 'McDonalds'] },
    { word: 'Forchetta', taboo: ['Mangiare', 'Posate', 'Cucchiaio', 'Coltello', 'Tavola'] },
    { word: 'Letto', taboo: ['Dormire', 'Materasso', 'Cuscino', 'Camera', 'Lenzuola'] },
    { word: 'Computer Gaming', taboo: ['RGB', 'Mouse', 'Tastiera', 'FPS', 'Monitor'] },
    { word: 'Drone', taboo: ['Volare', 'Telecamera', 'Eliche', 'Radio', 'Aereo'] },
    { word: 'Yamaha', taboo: ['Moto', 'Motore', 'R6', 'Giappone', 'Due ruote'] },
    { word: 'Ferrari', taboo: ['Auto', 'Rossa', 'Formula 1', 'Lusso', 'Cavallino'] },
    { word: 'Formula 1', taboo: ['Pilota', 'Gara', 'Auto', 'Circuito', 'Pit stop'] },
    { word: 'Moto', taboo: ['Casco', 'Due ruote', 'Motore', 'Velocità', 'Manubrio'] },
    { word: 'Sicilia', taboo: ['Catania', 'Mare', 'Etna', 'Isola', 'Arancino'] },
    { word: 'Etna', taboo: ['Vulcano', 'Catania', 'Lava', 'Sicilia', 'Montagna'] },
    { word: 'Cucina', taboo: ['Cibo', 'Fornelli', 'Pentola', 'Casa', 'Chef'] },
    { word: 'Chef', taboo: ['Cucina', 'Ristorante', 'Cibo', 'Cuoco', 'Ricetta'] },
    { word: 'Ristorante', taboo: ['Mangiare', 'Menu', 'Chef', 'Cameriere', 'Prenotazione'] },
    { word: 'Hotel', taboo: ['Camera', 'Vacanza', 'Reception', 'Letto', 'Turista'] },
    { word: 'Ascensore', taboo: ['Piani', 'Bottoni', 'Salire', 'Scendere', 'Edificio'] },
    { word: 'Semaforo', taboo: ['Rosso', 'Verde', 'Auto', 'Strada', 'Incrocio'] },
    { word: 'Internet', taboo: ['WiFi', 'Online', 'Browser', 'Sito', 'Connessione'] },
    { word: 'Email', taboo: ['Messaggio', 'Posta', 'Gmail', 'Inviare', 'Inbox'] },
    { word: 'ChatGPT', taboo: ['AI', 'OpenAI', 'Chatbot', 'Intelligenza', 'Risposte'] },
    { word: 'Amazon', taboo: ['Pacco', 'Ordine', 'Shopping', 'Prime', 'Consegna'] },
    { word: 'Spotify', taboo: ['Musica', 'Playlist', 'Streaming', 'Canzoni', 'Podcast'] },
    { word: 'Apple', taboo: ['iPhone', 'Mac', 'iOS', 'Steve Jobs', 'Mela'] },
    { word: 'Samsung', taboo: ['Galaxy', 'Android', 'Telefono', 'Corea', 'TV'] },
    { word: 'iPhone', taboo: ['Apple', 'iOS', 'Telefono', 'Smartphone', 'App'] },
    { word: 'Android', taboo: ['Google', 'Telefono', 'Sistema', 'App', 'Smartphone'] },
    { word: 'Google', taboo: ['Ricerca', 'Internet', 'Chrome', 'Android', 'Motore'] },
    { word: 'Facebook', taboo: ['Social', 'Like', 'Post', 'Meta', 'Amici'] },
    { word: 'Telegram', taboo: ['Chat', 'Messaggi', 'Canale', 'App', 'Gruppo'] },
    { word: 'Discord', taboo: ['Server', 'Chat', 'Gaming', 'Voce', 'Canale'] },
    { word: 'Lego', taboo: ['Mattoncini', 'Costruire', 'Gioco', 'Colori', 'Bambini'] },
    { word: 'Pokemon', taboo: ['Pikachu', 'Anime', 'Carte', 'Nintendo', 'Allenatore'] },
    { word: 'Minecraft', taboo: ['Blocchi', 'Costruire', 'Creeper', 'Survival', 'Mojang'] },
    { word: 'Fortnite', taboo: ['Battle Royale', 'Epic Games', 'Skin', 'Costruire', 'Victory'] }
  ];

  const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

  const [shuffledCards, setShuffledCards] = useState(shuffleArray(cards));
  const [index, setIndex] = useState(0);
  const [team, setTeam] = useState(1);
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [tabooScores, setTabooScores] = useState({ 1: 0, 2: 0 });
  const [timeLeft, setTimeLeft] = useState(60);
  const [roundTime, setRoundTime] = useState(60);
  const [maxPasses, setMaxPasses] = useState(3);
  const [passesLeft, setPassesLeft] = useState(3);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentCard = shuffledCards[index];

  useEffect(() => {
    if (!isPlaying || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          nextTurn();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setScores({ 1: 0, 2: 0 });
    setTabooScores({ 1: 0, 2: 0 });
    setTeam(1);
    setTimeLeft(roundTime);
    setPassesLeft(maxPasses);
    setIndex(0);
    setShuffledCards(shuffleArray(cards));
    setIsPlaying(true);
  };

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % shuffledCards.length);
  };

  const guessedCorrectly = () => {
    setScores((prev) => ({ ...prev, [team]: prev[team] + 1 }));
    nextCard();
  };

  const tabooPressed = () => {
    setTabooScores((prev) => ({ ...prev, [team]: prev[team] + 1 }));
    nextCard();
  };

  const passCard = () => {
    if (passesLeft > 0) {
      setPassesLeft((prev) => prev - 1);
      nextCard();
    }
  };

  const nextTurn = () => {
    setTeam((prev) => (prev === 1 ? 2 : 1));
    setTimeLeft(roundTime);
    setPassesLeft(maxPasses);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-6">
        <h1 className="text-4xl font-bold text-center mb-6">🎭 Taboo Game</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-2xl">
            <h2 className="text-xl font-semibold mb-2">⚙️ Impostazioni</h2>

            <label className="block mb-3">
              <span className="text-sm font-medium">Tempo turno (secondi)</span>
              <input
                type="number"
                value={roundTime}
                onChange={(e) => setRoundTime(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-xl"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-medium">Numero passi</span>
              <input
                type="number"
                value={maxPasses}
                onChange={(e) => setMaxPasses(Number(e.target.value))}
                className="w-full mt-1 p-2 border rounded-xl"
              />
            </label>

            <button
              onClick={startGame}
              className="w-full bg-black text-white py-3 rounded-2xl font-semibold hover:scale-105 transition"
            >
              Inizia partita
            </button>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl">
            <h2 className="text-xl font-semibold mb-3">🏆 Punteggio</h2>
            <div className="space-y-3 text-lg">
              <div className="flex justify-between">
                <span>Squadra 1</span>
                <span>{scores[1]} punti</span>
              </div>
              <div className="flex justify-between">
                <span>Squadra 2</span>
                <span>{scores[2]} punti</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Penalità S1</span>
                <span>{tabooScores[1]}</span>
              </div>
              <div className="flex justify-between text-red-500">
                <span>Penalità S2</span>
                <span>{tabooScores[2]}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black text-white rounded-3xl p-6 text-center mb-6">
          <div className="flex justify-between mb-4 text-lg">
            <span>👥 Turno: Squadra {team}</span>
            <span>⏱️ {timeLeft}s</span>
          </div>

          <div className="text-5xl font-bold mb-6">{currentCard.word}</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {currentCard.taboo.map((word, i) => (
              <div key={i} className="bg-red-500 rounded-xl py-2 text-lg font-semibold">
                🚫 {word}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={passCard}
              disabled={passesLeft <= 0}
              className="bg-yellow-400 text-black py-3 rounded-2xl font-bold disabled:opacity-40"
            >
              ⏭️ Passo ({passesLeft})
            </button>

            <button
              onClick={tabooPressed}
              className="bg-red-600 py-3 rounded-2xl font-bold"
            >
              🚫 TABOO
            </button>

            <button
              onClick={guessedCorrectly}
              className="bg-green-600 py-3 rounded-2xl font-bold"
            >
              ✅ Corretta
            </button>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          Oltre 100 parole incluse • Turni automatici • Squadre personalizzabili
        </div>
      </div>
    </div>
  );
}
