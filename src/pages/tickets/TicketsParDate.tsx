import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    RiArrowLeftLine,
    RiTicket2Line,
    RiTrophyLine,
    RiTimeLine,
    RiCloseCircleLine,
    RiDeleteBin6Line,
    RiMoneyDollarCircleLine,
} from "react-icons/ri";
import TicketService from "../../services/ticket.service";
import BallDisplay from "../../components/BallDisplay";
import { formatDate } from "../../utils/helpers";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { deleteTicket } from "../../thunks/ticket.thunk";
import { toast } from "react-toastify";

const statutStyle: Record<string, { label: string; color: string; Icon: any }> = {
    en_attente: { label: "En attente", color: "#F59E0B", Icon: RiTimeLine },
    gagnant: { label: "Gagnant", color: "#22C55E", Icon: RiTrophyLine },
    perdant: { label: "Perdu", color: "#64748B", Icon: RiCloseCircleLine },
};

const TicketsParDate: React.FC = () => {
    const { date } = useParams<{ date: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [tickets, setTickets] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


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


    const charger = async () => {
        if (!date) return;
        setLoading(true);
        try {
            const res: any = await TicketService.byDate(date);
            setTickets(res.data ?? []);
        } catch {
            setTickets([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { charger(); }, [date]);

    const handleDelete = async (id: number) => {
        if (!confirm("Supprimer ce ticket ?")) return;
        await dispatch(deleteTicket(id));
        toast.success("Ticket supprime");
        charger();
    };

    const totalDepense = tickets.reduce((a, t) => a + Number(t.cout_ticket), 0);
    const totalGagne = tickets.reduce((a, t) => a + Number(t.montant_gagne), 0);
    const profitNet = totalGagne - totalDepense;

    return (
        <div className="flex flex-col gap-8" style={{ paddingTop: "3rem", margin: "0 auto" }}>

            <button
                onClick={() => navigate("/tickets")}
                className="flex items-center gap-2 text-sm transition-all duration-200 hover:gap-3 w-fit"
                style={{ color: "#64748B" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#38BDF8")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#64748B")}
            >
                <RiArrowLeftLine />
                Retour aux tickets
            </button>


            <div className="flex items-center gap-4">
                <div
                    className="rounded-2xl flex items-center justify-center "
                    style={{
                        width: 40,
                        height: 40,
                        background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                        boxShadow: "0 0 30px rgba(59,130,246,0.35)",
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
                        {date ? formatDate(date) : ""}
                    </h1>
                    <p style={{ color: "#64748B", fontSize: 14 }}>
                        {tickets.length} ticket{tickets.length > 1 ? "s" : ""} joue{tickets.length > 1 ? "s" : ""}
                    </p>
                </div>
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
                        <p style={{ color: profitNet >= 0 ? "#34d399" : "#f87171", fontSize: 16, fontWeight: 900, margin: 0 }}>
                            {profitNet >= 0 ? "+" : ""}{profitNet.toFixed(2)} $
                        </p>
                    </div>
                </div>
                <div style={{ marginTop: 10, background: profitNet >= 0 ? "rgba(52,211,153,0.1)" : "rgba(248,113,113,0.1)", border: `1px solid ${profitNet >= 0 ? "rgba(52,211,153,0.2)" : "rgba(248,113,113,0.2)"}`, borderRadius: 8, padding: "5px 10px", display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ color: profitNet >= 0 ? "#34d399" : "#f87171", fontSize: 9, fontWeight: 600 }}>
                        {profitNet >= 0 ? "Journée positive" : "Journée négative "}
                    </span>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-3 gap-4">
                <StatCard icon={<RiMoneyDollarCircleLine />} label="Total dépense" value={`${totalDepense.toFixed(2)} $`} sub="Somme des mises" />
                <StatCard icon={<RiTrophyLine />} label="Total gagné" value={`${totalGagne.toFixed(2)} $`} sub="Gains sur cette date" />
                <StatCard icon={<RiMoneyDollarCircleLine />} label="Profit net" value={`${profitNet >= 0 ? "+" : ""}${profitNet.toFixed(2)} $`} sub={profitNet >= 0 ? "Journée positive" : "Journée négative"} />
            </div>


            <div className="md:hidden flex flex-col gap-4">
                {tickets.map((ticket: any, i: number) => {
                    const st = statutStyle[ticket.statut] ?? statutStyle.en_attente;
                    return (
                        <div
                            key={ticket.id}
                            style={{
                                background: "#0F172A",
                                border: "1px solid rgba(148,163,184,0.10)",
                                borderRadius: 16,
                                padding: 12,
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                                <span style={{ color: "#60a5fa", fontSize: 11, fontWeight: 800 }}>
                                    Ticket #{String(i + 1).padStart(2, "0")}
                                </span>
                                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                    <st.Icon style={{ color: st.color, fontSize: 13 }} />
                                    <span style={{ color: st.color, fontSize: 10, fontWeight: 600 }}>{st.label}</span>
                                </div>
                            </div>

                            <p style={{ color: "#475569", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Numéros joués</p>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                                {ticket.numeros_joues?.map((n: number, j: number) => (
                                    <BallDisplay
                                        key={j}
                                        numero={n}
                                        size="xs"
                                        categorie={ticket.numeros_gagnants_reels?.includes(n) ? "chaud" : "default"}
                                    />
                                ))}
                            </div>

                            <p style={{ color: "#475569", fontSize: 8, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>Numéros gagnants</p>
                            <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginBottom: 10 }}>
                                {ticket.numeros_gagnants_reels?.length ? (
                                    ticket.numeros_gagnants_reels.map((n: number, j: number) => (
                                        <BallDisplay
                                            key={j}
                                            numero={n}
                                            size="xs"
                                            categorie={ticket.numeros_joues?.includes(n) ? "chaud" : "froid"}
                                        />
                                    ))
                                ) : (
                                    <span style={{ color: "#64748B", fontSize: 11 }}>—</span>
                                )}
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid #1e293b" }}>
                                <span style={{ color: "#475569", fontSize: 9 }}>
                                    {ticket.date_tirage ? formatDate(ticket.date_tirage) : "Tirage en attente"}
                                </span>
                                <span style={{ color: Number(ticket.montant_gagne) > 0 ? "#22C55E" : "#64748B", fontSize: 11, fontWeight: 700 }}>
                                    {Number(ticket.montant_gagne) > 0 ? `+${Number(ticket.montant_gagne).toFixed(2)} $` : "0.00 $"}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                className="hidden md:block rounded-3xl overflow-hidden"
                style={{
                    background: "#fff",
                    border: "1px solid rgba(148,163,184,0.10)",
                    backdropFilter: "blur(16px)",
                }}
            >
                <table
                    style={{
                        width: "100%",
                        tableLayout: "fixed",
                        borderCollapse: "collapse",
                        fontSize: "13px",
                        lineHeight: "1.2",
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                textAlign: "left",
                                borderBottom: "1px solid rgba(255,255,255,0.06)",
                                color: "#64748B",
                            }}
                        >
                            <th style={{ padding: "10px", width: "40px" }}>#</th>
                            <th style={{ padding: "10px" }}>Numéros joués</th>
                            <th style={{ padding: "10px" }}>Numéros gagnants</th>
                            <th style={{ padding: "10px", width: "140px" }}>Date tirage</th>
                            <th style={{ padding: "10px", width: "120px" }}>Statut</th>
                            <th style={{ padding: "10px", width: "100px" }}>Gain</th>
                            <th style={{ padding: "10px", width: "50px" }} />
                        </tr>
                    </thead>

                    <tbody>
                        {tickets.map((ticket: any, i: number) => {
                            const st = statutStyle[ticket.statut] ?? statutStyle.en_attente;

                            return (
                                <tr
                                    key={ticket.id}
                                    style={{
                                        borderBottom: "1px solid rgba(255,255,255,0.04)",
                                        transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={(e) =>
                                        (e.currentTarget.style.background = "rgba(255,255,255,0.02)")
                                    }
                                    onMouseLeave={(e) =>
                                        (e.currentTarget.style.background = "transparent")
                                    }
                                >
                                    <td style={{ padding: "10px", color: "#374151" }}>
                                        {String(i + 1).padStart(2, "0")}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {ticket.numeros_joues?.map((n: number, j: number) => (
                                                <BallDisplay
                                                    key={j}
                                                    numero={n}
                                                    size="xs"
                                                    categorie={
                                                        ticket.numeros_gagnants_reels?.includes(n)
                                                            ? "chaud"
                                                            : "default"
                                                    }
                                                />
                                            ))}
                                        </div>
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        <div className="flex gap-1.5 flex-wrap">
                                            {ticket.numeros_gagnants_reels?.length ? (
                                                ticket.numeros_gagnants_reels.map((n: number, j: number) => (
                                                    <BallDisplay
                                                        key={j}
                                                        numero={n}
                                                        size="xs"
                                                        categorie={
                                                            ticket.numeros_joues?.includes(n)
                                                                ? "chaud"
                                                                : "froid"
                                                        }
                                                    />
                                                ))
                                            ) : (
                                                <span style={{ color: "#64748B", fontSize: 12 }}>
                                                    En attente
                                                </span>
                                            )}
                                        </div>
                                    </td>

                                    {/* DATE */}
                                    <td style={{ padding: "10px", color: "#94A3B8", fontSize: 12 }}>
                                        {ticket.date_tirage ? formatDate(ticket.date_tirage) : "—"}
                                    </td>

                                    {/* STATUT */}
                                    <td style={{ padding: "10px" }}>
                                        <div className="flex items-center gap-1.5">
                                            <st.Icon style={{ color: st.color, fontSize: 14 }} />
                                            <span style={{ color: st.color, fontSize: 12 }}>
                                                {st.label}
                                            </span>
                                        </div>
                                    </td>

                                    {/* GAIN */}
                                    <td style={{ padding: "10px", fontWeight: 600 }}>
                                        <span
                                            style={{
                                                color:
                                                    Number(ticket.montant_gagne) > 0
                                                        ? "#22C55E"
                                                        : "#64748B",
                                            }}
                                        >
                                            {Number(ticket.montant_gagne) > 0
                                                ? `+${Number(ticket.montant_gagne).toFixed(2)} $`
                                                : "0.00 $"}
                                        </span>
                                    </td>

                                    {/* DELETE */}
                                    <td style={{ padding: "10px", textAlign: "center" }}>
                                        <button
                                            onClick={() => handleDelete(ticket.id)}
                                            className="opacity-0 group-hover:opacity-100 transition"
                                            style={{ color: "#64748B" }}
                                            onMouseEnter={(e) =>
                                                (e.currentTarget.style.color = "#EF4444")
                                            }
                                            onMouseLeave={(e) =>
                                                (e.currentTarget.style.color = "#64748B")
                                            }
                                        >
                                            <RiDeleteBin6Line size={15} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TicketsParDate;