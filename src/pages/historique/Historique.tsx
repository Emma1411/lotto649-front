import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  RiCalendarLine,
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiFilterLine,
  RiCloseLine,
  RiArrowRightLine,
} from "react-icons/ri";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { fetchTirages } from "../../thunks/tirage.thunk";
import BallDisplay from "../../components/BallDisplay";
import { formatDate } from "../../utils/helpers";
import TirageService from "../../services/tirage.service";
import { DateRangePicker } from "rsuite";
import "rsuite/dist/rsuite.min.css";


const Historique: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tirages, total, loading } = useAppSelector((s) => s.tirage);

  const [page, setPage] = useState(1);
  const [range, setRange] = useState<[Date, Date] | null>(null);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [filtTotal, setFiltTotal] = useState<number>(0);
  const [filtLoad, setFiltLoad] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const PER_PAGE = 10;
  const displayData = isFiltered ? filtered : tirages;
  const displayTotal = isFiltered ? filtTotal : (total || 0);
  const totalPages = Math.ceil(displayTotal / PER_PAGE);
  const isLoading = isFiltered ? filtLoad : loading;

  useEffect(() => {
    if (!isFiltered) dispatch(fetchTirages(page, PER_PAGE));
  }, [dispatch, page, isFiltered]);

  const handleFilterDates = async (start: string, end: string) => {
    setFiltLoad(true);
    setIsFiltered(true);
    setPage(1);

    try {
      const res: any = await TirageService.filterByDate(
        start,
        end,
        1,
        PER_PAGE
      );

      setFiltered(res.data ?? []);
      setFiltTotal(res.pagination?.total ?? 0);
    } catch {
      setFiltered([]);
      setFiltTotal(0);
    } finally {
      setFiltLoad(false);
    }
  };

  const handleReset = () => {
    setRange(null);
    setIsFiltered(false);
    setFiltered([]);
    setFiltTotal(0);
    setPage(1);
  };

  return (
    <div className="flex flex-col gap-5" style={{ paddingTop: "3rem" }}>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              boxShadow: "0 0 25px rgba(59,130,246,0.35)",
            }}
          >
            <RiCalendarLine size={22} color="white" />
          </div>
          <div>
            <h1
              className="text-4xl font-black tracking-tight"
              style={{
                background: "linear-gradient(135deg,#7DD3FC 0%,#3B82F6 45%,#6366F1 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Historique des tirages
            </h1>
            <p className="mt-2" style={{ color: "#94A3B8", fontSize: 15 }}>
              {displayTotal.toLocaleString("fr-CA")} tirages
              {isFiltered ? " trouves dans cet intervalle" : " archives depuis 1982"}
            </p>
          </div>
        </div>
      </div>

      <div
        className="rounded-3xl p-6"
        style={{
        }}
      >
        <p className="text-sm font-medium flex items-center gap-2 mb-4" style={{ color: "#94A3B8" }}>
          <RiFilterLine style={{ color: "#38BDF8" }} />
          Filtrer par intervalle de dates
        </p>

        <div className="flex items-end gap-4 flex-wrap">

          <div className="flex flex-col gap-1.5">
            <DateRangePicker
              value={range}
              onChange={(value) => setRange(value as [Date, Date] | null)}
              placeholder="Sélectionner une période"
              format="yyyy-MM-dd"
              cleanable
              placement="bottomStart"
              style={{ width: 250 }}

              onOk={(value) => {
                const [start, end] = value as [Date, Date];
                const fmt = (d: Date) => d.toISOString().split("T")[0];

                handleFilterDates(fmt(start), fmt(end));
              }}

              onClean={() => {
                handleReset();
              }}
            />
          </div>


        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-24">
          <div
            className="w-14 h-14 rounded-full border-[3px] animate-spin"
            style={{
              borderColor: "rgba(99,102,241,0.15)",
              borderTopColor: "#38BDF8",
            }}
          />
        </div>
      ) : displayData.length === 0 ? (
        <div
          className="rounded-3xl p-12 text-center"
          style={{
            background: "rgba(15,23,42,0.72)",
            border: "1px solid rgba(148,163,184,0.10)",
          }}
        >
          <p className="text-white font-bold text-lg mb-2">Aucun tirage trouve</p>
          <p style={{ color: "#64748B", fontSize: 14 }}>
            Essayez un autre intervalle de dates
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4">
            {displayData.map((tirage: any) => (
              <div
                key={tirage.id}
                className="group relative overflow-hidden rounded-3xl transition-all duration-500 hover:scale-[1.015] cursor-pointer"
                style={{
                  background: "rgba(15,23,42,0.72)",
                  border: "1px solid rgba(148,163,184,0.10)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.18)",
                  padding: "2px",
                }}
                onClick={() => {
                  const numerosTires = [
                    tirage.n1,
                    tirage.n2,
                    tirage.n3,
                    tirage.n4,
                    tirage.n5,
                    tirage.n6,
                  ];

                  console.log("NAVIGATE TO:", tirage.date_tirage);

                  console.log("NUMEROS TIRES:", [
                    ...numerosTires,
                    "+",
                    tirage.complementaire,
                  ]);

                  navigate(`/historique/${tirage.date_tirage}`, {
                    state: {
                      numerosTires,
                      complementaire: tirage.complementaire,
                    },
                  });
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
                  style={{
                    background: "linear-gradient(135deg,rgba(56,189,248,0.08),rgba(99,102,241,0.08))",
                  }}
                />

                <div
                  className="absolute w-[500px] h-[500px] rounded-full bg-blue-500/10 -left-32 top-72 rotate-[-30deg] transition-all duration-700 group-hover:top-0"
                />

                <div className="relative z-10 flex items-center justify-between flex-wrap gap-6 px-7 py-6">
                  <div>
                    <p
                      className="text-white font-bold text-lg transition-all duration-300 group-hover:text-cyan-300"
                    >
                      {formatDate(tirage.date_tirage)}
                    </p>
                    <p className="text-sm capitalize mt-1" style={{ color: "#64748B" }}>
                      {tirage.jour_semaine}
                    </p>
                  </div>


                  <div className=" flex items-center space-x-7">
                    <div className="flex items-center gap-3 flex-wrap">
                      {[tirage.n1, tirage.n2, tirage.n3, tirage.n4, tirage.n5, tirage.n6].map((n: number, i: number) => (
                        <div key={i} className="transition-all duration-300 hover:scale-110">
                          <BallDisplay numero={n} categorie="default" size="sm" />
                        </div>
                      ))}
                      <span style={{ color: "#64748B", fontSize: 18, marginInline: 2 }}>+</span>
                      <div className="transition-all duration-300 hover:scale-110">
                        <BallDisplay numero={tirage.complementaire} categorie="froid" size="sm" />
                      </div>
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

          <div className="flex items-center justify-center gap-5 pt-4 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                padding: "2px",
                border: "1px solid rgba(255,255,255,0.06)",
                color: "#CBD5E1",
              }}
            >
              <RiArrowLeftSLine size={20} className="transition-all duration-300 group-hover:-translate-x-1" />
              <span>Precedent</span>
            </button>

            <div
              className="px-5 py-3 rounded-2xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span style={{ color: "#94A3B8", fontSize: 14 }}>Page </span>
              <span style={{ color: "white", fontWeight: 700 }}>{page}</span>
              <span style={{ color: "#64748B" }}> / {totalPages}</span>
            </div>

            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={page >= totalPages}
              className="group flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              style={{
                background: "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
                padding: "2px",
                color: "white",
                boxShadow: "0 0 25px rgba(59,130,246,0.25)",
              }}
            >
              <span>Suivant</span>
              <RiArrowRightSLine size={20} className="transition-all duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </>
      )}

      {/* DATEPICKER DARK STYLE */}
      <style>{`
        .react-datepicker { background: #0D1117 !important; border: 1px solid rgba(255,255,255,0.08) !important; border-radius: 12px !important; overflow: hidden !important; font-family: inherit !important; }
        .react-datepicker__header { background: #111827 !important; border-bottom: 1px solid rgba(255,255,255,0.06) !important; }
        .react-datepicker__current-month, .react-datepicker__day-name { color: #9CA3AF !important; }
        .react-datepicker__day { color: #D1D5DB !important; border-radius: 6px !important; }
        .react-datepicker__day:hover { background: rgba(56,189,248,0.2) !important; color: white !important; }
        .react-datepicker__day--selected, .react-datepicker__day--in-range { background: #38BDF8 !important; color: #0D1117 !important; }
        .react-datepicker__day--in-selecting-range { background: rgba(56,189,248,0.3) !important; }
        .react-datepicker__day--disabled { color: #374151 !important; }
        .react-datepicker__navigation-icon::before { border-color: #6B7280 !important; }
        .react-datepicker__year-select, .react-datepicker__month-select { background: #111827 !important; color: #9CA3AF !important; border: 1px solid rgba(255,255,255,0.06) !important; border-radius: 6px !important; }
      `}</style>
    </div>
  );
};

export default Historique;