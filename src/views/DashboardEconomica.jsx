import { useState } from "react";
import { COLORS, MESI, MESI_FULL, PIANO_2026, fmt } from "../constants";
import { KpiCard, MeseTabs } from "../components/UI";

const VOCI_COSTI = [
  { label: "Finanziamenti", key: "finanziamenti", color: COLORS.blue },
  { label: "Manodopera", key: "manodopera", color: COLORS.purple },
  { label: "Utenze", key: "utenze", color: COLORS.gold },
  { label: "Mat. Prime Vendita", key: "matPrimeVendita", color: COLORS.accent },
  { label: "Mat. Prime Ristorazione", key: "matPrimeRisto", color: COLORS.accentDim },
  { label: "Assicurazioni", key: "assicurazioni", color: COLORS.red },
  { label: "Carburanti & Pedaggi", key: "carburanti", color: COLORS.textMuted },
  { label: "Costi Bancari", key: "costiBancari", color: COLORS.blue + "88" },
  { label: "Compenso Amm.", key: "compensoAmm", color: COLORS.gold + "88" },
  { label: "Altro & Manutenzioni", key: "altro", color: COLORS.textMuted },
  { label: "Investimenti", key: "investimenti", color: COLORS.red + "99" },
];

const VOCI_INCASSI = [
  { label: "Vendite Prodotti", key: "venditeProdotti", color: COLORS.gold },
  { label: "Incassi Eventi", key: "incassiEventi", color: COLORS.accent },
  { label: "Caparre", key: "caparre", color: COLORS.blue },
];

export default function DashboardEconomica() {
  const [meseIdx, setMeseIdx] = useState(-1); // -1 = totale anno

  const getVal = (key) => meseIdx === -1
    ? PIANO_2026[key].reduce((a, b) => a + b, 0)
    : PIANO_2026[key][meseIdx];

  const totIncAnno = PIANO_2026.totaleIncassi.reduce((a, b) => a + b, 0);
  const totSpeAnno = PIANO_2026.totaleSpese.reduce((a, b) => a + b, 0);
  const totSpeMese = getVal("totaleSpese");
  const totIncMese = getVal("totaleIncassi");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: COLORS.text, fontSize: 18, margin: 0, fontWeight: 600 }}>Dashboard Economica</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "4px 0 0" }}>Breakdown costi e ricavi — piano 2026</p>
        </div>
        <MeseTabs mesi={MESI} selected={meseIdx} onChange={setMeseIdx} includeAll />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <KpiCard label="Tot. Incassi Apr–Dic" value={fmt(totIncAnno)} sub="Piano 2026" color={COLORS.accent} icon="📈" />
        <KpiCard label="Tot. Spese Apr–Dic" value={fmt(totSpeAnno)} sub="Costi + investimenti" color={COLORS.red} icon="📉" />
        <KpiCard label="Risultato Netto" value={(totIncAnno - totSpeAnno >= 0 ? "+" : "") + fmt(totIncAnno - totSpeAnno)} sub="Fine anno proiettato" color={totIncAnno - totSpeAnno >= 0 ? COLORS.accent : COLORS.red} icon="✦" />
      </div>

      {/* Breakdown costi */}
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Breakdown Costi — {meseIdx === -1 ? "Totale Apr–Dic 2026" : MESI_FULL[meseIdx]}
        </div>
        {VOCI_COSTI.map((v, i) => {
          const val = getVal(v.key);
          if (val === 0) return null;
          const perc = totSpeMese > 0 ? ((val / totSpeMese) * 100).toFixed(1) : 0;
          return (
            <div key={i} style={{ padding: "12px 20px", borderBottom: `1px solid ${COLORS.border}`, display: "grid", gridTemplateColumns: "190px 1fr 90px 60px", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 13, color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.color, flexShrink: 0 }} />{v.label}
              </div>
              <div>
                <div style={{ height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(parseFloat(perc), 100)}%`, background: v.color, borderRadius: 2 }} />
                </div>
              </div>
              <div style={{ fontSize: 13, color: v.color, fontWeight: 700 }}>{fmt(val)}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{perc}%</div>
            </div>
          );
        }).filter(Boolean)}
        <div style={{ padding: "14px 20px", background: COLORS.bg + "80", display: "grid", gridTemplateColumns: "190px 1fr 90px 60px", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 700 }}>TOTALE SPESE</div>
          <div />
          <div style={{ fontSize: 13, color: COLORS.red, fontWeight: 700 }}>{fmt(totSpeMese)}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>100%</div>
        </div>
      </div>

      {/* Breakdown incassi */}
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Breakdown Incassi — {meseIdx === -1 ? "Totale Apr–Dic 2026" : MESI_FULL[meseIdx]}
        </div>
        {VOCI_INCASSI.map((v, i) => {
          const val = getVal(v.key);
          const perc = totIncMese > 0 ? ((val / totIncMese) * 100).toFixed(1) : 0;
          return (
            <div key={i} style={{ padding: "12px 20px", borderBottom: i < VOCI_INCASSI.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "grid", gridTemplateColumns: "190px 1fr 90px 60px", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 13, color: COLORS.text, display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: v.color, flexShrink: 0 }} />{v.label}
              </div>
              <div><div style={{ height: 4, background: COLORS.border, borderRadius: 2, overflow: "hidden" }}><div style={{ height: "100%", width: `${Math.min(parseFloat(perc), 100)}%`, background: v.color, borderRadius: 2 }} /></div></div>
              <div style={{ fontSize: 13, color: v.color, fontWeight: 700 }}>{fmt(val)}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{perc}%</div>
            </div>
          );
        })}
        <div style={{ padding: "14px 20px", background: COLORS.bg + "80", display: "grid", gridTemplateColumns: "190px 1fr 90px 60px", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 700 }}>TOTALE INCASSI</div>
          <div />
          <div style={{ fontSize: 13, color: COLORS.accent, fontWeight: 700 }}>{fmt(totIncMese)}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim }}>100%</div>
        </div>
      </div>
    </div>
  );
}
