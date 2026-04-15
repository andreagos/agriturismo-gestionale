# Gestionale Agostinelli

Gestionale economico-finanziario per Agriturismo Agostinelli — Fase 1 MVP.

## Setup (5 minuti)

### 1. Crea il progetto Firebase

1. Vai su [console.firebase.google.com](https://console.firebase.google.com)
2. Clicca **"Aggiungi progetto"** → nome: `gestionale-agostinelli`
3. Disabilita Google Analytics (non serve) → **Crea progetto**

**Abilita Authentication:**
- Menu laterale → **Authentication** → **Inizia**
- Tab **Sign-in method** → abilita **Email/Password**
- Tab **Utenti** → **Aggiungi utente** → inserisci email e password che userai per accedere

**Abilita Realtime Database:**
- Menu laterale → **Realtime Database** → **Crea database**
- Scegli la regione **europe-west1 (Belgium)**
- Avvia in **modalità di test** (cambieremo le regole dopo)
- Vai su tab **Regole** e incolla il contenuto di `database.rules.json`

**Ottieni le credenziali:**
- Ingranaggio ⚙️ → **Impostazioni progetto** → tab **Generali**
- Scorri fino a "Le tue app" → clicca **</>** (Web)
- Nome app: `gestionale` → **Registra app**
- Copia l'oggetto `firebaseConfig` che appare

### 2. Configura le variabili d'ambiente

```bash
cp .env.example .env
```

Apri `.env` e sostituisci i valori con quelli del tuo `firebaseConfig`:

```
REACT_APP_FIREBASE_API_KEY=AIza...
REACT_APP_FIREBASE_AUTH_DOMAIN=gestionale-agostinelli.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://gestionale-agostinelli-default-rtdb.europe-west1.firebasedatabase.app
REACT_APP_FIREBASE_PROJECT_ID=gestionale-agostinelli
REACT_APP_FIREBASE_STORAGE_BUCKET=gestionale-agostinelli.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=123456789
REACT_APP_FIREBASE_APP_ID=1:123456789:web:abc123
```

### 3. Crea il repo GitHub e fai il push

```bash
# Nella cartella del progetto:
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/andreagos/agriturismo-gestionale.git
git push -u origin main
```

### 4. Deploy su Vercel

1. Vai su [vercel.com](https://vercel.com) → **New Project**
2. Importa `andreagos/agriturismo-gestionale`
3. Vai su **Settings → Environment Variables** e aggiungi tutte le variabili del `.env`
4. **Redeploy** → l'app è online

---

## Struttura progetto

```
src/
  firebase.js          # Configurazione Firebase
  constants.js         # Colori, dati piano 2026, fornitori default
  App.js               # Shell principale + auth
  components/
    UI.jsx             # Componenti riutilizzabili
  hooks/
    useFirebase.js     # Hook per dati Firebase (movimenti, cassa, eventi, fornitori)
  views/
    Login.jsx
    DashboardFinanziaria.jsx
    DashboardEconomica.jsx
    Movimenti.jsx
    Cassa.jsx
    Eventi.jsx
    Anagrafica.jsx
```

## Sezioni disponibili (Fase 1)

| Sezione | Descrizione |
|---------|-------------|
| 💰 Finanze | Saldi banche + cassa + piano finanziario mensile |
| 📊 Economica | Breakdown costi e ricavi dal piano 2026 |
| ↕️ Movimenti | Registro entrate/uscite con Firebase |
| 🎉 Eventi | Tracciamento caparra → saldo eventi |
| 💵 Cassa | Registro contanti giornaliero |
| 📋 Fornitori | Anagrafica fornitori con autocompletamento |

## Note tecniche

- I dati del piano finanziario 2026 (Aprile–Dicembre) sono hardcoded in `constants.js` dal file `piano_finanziario_2026.xlsx`
- I movimenti reali, la cassa, gli eventi e i fornitori sono salvati su Firebase Realtime Database
- I fornitori default vengono caricati automaticamente al primo avvio
- Auth: solo utenti con email/password creati manualmente in Firebase Console
