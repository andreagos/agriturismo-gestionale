import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { COLORS, FF } from "../constants";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch {
      setError("Email o password non corretti.");
    }
    setLoading(false);
  };

  const inp = {
    background: COLORS.bg,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 6,
    color: COLORS.text,
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: FF,
    width: "100%",
    boxSizing: "border-box",
  };

  return (
    <div style={{ fontFamily: FF, display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: COLORS.bg, color: COLORS.text }}>
      <div style={{ width: 360, display: "flex", flexDirection: "column", gap: 24 }}>
        {/* Logo */}
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.accent, letterSpacing: "0.06em" }}>AGOSTINELLI</div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 4, letterSpacing: "0.1em" }}>GESTIONALE ECONOMICO-FINANZIARIO</div>
        </div>

        {/* Form */}
        <div style={{ background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: 28, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 6 }}>EMAIL</div>
            <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@agriturismo.it" />
          </div>
          <div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 6 }}>PASSWORD</div>
            <input style={inp} type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === "Enter" && handleLogin(e)} />
          </div>
          {error && <div style={{ fontSize: 12, color: COLORS.red, padding: "8px 12px", background: COLORS.red + "15", borderRadius: 4, border: `1px solid ${COLORS.red}33` }}>{error}</div>}
          <button onClick={handleLogin} disabled={loading} style={{ background: loading ? COLORS.accentBg : COLORS.accent, color: loading ? COLORS.accentDim : COLORS.bg, border: "none", padding: "12px", borderRadius: 6, fontSize: 14, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: FF, marginTop: 4 }}>
            {loading ? "Accesso in corso..." : "Accedi"}
          </button>
        </div>

        <div style={{ textAlign: "center", fontSize: 10, color: COLORS.textDim }}>
          Agriturismo Agostinelli · Società Agricola S.r.l.
        </div>
      </div>
    </div>
  );
}
