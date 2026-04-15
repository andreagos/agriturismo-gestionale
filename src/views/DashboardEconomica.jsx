import { useState } from "react";
import { COLORS, MESI, MESI_FULL, PIANO_2026, fmt } from "../constants";
import { KpiCard, MeseTabs } from "../components/UI";

const FF = "'DM Mono','Courier New',monospace";

const GRUPPI_COSTI = [
  { label:"Finanziamenti", key:"finanziamenti", color:COLORS.blue, voci:[
    { label:"Mutuo", key:"mutuo" }, { label:"Ismea (dal 2027)", key:"ismea" },
    { label:"Rata Fidicomptur", key:"rataFidicomptur" }, { label:"Rata Merlo", key:"rataMerlo" },
    { label:"Rata Furgone", key:"rataFurgone" }, { label:"40k Asconfidi", key:"asconfidi" },
  ]},
  { label:"Manodopera", key:"manodopera", color:COLORS.purple, voci:[
    { label:"Carlo", key:"carlo" }, { label:"Max", key:"max" },
    { label:"Alina", key:"alina" }, { label:"Giulia", key:"giulia" },
    { label:"Noemi", key:"noemi" }, { label:"Altri", key:"altriManodopera" },
  ]},
  { label:"Materie Prime Vendita", key:"matPrimeVendita", color:COLORS.accent, voci:[
    { label:"Nostran Carni", key:"nostranCarni" }, { label:"Stime preventive", key:"stimePreventive" },
  ]},
  { label:"Materie Prime Ristorazione", key:"matPrimeRisto", color:COLORS.accentDim, voci:[
    { label:"Food cost 33%", key:"foodCost33" }, { label:"Pasticceria RM", key:"pasticceriaRM" },
    { label:"Pasini (verdure)", key:"pasiniVerdure" }, { label:"Orma (birra)", key:"ormaBirra" },
    { label:"Gruppo Italiano Vini", key:"giv" }, { label:"Nicellini (vino)", key:"nicellinoVino" },
    { label:"Zeus (acqua)", key:"zeusAcqua" }, { label:"Olio", key:"olio" },
    { label:"Ciocca (formaggi)", key:"cioccaFormaggi" }, { label:"Sogegross", key:"sogegross" },
    { label:"Cantaluppi", key:"cantaluppi" }, { label:"Val Mulini", key:"valMulini" },
  ]},
  { label:"Utenze", key:"utenze", color:COLORS.gold, voci:[
    { label:"Enel", key:"enel" }, { label:"GPL", key:"gpl" }, { label:"Acqua", key:"acqua" },
  ]},
  { label:"Assicurazioni", key:"assicurazioni", color:COLORS.red, voci:[
    { label:"Vita", key:"assicVita" }, { label:"Furgone", key:"assicFurgone" },
    { label:"Immobile", key:"assicImmobile" }, { label:"Incendio", key:"assicIncendio" },
    { label:"Dacia", key:"assicDacia" }, { label:"Sollevatore", key:"assicSollevatore" },
  ]},
  { label:"Carburanti & Pedaggi", key:"carburanti", color:COLORS.textMuted, voci:[
    { label:"Telepass", key:"telepass" }, { label:"Benzina", key:"benzina" }, { label:"Bollo Dacia", key:"bolloDacia" },
  ]},
  { label:"Contabilità & Paghe", key:"contabilitaPaghe", color:"#5b9bd5aa", voci:[
    { label:"Torres", key:"torres" }, { label:"Coldiretti", key:"coldiretti" },
  ]},
  { label:"Contributi Previdenziali", key:"contributiPrev", color:"#a78bfaaa", voci:[
    { label:"Contributi Amministratore", key:"contributiAmm" }, { label:"Contributi Dipendenti", key:"contributiDip" },
  ]},
  { label:"Costi Bancari", key:"costiBancari", color:"#5b9bd566", voci:[
    { label:"Banca (canone)", key:"banca" }, { label:"POS", key:"pos" }, { label:"Nexi", key:"nexi" },
  ]},
  { label:"Altro", key:"altro", color:COLORS.textMuted, voci:[
    { label:"Sonvico", key:"sonvico" }, { label:"Ecopaper", key:"ecopaper" },
    { label:"Bio", key:"bio" }, { label:"New Cleaning", key:"newCleaning" },
    { label:"Commissioni mercato", key:"commissioniMercato" }, { label:"Consorzio", key:"consorzio" },
  ]},
  { label:"Manutenzioni", key:"manutenzioni", color:"#c9a84c88", voci:[
    { label:"Foc", key:"foc" }, { label:"Manutenzioni previste", key:"manutenzioniPrev" },
  ]},
  { label:"Compenso Amministratore", key:"compensoAmm", color:COLORS.gold, voci:[] },
];

const INVESTIMENTI_VOCI = [
  { label:"Lavastoviglie", key:"lavastoviglie" }, { label:"Lavapavimenti", key:"lavapavimenti" },
  { label:"Sedie e tavoli", key:"sedieTavoli" }, { label:"Tappeto erboso", key:"tappetoErboso" },
  { label:"Gerosa macchine agricole", key:"gerosa" }, { label:"Aiani (Idraulico)", key:"aiani" },
  { label:"Rattiflora", key:"rattiflora" }, { label:"Eurosistem (guaina copertura)", key:"eurosistem" },
  { label:"Mallamace (Geometra)", key:"mallamace" }, { label:"Lodetti (cartongesso)", key:"lodetti" },
  { label:"Gabaglio", key:"gabaglio" }, { label:"Mazzucchi scavi", key:"mazzucchiScavi" },
  { label:"Piastrelle cucina", key:"piastrelleCucina" }, { label:"Vari investimenti", key:"variInvestimenti" },
  { label:"Noleggio ruspa", key:"noleggioRuspa" }, { label:"Restituzione cambiale", key:"restituzioneCamb" },
];

const INCASSI_VOCI = [
  { label:"Fatturato eventi confermato", key:"fatturatoEventiConf", color:COLORS.accent },
  { label:"↳ Di cui con ristorazione", key:"diCuiConRisto", color:COLORS.accentDim, indent:true },
  { label:"Vendite prodotti", key:"venditeProdotti", color:COLORS.gold },
  { label:"Giardini", key:"giardini", color:COLORS.accentDim },
  { label:"Incassi eventi (netto caparre)", key:"incassiEventi", color:COLORS.accent },
  { label:"Caparre", key:"caparre", color:COLORS.blue },
  { label:"Eventi fatti da incassare", key:"eventiDaIncassare", color:COLORS.gold },
  { label:"Pagamenti arretrati", key:"pagamentiArretrati", color:COLORS.gold },
  { label:"Nuovo finanziamento", key:"nuovoFinanziamento", color:COLORS.textMuted },
  { label:"PSR", key:"psr", color:COLORS.textMuted },
  { label:"Nuovo mutuo 250k", key:"nuovoMutuo250k", color:COLORS.textMuted },
  { label:"Nuovo cambiale", key:"nuovoCambiale", color:COLORS.textMuted },
];

export default function DashboardEconomica() {
  const [meseIdx, setMeseIdx] = useState(-1);
  const [sezione, setSezione] = useState("costi");
  const [gruppoAperto, setGruppoAperto] = useState(null);

  const getVal = (key) => {
    if (!PIANO_2026[key]) return 0;
    if (meseIdx === -1) return PIANO_2026[key].reduce((a, b) => a + b, 0);
    return PIANO_2026[key][meseIdx] || 0;
  };

  const totIncAnno = PIANO_2026.totaleIncassi.reduce((a, b) => a + b, 0);
  const totSpeAnno = PIANO_2026.totaleSpese.reduce((a, b) => a + b, 0);
  const totSpeMese = getVal("totaleSpese");
  const totIncMese = getVal("totaleIncassi");
  const totInvMese = getVal("investimenti");
  const totCostiMese = getVal("totaleCosti");

  const tabBtn = (id, label) => (
    <button onClick={() => setSezione(id)} style={{ background:sezione===id?COLORS.accentBg:"transparent", border:`1px solid ${sezione===id?COLORS.accent:COLORS.border}`, color:sezione===id?COLORS.accent:COLORS.textMuted, padding:"6px 14px", borderRadius:4, fontSize:12, cursor:"pointer", fontFamily:FF }}>
      {label}
    </button>
  );

  return (
    <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
        <div>
          <h2 style={{ color:COLORS.text, fontSize:18, margin:0, fontWeight:600 }}>Dashboard Economica</h2>
          <p style={{ color:COLORS.textMuted, fontSize:12, margin:"4px 0 0" }}>Analisi completa — tutte le voci dal piano finanziario 2026</p>
        </div>
        <MeseTabs mesi={MESI} selected={meseIdx} onChange={setMeseIdx} includeAll />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
        <KpiCard label="Tot. Incassi Apr–Dic" value={fmt(totIncAnno)} sub="Piano 2026" color={COLORS.accent} icon="📈" />
        <KpiCard label="Tot. Spese Apr–Dic" value={fmt(totSpeAnno)} sub="Costi + investimenti" color={COLORS.red} icon="📉" />
        <KpiCard label="Risultato Netto" value={(totIncAnno-totSpeAnno>=0?"+":"")+fmt(totIncAnno-totSpeAnno)} sub="Fine anno proiettato" color={totIncAnno-totSpeAnno>=0?COLORS.accent:COLORS.red} icon="✦" />
        <KpiCard label="Tot. Investimenti" value={fmt(PIANO_2026.investimenti.reduce((a,b)=>a+b,0))} sub="Capex pianificati" color={COLORS.blue} icon="🔨" />
      </div>

      <div style={{ display:"flex", gap:8 }}>
        {tabBtn("costi","Costi Operativi")}
        {tabBtn("investimenti","Investimenti")}
        {tabBtn("incassi","Incassi")}
        {tabBtn("riepilogo","Riepilogo Mensile")}
      </div>

      {/* ── COSTI ── */}
      {sezione==="costi" && (
        <div style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:8, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.border}`, fontSize:11, color:COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Costi Operativi — {meseIdx===-1?"Totale Apr–Dic 2026":MESI_FULL[meseIdx]} · {fmt(totCostiMese)}
          </div>
          {GRUPPI_COSTI.map((g, gi) => {
            const val = getVal(g.key);
            if (val===0) return null;
            const perc = totCostiMese>0?((val/totCostiMese)*100).toFixed(1):0;
            const aperto = gruppoAperto===gi;
            return (
              <div key={gi}>
                <div onClick={()=>setGruppoAperto(aperto?null:gi)} style={{ display:"grid", gridTemplateColumns:"20px 1fr 100px 55px", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:`1px solid ${COLORS.border}`, cursor:g.voci.length>0?"pointer":"default", background:aperto?COLORS.bg+"60":"transparent" }}>
                  <div style={{ fontSize:10, color:COLORS.textDim }}>{g.voci.length>0?(aperto?"▼":"▶"):""}</div>
                  <div style={{ fontSize:13, color:COLORS.text, display:"flex", alignItems:"center", gap:8 }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:g.color, flexShrink:0 }} />{g.label}
                  </div>
                  <div style={{ fontSize:13, color:g.color, fontWeight:700, textAlign:"right" }}>{fmt(val)}</div>
                  <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>{perc}%</div>
                </div>
                {aperto && g.voci.map((v, vi) => {
                  const vval = getVal(v.key);
                  if (vval===0) return null;
                  return (
                    <div key={vi} style={{ display:"grid", gridTemplateColumns:"20px 1fr 100px 55px", alignItems:"center", gap:12, padding:"8px 16px 8px 32px", borderBottom:`1px solid ${COLORS.border}22`, background:COLORS.bg+"80" }}>
                      <div />
                      <div style={{ fontSize:12, color:COLORS.textMuted }}>└ {v.label}</div>
                      <div style={{ fontSize:12, color:g.color+"cc", textAlign:"right" }}>{fmt(vval)}</div>
                      <div style={{ fontSize:10, color:COLORS.textDim, textAlign:"right" }}>{totCostiMese>0?((vval/totCostiMese)*100).toFixed(1):0}%</div>
                    </div>
                  );
                })}
              </div>
            );
          }).filter(Boolean)}
          <div style={{ display:"grid", gridTemplateColumns:"20px 1fr 100px 55px", padding:"13px 16px", background:COLORS.bg+"80", alignItems:"center", gap:12 }}>
            <div /><div style={{ fontSize:13, color:COLORS.text, fontWeight:700 }}>TOTALE COSTI OPERATIVI</div>
            <div style={{ fontSize:13, color:COLORS.red, fontWeight:700, textAlign:"right" }}>{fmt(totCostiMese)}</div>
            <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>100%</div>
          </div>
        </div>
      )}

      {/* ── INVESTIMENTI ── */}
      {sezione==="investimenti" && (
        <div style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:8, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.border}`, fontSize:11, color:COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Investimenti — {meseIdx===-1?"Totale Apr–Dic 2026":MESI_FULL[meseIdx]} · {fmt(totInvMese)}
          </div>
          {INVESTIMENTI_VOCI.map((v, i) => {
            const val = getVal(v.key);
            if (val===0) return null;
            return (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 100px 55px", alignItems:"center", gap:12, padding:"12px 16px", borderBottom:`1px solid ${COLORS.border}` }}>
                <div style={{ fontSize:13, color:COLORS.text }}>{v.label}</div>
                <div style={{ fontSize:13, color:COLORS.blue, fontWeight:700, textAlign:"right" }}>{fmt(val)}</div>
                <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>{totInvMese>0?((val/totInvMese)*100).toFixed(1):0}%</div>
              </div>
            );
          }).filter(Boolean)}
          {totInvMese===0 && <div style={{ padding:24, textAlign:"center", color:COLORS.textDim, fontSize:13 }}>Nessun investimento in questo periodo.</div>}
          {totInvMese>0 && (
            <div style={{ display:"grid", gridTemplateColumns:"1fr 100px 55px", padding:"13px 16px", background:COLORS.bg+"80", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:13, color:COLORS.text, fontWeight:700 }}>TOTALE INVESTIMENTI</div>
              <div style={{ fontSize:13, color:COLORS.blue, fontWeight:700, textAlign:"right" }}>{fmt(totInvMese)}</div>
              <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>100%</div>
            </div>
          )}
        </div>
      )}

      {/* ── INCASSI ── */}
      {sezione==="incassi" && (
        <div style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:8, overflow:"hidden" }}>
          <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.border}`, fontSize:11, color:COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>
            Incassi — {meseIdx===-1?"Totale Apr–Dic 2026":MESI_FULL[meseIdx]} · {fmt(totIncMese)}
          </div>
          {INCASSI_VOCI.map((v, i) => {
            const val = getVal(v.key);
            if (val===0) return null;
            return (
              <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 100px 55px", alignItems:"center", gap:12, padding: v.indent?"8px 16px 8px 32px":"12px 16px", borderBottom:`1px solid ${COLORS.border}`, background:v.indent?COLORS.bg+"60":"transparent" }}>
                <div style={{ fontSize: v.indent?12:13, color:v.indent?COLORS.textMuted:COLORS.text }}>{v.label}</div>
                <div style={{ fontSize: v.indent?12:13, color:v.color, fontWeight:700, textAlign:"right" }}>{fmt(val)}</div>
                <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>{totIncMese>0?((val/totIncMese)*100).toFixed(1):0}%</div>
              </div>
            );
          }).filter(Boolean)}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 100px 55px", padding:"13px 16px", background:COLORS.bg+"80", alignItems:"center", gap:12 }}>
            <div style={{ fontSize:13, color:COLORS.text, fontWeight:700 }}>TOTALE INCASSI</div>
            <div style={{ fontSize:13, color:COLORS.accent, fontWeight:700, textAlign:"right" }}>{fmt(totIncMese)}</div>
            <div style={{ fontSize:11, color:COLORS.textDim, textAlign:"right" }}>100%</div>
          </div>
        </div>
      )}

      {/* ── RIEPILOGO MENSILE ── */}
      {sezione==="riepilogo" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div style={{ background:COLORS.surface, border:`1px solid ${COLORS.border}`, borderRadius:8, overflow:"hidden" }}>
            <div style={{ padding:"14px 20px", borderBottom:`1px solid ${COLORS.border}`, fontSize:11, color:COLORS.textMuted, letterSpacing:"0.08em", textTransform:"uppercase" }}>Riepilogo Mensile Completo — Apr–Dic 2026</div>
            <div style={{ display:"grid", gridTemplateColumns:"90px 1fr 1fr 1fr 1fr 1fr", padding:"10px 16px", borderBottom:`1px solid ${COLORS.border}`, fontSize:10, color:COLORS.textDim, letterSpacing:"0.06em", textTransform:"uppercase" }}>
              <div>Mese</div><div style={{ textAlign:"right" }}>Incassi</div><div style={{ textAlign:"right" }}>Costi Op.</div><div style={{ textAlign:"right" }}>Investimenti</div><div style={{ textAlign:"right" }}>Differenza</div><div style={{ textAlign:"right" }}>Liquidità</div>
            </div>
            {MESI_FULL.map((m, i) => {
              const diff = PIANO_2026.differenza[i];
              const liq = PIANO_2026.liquidita[i];
              return (
                <div key={i} onClick={()=>{setMeseIdx(i);setSezione("costi");}} style={{ display:"grid", gridTemplateColumns:"90px 1fr 1fr 1fr 1fr 1fr", padding:"12px 16px", borderBottom:i<8?`1px solid ${COLORS.border}`:"none", cursor:"pointer", background:i%2===0?"transparent":COLORS.bg+"40" }}>
                  <div style={{ fontSize:12, color:COLORS.text, fontWeight:600 }}>{m}</div>
                  <div style={{ fontSize:12, color:COLORS.accent, textAlign:"right" }}>{fmt(PIANO_2026.totaleIncassi[i])}</div>
                  <div style={{ fontSize:12, color:COLORS.red, textAlign:"right" }}>{fmt(PIANO_2026.totaleCosti[i])}</div>
                  <div style={{ fontSize:12, color:COLORS.blue, textAlign:"right" }}>{fmt(PIANO_2026.investimenti[i])}</div>
                  <div style={{ fontSize:12, color:diff>=0?COLORS.accent:COLORS.red, textAlign:"right", fontWeight:600 }}>{diff>=0?"+":""}{fmt(diff)}</div>
                  <div style={{ fontSize:12, color:liq<5000?COLORS.red:liq<15000?COLORS.gold:COLORS.accent, textAlign:"right", fontWeight:600 }}>{fmt(liq)}</div>
                </div>
              );
            })}
            <div style={{ display:"grid", gridTemplateColumns:"90px 1fr 1fr 1fr 1fr 1fr", padding:"13px 16px", background:COLORS.bg+"80" }}>
              <div style={{ fontSize:12, color:COLORS.text, fontWeight:700 }}>TOTALE</div>
              <div style={{ fontSize:12, color:COLORS.accent, textAlign:"right", fontWeight:700 }}>{fmt(PIANO_2026.totaleIncassi.reduce((a,b)=>a+b,0))}</div>
              <div style={{ fontSize:12, color:COLORS.red, textAlign:"right", fontWeight:700 }}>{fmt(PIANO_2026.totaleCosti.reduce((a,b)=>a+b,0))}</div>
              <div style={{ fontSize:12, color:COLORS.blue, textAlign:"right", fontWeight:700 }}>{fmt(PIANO_2026.investimenti.reduce((a,b)=>a+b,0))}</div>
              <div style={{ fontSize:12, color:COLORS.textMuted, textAlign:"right", fontWeight:700 }}>{fmt(PIANO_2026.differenza.reduce((a,b)=>a+b,0))}</div>
              <div style={{ fontSize:12, color:COLORS.textDim, textAlign:"right" }}>—</div>
            </div>
          </div>
          <div style={{ padding:"12px 16px", background:COLORS.surface, borderRadius:8, border:`1px solid ${COLORS.border}`, fontSize:12, color:COLORS.textDim }}>
            💡 Clicca su un mese per vedere il dettaglio completo dei costi. Liquidità iniziale (1 apr): <span style={{ color:COLORS.gold, fontWeight:700 }}>€ 49.000</span> → Fine dicembre: <span style={{ color:COLORS.accent, fontWeight:700 }}>€ 23.115</span>
          </div>
        </div>
      )}
    </div>
  );
}
