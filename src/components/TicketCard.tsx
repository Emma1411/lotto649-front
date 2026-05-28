import React from "react";
import type { Ticket } from "../interfaces";
import BallDisplay from "./BallDisplay";
import { formatDate } from "../utils/helpers";
import { STATUT_CONFIG } from "../utils/constants";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Props {
  ticket:    Ticket;
  onDelete?: (id: number) => void;
}

const TicketCard: React.FC<Props> = ({ ticket, onDelete }) => {
  const statut = STATUT_CONFIG[ticket.statut] ?? STATUT_CONFIG.en_attente;

  return (
    <div
      className="group rounded-xl p-5 transition-all duration-200"
      style={{
        background:   "#0D1117",
        border:       "1px solid rgba(255,255,255,0.06)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)")}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-white text-sm font-medium">{formatDate(ticket.date_achat)}</p>
          <p className="text-gray-500 text-xs mt-0.5 capitalize">{ticket.strategie}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-medium ${statut.color}`}>
            {statut.label}
          </span>
          {onDelete && (
            <button
              onClick={() => onDelete(ticket.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-600 hover:text-red-400 p-1"
            >
              <RiDeleteBin6Line className="text-sm" />
            </button>
          )}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-4">
        {ticket.numeros_joues.map((n, i) => (
          <BallDisplay key={i} numero={n} size="sm" categorie="default" />
        ))}
      </div>

      <div
        className="flex items-center justify-between pt-3 text-xs text-gray-600"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <span>#{ticket.id}</span>
        <span>{ticket.cout_ticket?.toFixed(2)} $</span>
      </div>
    </div>
  );
};

export default TicketCard;