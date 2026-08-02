import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
    RiArrowLeftLine,
    RiCalendarLine,
} from "react-icons/ri";

import BallDisplay from "../../components/BallDisplay";
import TirageService from "../../services/tirage.service";
import { formatDate } from "../../utils/helpers";

const TirageDetail: React.FC = () => {
    const { date } = useParams<{ date: string }>();
    const navigate = useNavigate();
    const location = useLocation();

    const numerosTires = location.state?.numerosTires;
    const complementaire = location.state?.complementaire;

    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const calcFund = (prize: any, winners: any) => {
        const p = Number(prize);
        const w = Number(winners);

        if (isNaN(p) || isNaN(w)) return 0;

        return p * w;
    };

    useEffect(() => {
        if (!date) return;

        setLoading(true);

        TirageService.getDetails(date)
            .then((res: any) => {
                console.log("DETAIL RESPONSE:", res);
                setData(res.data ?? null);
            })
            .finally(() => setLoading(false));
    }, [date]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div
                    className="w-14 h-14 rounded-full border-[3px] animate-spin"
                    style={{
                        borderColor: "rgba(99,102,241,0.15)",
                        borderTopColor: "#38BDF8",
                    }}
                />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center text-gray-400 mt-10">
                Aucun tirage trouvé
            </div>
        );
    }

    const numeros =
        numerosTires ?? [data.n1, data.n2, data.n3, data.n4, data.n5, data.n6];

    const comp = complementaire ?? data.complementaire;

    const rows = [
        {
            label: "Match 6",
            prize: data.match_6_prize,
            winners: data.match_6_winners,
        },
        {
            label: "Match 5 plus Bonus",
            prize: data.match_5c_prize,
            winners: data.match_5c_winners,
        },
        {
            label: "Match 5",
            prize: data.match_5_prize,
            winners: data.match_5_winners,
        },
        {
            label: "Match 4",
            prize: data.match_4_prize,
            winners: data.match_4_winners,
        },
        {
            label: "Match 3",
            prize: data.match_3_prize,
            winners: data.match_3_winners,
        },
        {
            label: "Match 2 plus Bonus",
            prize: data.match_2c_prize,
            winners: data.match_2c_winners,
        },
        {
            label: "Match 2",
            prize: 0,
            winners: data.match_2_winners,
            isFree: true,
        },
        {
            label: "Gold Ball Jackpot",
            prize: data.gold_ball_prize,
            winners: data.gold_ball_winners,
        },
        {
            label: "Next Gold Ball Jackpot",
            prize: 0,
            winners: 0,
        },
    ];

    return (
        <div
            className="flex flex-col gap-8"
            style={{ paddingTop: "3rem", margin: "0 auto" }}
        >
            <button
                onClick={() => navigate("/historique")}
                className="flex items-center gap-2 text-sm"
                style={{ color: "#64748B" }}
            >
                <RiArrowLeftLine />
                Retour à l'historique
            </button>


            <div className="flex items-center gap-4">
                <div
                    className="rounded-2xl flex items-center justify-center"
                    style={{
                        width: 40,
                        height: 40,
                        background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                    }}
                >
                    <RiCalendarLine size={20} color="white" />
                </div>

                <div>
                    <h1
                        className="font-black"
                        style={{
                            background: "linear-gradient(135deg,#7DD3FC,#38BDF8,#6366F1)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            fontSize: "clamp(1.7rem, 5vw, 2.25rem)",
                        }}
                    >
                        {formatDate(data.date_tirage)}
                    </h1>
                    <p style={{ color: "#64748B" }}>{data.jour_semaine}</p>
                </div>
            </div>

            <div
                className="rounded-3xl"
                style={{
                    background: "rgba(15,23,42,0.72)",
                    border: "1px solid rgba(148,163,184,0.10)",
                    padding: "4px"
                }}
            >
                <p className="text-sm mb-1" style={{ color: "#64748B" }}>
                    Numéros du tirage
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                    {numeros.map((n: number, i: number) => (
                        <BallDisplay
                            key={i}
                            numero={n}
                            categorie="default"
                            size="lg"
                        />
                    ))}

                    <span style={{ color: "#64748B", fontSize: 22 }}>+</span>

                    <BallDisplay
                        numero={comp}
                        categorie="froid"
                        size="lg"
                    />
                </div>
            </div>


            <div
                style={{
                    background: "#ffffff",
                    borderRadius: "18px",
                    padding: "6px",
                    overflowX: "auto",
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
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #e5e7eb" }}>
                            <th style={{ padding: "8px", color: "#374151", width: "25%" }}>
                                Prize Level
                            </th>

                            <th style={{ padding: "8px", color: "#374151", width: "25%" }}>
                                Winners
                            </th>

                            <th style={{ padding: "8px", color: "#374151", width: "25%" }}>
                                Prize
                            </th>

                            <th
                                style={{
                                    padding: "8px",
                                    textAlign: "right",
                                    color: "#374151",
                                    width: "25%",
                                }}
                            >
                                Prize Fund Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {rows.map((r, i) => (
                            <tr
                                key={i}
                                style={{
                                    borderBottom: "1px solid #f1f5f9",
                                    height: "34px",
                                }}
                            >
                                <td style={{ padding: "6px 8px", color: "#111827", fontWeight: 400 }}>
                                    {r.label}
                                </td>

                                <td style={{ padding: "6px 8px", color: "#374151" }}>
                                    {r.prize ?? "-"}
                                </td>

                                <td style={{ padding: "6px 8px", color: "#374151" }}>
                                    {r.winners ?? "-"}
                                </td>

                                <td
                                    style={{
                                        padding: "6px 8px",
                                        textAlign: "right",
                                        color: "#16a34a",
                                        fontWeight: 400,
                                    }}
                                >
                                    {r.isFree
                                        ? "-"
                                        : `$${calcFund(r.prize, r.winners).toLocaleString()}`}
                                </td>
                            </tr>
                        ))}

                        <tr
                            style={{
                                borderTop: "2px solid #e5e7eb",
                                background: "#f9fafb",
                                height: "38px",
                            }}
                        >
                            <td style={{ padding: "8px", fontWeight: "bold", color: "#111827" }}>
                                Totals
                            </td>

                            <td />

                            <td style={{ padding: "8px", fontWeight: "bold", color: "#111827" }}>
                                {data.total_winners}
                            </td>

                            <td
                                style={{
                                    padding: "8px",
                                    textAlign: "right",
                                    fontWeight: "bold",
                                    color: "#16a34a",
                                }}
                            >
                                ${data.total_fund}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TirageDetail;