export const COLORS = {
  bg: "#0f1410",
  surface: "#161d17",
  border: "#2a3a2d",
  borderLight: "#354a38",
  accent: "#7ec97f",
  accentDim: "#4a8f4b",
  accentBg: "#1a2e1b",
  gold: "#c9a84c",
  goldBg: "#2a2010",
  red: "#e05252",
  blue: "#5b9bd5",
  purple: "#a78bfa",
  text: "#e8f0e9",
  textMuted: "#7a9a7d",
  textDim: "#4a6a4d",
};

export const FF = "'DM Mono','Courier New',monospace";

export const inp = {
  background: "#0f1410",
  border: "1px solid #2a3a2d",
  borderRadius: 6,
  color: "#e8f0e9",
  padding: "8px 12px",
  fontSize: 13,
  fontFamily: FF,
  width: "100%",
  boxSizing: "border-box",
};

export const lbl = { fontSize: 11, color: "#4a6a4d", marginBottom: 4 };

export const BU_OPTIONS = [
  "BU1 – Eventi e Ristorazione",
  "BU2 – Carni e Trasformati",
  "BU3 – Ortofrutta",
  "BU4 – Overhead",
];

export const METODI_OPTIONS = [
  "Bonifico",
  "POS BPM",
  "POS NFC",
  "Satispay",
  "Contanti",
  "Bonifico Alveare",
  "Stripe/Shopify",
  "RID Bancario",
];

export const MESI = ["Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
export const MESI_FULL = ["Aprile","Maggio","Giugno","Luglio","Agosto","Settembre","Ottobre","Novembre","Dicembre"];

// Dati reali completi dal piano_finanziario_2026.xlsx — foglio "sintetico"
// Colonne: Apr, Mag, Giu, Lug, Ago, Set, Ott, Nov, Dic
export const PIANO_2026 = {
  liquiditaIniziale:  49000,

  // FINANZIAMENTI
  finanziamenti:      [2884,  5412,  9995,  5279,  5279,  9995,  5279,  7779,  9995],
  mutuo:              [2472,  2472,  2472,  2472,  2472,  2472,  2472,  2472,  2472],
  ismea:              [0,     0,     0,     0,     0,     0,     0,     2500,  0   ],
  rataFidicomptur:    [0,     637,   637,   637,   637,   637,   637,   637,   637 ],
  rataMerlo:          [0,     0,     4716,  0,     0,     4716,  0,     0,     4716],
  rataFurgone:        [412,   412,   412,   412,   412,   412,   412,   412,   412 ],
  asconfidi:          [0,     1891,  1758,  1758,  1758,  1758,  1758,  1758,  1758],

  // MANODOPERA
  manodopera:         [500,   5500,  5500,  5000,  5000,  5500,  5000,  5000,  5000],
  carlo:              [0,     1800,  1800,  1800,  1800,  1800,  1800,  1800,  1800],
  max:                [0,     1800,  1800,  1800,  1800,  1800,  1800,  1800,  1800],
  alina:              [0,     1400,  1400,  1400,  1400,  1400,  1400,  1400,  1400],
  giulia:             [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  noemi:              [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  altriManodopera:    [500,   500,   500,   0,     0,     500,   0,     0,     0   ],

  // COSTI BANCARI
  costiBancari:       [330,   0,     0,     330,   0,     0,     330,   0,     0   ],
  nexi:               [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  banca:              [250,   0,     0,     250,   0,     0,     250,   0,     0   ],
  pos:                [80,    0,     0,     80,    0,     0,     80,    0,     0   ],

  // UTENZE
  utenze:             [2170,  400,   400,   535,   400,   400,   535,   400,   400 ],
  acqua:              [0,     0,     0,     135,   0,     0,     135,   0,     0   ],
  enel:               [600,   400,   400,   400,   400,   400,   400,   400,   400 ],
  gpl:                [1570,  0,     0,     0,     0,     0,     0,     0,     0   ],

  // MATERIE PRIME VENDITA
  matPrimeVendita:    [2600,  8647,  5223,  5076,  4950,  4950,  4125,  3025,  4675],
  stimePreventive:    [0,     0,     0,     2000,  4950,  4950,  4125,  3025,  4675],
  nostranCarni:       [2600,  2999,  2735,  3076,  0,     0,     0,     0,     0   ],

  // MATERIE PRIME RISTORAZIONE
  matPrimeRisto:      [1358,  743,   3944,  5432,  3498,  0,     3242,  2970,  3300],
  foodCost33:         [0,     0,     3944,  5432,  3498,  0,     3242,  2970,  3300],
  pasticceriaRM:      [199,   0,     0,     0,     0,     0,     0,     0,     0   ],
  pasiniVerdure:      [171,   528,   0,     0,     0,     0,     0,     0,     0   ],
  ormaBirra:          [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  giv:                [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  nicellinoVino:      [256,   0,     0,     0,     0,     0,     0,     0,     0   ],
  zeusAcqua:          [145,   0,     0,     0,     0,     0,     0,     0,     0   ],
  olio:               [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  cioccaFormaggi:     [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  sogegross:          [0,     215,   0,     0,     0,     0,     0,     0,     0   ],
  cantaluppi:         [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  valMulini:          [0,     0,     0,     0,     0,     0,     0,     0,     0   ],

  // ASSICURAZIONI
  assicurazioni:      [3165,  0,     0,     0,     0,     0,     455,   0,     0   ],
  assicImmobile:      [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  assicVita:          [165,   0,     0,     0,     0,     0,     0,     0,     0   ],
  assicIncendio:      [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  assicDacia:         [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  assicFurgone:       [3000,  0,     0,     0,     0,     0,     0,     0,     0   ],
  assicSollevatore:   [0,     0,     0,     0,     0,     0,     455,   0,     0   ],

  // CONTABILITÀ E PAGHE
  contabilitaPaghe:   [0,     300,   300,   300,   300,   300,   300,   300,   300 ],
  coldiretti:         [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  torres:             [0,     300,   300,   300,   300,   300,   300,   300,   300 ],

  // CARBURANTI E PEDAGGI
  carburanti:         [360,   530,   530,   530,   530,   530,   530,   530,   530 ],
  telepass:           [180,   180,   180,   180,   180,   180,   180,   180,   180 ],
  benzina:            [180,   350,   350,   350,   350,   350,   350,   350,   350 ],
  bolloDacia:         [0,     0,     0,     0,     0,     0,     0,     0,     0   ],

  // CONTRIBUTI PREVIDENZIALI
  contributiPrev:     [0,     220,   220,   220,   220,   220,   220,   220,   220 ],
  contributiAmm:      [0,     100,   100,   100,   100,   100,   100,   100,   100 ],
  contributiDip:      [0,     120,   120,   120,   120,   120,   120,   120,   120 ],

  // ALTRO
  altro:              [176,   1210,  393,   200,   400,   200,   200,   450,   200 ],
  sonvico:            [0,     600,   0,     200,   200,   200,   200,   200,   200 ],
  ecopaper:           [176,   0,     0,     0,     0,     0,     0,     0,     0   ],
  bio:                [0,     360,   0,     0,     0,     0,     0,     0,     0   ],
  newCleaning:        [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  commissioniMercato: [0,     250,   0,     0,     200,   0,     0,     250,   0   ],
  consorzio:          [0,     0,     393,   0,     0,     0,     0,     0,     0   ],

  // MANUTENZIONI
  manutenzioni:       [192,   0,     0,     0,     0,     0,     0,     0,     0   ],
  foc:                [192,   0,     0,     0,     0,     0,     0,     0,     0   ],
  manutenzioniPrev:   [0,     0,     0,     0,     0,     0,     0,     0,     0   ],

  // COMPENSO AMMINISTRATORE
  compensoAmm:        [400,   400,   400,   400,   400,   400,   400,   400,   400 ],

  // TOTALI COSTI
  totaleCosti:        [14135, 23362, 26905, 23302, 20977, 22495, 20616, 21074, 25020],

  // INVESTIMENTI
  investimenti:       [6905,  13639, 6721,  2219,  500,   0,     0,     0,     1500],
  lavastoviglie:      [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  lavapavimenti:      [833,   0,     0,     0,     0,     0,     0,     0,     0   ],
  sedieTavoli:        [0,     1149,  927,   0,     0,     0,     0,     0,     0   ],
  tappetoErboso:      [0,     492,   0,     0,     0,     0,     0,     0,     0   ],
  gerosa:             [831,   788,   0,     0,     0,     0,     0,     0,     0   ],
  aiani:              [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  rattiflora:         [0,     845,   0,     0,     0,     0,     0,     0,     0   ],
  eurosistem:         [3411,  3411,  3411,  0,     0,     0,     0,     0,     0   ],
  mallamace:          [0,     0,     0,     0,     0,     0,     0,     0,     1500],
  lodetti:            [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  gabaglio:           [0,     1428,  0,     0,     0,     0,     0,     0,     0   ],
  mazzucchiScavi:     [1830,  2000,  0,     2000,  0,     0,     0,     0,     0   ],
  piastrelleCucina:   [0,     1143,  0,     0,     0,     0,     0,     0,     0   ],
  variInvestimenti:   [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  noleggioRuspa:      [0,     2383,  2383,  219,   0,     0,     0,     0,     0   ],
  restituzioneCamb:   [0,     0,     0,     0,     500,   0,     0,     0,     0   ],

  // TOTALE SPESE
  totaleSpese:        [21040, 37001, 33626, 25521, 21477, 22495, 20616, 21074, 26520],

  // INCASSI
  fatturatoEventiConf:[0,     16950, 21560, 14000, 2000,  11925, 13000, 15000, 25000],
  diCuiConRisto:      [0,     11950, 16460, 10600, 0,     9825,  9000,  10000, 20000],
  venditeProdotti:    [2500,  9000,  9000,  7500,  5500,  8500,  11500, 11500, 11500],
  giardini:           [0,     700,   700,   700,   700,   700,   700,   700,   700 ],
  incassiEventi:      [3100,  12350, 16560, 12500, 2000,  10425, 9000,  13000, 23000],
  caparre:            [1000,  2000,  2000,  2000,  2000,  2000,  2000,  2000,  2000 ],
  iva:                [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  eventiDaIncassare:  [450,   0,     0,     0,     0,     0,     0,     0,     0   ],
  pagamentiArretrati: [0,     2000,  0,     0,     0,     0,     0,     0,     0   ],
  nuovoFinanziamento: [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  psr:                [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  nuovoMutuo250k:     [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  nuovoCambiale:      [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
  totaleIncassi:      [7050,  26050, 28260, 22700, 10200, 21625, 23200, 27200, 37200],

  // RISULTATO E LIQUIDITÀ
  differenza:         [-13990,-10951,-5366, -2821, -11277,-870,  2584,  6126,  10680],
  liquidita:          [35010, 24059, 18693, 15873, 4596,  3726,  6309,  12435, 23115],
  liquiditaConRimb:   [35010, 24059, 18693, 15873, 4596,  3726,  6309,  12435, 23115],
  rimborsi:           [0,     0,     0,     0,     0,     0,     0,     0,     0   ],
};

export const FORNITORI_DEFAULT = [
  { nome:"Nostran Carni", categoria:"Materie Prime – Carni", bu:"BU2 – Carni", metodo:"Bonifico", note:"Fornitore principale carni", attivo:true },
  { nome:"Pasini (verdure)", categoria:"Materie Prime – Verdure", bu:"BU3 – Ortofrutta", metodo:"Contanti", note:"", attivo:true },
  { nome:"Nicellini (vino)", categoria:"Materie Prime – Bevande", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Zeus (acqua)", categoria:"Materie Prime – Bevande", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Orma (birra)", categoria:"Materie Prime – Bevande", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Ciocca (formaggi)", categoria:"Materie Prime – Latticini", bu:"BU2 – Carni e Trasformati", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Val Mulini (formaggi)", categoria:"Materie Prime – Latticini", bu:"BU2 – Carni e Trasformati", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Sogegross", categoria:"Materie Prime – Varie", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Cantaluppi", categoria:"Materie Prime – Varie", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Pasticceria RM", categoria:"Materie Prime – Pasticceria", bu:"BU1 – Eventi e Ristorazione", metodo:"Contanti", note:"", attivo:true },
  { nome:"Enel", categoria:"Utenze – Elettricità", bu:"BU4 – Overhead", metodo:"RID Bancario", note:"~400€/mese", attivo:true },
  { nome:"Coldiretti", categoria:"Contabilità e Paghe", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Torres", categoria:"Contabilità e Paghe", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Ecopaper", categoria:"Altro – Materiali", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
  { nome:"New Cleaning", categoria:"Altro – Pulizie", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Foc", categoria:"Manutenzioni", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Gruppo Italiano Vini", categoria:"Materie Prime – Bevande", bu:"BU1 – Eventi e Ristorazione", metodo:"Bonifico", note:"", attivo:true },
  { nome:"Sonvico", categoria:"Altro", bu:"BU4 – Overhead", metodo:"Bonifico", note:"", attivo:true },
];

export const fmt = (n) => "€ " + Math.round(n).toLocaleString("it-IT");
