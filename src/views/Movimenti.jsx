import { useState } from "react";
import { COLORS, FF, BU_OPTIONS, METODI_OPTIONS, fmt, inp, lbl } from "../constants";
import { Badge, SectionHeader, Btn } from "../components/UI";
import { useMovimenti } from "../hooks/useFirebase";

const STATI = ["definitivo", "caparra", "parziale"];

export default function MovimentiView() {
  const { movimenti, loading, addMovimento, deleteMovimento } = useMovimenti();
  const [showForm, setShowForm] = useState(false);
  const [filtro, setFiltro] = useState("tutti");
  const [form, setForm] = useState({
    descrizione: "", importo: "", tipo: "entrata",
    bu: BU_OPTIONS[0], metodo: METODI_OPTIONS[0],
    controparte: "", stato: "definitivo", note: "",
    data: new Date().toISOString().split("T")[0],
  });

  const handleAdd = async () => {
    if (!form.descrizione || !form.importo) return;
    const imp = parseFloat(form.importo);
    await addMovimento({
      ...form,
      importo: form.tipo === "uscita" ? -Math.abs(imp) : Math.abs(imp),
    });
    setForm({ descrizione: "", importo: "", tipo: "entrata", bu: BU_OPTIONS[0], metodo: METODI_OPTIONS[0], controparte: "", stato: "definitivo", note: "", data: new Date().toISOString().split("T")[0] });
    setShowForm(false);
  };

  const filtered = filtro === "tutti" ? movimenti : movimenti.filter(m => m.tipo === filtro);

  const totEntrate = movimenti.filter(m => m.importo > 0).reduce((s, m) => s + m.importo, 0);
  const totUscite = movimenti.filter(m => m.importo < 0).reduce((s, m) => s + Math.abs(m.importo), 0);

  const statoColor = (s) => s === "caparra" ? COLORS.gold : s === "parziale" ? COLORS.blue : COLORS.accentDim;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader
        title="Entrate & Uscite"
        subtitle="Registro movimenti – inserimento manuale"
        action={<Btn onClick={() => setShowForm(!showForm)} color={COLORS.accent}>{showForm ? "✕ Annulla" : "+ Nuovo Movimento"}</Btn>}
      />

      {/* KPI rapidi */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.08em" }}>Tot. Entrate</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.accent, marginTop: 4 }}>{fmt(totEntrate)}</div>
        </div>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.08em" }}>Tot. Uscite</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.red, marginTop: 4 }}>{fmt(totUscite)}</div>
        </div>
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "14px 18px" }}>
          <div style={{ fontSize: 11, color: COLORS.textDim, textTransform: "uppercase", letterSpacing: "0.08em" }}>Saldo Movimenti</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: totEntrate - totUscite >= 0 ? COLORS.accent : COLORS.red, marginTop: 4 }}>
            {(totEntrate - totUscite >= 0 ? "+" : "") + fmt(totEntrate - totUscite)}
          </div>
        </div>
      </div>

      {showForm && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nuovo movimento</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div><div style={lbl}>Data</div><input style={inp} type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></div>
            <div><div style={lbl}>Descrizione</div><input style={inp} placeholder="es. Caparra evento giugno" value={form.descrizione} onChange={e => setForm({ ...form, descrizione: e.target.value })} /></div>
            <div><div style={lbl}>Importo (€)</div><input style={inp} type="number" step="0.01" placeholder="0.00" value={form.importo} onChange={e => setForm({ ...form, importo: e.target.value })} /></div>
            <div><div style={lbl}>Controparte</div><input style={inp} placeholder="es. Nostran Carni" value={form.controparte} onChange={e => setForm({ ...form, controparte: e.target.value })} /></div>
            <div><div style={lbl}>Tipo</div>
              <select style={inp} value={form.tipo} onChange={e => setForm({ ...form, tipo: e.target.value })}>
                <option value="entrata">Entrata</option>
                <option value="uscita">Uscita</option>
              </select>
            </div>
            <div><div style={lbl}>Stato</div>
              <select style={inp} value={form.stato} onChange={e => setForm({ ...form, stato: e.target.value })}>
                {STATI.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div><div style={lbl}>Business Unit</div>
              <select style={inp} value={form.bu} onChange={e => setForm({ ...form, bu: e.target.value })}>
                {BU_OPTIONS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div><div style={lbl}>Canale / Metodo</div>
              <select style={inp} value={form.metodo} onChange={e => setForm({ ...form, metodo: e.target.value })}>
                {METODI_OPTIONS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div><div style={lbl}>Note</div><input style={inp} placeholder="Opzionale" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></div>
          </div>
          <Btn onClick={handleAdd} color={COLORS.accent} bgColor={COLORS.accent} style={{ color: COLORS.bg, fontWeight: 700, alignSelf: "flex-start" }}>Salva Movimento</Btn>
        </div>
      )}

      <div style={{ display: "flex", gap: 8 }}>
        {["tutti", "entrata", "uscita"].map(f => (
          <button key={f} onClick={() => setFiltro(f)} style={{ background: filtro === f ? COLORS.accentBg : "transparent", border: `1px solid ${filtro === f ? COLORS.accent : COLORS.border}`, color: filtro === f ? COLORS.accent : COLORS.textMuted, padding: "5px 14px", borderRadius: 4, fontSize: 12, cursor: "pointer", fontFamily: FF, textTransform: "capitalize" }}>{f}</button>
        ))}
        <span style={{ marginLeft: "auto", fontSize: 11, color: COLORS.textDim, alignSelf: "center" }}>{filtered.length} movimenti</span>
      </div>

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 130px 120px 110px 80px 90px 30px", padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <div>Data</div><div>Descrizione</div><div>Controparte</div><div>BU</div><div>Canale</div><div>Stato</div><div style={{ textAlign: "right" }}>Importo</div><div />
        </div>
        {loading && <div style={{ padding: 24, color: COLORS.textDim, fontSize: 13 }}>Caricamento...</div>}
        {!loading && filtered.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: COLORS.textDim, fontSize: 13 }}>Nessun movimento. Clicca "+ Nuovo Movimento" per iniziare.</div>
        )}
        {filtered.map((m, i) => (
          <div key={m.id} style={{ display: "grid", gridTemplateColumns: "80px 1fr 130px 120px 110px 80px 90px 30px", padding: "12px 16px", alignItems: "center", borderBottom: i < filtered.length - 1 ? `1px solid ${COLORS.border}` : "none", background: i % 2 === 0 ? "transparent" : COLORS.bg + "40" }}>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{m.data?.slice(5).replace("-", "/")}</div>
            <div style={{ fontSize: 13, color: COLORS.text }}>
              {m.descrizione}
              {m.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{m.note}</div>}
            </div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.controparte || "—"}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{m.bu}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{m.metodo}</div>
            <div><Badge color={statoColor(m.stato)}>{m.stato}</Badge></div>
            <div style={{ fontSize: 13, fontWeight: 700, textAlign: "right", color: m.importo > 0 ? COLORS.accent : COLORS.red }}>
              {m.importo > 0 ? "+" : ""}€ {Math.abs(m.importo).toLocaleString("it-IT")}
            </div>
            <div>
              <button onClick={() => deleteMovimento(m.id)} style={{ background: "transparent", border: "none", color: COLORS.textDim, cursor: "pointer", fontSize: 12, padding: "2px 4px" }} title="Elimina">✕</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
