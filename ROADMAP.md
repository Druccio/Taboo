# 🗺️ Roadmap & Nuove Funzionalità — L'Hai Detto! (Taboo)

Documento di pianificazione e specifiche tecniche per i prossimi aggiornamenti del gioco.  
Obiettivo: predisporre la struttura del codice per accogliere queste funzionalità in modo modulare senza dover riscrivere o stravolgere la logica esistente.

---

## 📌 Idee e Requisiti

### 1. Scelta del numero di turni prima dell'inizio della partita
**Obiettivo:** Permettere ai giocatori di stabilire la durata complessiva della partita impostando quanti turni ciascuna squadra (o in totale) deve giocare prima del calcolo finale del vincitore.

- **Comportamento utente:**
  - Nella schermata iniziale (*Regolamento*), aggiungere uno stepper/selettore **"Turni per squadra"** (es. opzioni rapide: 1, 3, 5, 10 o *Illimitato*).
  - Durante il turno, mostrare nel pannello superiore o nella card il contatore del turno corrente (es. `Turno 2 di 3`).
  - Al termine dell'ultimo turno della Squadra 2, il pulsante *"Termina partita"* o la transizione naturale porterà direttamente alla schermata finale (`WinnerScreen`).
- **Impatto architetturale:**
  - `App.jsx`: Aggiungere stato `maxRounds` (default es. 3) e `currentRound`.
  - Aggiornare `continueTurn()` per incrementare il round dopo che entrambe le squadre hanno completato il proprio turno e triggerare `endGame()` al raggiungimento del limite.

---

### 2. Menù a tendina per la selezione della difficoltà
**Obiettivo:** Sostituire o affiancare la griglia fissa di pulsanti con un menù a tendina (dropdown/select) moderno, accessibile e integrato con il tema grafico dell'app.

- **Comportamento utente:**
  - Selezione intuitiva della difficoltà: *Facile*, *Medio / Intermedio*, *Difficile*, oppure per macro-categoria.
  - Indicazione visiva del numero di carte disponibili per ciascun mazzo selezionato.
  - Possibilità di filtrare o raggruppare i mazzi standard rispetto a quelli tematici.
- **Impatto architetturale:**
  - Componente dedicato `DeckSelector` con stile coordinato (stile biglietto/carta o vintage retro dark).
  - Riorganizzazione dei metadati `DECKS_META` con campi `difficulty: 'facile' | 'intermedio' | 'difficile'` e `group: 'standard' | 'themed'`.

---

### 3. Espansione dei deck e mazzi a tema (es. Disney, Cinema, Pop Culture)
**Obiettivo:** Ampliare notevolmente la libreria di carte e introdurre mazzi tematici (es. *Universo Disney*, *Cinema & Serie TV*, *Anni 90/2000*, *Musica*, ecc.).

- **Mazzi previsti:**
  - 🏰 **Disney & Animazione:** Personaggi, film, canzoni e luoghi iconici Disney e Pixar.
  - 🎬 **Cinema & Serie TV:** Film cult, registi, serie TV popolari e protagonisti.
  - 🎮 **Geek & Videogiochi:** Giochi storici, console e cultura pop.
  - 📚 **Cultura Generale & Storia:** Curiosità, inventori ed eventi storici.
- **Impatto architetturale:**
  - Separazione modulare dei dati: dividere `cards.ts` in file dedicati per categoria (es. `src/decks/disney.ts`, `src/decks/standard.ts`, `src/decks/cinema.ts`) con indice unificato `src/decks/index.ts`.
  - Estensione dell'interfaccia `Card`:
    ```typescript
    export interface DeckMeta {
      id: string;
      title: string;
      description?: string;
      category: 'standard' | 'disney' | 'cinema' | 'gaming';
      difficulty: 'facile' | 'intermedio' | 'difficile';
      color: string;
      icon?: string;
    }
    ```
  - Possibilità futura di unire più deck per una partita mista ("Mazzo personalizzato").

---

## 📋 Checklist Implementazione Futura

- [ ] Aggiungere `maxRounds` e contatore `currentRound` nel regolamento (`App.jsx`).
- [ ] Implementare componente `CustomSelect` o menù a tendina stilizzato.
- [ ] Refactoring modulare della cartella `src/decks/`.
- [ ] Creazione del primo mazzo a tema *Disney* (~50-100 carte).
- [ ] Creazione di mazzi a tema aggiuntivi.
- [ ] Test di regressione dell'interfaccia su schermi mobile e desktop.
