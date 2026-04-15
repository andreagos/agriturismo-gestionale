import { useState } from "react";
import { COLORS, BU_OPTIONS, METODI_OPTIONS, inp, lbl } from "../constants";
import { Badge, SectionHeader, Btn } from "../components/UI";
import { useFornitori } from "../hooks/useFirebase";

export default function AnagraficaView() {
  const { fornitori, loading, addFornitore, updateFornitore } = useFornitori();
  const [showForm, setShowForm] = useState(false);
  const [cerca, setCerca] = useState("");
  const [form, setForm] = useState({ nome: "", categoria: "", bu: BU_OPTIONS[0], metodo: METODI_OPTIONS[0], note: "", attivo: true });

  const handleAdd = async () => {
    if (!form.nome || !form.categoria) return;
    await addFornitore(form);
    setForm({ nome: "", categoria: "", bu: BU_OPTIONS[0], metodo: METODI_OPTIONS[0], note: "", attivo: true });
    setShowForm(false);
  };

  const toggleAttivo = async (f) => {
    await updateFornitore(f.id, { ...f, attivo: !f.attivo });
  };

  const filtrati = fornitori.filter(f =>
    f.nome.toLowerCase().includes(cerca.toLowerCase()) ||
    f.categoria.toLowerCase().includes(cerca.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <SectionHeader
        title="Anagrafica Fornitori"
        subtitle={`${fornitori.length} fornitori — regole autocompletamento movimenti`}
        action={<Btn onClick={() => setShowForm(!showForm)} color={COLORS.textMuted} bgColor={COLORS.surface}>{showForm ? "✕ Annulla" : "+ Nuovo Fornitore"}</Btn>}
      />

      {showForm && (
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.borderLight}`, borderRadius: 8, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>Nuovo fornitore / regola</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div><div style={lbl}>Nome fornitore</div><input style={inp} placeholder="es. Macelleria Pasini" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
            <div><div style={lbl}>Categoria spesa</div><input style={inp} placeholder="es. Materie Prime – Carni" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} /></div>
            <div><div style={lbl}>Business Unit</div>
              <select style={inp} value={form.bu} onChange={e => setForm({ ...form, bu: e.target.value })}>
                {BU_OPTIONS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div><div style={lbl}>Metodo pagamento</div>
              <select style={inp} value={form.metodo} onChange={e => setForm({ ...form, metodo: e.target.value })}>
                {METODI_OPTIONS.map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ gridColumn: "2/4" }}><div style={lbl}>Note</div><input style={inp} placeholder="es. Fattura mensile, importo fisso..." value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} /></div>
          </div>
          <Btn onClick={handleAdd} color={COLORS.accent} style={{ alignSelf: "flex-start" }}>Salva Fornitore</Btn>
        </div>
      )}

      <input
        style={{ ...inp, maxWidth: 360 }}
        placeholder="🔍  Cerca fornitore o categoria..."
        value={cerca}
        onChange={e => setCerca(e.target.value)}
      />

      <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 190px 120px 120px 1fr 60px", padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
          <div>Fornitore</div><div>Categoria</div><div>BU</div><div>Metodo</div><div>Note</div><div>Stato</div>
        </div>
        {loading && <div style={{ padding: 24, color: COLORS.textDim, fontSize: 13 }}>Caricamento...</div>}
        {filtrati.map((f, i) => (
          <div key={f.id} style={{ display: "grid", gridTemplateColumns: "1fr 190px 120px 120px 1fr 60px", padding: "11px 16px", alignItems: "center", borderBottom: i < filtrati.length - 1 ? `1px solid ${COLORS.border}` : "none", background: i % 2 === 0 ? "transparent" : COLORS.bg + "40", opacity: f.attivo ? 1 : 0.45 }}>
            <div style={{ fontSize: 13, color: COLORS.text, fontWeight: 600 }}>{f.nome}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{f.categoria}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{f.bu?.split("–")[0]?.trim()}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{f.metodo}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim }}>{f.note || "—"}</div>
            <div onClick={() => toggleAttivo(f)} style={{ cursor: "pointer" }}>
              <Badge color={f.attivo ? COLORS.accent : COLORS.textDim}>{f.attivo ? "on" : "off"}</Badge>
            </div>
          </div>
        ))}
        {!loading && filtrati.length === 0 && (
          <div style={{ padding: 24, textAlign: "center", color: COLORS.textDim, fontSize: 13 }}>Nessun fornitore trovato.</div>
        )}
      </div>
    </div>
  );
}
