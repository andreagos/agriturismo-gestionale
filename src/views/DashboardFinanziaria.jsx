import { useState } from "react";
import { COLORS, FF, MESI, MESI_FULL, PIANO_2026, fmt } from "../constants";
import { KpiCard, MeseTabs, InfoBox, Btn } from "../components/UI";
import { useSaldiBanche, useCassa, useEventi } from "../hooks/useFirebase";

export default function DashboardFinanziaria() {
  const [meseIdx, setMeseIdx] = useState(0);
  const [editSaldi, setEditSaldi] = useState(false);
  const [tmpBpm, setTmpBpm] = useState("");
  const [tmpCa, setTmpCa] = useState("");

  const { saldi, updateSaldo } = useSaldiBanche();
  const { saldoAttuale } = useCassa();
  const { eventi } = useEventi();

  const liquiditaBanche = (saldi.bpm || 0) + (saldi.ca || 0);
  const liquiditaTotale = liquiditaBanche + saldoAttuale;

  const capDaIncassare = eventi
    .filter(e => e.stato !== "saldato" && e.caparra === 0)
    .reduce((s, e) => s + (e.totale || 0), 0);

  const saldiDaIncassare = eventi
    .filter(e => e.stato === "confermato" && e.caparra > 0)
    .reduce((s, e) => s + (e.totale - e.caparra - (e.saldoPagato || 0)), 0);

  const pianoLiq = PIANO_2026.liquidita[meseIdx];
  const pianoInc = PIANO_2026.totaleIncassi[meseIdx];
  const pianoSpe = PIANO_2026.totaleSpese[meseIdx];
  const pianoDiff = PIANO_2026.differenza[meseIdx];
  const maxBar = Math.max(...PIANO_2026.totaleIncassi, ...PIANO_2026.totaleSpese);

  const handleSalvaSaldi = async () => {
    if (tmpBpm !== "") await updateSaldo("bpm", parseFloat(tmpBpm));
    if (tmpCa !== "") await updateSaldo("ca", parseFloat(tmpCa));
    setEditSaldi(false);
    setTmpBpm("");
    setTmpCa("");
  };

  const inp = { background: COLORS.bg, border: `1px solid ${COLORS.border}`, borderRadius: 6, color: COLORS.text, padding: "8px 12px", fontSize: 13, fontFamily: FF, width: "100%", boxSizing: "border-box" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h2 style={{ color: COLORS.text, fontSize: 18, margin: 0, fontWeight: 600 }}>Dashboard Finanziaria</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "4px 0 0" }}>Liquidità reale + piano 2026</p>
        </div>
        <Btn onClick={() => setEditSaldi(!editSaldi)} color={COLORS.blue}>
          {editSaldi ? "✕ Annulla" : "✎ Aggiorna Saldi Banca"}
        </Btn>
      </div>

      {/* Aggiornamento saldi manuali */}
      {editSaldi && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Aggiorna saldi bancari</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 4 }}>Banco BPM (€)</div>
              <input style={inp} type="number" placeholder={saldi.bpm || "0"} value={tmpBpm} onChange={e => setTmpBpm(e.target.value)} />
            </div>
            <div>
              <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 4 }}>Crédit Agricole (€)</div>
              <input style={inp} type="number" placeholder={saldi.ca || "0"} value={tmpCa} onChange={e => setTmpCa(e.target.value)} />
            </div>
          </div>
          <Btn onClick={handleSalvaSaldi} color={COLORS.accent} style={{ alignSelf: "flex-start" }}>Salva Saldi</Btn>
        </div>
      )}

      {/* KPI liquidità reale */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <KpiCard label="Banco BPM" value={fmt(saldi.bpm || 0)} sub={saldi.aggiornato_bpm ? `Agg. ${saldi.aggiornato_bpm}` : "Da aggiornare"} color={COLORS.blue} icon="🏦" />
        <KpiCard label="Crédit Agricole" value={fmt(saldi.ca || 0)} sub={saldi.aggiornato_ca ? `Agg. ${saldi.aggiornato_ca}` : "Da aggiornare"} color={COLORS.blue} icon="🏦" />
        <KpiCard label="Cassa Contanti" value={fmt(saldoAttuale)} sub="Dal registro cassa" color={COLORS.gold} icon="💵" />
        <KpiCard label="Liquidità Totale" value={fmt(liquiditaTotale)} sub="Banche + cassa" color={liquiditaTotale < 10000 ? COLORS.red : COLORS.accent} icon="✦" />
      </div>

      {/* KPI eventi */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <KpiCard label="Caparre da Ricevere" value={fmt(capDaIncassare)} sub={`${eventi.filter(e => e.caparra === 0 && e.stato !== "saldato").length} eventi in attesa`} color={COLORS.gold} icon="⏳" />
        <KpiCard label="Saldi da Incassare" value={fmt(saldiDaIncassare)} sub="Da eventi confermati con caparra" color={COLORS.accentDim} icon="📋" />
      </div>

      {/* Selettore mese piano */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Piano finanziario mensile</div>
        <MeseTabs mesi={MESI} selected={meseIdx} onChange={setMeseIdx} />
      </div>

      {/* KPI piano mese */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <KpiCard label={`Liquidità — ${MESI_FULL[meseIdx]}`} value={fmt(pianoLiq)} sub="Proiezione piano" color={pianoLiq < 5000 ? COLORS.red : pianoLiq < 15000 ? COLORS.gold : COLORS.accent} icon="💧" />
        <KpiCard label="Incassi Piano" value={fmt(pianoInc)} sub={MESI_FULL[meseIdx]} color={COLORS.accent} icon="📥" />
        <KpiCard label="Spese Piano" value={fmt(pianoSpe)} sub="Costi + investimenti" color={COLORS.red} icon="📤" />
        <KpiCard label="Differenza" value={(pianoDiff >= 0 ? "+" : "") + fmt(pianoDiff)} sub={pianoDiff >= 0 ? "Mese positivo" : "Mese in deficit"} color={pianoDiff >= 0 ? COLORS.accent : COLORS.red} icon={pianoDiff >= 0 ? "✦" : "⚠️"} />
      </div>

      {/* Grafico incassi vs spese */}
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24 }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 20, letterSpacing: "0.08em", textTransform: "uppercase" }}>Incassi vs Spese — Piano Apr–Dic 2026</div>
        <div style={{ display: "flex", gap: 12, alignItems: "flex-end", height: 160 }}>
          {MESI.map((m, i) => {
            const hInc = (PIANO_2026.totaleIncassi[i] / maxBar) * 130;
            const hSpe = (PIANO_2026.totaleSpese[i] / maxBar) * 130;
            const sel = i === meseIdx;
            return (
              <div key={m} onClick={() => setMeseIdx(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <div style={{ display: "flex", gap: 3, alignItems: "flex-end", height: 130 }}>
                  <div style={{ width: 16, background: sel ? COLORS.accent : COLORS.accent + "66", height: `${hInc}px`, borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
                  <div style={{ width: 16, background: sel ? COLORS.red : COLORS.red + "55", height: `${hSpe}px`, borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
                </div>
                <div style={{ fontSize: 9, color: sel ? COLORS.accent : COLORS.textDim, fontWeight: sel ? 700 : 400 }}>{m}</div>
              </div>
            );
          })}
          <div style={{ display: "flex", flexDirection: "column", gap: 6, alignSelf: "flex-start", marginLeft: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: COLORS.textMuted }}><div style={{ width: 8, height: 8, background: COLORS.accent, borderRadius: 2 }} /> Incassi</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: COLORS.textMuted }}><div style={{ width: 8, height: 8, background: COLORS.red, borderRadius: 2 }} /> Spese</div>
          </div>
        </div>
      </div>

      {/* Curva liquidità */}
      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 24 }}>
        <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 16, letterSpacing: "0.08em", textTransform: "uppercase" }}>Liquidità Proiettata — Apr–Dic 2026</div>
        <div style={{ display: "flex", gap: 0, alignItems: "flex-end" }}>
          {PIANO_2026.liquidita.map((liq, i) => {
            const maxL = Math.max(...PIANO_2026.liquidita);
            const h = Math.max(8, (liq / maxL) * 100);
            const col = liq < 5000 ? COLORS.red : liq < 15000 ? COLORS.gold : COLORS.accent;
            return (
              <div key={i} onClick={() => setMeseIdx(i)} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer" }}>
                <div style={{ fontSize: 9, color: col, marginBottom: 2 }}>{Math.round(liq / 1000)}k</div>
                <div style={{ width: "80%", background: i === meseIdx ? col : col + "66", height: `${h}px`, borderRadius: "3px 3px 0 0", transition: "height 0.3s" }} />
                <div style={{ fontSize: 9, color: i === meseIdx ? COLORS.accent : COLORS.textDim, fontWeight: i === meseIdx ? 700 : 400 }}>{MESI[i]}</div>
              </div>
            );
          })}
        </div>
        <InfoBox style={{ marginTop: 12 }}>
          ⚠️ <strong style={{ color: COLORS.red }}>Agosto</strong> è il mese critico: liquidità scende a{" "}
          <span style={{ color: COLORS.red }}>€ 4.596</span>. Settembre torna positivo grazie agli incassi eventi.
        </InfoBox>
      </div>
    </div>
  );
}
