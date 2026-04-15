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

// Dati reali dal piano_finanziario_2026.xlsx
export const PIANO_2026 = {
  finanziamenti:      [2884,  5412,  9995,  5279,  5279,  9995,  5279,  7779,  9995],
  manodopera:         [500,   5500,  5500,  5000,  5000,  5500,  5000,  5000,  5000],
  costiBancari:       [330,   0,     0,     330,   0,     0,     330,   0,     0   ],
  utenze:             [2170,  400,   400,   535,   400,   400,   535,   400,   400 ],
  matPrimeVendita:    [2600,  8647,  5223,  5076,  4950,  4950,  4125,  3025,  4675],
  matPrimeRisto:      [1358,  743,   3944,  5432,  3498,  0,     3242,  2970,  3300],
  assicurazioni:      [3165,  0,     0,     0,     0,     0,     455,   0,     0   ],
  carburanti:         [360,   530,   530,   530,   530,   530,   530,   530,   530 ],
  altro:              [176,   1210,  393,   200,   400,   200,   200,   450,   200 ],
  manutenzioni:       [192,   0,     0,     0,     0,     0,     0,     0,     0   ],
  compensoAmm:        [400,   400,   400,   400,   400,   400,   400,   400,   400 ],
  totaleCosti:        [14135, 23362, 26904, 23302, 20977, 22495, 20616, 21074, 25020],
  investimenti:       [6905,  13639, 6721,  2219,  500,   0,     0,     0,     1500],
  totaleSpese:        [21040, 37001, 33626, 25521, 21477, 22495, 20616, 21074, 26520],
  venditeProdotti:    [2500,  9000,  9000,  7500,  5500,  8500,  11500, 11500, 11500],
  incassiEventi:      [3100,  12350, 16560, 12500, 2000,  10425, 9000,  13000, 23000],
  caparre:            [1000,  2000,  2000,  2000,  2000,  2000,  2000,  2000,  2000 ],
  totaleIncassi:      [7050,  26050, 28260, 22700, 10200, 21625, 23200, 27200, 37200],
  differenza:         [-13990,-10951,-5366,-2821,-11277,-870,  2584,  6126,  10680],
  liquidita:          [35010, 24059, 18693, 15873, 4596,  3726,  6309,  12435, 23115],
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
