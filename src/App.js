import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import { COLORS, FF } from "./constants";
import { NavItem } from "./components/UI";
import Login from "./views/Login";
import DashboardFinanziaria from "./views/DashboardFinanziaria";
import DashboardEconomica from "./views/DashboardEconomica";
import MovimentiView from "./views/Movimenti";
import EventiView from "./views/Eventi";
import CassaView from "./views/Cassa";
import AnagraficaView from "./views/Anagrafica";

const NAV = [
  { id: "fin", label: "Finanze", icon: "💰" },
  { id: "eco", label: "Economica", icon: "📊" },
  { id: "mov", label: "Movimenti", icon: "↕️" },
  { id: "evi", label: "Eventi", icon: "🎉" },
  { id: "cas", label: "Cassa", icon: "💵" },
  { id: "ana", label: "Fornitori", icon: "📋" },
];

export default function App() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [vista, setVista] = useState("fin");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsub();
  }, []);

  if (authLoading) {
    return (
      <div style={{ fontFamily: FF, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg, color: COLORS.textDim, fontSize: 13 }}>
        Caricamento...
      </div>
    );
  }

  if (!user) return <Login />;

  const renderVista = () => {
    if (vista === "fin") return <DashboardFinanziaria />;
    if (vista === "eco") return <DashboardEconomica />;
    if (vista === "mov") return <MovimentiView />;
    if (vista === "evi") return <EventiView />;
    if (vista === "cas") return <CassaView />;
    if (vista === "ana") return <AnagraficaView />;
  };

  return (
    <div style={{ fontFamily: FF, display: "flex", height: "100vh", background: COLORS.bg, color: COLORS.text, overflow: "hidden" }}>
      {/* Sidebar */}
      <div style={{ width: 200, flexShrink: 0, background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.04em" }}>AGOSTINELLI</div>
          <div style={{ fontSize: 10, color: COLORS.textDim, marginTop: 2, letterSpacing: "0.06em" }}>GESTIONALE · 2026</div>
        </div>
        <nav style={{ padding: "12px 0", flex: 1 }}>
          {NAV.map(n => (
            <NavItem key={n.id} label={n.label} icon={n.icon} active={vista === n.id} onClick={() => setVista(n.id)} />
          ))}
        </nav>
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 10, color: COLORS.textDim, marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent }} />
              Fase 1 — MVP
            </div>
            <div style={{ marginTop: 4, color: COLORS.textDim + "99" }}>{user.email}</div>
          </div>
          <button
            onClick={() => signOut(auth)}
            style={{ fontSize: 11, color: COLORS.textDim, background: "transparent", border: `1px solid ${COLORS.border}`, borderRadius: 4, padding: "4px 10px", cursor: "pointer", fontFamily: FF, width: "100%" }}
          >
            Esci
          </button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, overflow: "auto", padding: 28 }}>
        {renderVista()}
      </div>
    </div>
  );
}
