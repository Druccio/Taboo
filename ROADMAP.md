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
  - Al termine dell'ultimo turno dell'ultima squadra, passaggio automatico alla schermata finale (`WinnerScreen`).
- **Impatto architetturale:**
  - `App.jsx`: Aggiungere stato `maxRounds` (default es. 3) e `currentRound`.
  - Aggiornare `continueTurn()` per incrementare il round dopo che tutte le squadre hanno completato il proprio turno e triggerare `endGame()` al raggiungimento del limite.

---

### 2. Menù a tendina per la selezione della difficoltà
**Obiettivo:** Sostituire o affiancare la griglia fissa di pulsanti con un menù a tendina (dropdown/select) moderno, accessibile e integrato con il tema grafico dell'app.

- **Comportamento utente:**
  - Selezione intuitiva della difficoltà: *Facile*, *Medio / Intermedio*, *Difficile*, o per macro-categoria.
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

---

### 4. Audio & Feedback Tattile (Game Feel)
**Obiettivo:** Aumentare il coinvolgimento e l'adrenalina durante i turni tramite riscontri sonori e vibrazione nativa su dispositivi mobili.

- **4.1 Effetti sonori sintetizzati (Web Audio API):**
  - Generazione audio procedurale via Web Audio API senza file mp3 pesanti:
    - *Ding / Suono armonico* per risposta corretta.
    - *Buzzer grave* per penalità Taboo.
    - *Whoosh* leggero per il passaggio carta.
    - *Tic-tac ritmico* che accelera negli ultimi 5 secondi del countdown.
    - *Gong / Sirena* alla fine del tempo del turno.
  - Pulsante switch 🔇/🔊 nell'interfaccia (con stato salvato in `localStorage`).
- **4.2 Feedback di vibrazione (Haptic Feedback):**
  - Uso dell'API `navigator.vibrate`:
    - Vibrazione breve (30-50ms) alla conferma di un punto corretto.
    - Doppia vibrazione intensa (100ms - 50ms - 100ms) quando si preme Taboo.
  - Attiva solo su smartphone e disattivabile da impostazioni.

---

### 5. Squadre & Personalizzazione
**Obiettivo:** Adattare il gioco a gruppi di amici e feste con nomi personalizzati e supporto a più squadre.

- **5.1 Nomi personalizzati per le squadre:**
  - Campi input modificabili nel pannello di setup per sostituire i generici "Squadra 1" e "Squadra 2" con nomi a piacere (es. "I Gladiatori", "Team Rosso").
  - Opzione rapida per generare nomi casuali o buffi in un click.
- **5.2 Supporto a 3 o 4 squadre:**
  - Estensione della logica di turno da binaria (1 vs 2) a un array circolare di $N$ squadre (es. fino a 4 squadre).
  - Palette colori dinamica e tabellone punteggi espandibile a griglia per ospitare tutti i team.

---

### 6. Meccaniche di Gioco Avanzate (Mazzo Misto & Var Taboo)
**Obiettivo:** Più flessibilità nella selezione delle carte e risoluzione trasparente delle contestazioni.

- **6.1 Modalità Mazzo Misto (Shuffle All):**
  - Possibilità di selezionare più mazzi contemporaneamente tramite checkbox (es. *Facile* + *Disney* + *Cinema*).
  - Unione e mescolamento automatico (`shuffle`) di tutte le carte dei mazzi scelti senza duplicati.
- **6.2 Riepilogo & verifica a fine turno (Var Taboo):**
  - Nel modale di fine turno (`TurnEndModal`), mostrare la lista cronologica delle carte giocate durante il round appena terminato con il loro esito (✅ Indovinata, 🚫 Taboo, ⏭️ Passata).
  - Permettere di correggere l'esito con un click in caso di contestazioni amichevoli prima di passare il dispositivo alla squadra successiva.

---

### 7. Statistiche Dettagliate di Fine Partita
**Obiettivo:** Arricchire la schermata di vittoria con dati curiosi e divertenti sulle performance dei giocatori.

- **Metriche visualizzate nella `WinnerScreen`:**
  - **Velocità media:** Secondi medi impiegati per indovinare ciascuna parola.
  - **Miglior turno (Record):** Numero massimo di parole indovinate in un singolo turno da una squadra.
  - **Parola lampo:** La carta indovinata nel minor tempo assoluto.
  - **Tasso di precisione:** Percentuale di risposte corrette rispetto ai tentativi e passaggi.

---

## 📋 Checklist Implementazione Futura

- [x] **Turni & Round:** Aggiungere `maxRounds` e contatore `currentRound` nel regolamento (`App.jsx`).
- [ ] **UI Dropdown:** Implementare componente `CustomSelect` o menù a tendina stilizzato.
- [ ] **Mazzi Tematici:** Refactoring modulare di `src/decks/` e creazione mazzo *Disney* (~50-100 carte).
- [ ] **Mazzo Misto:** Abilitare la selezione multipla di mazzi con concatenazione e shuffle.
- [ ] **Game Audio:** Creare modulo Web Audio API per suoni di gioco (corretto, taboo, countdown, gong) e toggle mute.
- [ ] **Haptic Feedback:** Integrare vibrazione per mobile su tap dei pulsanti principali.
- [ ] **Personalizzazione Team:** Aggiungere input per i nomi personalizzati delle squadre.
- [ ] **Multi-squadra:** Estendere il motore di gioco a 3 e 4 squadre.
- [ ] **Var Taboo:** Implementare cronologia e revisione carte a fine turno in `TurnEndModal`.
- [ ] **Statistiche Avanzate:** Calcolo e visualizzazione delle metriche di prestazione in `WinnerScreen`.
