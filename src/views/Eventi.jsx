import { useState } from "react";
import { COLORS, fmt, inp, lbl } from "../constants";
import { KpiCard, Badge, SectionHeader, Btn } from "../components/UI";
import { useEventi } from "../hooks/useFirebase";

const STATI_EVENTO = ["attesa_caparra", "confermato", "saldato", "annullato"];
const statoColor = s => s === "saldato" ? COLORS.accent : s === "confermato" ? COLORS.gold : s === "annullato" ? COLORS.red : COLORS.purple;
const statoLabel = s => s === "saldato" ? "saldato" : s === "confermato" ? "conf." : s === "annullato" ? "annullato" : "attesa €";

export default function EventiView() {
  const { eventi, loading, addEvento, updateEvento, deleteEvento } = useEventi();
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ nome: "", data: "", pax: "", totale: "", caparra: 0, saldoPagato: 0, stato: "attesa_caparra", note: "" });

  const handleAdd = async () => {
    if (!form.nome || !form.data) return;
    await addEvento({ ...form, totale: parseFloat(form.totale) || 0, caparra: parseFloat(form.caparra) || 0, pax: parseInt(form.pax) || 0, saldoPagato: 0 });
    resetForm();
  };

  const handleUpdate = async () => {
    if (!editId) return;
    await updateEvento(editId, { ...form, totale: parseFloat(form.totale) || 0, caparra: parseFloat(form.caparra) || 0, pax: parseInt(form.pax) || 0, saldoPagato: parseFloat(form.saldoPagato) || 0 });
    setEditId(null);
    resetForm();
  };

  const handleEdit = (ev) => {
    setEditId(ev.id);
    setForm({ nome: ev.nome, data: ev.data, pax: ev.pax, totale: ev.totale, caparra: ev.caparra, saldoPagato: ev.saldoPagato || 0, stato: ev.stato, note: ev.note || "" });
    setShowForm(true);
  };

  const resetForm = () => {
    setForm({ nome: "", data: "", pax: "", totale: "", caparra: 0, saldoPagato: 0, stato: "attesa_caparra", note: "" });
    setShowForm(false);
    setEditId(null);
  };

  const capRicevute = eventi.reduce((s, e) => s + (e.caparra || 0), 0);
  const saldiDaIncassare = eventi.filter(e => e.stato !== "saldato" && e.stato !== "annullato").reduce((s, e) => s + ((e.totale || 0) - (e.caparra || 0) - (e.saldoPagato || 0)), 0);
  const inAttesaCap = eventi.filter(e => e.stato === "attesa_caparra").length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader
        title="Gestione Caparre & Eventi"
        subtitle="Tracciamento caparra → saldo per ogni evento"
        action={
          <Btn onClick={() => { setShowForm(!showForm); if (showForm) resetForm(); }} color={COLORS.gold} bgColor={COLORS.goldBg}>
            {showForm ? "✕ Annulla" : "+ Nuovo Evento"}
          </Btn>
        }
      />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
        <KpiCard label="Caparre Ricevute" value={fmt(capRicevute)} sub={`${eventi.filter(e => e.caparra > 0).length} eventi`} color={COLORS.gold} icon="⏳" />
        <KpiCard label="Saldi da Incassare" value={fmt(saldiDaIncassare)} sub="Entrate future confermate" color={COLORS.accent} icon="📅" />
        <KpiCard label="In Attesa Caparra" value={`${inAttesaCap} eventi`} sub="Richiede followup" color={inAttesaCap > 0 ? COLORS.red : COLORS.accentDim} icon="⚠️" />
      </div>

      {showForm && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>
            {editId ? "Modifica Evento" : "Nuovo Evento"}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ gridColumn: "1/3" }}><div style={lbl}>Nome evento</div><input style={inp} placeholder="es. Matrimonio Rossi – Ferrari" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
            <div><div style={lbl}>Data evento</div><input style={inp} type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} /></div>
            <div><div style={lbl}>N° Pax</div><input style={inp} type="number" placeholder="0" value={form.pax} onChange={e => setForm({ ...form, pax: e.target.value })} /></div>
            <div><div style={lbl}>Totale preventivo (€)</div><input style={inp} type="number" step="0.01" placeholder="0.00" value={form.totale} onChange={e => setForm({ ...form, totale: e.target.value })} /></div>
            <div><div style={lbl}>Caparra ricevuta (€)</div><input style={inp} type="number" step="0.01" placeholder="0.00" value={form.caparra} onChange={e => setForm({ ...form, caparra: e.target.value })} /></div>
            {editId && <div><div style={lbl}>Saldo già pagato (€)</div><input style={inp} type="number" step="0.01" placeholder="0.00" value={form.saldoPagato} onChange={e => setForm({ ...form, saldoPagato: e.target.value })} /></div>}
            <div><div style={lbl}>Stato</div>
              <select style={inp} value={form.stato} onChange={e => setForm({ ...form, stato: e.target.value })}>
                {STATI_EVENTO.map(s => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: editId ? "1/4" : "1/3" }}><div style={lbl}>Note</div><input style={inp} placeholder="Opzionale" value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></div>
          </div>
          {form.totale && (
            <div style={{ fontSize: 11, color: COLORS.textDim, padding: "8px 12px", background: COLORS.bg, borderRadius: 4, border: `1px solid ${COLORS.border}` }}>
              Totale: <span style={{ color: COLORS.text }}>{fmt(parseFloat(form.totale) || 0)}</span> ·
              Caparra: <span style={{ color: COLORS.gold }}>{fmt(parseFloat(form.caparra) || 0)}</span> ·
              Residuo: <span style={{ color: COLORS.accent }}>{fmt((parseFloat(form.totale) || 0) - (parseFloat(form.caparra) || 0) - (parseFloat(form.saldoPagato) || 0))}</span>
            </div>
          )}
          <div style={{ display: "flex", gap: 8 }}>
            <Btn onClick={editId ? handleUpdate : handleAdd} color={COLORS.gold} bgColor={COLORS.gold} style={{ color: COLORS.bg, fontWeight: 700 }}>
              {editId ? "Aggiorna" : "Salva Evento"}
            </Btn>
            {editId && <Btn onClick={() => deleteEvento(editId).then(resetForm)} color={COLORS.red}>Elimina</Btn>}
          </div>
        </div>
      )}

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 85px 55px 100px 95px 95px 95px 100px 30px", padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <div>Evento</div><div>Data</div><div>Pax</div><div>Totale</div><div>Caparra</div><div>Saldo Pag.</div><div>Residuo</div><div>Stato</div><div />
        </div>
        {loading && <div style={{ padding: 24, color: COLORS.textDim, fontSize: 13 }}>Caricamento...</div>}
        {!loading && eventi.length === 0 && (
          <div style={{ padding: 32, textAlign: "center", color: COLORS.textDim, fontSize: 13 }}>Nessun evento. Clicca "+ Nuovo Evento" per aggiungere.</div>
        )}
        {eventi.map((ev, i) => {
          const residuo = (ev.totale || 0) - (ev.caparra || 0) - (ev.saldoPagato || 0);
          return (
            <div key={ev.id} style={{ display: "grid", gridTemplateColumns: "1fr 85px 55px 100px 95px 95px 95px 100px 30px", padding: "13px 16px", alignItems: "center", borderBottom: i < eventi.length - 1 ? `1px solid ${COLORS.border}` : "none", background: i % 2 === 0 ? "transparent" : COLORS.bg + "40" }}>
              <div>
                <div style={{ fontSize: 13, color: COLORS.text }}>{ev.nome}</div>
                {ev.note && <div style={{ fontSize: 10, color: COLORS.textDim }}>{ev.note}</div>}
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{ev.data?.slice(5).replace("-", "/")}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{ev.pax}</div>
              <div style={{ fontSize: 13, color: COLORS.text }}>{fmt(ev.totale || 0)}</div>
              <div style={{ fontSize: 13, color: ev.caparra > 0 ? COLORS.accent : COLORS.red }}>{ev.caparra > 0 ? fmt(ev.caparra) : "—"}</div>
              <div style={{ fontSize: 13, color: ev.saldoPagato > 0 ? COLORS.accent : COLORS.textDim }}>{ev.saldoPagato > 0 ? fmt(ev.saldoPagato) : "—"}</div>
              <div style={{ fontSize: 13, color: residuo > 0 ? COLORS.gold : COLORS.accentDim }}>{residuo > 0 ? fmt(residuo) : "✓"}</div>
              <div><Badge color={statoColor(ev.stato)}>{statoLabel(ev.stato)}</Badge></div>
              <button onClick={() => handleEdit(ev)} style={{ background: "transparent", border: "none", color: COLORS.textDim, cursor: "pointer", fontSize: 13 }} title="Modifica">✎</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
