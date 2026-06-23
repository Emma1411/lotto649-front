import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createTicket } from "../../thunks/ticket.thunk";
import BallDisplay from "../../components/BallDisplay";
import { STRATEGIES } from "../../utils/constants";
import { toast } from "react-toastify";
import {
  RiAddLine,
  RiDeleteBin6Line,
  RiArrowLeftLine,
  RiTicket2Line,
  RiSaveLine,
} from "react-icons/ri";
import { DatePicker } from 'rsuite';


interface TicketDraft {
  numeros: number[];
  strategie: string;
}

const TicketAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const grilles_predites = location.state?.grilles_predites;
  const strategie_predite = location.state?.strategie;
  const [dateAchat, setDateAchat] = useState<Date | null>(new Date());
  const [dateTirage, setDateTirage] = useState<Date | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [loading, setLoading] = useState(false);
  const fmt = (d: Date | null) => d ? d.toISOString().split("T")[0] : "";

  const [drafts, setDrafts] = useState<TicketDraft[]>(() => {
    if (grilles_predites && grilles_predites.length > 0) {
      return grilles_predites.map((g: any) => ({
        numeros: g.numeros,
        strategie: strategie_predite ?? "equilibre",
      }));
    }
    return [{ numeros: [], strategie: "equilibre" }];
  });

  const toggleNumero = (n: number) => {
    setDrafts((prev) => prev.map((d, i) => {
      if (i !== activeIdx) return d;
      if (d.numeros.includes(n)) return { ...d, numeros: d.numeros.filter((x) => x !== n) };
      if (d.numeros.length >= 6) return d;
      return { ...d, numeros: [...d.numeros, n].sort((a, b) => a - b) };
    }));
  };

  const addDraft = () => {
    setDrafts((prev) => [...prev, { numeros: [], strategie: "equilibre" }]);
    setActiveIdx(drafts.length);
  };



  const removeDraft = (idx: number) => {
    if (drafts.length === 1) return;
    setDrafts((prev) => prev.filter((_, i) => i !== idx));
    setActiveIdx(Math.max(0, activeIdx - 1));
  };

  const setStrategie = (s: string) => {
    setDrafts((prev) => prev.map((d, i) => i === activeIdx ? { ...d, strategie: s } : d));
  };

  const handleSave = async () => {
    if (!dateAchat) {
      toast.error("Choisissez une date d'achat");
      return;
    }

    const invalides = drafts.filter((d) => d.numeros.length !== 6);
    if (invalides.length > 0) {
      toast.error(`${invalides.length} ticket(s) sans 6 numeros`);
      return;
    }

    setLoading(true);

    try {
      for (const draft of drafts) {
        await dispatch(
          createTicket({
            date_achat: fmt(dateAchat),
            strategie: draft.strategie,
            numeros_joues: draft.numeros,
            cout_ticket: 3.0,
            date_tirage: dateTirage ? fmt(dateTirage) : undefined,
          })
        );
      }

      toast.success(`${drafts.length} ticket(s) enregistre(s) !`);
      navigate("/tickets");
    } catch {
      toast.error("Erreur lors de l'enregistrement");
    } finally {
      setLoading(false);
    }
  };

  const active = drafts[activeIdx];

  return (
    <div className="flex flex-col gap-8" style={{ paddingTop: "3rem", margin: "0 auto" }}>

      {/* BACK */}
      <button
        onClick={() => navigate("/tickets")}
        className="flex items-center gap-2 text-sm transition-all w-fit"
        style={{ color: "#64748B" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#38BDF8")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
      >
        <RiArrowLeftLine />
        Retour
      </button>

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
            boxShadow: "0 0 30px rgba(59,130,246,0.35)",
          }}
        >
          <RiTicket2Line size={26} color="white" />
        </div>
        <div>
          <h1
            className="text-4xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg,#7DD3FC,#38BDF8,#6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Nouveau ticket
          </h1>
          <p style={{ color: "#64748B", fontSize: 14 }}>
            {drafts.length} ticket{drafts.length > 1 ? "s" : ""} · {(drafts.length * 3).toFixed(2)} $
          </p>
        </div>
      </div>


      <div
        className="rounded-3xl p-6 grid md:grid-cols-2 gap-6"
        style={{
          background: "rgba(15,23,42,0.72)",
          border: "1px solid rgba(148,163,184,0.10)",
          backdropFilter: "blur(16px)",
          padding: "8px"
        }}
      >
        <div>
          <label className="block text-sm mb-3" style={{ color: "#94A3B8" }}>
            Date d'achat *
          </label>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <DatePicker
              value={dateAchat}
              onChange={(value) => setDateAchat(value)}
              format="yyyy-MM-dd"
              placeholder="Date d'achat"
              style={{ width: "100%" }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-3" style={{ color: "#94A3B8" }}>
            Date du tirage (Mercredi / Samedi)
          </label>

          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <DatePicker
              value={dateTirage}
              onChange={(value) => setDateTirage(value)}
              format="yyyy-MM-dd"
              placeholder="Date du tirage"
              style={{ width: "100%" }}
              shouldDisableDate={(date) => {
                const day = date.getDay();
                return day !== 3 && day !== 6;
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        {drafts.map((d, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            style={{
              background: activeIdx === i ? "linear-gradient(135deg,#38BDF8,#6366F1)" : "rgba(255,255,255,0.04)",
              color: activeIdx === i ? "white" : "#64748B",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "4px",
              padding: "2px"
            }}
          >
            Ticket {String(i + 1).padStart(2, "0")}
            {d.numeros.length === 6 && (
              <span className="w-2 h-2 rounded-full" style={{ background: "#22C55E" }} />
            )}
            {drafts.length > 1 && (
              <span
                onClick={(e) => { e.stopPropagation(); removeDraft(i); }}
                className="ml-1 transition-all"
                style={{ color: "#64748B" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#EF4444")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
              >
                <RiDeleteBin6Line size={14} />
              </span>
            )}
          </button>
        ))}
        <button
          onClick={addDraft}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm transition-all"
          style={{
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.2)",
            color: "#38BDF8",
            borderRadius: "4px",
            padding: "2px"
          }}
        >
          <RiAddLine size={16} />
          Ajouter
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">

        <div
          className="md:col-span-2 rounded-3xl p-6"
          style={{
            background: "rgba(15,23,42,0.72)",
            border: "1px solid rgba(148,163,184,0.10)",
            backdropFilter: "blur(16px)",
            padding: "7px"
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>
              Selectionnez 6 numeros — Ticket {String(activeIdx + 1).padStart(2, "0")}
            </p>
            <span
              className="text-sm font-bold"
              style={{ color: active.numeros.length === 6 ? "#22C55E" : "#38BDF8" }}
            >
              {active.numeros.length}/6
            </span>
          </div>

          <div className="flex gap-3 flex-wrap mb-5 ">
            {active.numeros.length === 0 ? (
              <p className="text-sm" style={{ color: "#374151" }}>Aucun numero selectionne</p>
            ) : (
              active.numeros.map((n, i) => (
                <BallDisplay key={i} numero={n} categorie="chaud" size="lg" />
              ))
            )}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 49 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => toggleNumero(n)}
                className="aspect-square rounded-xl text-sm font-bold transition-all duration-200"
                style={{
                  background: active.numeros.includes(n)
                    ? "linear-gradient(135deg,#38BDF8,#6366F1)"
                    : "rgba(255,255,255,0.04)",
                  border: `1px solid ${active.numeros.includes(n) ? "rgba(56,189,248,0.5)" : "rgba(255,255,255,0.06)"}`,
                  color: active.numeros.includes(n) ? "white" : "#64748B",
                  transform: active.numeros.includes(n) ? "scale(1.08)" : "scale(1)",
                  cursor: active.numeros.length === 6 && !active.numeros.includes(n) ? "not-allowed" : "pointer",
                  opacity: active.numeros.length === 6 && !active.numeros.includes(n) ? 0.3 : 1,
                }}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div
          className="rounded-3xl flex flex-col gap-4"
          style={{
            background: "rgba(15,23,42,0.72)",
            border: "1px solid rgba(148,163,184,0.10)",
            backdropFilter: "blur(16px)",
            height: "fit-content",
            padding: "16px",
            width: "100%",
          }}
        >
          <p className="text-sm font-medium" style={{ color: "#94A3B8" }}>Strategie</p>
          <div className="flex flex-col gap-2">
            {STRATEGIES.map((s) => (
              <button
                key={s.value}
                onClick={() => setStrategie(s.value)}
                className="px-4 py-3 rounded-2xl text-sm text-left transition-all duration-200"
                style={{
                  background: active.strategie === s.value
                    ? "linear-gradient(135deg,rgba(56,189,248,0.12),rgba(99,102,241,0.12))"
                    : "rgba(255,255,255,0.03)",
                  border: `1px solid ${active.strategie === s.value ? "rgba(56,189,248,0.25)" : "rgba(255,255,255,0.06)"}`,
                  color: active.strategie === s.value ? "#7DD3FC" : "#64748B",
                  borderRadius: "4px",
                  padding: "2px"
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div
            className="rounded-2xl p-4 mt-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "4px",
              padding: "2px"
            }}
          >
            <p className="text-xs mb-2" style={{ color: "#64748B" }}>Recap</p>
            {drafts.map((d, i) => (
              <div key={i} className="flex items-center justify-between text-xs py-1" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#94A3B8" }}>Ticket {String(i + 1).padStart(2, "0")}</span>
                <span style={{ color: d.numeros.length === 6 ? "#22C55E" : "#64748B" }}>
                  {d.numeros.length === 6 ? `${d.numeros.join(", ")}` : `${d.numeros.length}/6`}
                </span>
              </div>
            ))}
            <div className="flex items-center justify-between text-xs pt-2">
              <span style={{ color: "#64748B" }}>Total</span>
              <span style={{ color: "white", fontWeight: 700 }}>{(drafts.length * 3).toFixed(2)} $</span>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={loading || drafts.some((d) => d.numeros.length !== 6) || !dateAchat}
        className="flex items-center justify-center gap-3 py-4 rounded-3xl text-base font-semibold transition-all duration-300 hover:scale-[1.01]"
        style={{
          background: loading || drafts.some((d) => d.numeros.length !== 6) || !dateAchat
            ? "rgba(56,189,248,0.2)"
            : "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
          color: "white",
          cursor: loading || drafts.some((d) => d.numeros.length !== 6) || !dateAchat ? "not-allowed" : "pointer",
          opacity: loading || drafts.some((d) => d.numeros.length !== 6) || !dateAchat ? 0.5 : 1,
          boxShadow: "0 0 30px rgba(59,130,246,0.25)",
          borderRadius: "4px",
          padding: "2px"
        }}
      >
        {loading ? (
          <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
        ) : (
          <>
            <RiSaveLine size={20} />
            Enregistrer {drafts.length} ticket{drafts.length > 1 ? "s" : ""}
          </>
        )}
      </button>



    </div>
  );
};

export default TicketAdd;