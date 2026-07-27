import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiTicket2Line,
  RiAddLine,
  RiCalendarLine,
  RiFilterLine,
  RiCloseLine,
  RiArrowRightLine,
  RiTrophyLine,
  RiMoneyDollarCircleLine,
  RiTimeLine,
} from "react-icons/ri";
import TicketService from "../../services/ticket.service";
import { formatDate } from "../../utils/helpers";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";

const Tickets: React.FC = () => {
  const navigate = useNavigate();

  const [groupes, setGroupes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [range, setRange] = useState<[Date, Date] | null>(null);
  const [isFiltered, setIsFiltered] = useState(false);
  const [filtLoad, setFiltLoad] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 10;

  const chargerGroupes = async (p = 1) => {
    setLoading(true);
    try {
      const res: any = await TicketService.groupes(p, PER_PAGE);
      setGroupes(res.data ?? []);
      setTotalPages(Math.ceil((res.pagination?.total ?? 0) / PER_PAGE));
    } catch {
      setGroupes([]);
    } finally {
      setLoading(false);
    }
  };

  interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number | null | undefined;
    sub?: string;
  }

  interface StatCardProps {
    icon: React.ReactNode;
    label: string;
    value: string | number | null | undefined;
    sub?: string;
  }

  const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    sub,
  }) => (
    <div className="group relative rounded-[22px]  transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl overflow-hidden"
      style={{
        boxShadow: "0 10px 30px rgba(56, 189, 248, 0.2)",

      }}
    >
      <div className="absolute -right-12 -top-12 w-52 h-52 bg-white/10 rounded-full blur-3xl transition-all duration-700 group-hover:-translate-y-6 group-hover:scale-110" />

      <div
        className="
          relative rounded-[20px] p-6 h-full flex flex-col gap-4
          bg-[#0F172A] transition-all duration-500
          group-hover:bg-[#1E2937]
        "
        style={{ padding: "7px" }}
      >
        <div
          className="
            w-12 h-12 rounded-2xl flex items-center justify-center
            transition-all duration-500 group-hover:scale-110 group-hover:rotate-6
          "
          style={{
            background: "rgba(56, 189, 248, 0.15)",
            color: "#7DD3FC",
            border: "1px solid rgba(125, 211, 252, 0.25)",
            fontSize: 24,
          }}
        >
          {icon}
        </div>

        <div>
          <p
            className="text-sm mb-2 transition-colors duration-300 group-hover:text-[#CBD5E1]"
            style={{ color: "#94A3B8", letterSpacing: "0.5px" }}
          >
            {label}
          </p>

          {value !== null && value !== undefined ? (
            <p
              className="font-black tracking-tighter transition-all duration-500 group-hover:text-white"
              style={{
                color: "#E0F2FE",
                fontSize: 36,
                textShadow: "0 4px 12px rgba(56,189,248,0.4)",
              }}
            >
              {value}
            </p>
          ) : (
            <p className="text-slate-500">Non disponible</p>
          )}

          {sub && (
            <p
              className="text-xs mt-2 transition-colors duration-300 group-hover:text-[#67E8F9]"
              style={{ color: "#38BDF8" }}
            >
              {sub}
            </p>
          )}
        </div>
      </div>
    </div>
  );


  useEffect(() => { chargerGroupes(1); }, []);


  const handleFilterDates = async (start: string, end: string, p = 1) => {
    setFiltLoad(true);
    setIsFiltered(true);
    try {
      const res: any = await TicketService.groupesFilter(start, end, p, PER_PAGE);
      setGroupes(res.data ?? []);
      setTotalPages(Math.ceil((res.pagination?.total ?? 0) / PER_PAGE));
    } catch {
      setGroupes([]);
    } finally {
      setFiltLoad(false);
    }
  };


  const handleReset = () => {
    setRange(null);
    setIsFiltered(false);
    chargerGroupes();
  };



  const totalTickets = groupes.reduce((a, g) => a + Number(g.nb_tickets), 0);
  const totalDepense = groupes.reduce((a, g) => a + Number(g.total_depense), 0);
  const totalGagne = groupes.reduce((a, g) => a + Number(g.total_gagne), 0);

  return (
    <div className="flex flex-col gap-6" style={{ paddingTop: "4rem" }}>

      {/* HEADER */}
      <div className="flex items-center justify-between flex-wrap gap-4">

        <div className="flex items-center gap-3">
          <div
            className="rounded-2xl flex items-center justify-center "
            style={{
              width: 40,
              height: 40,
              background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              boxShadow: "0 0 25px rgba(59,130,246,0.35)",
            }}
          >
            <RiTicket2Line size={20} color="white" />
          </div>
          <div>
            <h1
              className="font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg,#7DD3FC,#38BDF8,#6366F1)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "clamp(1.7rem, 5vw, 2.25rem)",
              }}
            >
              Mes Tickets
            </h1>
            <p style={{ color: "#94A3B8", fontSize: 14 }}>
              {totalTickets} ticket{totalTickets > 1 ? "s" : ""} enregistre{totalTickets > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/tickets/add")}
          className="hidden md:flex items-center gap-2 text-sm font-semibold transition-all duration-200 hover:scale-105"
          style={{
            background: "linear-gradient(135deg,#38BDF8,#6366F1)",
            color: "white",
            boxShadow: "0 0 20px rgba(59,130,246,0.3)",
            borderRadius: "4px",
            padding: "2px"
          }}
        >
          <RiAddLine size={18} />
          Nouveau ticket
        </button>

        <button
          onClick={() => navigate("/tickets/add")}
          className="md:hidden fixed flex items-center justify-center"
          style={{
            bottom: 72,
            right: 16,
            width: 48,
            height: 48,
            background: "linear-gradient(135deg,#38BDF8,#6366F1)",
            color: "white",
            boxShadow: "0 4px 16px rgba(59,130,246,0.4)",
            borderRadius: "14px",
            zIndex: 50,
          }}
        >
          <RiAddLine size={22} />
        </button>

      </div>


      <div className="md:hidden" style={{ background: "#0F172A", borderRadius: 16, padding: 14, border: "1px solid rgba(56,189,248,0.1)", boxShadow: "0 10px 30px rgba(56,189,248,0.2)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <p style={{ color: "#94A3B8", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Total dépense</p>
            <p style={{ color: "#E0F2FE", fontSize: 22, fontWeight: 900, margin: 0 }}>{totalDepense.toFixed(2)} $</p>
          </div>
          <div style={{ width: 1, height: 36, background: "#1E293B" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Gagné</p>
            <p style={{ color: "#34d399", fontSize: 16, fontWeight: 900, margin: 0 }}>{totalGagne.toFixed(2)} $</p>
          </div>
          <div style={{ width: 1, height: 36, background: "#1E293B" }} />
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#94A3B8", fontSize: 9, textTransform: "uppercase", letterSpacing: "0.5px", margin: 0 }}>Profit net</p>
            <p style={{ color: (totalGagne - totalDepense) >= 0 ? "#34d399" : "#f87171", fontSize: 16, fontWeight: 900, margin: 0 }}>{(totalGagne - totalDepense).toFixed(2)} $</p>
          </div>
        </div>
        <div style={{ marginTop: 10, background: (totalGagne - totalDepense) >= 0 ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", border: `1px solid ${(totalGagne - totalDepense) >= 0 ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`, borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: (totalGagne - totalDepense) >= 0 ? "#34d399" : "#f87171", fontSize: 9, fontWeight: 600 }}>
            {(totalGagne - totalDepense) >= 0 ? "Performance positive " : "Performance négative"}
          </span>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden md:grid grid-cols-3 gap-4">
        <StatCard icon={<RiMoneyDollarCircleLine />} label="Total dépense" value={`${totalDepense.toFixed(2)} $`} sub="Argent investi dans les tickets" />
        <StatCard icon={<RiTrophyLine />} label="Total gagné" value={`${totalGagne.toFixed(2)} $`} sub="Gains cumulés" />
        <StatCard icon={<RiMoneyDollarCircleLine />} label="Profit net" value={`${(totalGagne - totalDepense).toFixed(2)} $`} sub={(totalGagne - totalDepense) >= 0 ? "Performance positive" : "Performance négative"} />
      </div>

      <div className="rounded-3xl p-6">
        <p
          className="text-sm font-medium flex items-center gap-2 mb-4"
          style={{ color: "#94A3B8" }}
        >
          <RiFilterLine style={{ color: "#38BDF8" }} />
          Filtrer par intervalle de dates
        </p>

        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex flex-col gap-1.5">
            <DateRangePicker
              value={range}
              onChange={(value) =>
                setRange(value as [Date, Date] | null)
              }
              placeholder="Sélectionner une période"
              format="yyyy-MM-dd"
              cleanable
              placement="bottomStart"
              style={{ width: 250 }}
              onOk={(value) => {
                const [start, end] =
                  value as [Date, Date];

                const fmt = (d: Date) =>
                  d.toISOString().split("T")[0];

                handleFilterDates(
                  fmt(start),
                  fmt(end)
                );
              }}
              onClean={() => {
                handleReset();
              }}
            />
          </div>
        </div>
      </div>

      {loading || filtLoad ? (
        <div className="flex justify-center py-20">
          <div
            className="w-14 h-14 rounded-full border-[3px] animate-spin"
            style={{ borderColor: "rgba(99,102,241,0.15)", borderTopColor: "#38BDF8" }}
          />
        </div>
      ) : groupes.length === 0 ? (
        <div
          className="rounded-3xl p-12 text-center"
          style={{
            background: "rgba(15,23,42,0.72)",
            border: "1px solid rgba(148,163,184,0.10)",
            backdropFilter: "blur(16px)",
          }}
        >
          <RiTicket2Line size={40} style={{ color: "#374151", margin: "0 auto 12px" }} />
          <p className="text-white font-bold text-lg mb-2">Aucun ticket trouve</p>
          <p className="text-sm mb-6" style={{ color: "#64748B" }}>
            Ajoutez votre premier ticket pour commencer le suivi
          </p>
          <button
            onClick={() => navigate("/tickets/add")}
            className="px-6 py-3 rounded-2xl text-sm font-semibold"
            style={{ background: "linear-gradient(135deg,#38BDF8,#6366F1)", color: "white" }}
          >
            Ajouter un ticket
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {groupes.map((groupe: any, i: number) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.015] cursor-pointer"
              style={{
                background: "rgba(15,23,42,0.72)",
                border: "1px solid rgba(148,163,184,0.10)",
                backdropFilter: "blur(16px)",
                boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
                padding: "2px",
              }}
              onClick={() => navigate(`/tickets/date/${groupe.date_achat}`)}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ background: "linear-gradient(135deg,rgba(56,189,248,0.08),rgba(99,102,241,0.08))" }}
              />
              <div
                className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 -left-32 top-72 rotate-[-30deg] transition-all duration-700 group-hover:top-0"
              />

              <div className="relative z-10 flex items-center justify-between flex-wrap gap-4 px-7 py-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.2)" }}
                  >
                    <RiCalendarLine size={20} style={{ color: "#38BDF8" }} />
                  </div>
                  <div>
                    <p
                      className="text-white font-bold text-lg transition-all duration-300 group-hover:text-cyan-300"
                    >
                      {formatDate(groupe.date_achat)}
                    </p>
                    <p className="text-sm mt-0.5" style={{ color: "#64748B" }}>
                      {groupe.nb_tickets} ticket{groupe.nb_tickets > 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-4 flex-wrap">
                    {Number(groupe.nb_gagnants) > 0 && (
                      <span className="flex items-center gap-1 text-sm font-medium" style={{ color: "#22C55E" }}>
                        <RiTrophyLine />
                        {groupe.nb_gagnants} gagnant{groupe.nb_gagnants > 1 ? "s" : ""}
                      </span>
                    )}
                    {Number(groupe.nb_attente) > 0 && (
                      <span className="flex items-center gap-1 text-sm" style={{ color: "#F59E0B" }}>
                        <RiTimeLine />
                        {groupe.nb_attente} en attente
                      </span>
                    )}
                    {Number(groupe.nb_perdants) > 0 && (
                      <span className="text-sm" style={{ color: "#64748B" }}>
                        {groupe.nb_perdants} perdu{groupe.nb_perdants > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>

                  <div className="text-right">
                    <p className="text-xs mb-0.5" style={{ color: "#64748B" }}>
                      Depense / Gagne
                    </p>
                    <p className="text-sm font-bold font-mono">
                      <span style={{ color: "#EF4444" }}>{Number(groupe.total_depense).toFixed(2)} $</span>
                      <span style={{ color: "#374151" }}> / </span>
                      <span style={{ color: "#22C55E" }}>{Number(groupe.total_gagne).toFixed(2)} $</span>
                    </p>
                  </div>

                  <RiArrowRightLine
                    className="opacity-0 group-hover:opacity-100 transition-all duration-300"
                    style={{ color: "#38BDF8", fontSize: 20, flexShrink: 0 }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


    </div>
  );
};

export default Tickets;