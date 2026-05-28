import React, { useState } from "react";
import {
  RiSettings3Line,
  RiRobot2Line,
  RiLoader4Line,
  RiSparklingLine,
  RiFlashlightLine,
} from "react-icons/ri";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppDispatch";
import { fetchPrediction } from "../../thunks/prediction.thunk";
import BallDisplay from "../../components/BallDisplay";
import { STRATEGIES } from "../../utils/constants";
import { toast } from "react-toastify";

const Predictions: React.FC = () => {
  const dispatch = useAppDispatch();

  const { prediction, loading } =
    useAppSelector((s) => s.prediction);

  const [nbTickets, setNbTickets] =
    useState(3);

  const [strategie, setStrategie] =
    useState("equilibre");

  const handleGenerer = async () => {
    try {
      await dispatch(
        fetchPrediction(nbTickets, strategie)
      );

      toast.success("Grilles générées");
    } catch {
      toast.error(
        "Erreur lors de la génération"
      );
    }
  };

  return (
    <div
      className="flex flex-col gap-10"
      style={{
        paddingTop: "3rem",
      }}
    >
      {/* HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div
            className="
              w-14 h-14 rounded-2xl
              flex items-center justify-center
            "
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",

              boxShadow:
                "0 0 30px rgba(59,130,246,0.35)",
            }}
          >
            <RiSparklingLine
              size={26}
              color="white"
            />
          </div>

          <div>
            <h1
              className="
                text-4xl font-black tracking-tight
              "
              style={{
                background:
                  "linear-gradient(135deg,#7DD3FC 0%,#3B82F6 45%,#6366F1 100%)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor:
                  "transparent",
              }}
            >
              Prédictions IA
            </h1>

            <p
              className="mt-2"
              style={{
                color: "#94A3B8",
                fontSize: 15,
              }}
            >
              Génération intelligente basée
              sur le modèle Random Forest &
              analyse probabiliste avancée.
            </p>
          </div>
        </div>
      </div>

      {/* CONFIG */}
      <div
        className="
          relative overflow-hidden
          rounded-[32px]
          p-8
        "
        style={{
          background:
            "rgba(15,23,42)",

          border:
            "1px solid rgba(148,163,184,0.10)",

          backdropFilter: "blur(18px)",

          boxShadow:
            "0 10px 40px rgba(0,0,0,0.22)",
        }}
      >
        {/* Bubble */}
        <div
          className="
            absolute
            w-[700px]
            h-[700px]
            rounded-full
            bg-blue-500/10
            -left-40
            top-40
            rotate-[-35deg]
          "
        />

        <div className="relative z-10" style={{ padding: "8px" }}>
          {/* Title */}
          <div className="mb-8">
            <p
              className="
                flex items-center gap-3
                text-lg font-semibold
              "
              style={{
                color: "white",
              }}
            >
              <RiSettings3Line
                style={{
                  color: "#38BDF8",
                }}
              />
              Configuration des grilles
            </p>

            <p
              className="mt-2 text-sm"
              style={{
                color: "#64748B",
              }}
            >
              Ajustez vos paramètres de
              génération IA.
            </p>
          </div>

          <div
            className="grid lg:grid-cols-2 gap-10"
            style={{ paddingBottom: "0.5rem" }}
          >            {/* SLIDER */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <label
                  className="text-sm"
                  style={{
                    color: "#94A3B8",
                  }}
                >
                  Nombre de tickets
                </label>

                <div
                  className="
                    px-4 py-2 rounded-2xl
                  "
                  style={{
                    background:
                      "rgba(255,255,255,0.04)",

                    border:
                      "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <span
                    className="
                      text-white font-bold
                    "
                    style={{ padding: "5px" }}
                  >
                    {nbTickets}
                  </span>

                  <span
                    className="ml-2 text-sm"
                    style={{
                      color: "#64748B",
                    }}
                  >
                    (
                    {(
                      nbTickets * 3
                    ).toFixed(2)}{" "}
                    $)
                  </span>
                </div>
              </div>

              <input
                type="range"
                min={1}
                max={20}
                value={nbTickets}
                onChange={(e) =>
                  setNbTickets(
                    Number(e.target.value)
                  )
                }
                className="
                  w-full h-2 rounded-full
                  appearance-none cursor-pointer
                "
                style={{
                  accentColor: "#38BDF8",
                }}
              />

              <div
                className="
                  flex justify-between
                  text-xs
                "
                style={{
                  color: "#475569",
                }}
              >
                <span>1</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>

            {/* STRATEGIES */}
            <div>
              <label
                className="
                  text-sm block mb-5
                "
                style={{
                  color: "#94A3B8",

                }}
              >
                Stratégie IA
              </label>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                {STRATEGIES.map((s) => {
                  const active =
                    strategie === s.value;

                  return (
                    <button
                      key={s.value}
                      onClick={() =>
                        setStrategie(
                          s.value
                        )
                      }
                      className="
                        group
                        relative overflow-hidden
                        w-full
                        rounded-2xl
                        p-5
                        text-left
                        transition-all duration-300
                        hover:scale-[1.02]
                      "
                      style={{
                        background: active
                          ? "linear-gradient(135deg, rgba(56,189,248,0.12), rgba(99,102,241,0.12))"
                          : "rgba(255,255,255,0.03)",

                        border: active
                          ? "1px solid rgba(125,211,252,0.18)"
                          : "1px solid rgba(255,255,255,0.06)",

                        boxShadow: active
                          ? "0 0 30px rgba(59,130,246,0.18)"
                          : "none",
                      }}
                    >
                      <div
                        className="
                          absolute inset-0
                          opacity-0
                          group-hover:opacity-100
                          transition-all duration-500
                        "

                      />

                      <div className="relative z-10 flex items-center gap-4" >
                        <div
                          className="
                            w-12 h-12 rounded-2xl
                            flex items-center justify-center
                          "
                          style={{
                            background:
                              "rgba(255,255,255,0.04)",

                            border:
                              "1px solid rgba(255,255,255,0.06)",

                          }}
                        >
                          <RiFlashlightLine
                            size={20}
                            color={
                              active
                                ? "#7DD3FC"
                                : "#64748B"
                            }
                          />
                        </div>

                        <div>
                          <p
                            className="
                              font-semibold

                            "
                            style={{
                              color: active
                                ? "white"
                                : "#CBD5E1",
                            }}
                          >
                            {s.label}
                          </p>

                          <p
                            className="
                              text-xs mt-1
                            "
                            style={{
                              color: "#64748B",
                            }}
                          >
                            Optimisation IA
                            avancée
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleGenerer}
            disabled={loading}
            className="
              group
              relative overflow-hidden
              w-full 
              py-4 rounded-2xl
              transition-all duration-300
              hover:scale-[1.01]
              disabled:opacity-50
            "
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",

              color: "white",


              boxShadow:
                "0 0 35px rgba(59,130,246,0.30)",

            }}
          >
            <div
              className="
                absolute inset-0
                opacity-0
                group-hover:opacity-100
                transition-all duration-500
              "
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), transparent)",
              }}
            />

            <div
              className="
                relative z-10
                flex items-center justify-center
                gap-3
                font-semibold
              "
            >
              {loading ? (
                <>
                  <RiLoader4Line
                    className="animate-spin"
                    size={20}
                  />

                  Génération en cours...
                </>
              ) : (
                <>
                  <RiRobot2Line
                    size={20}
                  />

                  Générer{" "}
                  {nbTickets} grille
                  {nbTickets > 1
                    ? "s"
                    : ""}
                </>
              )}
            </div>
          </button>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div
          className="
            flex flex-col items-center
            justify-center py-20 gap-5
          "
        >
          <div
            className="
              w-14 h-14 rounded-full
              border-[3px] animate-spin
            "
            style={{
              borderColor:
                "rgba(99,102,241,0.15)",

              borderTopColor:
                "#38BDF8",
            }}
          />

          <p
            style={{
              color: "#94A3B8",
            }}
          >
            Le modèle analyse les
            probabilités...
          </p>
        </div>
      )}

      {/* RESULTS */}
      {!loading &&
        prediction && (
          <div className="space-y-6" >
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <p
                className="
                  text-white font-bold text-xl
                "
              >
                {
                  prediction.nb_tickets
                }{" "}
                grille
                {prediction.nb_tickets >
                  1
                  ? "s"
                  : ""}{" "}
                générée
                {prediction.nb_tickets >
                  1
                  ? "s"
                  : ""}
              </p>

              <div
                className="
                  px-5 py-3 rounded-2xl
                "
                style={{
                  background:
                    "rgba(255,255,255,0.03)",

                  border:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <span
                  style={{
                    color: "#64748B",
                  }}
                >
                  Coût total —{" "}
                </span>

                <span
                  className="
                    text-white font-bold
                  "
                >
                  {prediction.cout_total?.toFixed(
                    2
                  )}{" "}
                  $
                </span>
              </div>
            </div>

            {/* Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
              {prediction.grilles.map(
                (
                  grille: any,
                  i: number
                ) => (
                  <div
                    key={i}
                    className="
                      group
                      relative overflow-hidden
                      rounded-3xl
                      p-6
                      transition-all duration-500
                      hover:scale-[1.02]
                    "
                    style={{
                      background:
                        "rgba(15,23,42,0.72)",

                      border:
                        "1px solid rgba(148,163,184,0.10)",

                      backdropFilter:
                        "blur(16px)",

                      boxShadow:
                        "0 10px 40px rgba(0,0,0,0.20)",
                    }}
                  >
                    {/* Hover */}
                    <div
                      className="
                        absolute inset-0
                        opacity-0
                        group-hover:opacity-100
                        transition-all duration-500
                      "
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(56,189,248,0.06), rgba(99,102,241,0.06))",
                      }}
                    />

                    {/* Bubble */}
                    <div
                      className="
                        absolute
                        w-[400px]
                        h-[400px]
                        rounded-full
                        bg-blue-500/10
                        -left-24
                        top-52
                        rotate-[-35deg]
                        transition-all duration-700
                        group-hover:top-0
                      "
                    />

                    <div className="relative z-10">
                      {/* Top */}
                      <div
                        className="
                          flex items-center
                          justify-between mb-6
                        "
                      >
                        <div>
                          <p
                            className="
                              text-white
                              font-bold text-lg
                            "
                          >
                            Grille{" "}
                            {String(
                              grille.ticket
                            ).padStart(
                              2,
                              "0"
                            )}
                          </p>

                          <p
                            className="
                              text-xs mt-1
                            "
                            style={{
                              color:
                                "#64748B",
                            }}
                          >
                            Générée par IA
                          </p>
                        </div>

                        <div
                          className="
                            px-3 py-2 rounded-xl
                          "
                          style={{
                            background:
                              "rgba(255,255,255,0.04)",

                            border:
                              "1px solid rgba(255,255,255,0.06)",
                          }}
                        >
                          <span
                            className="
                              text-sm font-semibold
                            "
                            style={{
                              color:
                                "#7DD3FC",
                            }}
                          >
                            3.00 $
                          </span>
                        </div>
                      </div>

                      {/* Balls */}
                      <div className="flex gap-4 flex-wrap">
                        {grille.numeros.map(
                          (
                            n: number,
                            j: number
                          ) => (
                            <div
                              key={j}
                              className="
                                transition-all duration-300
                                hover:scale-110
                              "
                            >
                              <BallDisplay
                                numero={n}
                                categorie="chaud"
                                size="lg"
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
    </div>
  );
};

export default Predictions;