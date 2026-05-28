import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchTickets, deleteTicket } from "../../thunks/ticket.thunk";
import { TicketCard } from "../../components";
import { toast } from "react-toastify";

import {
  RiTicket2Line,
  RiAddLine,
  RiDeleteBin6Line,
  RiLoader4Line,
} from "react-icons/ri";

const Tickets: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tickets, total, loading } = useAppSelector((s) => s.ticket);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce ticket ?")) return;
    await dispatch(deleteTicket(id));
    toast.success("Ticket supprimé");
  };

  return (
    <div className="flex flex-col gap-10" style={{ paddingTop: "3rem" }}>
      
      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              boxShadow: "0 0 25px rgba(59,130,246,0.35)",
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
              Mes Tickets
            </h1>

            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              {total} ticket{total !== 1 ? "s" : ""} enregistré{total !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate("/tickets/add")}
          className="group relative overflow-hidden px-6 py-3 rounded-2xl flex items-center gap-2 transition-all hover:scale-[1.02]"
          style={{
            background:
              "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
            color: "white",
            boxShadow: "0 0 25px rgba(59,130,246,0.25)",
          }}
        >
          <RiAddLine size={18} />
          Nouveau ticket
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <RiLoader4Line size={28} className="animate-spin text-sky-400" />
          <p style={{ color: "#94A3B8" }}>Chargement des tickets...</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && tickets.length === 0 && (
        <div
          className="rounded-3xl p-12 text-center"
          style={{
            background: "rgba(15,23,42,0.75)",
            border: "1px solid rgba(148,163,184,0.10)",
            backdropFilter: "blur(16px)",
          }}
        >
          <RiTicket2Line size={40} color="#38BDF8" />
          
          <p className="mt-4 text-white font-semibold text-lg">
            Aucun ticket enregistré
          </p>

          <p className="mt-2 text-sm" style={{ color: "#94A3B8" }}>
            Générez des prédictions et sauvegardez vos tickets
          </p>

          <button
            onClick={() => navigate("/tickets/add")}
            className="mt-6 px-6 py-3 rounded-2xl transition-all hover:scale-[1.02]"
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              color: "white",
            }}
          >
            Créer mon premier ticket
          </button>
        </div>
      )}

      {/* GRID */}
      {!loading && tickets.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tickets.map((ticket: any) => (
            <div
              key={ticket.id}
              className="group relative rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: "rgba(15,23,42,0.72)",
                border: "1px solid rgba(148,163,184,0.10)",
                backdropFilter: "blur(14px)",
              }}
            >
              {/* hover glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.08))",
                }}
              />

              {/* Ticket content */}
              <div className="relative z-10">
                <TicketCard ticket={ticket} onDelete={handleDelete} />
              </div>

              {/* delete icon */}
              <button
                onClick={() => handleDelete(ticket.id)}
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all"
                style={{ color: "#94A3B8" }}
              >
                <RiDeleteBin6Line size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tickets;