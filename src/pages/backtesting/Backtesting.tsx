import React, { useEffect, useState } from "react";

import {
  RiFlaskLine,
  RiBarChartLine,
  RiFunctionLine,
  RiMoneyDollarCircleLine,
  RiPercentLine,
  RiNumbersLine,
  RiFireLine,
} from "react-icons/ri";

import BacktestingService from "../../services/backtesting.service";
import BallDisplay from "../../components/BallDisplay";

const Backtesting: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [resultats, setResultats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      BacktestingService.stats(),
      BacktestingService.list(1, 20),
    ])
      .then(([statsRes, listRes]: any[]) => {
        setStats(statsRes.data);
        setResultats(listRes.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const getColor = (n: number) => {
    if (n >= 4) return "#22C55E";
    if (n >= 3) return "#38BDF8";
    if (n >= 2) return "#A78BFA";
    return "#64748B";
  };

  return (
    <div
      className="flex flex-col gap-10 px-2 md:px-4"
      style={{ paddingTop: "3rem" }}
    >
      {/* HEADER (copié Dashboard style) */}

      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, #38BDF8 0%, #2563EB 45%, #6366F1 100%)",
            boxShadow: "0 10px 30px rgba(56,189,248,0.25)",
          }}
        >
          <RiFlaskLine size={26} color="white" />
        </div>

        <div>
          <h1
            className="text-4xl font-black tracking-tight"
            style={{
              background:
                "linear-gradient(135deg,#7DD3FC,#38BDF8,#6366F1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Backtesting
          </h1>

          <p style={{ color: "#94A3B8", fontSize: 15 }}>
            Validation statistique du modèle sur historique
          </p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {[
            {
              label: "Tirages testés",
              value: stats.total_tirages,
              icon: RiNumbersLine,
            },
            {
              label: "Moyenne bons numéros",
              value: stats.moyenne_bons_numeros?.toFixed(3),
              icon: RiBarChartLine,
            },
            {
              label: "Taux 3+ bons",
              value: `${(stats.taux_3_bons * 100).toFixed(1)}%`,
              icon: RiPercentLine,
            },
            {
              label: "Gain simulé",
              value: `${stats.total_gain?.toFixed(0)} $`,
              icon: RiMoneyDollarCircleLine,
            },
          ].map((s, i) => (
            <div
              key={i}
              className="
                group relative rounded-[22px]
                transition-all duration-500
                hover:scale-[1.04]
                hover:shadow-2xl
                overflow-hidden
              "
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
                  <s.icon />
                </div>

                <div>
                  <p
                    className="text-sm mb-2"
                    style={{
                      color: "#94A3B8",
                      letterSpacing: "0.5px",
                    }}
                  >
                    {s.label}
                  </p>

                  <p
                    className="font-black tracking-tighter"
                    style={{
                      color: "#E0F2FE",
                      fontSize: 36,
                    }}
                  >
                    {s.value}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* INTERPRETATION (same style block Dashboard) */}
      <div
        className="rounded-3xl p-8"
        style={{
          padding: "11px",
          background: "rgba(15, 23, 42, 0.75)",
          border: "1px solid rgba(148, 163, 184, 0.12)",
          backdropFilter: "blur(14px)",
          boxShadow: "0 8px 30px rgba(59,130,246,0.08)",
        }}
      >
        <div className="mb-8">
          <p className="text-white font-bold text-xl flex items-center gap-3">
            <RiFireLine style={{ color: "#38BDF8", fontSize: 22 }} />
            Analyse scientifique
          </p>

          <p className="text-sm mt-2" style={{ color: "#94A3B8" }}>
            Comparaison modèle vs hasard pur
          </p>
        </div>

        <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7 }}>
          Hasard pur ≈{" "}
          <span style={{ color: "white" }}>0.735</span> bons numéros.
          Modèle ≈{" "}
          <span style={{ color: "white" }}>1.125</span> →
          <span style={{ color: "#22C55E", fontWeight: 600 }}>
            {" "}
            +53%
          </span>
        </p>
      </div>

      {/* LIST (same card system Dashboard style) */}
      <div className="flex flex-col gap-6">
        <h2 className="text-white font-bold text-xl flex items-center gap-3">
          <RiFunctionLine style={{ color: "#38BDF8" }} />
          Résultats détaillés
        </h2>

        {resultats.map((r: any, i: number) => (
          <div
            key={i}
            className="
              group relative rounded-[22px]
              transition-all duration-500
              hover:scale-[1.02]
              overflow-hidden
            "
            style={{
              boxShadow: "0 10px 30px rgba(56, 189, 248, 0.15)",
            }}
          >
            <div className="absolute -right-12 -top-12 w-52 h-52 bg-white/10 rounded-full blur-3xl transition-all duration-700 group-hover:-translate-y-6 group-hover:scale-110" />

            <div
              className="
                relative p-6 flex items-center justify-between flex-wrap gap-6
                bg-[#0F172A] transition-all duration-500
                group-hover:bg-[#1E2937]
              "
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-bold"
                  style={{
                    background: `${getColor(r.nb_bons_numeros)}20`,
                    color: getColor(r.nb_bons_numeros),
                  }}
                >
                  {r.nb_bons_numeros}
                </div>

                <div>
                  <p className="text-white font-medium">
                    {r.categorie_gain}
                  </p>
                  <p style={{ color: "#94A3B8", fontSize: 12 }}>
                    {r.nb_bons_numeros} bons numéros
                  </p>
                </div>
              </div>

              {/* CENTER */}
              <div className="flex gap-2 flex-wrap">
                {r.numeros_predits?.map((n: number, j: number) => (
                  <BallDisplay
                    key={j}
                    numero={n}
                    size="sm"
                    categorie={
                      r.numeros_reels?.includes(n)
                        ? "chaud"
                        : "froid"
                    }
                  />
                ))}
              </div>

              {/* RIGHT */}
              <div
                style={{
                  color:
                    r.gain_simule > 0 ? "#22C55E" : "#64748B",
                  fontWeight: 700,
                }}
              >
                {r.gain_simule > 0
                  ? `+${r.gain_simule} $`
                  : "0 $"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Backtesting;