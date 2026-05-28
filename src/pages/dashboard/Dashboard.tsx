import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchDernier } from "../../thunks/tirage.thunk";
import BallDisplay from "../../components/BallDisplay";
import { formatDate } from "../../utils/helpers";
import StatsService from "../../services/stats.service";
import TirageService from "../../services/tirage.service";

import {
  RiDatabaseLine,
  RiFireLine,
  RiBarChartLine,
  RiArrowUpLine,
} from "react-icons/ri";

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
    <div className="absolute -right-12 -top-12 w-52 h-52 bg-white/10 rounded-full blur-3xl transition-all duration-700 group-hover:-translate-y-6 group-hover:scale-110"  />

    <div
      className="
        relative rounded-[20px] p-6 h-full flex flex-col gap-4
        bg-[#0F172A] transition-all duration-500
        group-hover:bg-[#1E2937]
      "
      style={{padding:"7px"}}
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

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();

  const { dernier, loading } = useAppSelector(
    (s) => s.tirage
  );

  const [chauds, setChauds] = useState<any[]>([]);
  const [total, setTotal] = useState<number | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchDernier());

    TirageService.count().then((r: any) =>
      setTotal(r.data?.total ?? null)
    );

    StatsService.chauds(10).then((r: any) =>
      setChauds(r.data ?? [])
    );
  }, [dispatch]);

  return (
    <div
      className="flex flex-col gap-10 px-2 md:px-4"
      style={{ paddingTop: "3.5rem" }}
    >
      <div className="text-center py-12 space-y-5">
        <h1
          className="text-6xl font-black tracking-tight"
          style={{
            background:
              "linear-gradient(135deg, #7DD3FC 0%, #3B82F6 45%, #6366F1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            letterSpacing: "-2px",
          }}
        >
          Lotto Intelligence
        </h1>

        <p
          style={{
            color: "#94A3B8",
            fontSize: 16,
            maxWidth: 700,
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Analyse probabiliste avancée basée sur plus de
          40 ans de données historiques.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatCard
          icon={<RiDatabaseLine />}
          label="Tirages analysés"
          value={
            total !== null
              ? total.toLocaleString("fr-CA")
              : null
          }
        />

        <StatCard
          icon={<RiFireLine />}
          label="Numéros chauds"
          value={
            chauds.length > 0
              ? chauds.length
              : null
          }
        />

        <StatCard
          icon={<RiBarChartLine />}
          label="AUC modèle"
          value="0.6118"
          sub="vs baseline random"
        />

        <StatCard
          icon={<RiArrowUpLine />}
          label="Alpha vs hasard"
          value="+53%"
        />
      </div>

      {/* DERNIER TIRAGE */}
      {loading ? (
        <div className="flex justify-center">
          <div
            className="w-8 h-8 rounded-full border-2 animate-spin"
            style={{
              borderColor:
                "rgba(99,102,241,0.2)",
              borderTopColor: "#3B82F6",
            }}
          />
        </div>
      ) : dernier ? (
        <div
          className="rounded-3xl p-8"
          style={{
            padding: "11px",
            background:
              "rgba(15, 23, 42, 0.75)",
            border:
              "1px solid rgba(148, 163, 184, 0.12)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 8px 30px rgba(59,130,246,0.08)",
          }}
        >
          <div className="flex items-center justify-between " >
            <div >
              <p className="text-white font-bold text-xl">
                Dernier tirage
              </p>

              <p
                className="text-sm mt-1"
                style={{ color: "#94A3B8" }}
              >
                {formatDate(
                  dernier.date_tirage
                )}
              </p>
            </div>

            <span
              className="text-xs rounded-xl capitalize font-medium"
              style={{
                background:
                  "rgba(59,130,246,0.12)",
                color: "#7DD3FC",
                border:
                  "1px solid rgba(125,211,252,0.14)",
                paddingInline: "14px",
                paddingBlock: "7px",
              }}
            >
              {dernier.jour_semaine}
            </span>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {[
              dernier.n1,
              dernier.n2,
              dernier.n3,
              dernier.n4,
              dernier.n5,
              dernier.n6,
            ].map((n, i) => (
              <BallDisplay
                key={i}
                numero={n}
                categorie="default"
                size="lg"
              />
            ))}

            <span
              style={{
                color: "#",
                fontSize: 20,
                margin: "0 4px",
              }}
            >
              +
            </span>

            <BallDisplay
              numero={dernier.complementaire}
              categorie="froid"
              size="lg"
            />
          </div>
        </div>
      ) : null}

      {/* SIGNAL STRENGTH */}
      {chauds.length > 0 && (
        <div
          className="rounded-3xl p-8"
          style={{
            padding: "11px",
            background:
              "rgba(15, 23, 42, 0.75)",
            border:
              "1px solid rgba(148, 163, 184, 0.12)",
            backdropFilter: "blur(14px)",
            boxShadow:
              "0 8px 30px rgba(59,130,246,0.08)",
          }}
        >
          <div className="mb-8">
            <p className="text-white font-bold text-xl flex items-center gap-3">
              <RiFireLine
                style={{
                  color: "#38BDF8",
                  fontSize: 22,
                }}
              />
              Signal strength
            </p>

            <p
              className="text-sm mt-2"
              style={{ color: "#94A3B8" }}
            >
              Distribution des numéros les plus
              fréquents
            </p>
          </div>

          <div className="flex gap-6 flex-wrap ">
            {chauds.map((s: any, i: number) => (
              <div
                key={i}
                className="
                  flex flex-col items-center gap-3
                  rounded-2xl px-4 py-5
                  transition-all duration-300
                  hover:scale-105
                "
                style={{
                  background:
                    "rgba(255,255,255,0.03)",
                  border:
                    "1px solid rgba(255,255,255,0.05)",
                  minWidth: 90,
                }}
              >
                <BallDisplay
                  numero={s.numero}
                  categorie="chaud"
                  size="md"
                />

                <span
                  className="text-xs font-medium"
                  style={{
                    color: "#7DD3FC",
                    fontSize: 12,
                    letterSpacing: "0.4px",
                  }}
                >
                  {s.frequence_totale} hits
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;