import { COLORS, FF } from "../constants";

export function KpiCard({ label, value, sub, color = COLORS.accent, icon }) {
  return (
    <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "20px 24px", display: "flex", flexDirection: "column", gap: 6, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
      <div style={{ fontSize: 11, color: COLORS.textMuted, letterSpacing: "0.1em", textTransform: "uppercase" }}>{icon} {label}</div>
      <div style={{ fontSize: 24, fontWeight: 700, color, letterSpacing: "-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: COLORS.textDim }}>{sub}</div>}
    </div>
  );
}

export function Badge({ children, color = COLORS.accent }) {
  return (
    <span style={{ display: "inline-block", padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", background: color + "22", color, border: `1px solid ${color}44` }}>
      {children}
    </span>
  );
}

export function NavItem({ label, active, onClick, icon }) {
  return (
    <button onClick={onClick} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: active ? COLORS.accentBg : "transparent", border: "none", borderLeft: `2px solid ${active ? COLORS.accent : "transparent"}`, color: active ? COLORS.accent : COLORS.textMuted, fontSize: 13, cursor: "pointer", textAlign: "left", borderRadius: "0 6px 6px 0", transition: "all 0.15s", fontFamily: FF }}>
      <span style={{ fontSize: 15 }}>{icon}</span>{label}
    </button>
  );
}

export function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
      <div>
        <h2 style={{ color: COLORS.text, fontSize: 18, margin: 0, fontWeight: 600 }}>{title}</h2>
        {subtitle && <p style={{ color: COLORS.textMuted, fontSize: 12, margin: "4px 0 0" }}>{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function TableHeader({ columns }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: columns.map(c => c.width).join(" "), padding: "10px 16px", borderBottom: `1px solid ${COLORS.border}`, fontSize: 10, color: COLORS.textDim, letterSpacing: "0.08em", textTransform: "uppercase" }}>
      {columns.map((c, i) => <div key={i} style={{ textAlign: c.align || "left" }}>{c.label}</div>)}
    </div>
  );
}

export function Btn({ children, onClick, color = COLORS.accent, bgColor, style: s = {} }) {
  const bg = bgColor || color + "22";
  return (
    <button onClick={onClick} style={{ background: bg, border: `1px solid ${color}`, color, padding: "8px 16px", borderRadius: 6, fontSize: 13, cursor: "pointer", fontFamily: FF, ...s }}>
      {children}
    </button>
  );
}

export function MeseTabs({ mesi, selected, onChange, includeAll = false }) {
  return (
    <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
      {includeAll && (
        <button onClick={() => onChange(-1)} style={{ background: selected === -1 ? COLORS.accentBg : "transparent", border: `1px solid ${selected === -1 ? COLORS.accent : COLORS.border}`, color: selected === -1 ? COLORS.accent : COLORS.textDim, padding: "4px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: FF }}>
          APR–DIC
        </button>
      )}
      {mesi.map((m, i) => (
        <button key={m} onClick={() => onChange(i)} style={{ background: selected === i ? COLORS.accentBg : "transparent", border: `1px solid ${selected === i ? COLORS.accent : COLORS.border}`, color: selected === i ? COLORS.accent : COLORS.textDim, padding: "4px 10px", borderRadius: 4, fontSize: 11, cursor: "pointer", fontFamily: FF }}>
          {m}
        </button>
      ))}
    </div>
  );
}

export function InfoBox({ children, color = COLORS.textDim }) {
  return (
    <div style={{ padding: "10px 14px", background: COLORS.bg, borderRadius: 6, border: `1px solid ${COLORS.border}`, fontSize: 12, color, lineHeight: 1.6 }}>
      {children}
    </div>
  );
}
