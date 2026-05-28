import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { createTicket } from "../../thunks/ticket.thunk";
import BallDisplay from "../../components/BallDisplay";
import { STRATEGIES } from "../../utils/constants";
import { toast } from "react-toastify";

import {
  RiArrowLeftLine,
  RiTicket2Line,
  RiCalendarLine,
  RiSettings3Line,
  RiCheckboxCircleLine,
  RiLoader4Line,
} from "react-icons/ri";

const TicketAdd: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [numeros, setNumeros] = useState<number[]>([]);
  const [strategie, setStrategie] = useState("equilibre");
  const [dateAchat, setDateAchat] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const toggleNumero = (n: number) => {
    if (numeros.includes(n)) {
      setNumeros(numeros.filter((x) => x !== n));
    } else if (numeros.length < 6) {
      setNumeros([...numeros, n].sort((a, b) => a - b));
    }
  };

  const handleSubmit = async () => {
    if (numeros.length !== 6) {
      toast.error("Sélectionnez exactement 6 numéros");
      return;
    }

    setLoading(true);

    try {
      await dispatch(
        createTicket({
          date_achat: dateAchat,
          strategie,
          numeros_joues: numeros,
          cout_ticket: 3.0,
        })
      );

      toast.success("Ticket enregistré");
      navigate("/tickets");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-10" style={{ paddingTop: "3rem" }}>
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/tickets")}
          className="p-3 rounded-2xl transition-all hover:scale-105"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <RiArrowLeftLine color="#94A3B8" />
        </button>

        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              boxShadow: "0 0 25px rgba(59,130,246,0.3)",
            }}
          >
            <RiTicket2Line size={22} color="white" />
          </div>

          <div>
            <h1
              className="text-3xl font-black tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg,#7DD3FC 0%,#3B82F6 45%,#6366F1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Nouveau ticket
            </h1>

            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              Sélectionnez vos numéros et paramètres
            </p>
          </div>
        </div>
      </div>

      {/* SELECTED NUMBERS */}
      <div
        className="rounded-3xl p-6"
        style={{
          background: "rgba(15,23,42,0.72)",
          border: "1px solid rgba(148,163,184,0.10)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="flex items-center justify-between mb-5">
          <p className="text-white font-semibold">
            Numéros sélectionnés
          </p>

          <div
            className="px-3 py-1 rounded-xl text-sm"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: numeros.length === 6 ? "#38BDF8" : "#94A3B8",
            }}
          >
            {numeros.length} / 6
          </div>
        </div>

        <div className="flex flex-wrap gap-3 min-h-[60px]">
          {numeros.length === 0 ? (
            <p style={{ color: "#64748B", fontSize: 14 }}>
              Aucun numéro sélectionné
            </p>
          ) : (
            numeros.map((n, i) => (
              <BallDisplay key={i} numero={n} categorie="chaud" size="lg" />
            ))
          )}
        </div>
      </div>

      {/* GRID */}
      <div
        className="rounded-3xl p-6"
        style={{
          background: "rgba(15,23,42,0.72)",
          border: "1px solid rgba(148,163,184,0.10)",
          backdropFilter: "blur(14px)",
        }}
      >
        <p className="text-white font-semibold mb-5">
          Choisir vos numéros (1–49)
        </p>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 49 }, (_, i) => i + 1).map((n) => {
            const active = numeros.includes(n);
            const disabled = numeros.length === 6 && !active;

            return (
              <button
                key={n}
                onClick={() => toggleNumero(n)}
                disabled={disabled}
                className="aspect-square rounded-xl font-semibold transition-all duration-200 hover:scale-105"
                style={{
                  background: active
                    ? "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)"
                    : "rgba(255,255,255,0.03)",

                  border: active
                    ? "1px solid rgba(125,211,252,0.35)"
                    : "1px solid rgba(255,255,255,0.06)",

                  color: active ? "white" : "#94A3B8",
                  opacity: disabled ? 0.3 : 1,
                  cursor: disabled ? "not-allowed" : "pointer",
                }}
              >
                {n}
              </button>
            );
          })}
        </div>
      </div>

      {/* CONFIG */}
      <div
        className="rounded-3xl p-6"
        style={{
          background: "rgba(15,23,42,0.72)",
          border: "1px solid rgba(148,163,184,0.10)",
          backdropFilter: "blur(14px)",
        }}
      >
        {/* DATE */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 text-sm" style={{ color: "#94A3B8" }}>
            <RiCalendarLine />
            Date d'achat
          </div>

          <input
            type="date"
            value={dateAchat}
            onChange={(e) => setDateAchat(e.target.value)}
            className="w-full px-4 py-3 rounded-2xl"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.06)",
              color: "white",
            }}
          />
        </div>

        {/* STRATEGY */}
        <div>
          <div className="flex items-center gap-2 mb-4 text-sm" style={{ color: "#94A3B8" }}>
            <RiSettings3Line />
            Stratégie
          </div>

          <div className="grid gap-2">
            {STRATEGIES.map((s) => {
              const active = strategie === s.value;

              return (
                <button
                  key={s.value}
                  onClick={() => setStrategie(s.value)}
                  className="flex items-center gap-3 p-4 rounded-2xl transition-all hover:scale-[1.01]"
                  style={{
                    background: active
                      ? "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.12))"
                      : "rgba(255,255,255,0.03)",

                    border: active
                      ? "1px solid rgba(125,211,252,0.25)"
                      : "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <RiCheckboxCircleLine
                    color={active ? "#38BDF8" : "#64748B"}
                  />

                  <span style={{ color: active ? "white" : "#94A3B8" }}>
                    {s.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleSubmit}
        disabled={numeros.length !== 6 || loading}
        className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 font-semibold transition-all hover:scale-[1.01]"
        style={{
          background:
            "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
          color: "white",
          opacity: numeros.length !== 6 || loading ? 0.5 : 1,
          boxShadow: "0 0 30px rgba(59,130,246,0.25)",
        }}
      >
        {loading ? (
          <RiLoader4Line className="animate-spin" />
        ) : (
          <RiTicket2Line />
        )}

        {loading ? "Enregistrement..." : "Enregistrer le ticket"}
      </button>
    </div>
  );
};

export default TicketAdd;