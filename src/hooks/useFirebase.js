import { useState, useEffect } from "react";
import { ref, onValue, push, set, remove, serverTimestamp } from "firebase/database";
import { db } from "../firebase";
import { FORNITORI_DEFAULT } from "../constants";

// ─── Movimenti ────────────────────────────────────────────────────────────────

export function useMovimenti() {
  const [movimenti, setMovimenti] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const r = ref(db, "movimenti");
    const unsub = onValue(r, (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => b.data.localeCompare(a.data));
        setMovimenti(list);
      } else {
        setMovimenti([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addMovimento = async (m) => {
    await push(ref(db, "movimenti"), { ...m, createdAt: serverTimestamp() });
  };

  const deleteMovimento = async (id) => {
    await remove(ref(db, `movimenti/${id}`));
  };

  return { movimenti, loading, addMovimento, deleteMovimento };
}

// ─── Cassa Contanti ───────────────────────────────────────────────────────────

export function useCassa() {
  const [movimenti, setMovimenti] = useState([]);
  const [saldoAttuale, setSaldoAttuale] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const r = ref(db, "cassa");
    const unsub = onValue(r, (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => b.data.localeCompare(a.data) || b.createdAt - a.createdAt);
        setMovimenti(list);
        // Saldo = somma di tutti gli importi
        const saldo = list.reduce((s, m) => s + m.importo, 0);
        setSaldoAttuale(Math.round(saldo * 100) / 100);
      } else {
        setMovimenti([]);
        setSaldoAttuale(0);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addMovimentoCassa = async (m) => {
    await push(ref(db, "cassa"), { ...m, createdAt: serverTimestamp() });
  };

  const deleteMovimentoCassa = async (id) => {
    await remove(ref(db, `cassa/${id}`));
  };

  return { movimenti, saldoAttuale, loading, addMovimentoCassa, deleteMovimentoCassa };
}

// ─── Eventi / Caparre ─────────────────────────────────────────────────────────

export function useEventi() {
  const [eventi, setEventi] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const r = ref(db, "eventi");
    const unsub = onValue(r, (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => a.data.localeCompare(b.data));
        setEventi(list);
      } else {
        setEventi([]);
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addEvento = async (e) => {
    await push(ref(db, "eventi"), { ...e, createdAt: serverTimestamp() });
  };

  const updateEvento = async (id, updates) => {
    await set(ref(db, `eventi/${id}`), updates);
  };

  const deleteEvento = async (id) => {
    await remove(ref(db, `eventi/${id}`));
  };

  return { eventi, loading, addEvento, updateEvento, deleteEvento };
}

// ─── Fornitori ────────────────────────────────────────────────────────────────

export function useFornitori() {
  const [fornitori, setFornitori] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const r = ref(db, "fornitori");
    const unsub = onValue(r, (snap) => {
      const data = snap.val();
      if (data) {
        const list = Object.entries(data)
          .map(([id, v]) => ({ id, ...v }))
          .sort((a, b) => a.nome.localeCompare(b.nome));
        setFornitori(list);
      } else {
        // Prima volta: carica i fornitori default
        FORNITORI_DEFAULT.forEach(f => {
          push(ref(db, "fornitori"), { ...f, createdAt: serverTimestamp() });
        });
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const addFornitore = async (f) => {
    await push(ref(db, "fornitori"), { ...f, createdAt: serverTimestamp() });
  };

  const updateFornitore = async (id, updates) => {
    await set(ref(db, `fornitori/${id}`), updates);
  };

  return { fornitori, loading, addFornitore, updateFornitore };
}

// ─── Saldi Banche (inserimento manuale) ───────────────────────────────────────

export function useSaldiBanche() {
  const [saldi, setSaldi] = useState({ bpm: 0, ca: 0, aggiornatoBpm: null, aggiornatoCA: null });

  useEffect(() => {
    const r = ref(db, "saldi_banche");
    const unsub = onValue(r, (snap) => {
      const data = snap.val();
      if (data) setSaldi(data);
    });
    return () => unsub();
  }, []);

  const updateSaldo = async (conto, importo) => {
    const oggi = new Date().toISOString().split("T")[0];
    await set(ref(db, `saldi_banche/${conto}`), importo);
    await set(ref(db, `saldi_banche/aggiornato_${conto}`), oggi);
  };

  return { saldi, updateSaldo };
}
