import { useState } from "react";
import { COLORS, FF, fmt, inp, lbl } from "../constants";
import { KpiCard, Badge, SectionHeader, Btn } from "../components/UI";
import { useCassa } from "../hooks/useFirebase";

const TIPI = ["entrata", "uscita", "versamento", "prelievo"];
const tipoColor = t => t === "entrata" ? COLORS.accent : t === "versamento" ? COLORS.blue : t === "prelievo" ? COLORS.purple : COLORS.red;
const tipoSegno = t => t === "entrata" ? 1 : -1;

export default function CassaView() {
  const { movimenti, saldoAttuale, loading, addMovimentoCassa, deleteMovimentoCassa } = useCassa();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ tipo: "entrata", descrizione: "", importo: "", data: new Date().toISOString().split("T")[0] });

  const handleAdd = async () => {
    if (!form.descrizione || !form.importo) return;
    const imp = parseFloat(form.importo);
    await addMovimentoCassa({
      ...form,
      importo: tipoSegno(form.tipo) * Math.abs(imp),
    });
    setForm({ tipo: "entrata", descrizione: "", importo: "", data: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  };

  const entrateMese = movimenti.filter(m => m.importo > 0).reduce((s, m) => s + m.importo, 0);
  const usciteMese = movimenti.filter(m => m.importo < 0 && m.tipo !== "versamento").reduce((s, m) => s + Math.abs(m.importo), 0);
  const versamenti = movimenti.filter(m => m.tipo === "versamento").reduce((s, m) => s + Math.abs(m.importo), 0);

  const nuovoSaldo = form.importo
    ? saldoAttuale + tipoSegno(form.tipo) * parseFloat(form.importo || 0)
    : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader
        title="Cassa Contanti"
        subtitle="Registro giornaliero — sostituisce l'Excel cassa"
        action={<Btn onClick={() => setShowForm(!showForm)} color={COLORS.gold} bgColor={COLORS.goldBg}>{showForm ? "✕ Annulla" : "+ Movimento Cassa"}</Btn>}
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
        <KpiCard label="Saldo Attuale" value={fmt(saldoAttuale)} sub="Contanti in cassa" color={saldoAttuale < 500 ? COLORS.red : COLORS.gold} icon="💵" />
        <KpiCard label="Entrate" value={fmt(entrateMese)} sub="Tutti i movimenti" color={COLORS.accent} icon="↑" />
        <KpiCard label="Uscite Cash" value={fmt(usciteMese)} sub="Pagamenti in contanti" color={COLORS.red} icon="↓" />
        <KpiCard label="Versati in Banca" value={fmt(versamenti)} sub="Versamenti totali" color={COLORS.blue} icon="🏦" />
      </div>

      {showForm && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nuovo movimento cassa</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
            <div><div style={lbl}>Data</div><input style={inp} type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></div>
            <div><div style={lbl}>Tipo</div>
              <select style={inp} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                {TIPI.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div><div style={lbl}>Descrizione</div><input style={inp} placeholder="es. Vendita spaccio" value={form.descrizione} onChange={e => setForm({ ...form, descrizione: e.target.value })} /></div>
            <div><div style={lbl}>Importo (€)</div><input style={inp} type="number" step="0.01" placeholder="0.00" value={form.importo} onChange={e => setForm({ ...form, importo: e.target.value })} /></div>
          </div>
          <div style={{ fontSize: 11, color: COLORS.textDim, padding: "8px 12px", background: COLORS.bg, borderRadius: 4, border: `1px solid ${COLORS.border}` }}>
            Saldo attuale: <span style={{ color: COLORS.gold }}>{fmt(saldoAttuale)}</span>
            {nuovoSaldo !== null && <> → Nuovo saldo: <span style={{ color: nuovoSaldo >= 0 ? COLORS.accent : COLORS.red }}>{fmt(nuovoSaldo)}</span></>}
            {nuovoSaldo !== null && nuovoSaldo < 0 && <span style={{ color: COLORS.red }}> ⚠️ Saldo negativo</span>}
          </div>
          <Btn onClick={handleAdd} color={COLORS.gold} bgColor={COLORS.gold} style={{ color: COLORS.bg, fontWeight: 700, alignSelf: "flex-start" }}>Salva</Btn>
        </div>
      )}

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 110px 1fr 100px 100px 30px", padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <div>Data</div><div>Tipo</div><div>Descrizione</div><div style={{ textAlign: "right" }}>Movimento</div><div style={{ textAlign: "right" }}>Saldo Progr.</div><div />
        </div>
        {loading && <div style={{ padding: 24, color: COLORS.textDim, fontSize: 13 }}>Caricamento...</div>}
        {!loading && movimenti.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: COLORS.textDim, fontSize: 13 }}>Nessun movimento cassa. Inizia inserendo il saldo attuale.</div>
        )}
        {(() => {
          let saldoProgressivo = saldoAttuale;
          return movimenti.map((m, i) => {
            const saldoQui = saldoProgressivo;
            return (
              <div key={m.id} style={{ display: "grid", gridTemplateColumns: "80px 110px 1fr 100px 100px 30px", padding: "12px 16px", alignItems: "center", borderBottom: i < movimenti.length - 1 ? `1px solid ${COLORS.border}` : "none", background: i % 2 === 0 ? "transparent" : COLORS.bg + "40" }}>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>{m.data?.slice(5).replace("-", "/")}</div>
                <div><Badge color={tipoColor(m.tipo)}>{m.tipo}</Badge></div>
                <div style={{ fontSize: 13, color: COLORS.text }}>{m.descrizione}</div>
                <div style={{ fontSize: 13, fontWeight: 700, textAlign: "right", color: m.importo > 0 ? COLORS.accent : COLORS.red }}>
                  {m.importo > 0 ? "+" : ""}€ {Math.abs(m.importo).toLocaleString("it-IT")}
                </div>
                <div style={{ fontSize: 12, textAlign: "right", color: COLORS.gold }}>{fmt(saldoQui)}</div>
                <button onClick={() => deleteMovimentoCassa(m.id)} style={{ background: "transparent", border: "none", color: COLORS.textDim, cursor: "pointer", fontSize: 12 }} title="Elimina">✕</button>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
