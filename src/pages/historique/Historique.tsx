import React, { useEffect, useState } from "react";
import {
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
} from "react-icons/ri";
import {
  useAppDispatch,
  useAppSelector,
} from "../../hooks/useAppDispatch";
import { fetchTirages } from "../../thunks/tirage.thunk";
import BallDisplay from "../../components/BallDisplay";
import { formatDate } from "../../utils/helpers";

const Historique: React.FC = () => {
  const dispatch = useAppDispatch();

  const { tirages, total, loading } =
    useAppSelector((s) => s.tirage);

  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  useEffect(() => {
    dispatch(fetchTirages(page, PER_PAGE));
  }, [dispatch, page]);

  const totalPages = Math.ceil(
    (total || 0) / PER_PAGE
  );

  return (
    <div
      className="flex flex-col gap-5"
      style={{
        paddingTop: "3rem",
      }}
    >
      {/* HEADER */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div
            className="
              w-12 h-12 rounded-2xl
              flex items-center justify-center
            "
            style={{
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",

              boxShadow:
                "0 0 25px rgba(59,130,246,0.35)",
            }}
          >
            <RiCalendarLine
              size={22}
              color="white"
            />
          </div>

          <div>
            <h1
              className="text-4xl font-black tracking-tight"
              style={{
                background:
                  "linear-gradient(135deg,#7DD3FC 0%,#3B82F6 45%,#6366F1 100%)",

                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Historique des tirages
            </h1>

            <p
              className="mt-2"
              style={{
                color: "#94A3B8",
                fontSize: 15,
              }}
            >
              {total?.toLocaleString("fr-CA")} tirages
              archivés depuis 1982
            </p>
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="flex justify-center py-24">
          <div
            className="
              w-14 h-14 rounded-full
              border-[3px] animate-spin
            "
            style={{
              borderColor:
                "rgba(99,102,241,0.15)",
              borderTopColor: "#38BDF8",
            }}
          />
        </div>
      ) : (
        <>
          {/* LIST */}
          <div className="flex flex-col gap-4">
            {tirages.map((tirage: any) => (
              <div
                key={tirage.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  transition-all duration-500
                  hover:scale-[1.015]
                "
                style={{
                  background:
                    "rgba(15,23,42,0.72)",

                  border:
                    "1px solid rgba(148,163,184,0.10)",

                  backdropFilter: "blur(16px)",

                  boxShadow:
                    "0 8px 30px rgba(0,0,0,0.18)",
                    padding:"2px"
                }}
              >
                {/* Hover Glow */}
                <div
                  className="
                    absolute inset-0
                    opacity-0
                    group-hover:opacity-100
                    transition-all duration-500
                  "
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(56,189,248,0.08), rgba(99,102,241,0.08))",
                  }}
                />

                {/* Bubble */}
                <div
                  className="
                    absolute
                    w-[500px]
                    h-[500px]
                    rounded-full
                    bg-blue-500/10
                    -left-32
                    top-72
                    rotate-[-30deg]
                    transition-all duration-700
                    group-hover:top-0
                  "
                />

                {/* Content */}
                <div
                  className="
                    relative z-10
                    flex items-center justify-between
                    flex-wrap gap-6
                    px-7 py-6
                  "
                >
                  
                  <div>
                    <p
                      className="
                        text-white
                        font-bold
                        text-lg
                        transition-all duration-300
                        group-hover:text-cyan-300
                      "
                    >
                      {formatDate(
                        tirage.date_tirage
                      )}
                    </p>

                    <p
                      className="
                        text-sm capitalize mt-1
                      "
                      style={{
                        color: "#64748B",
                      }}
                    >
                      {tirage.jour_semaine}
                    </p>
                  </div>

                  {/* Balls */}
                  <div
                    className="
                      flex items-center
                      gap-3 flex-wrap
                    "
                  >
                    {[
                      tirage.n1,
                      tirage.n2,
                      tirage.n3,
                      tirage.n4,
                      tirage.n5,
                      tirage.n6,
                    ].map(
                      (
                        n: number,
                        i: number
                      ) => (
                        <div
                          key={i}
                          className="
                            transition-all duration-300
                            hover:scale-110
                          "
                        >
                          <BallDisplay
                            numero={n}
                            categorie="default"
                            size="sm"
                          />
                        </div>
                      )
                    )}

                    <span
                      style={{
                        color: "#64748B",
                        fontSize: 18,
                        marginInline: 2,
                      }}
                    >
                      +
                    </span>

                    <div
                      className="
                        transition-all duration-300
                        hover:scale-110
                      "
                    >
                      <BallDisplay
                        numero={
                          tirage.complementaire
                        }
                        categorie="froid"
                        size="sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PAGINATION */}
          <div
            className="
              flex items-center justify-center
              gap-5 pt-4 flex-wrap
            "
          >
            {/* Prev */}
            <button
              onClick={() =>
                setPage((p) =>
                  Math.max(1, p - 1)
                )
              }
              disabled={page === 1}
              className="
                group
                flex items-center gap-2
                px-5 py-3 rounded-2xl
                transition-all duration-300
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:scale-105
              "
              style={{
                background:
                  "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                  padding:"2px",

                border:
                  "1px solid rgba(255,255,255,0.06)",

                color: "#CBD5E1",
              }}
            >
              <RiArrowLeftSLine
                size={20}
                className="
                  transition-all duration-300
                  group-hover:-translate-x-1
                "
              />

              <span>Précédent</span>
            </button>

            {/* Page Info */}
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
                  color: "#94A3B8",
                  fontSize: 14,
                }}
              >
                Page{" "}
              </span>

              <span
                style={{
                  color: "white",
                  fontWeight: 700,
                }}
              >
                {page}
              </span>

              <span
                style={{
                  color: "#64748B",
                }}
              >
                {" "}
                / {totalPages}
              </span>
            </div>

            {/* Next */}
            <button
              onClick={() =>
                setPage((p) => p + 1)
              }
              disabled={page >= totalPages}
              className="
                group
                flex items-center gap-2
                px-5 py-3 rounded-2xl
                transition-all duration-300
                disabled:opacity-30
                disabled:cursor-not-allowed
                hover:scale-105
              "
              style={{
                background:
                  "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                   padding:"2px",

                color: "white",

                boxShadow:
                  "0 0 25px rgba(59,130,246,0.25)",
              }}
            >
              <span>Suivant</span>

              <RiArrowRightSLine
                size={20}
                className="
                  transition-all duration-300
                  group-hover:translate-x-1
                "
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Historique;