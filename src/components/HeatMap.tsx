import React, { useState } from "react";
import type { NumeroStat } from "../interfaces";

interface Props { stats: NumeroStat[] }

const HeatMap: React.FC<Props> = ({ stats }) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const maxFreq = Math.max(...stats.map((s) => s.frequence_totale));

  const getStyle = (stat: NumeroStat) => {
    const ratio = stat.frequence_totale / maxFreq;
    if (stat.categorie === "chaud") return {
      background: `rgba(245, 158, 11, ${0.06 + ratio * 0.18})`,
      borderColor: `rgba(245, 158, 11, ${0.15 + ratio * 0.3})`,
      color: ratio > 0.7 ? "#F59E0B" : ratio > 0.4 ? "#D97706" : "#92400E",
    };
    if (stat.categorie === "froid") return {
      background: `rgba(96, 165, 250, ${0.04 + ratio * 0.12})`,
      borderColor: `rgba(96, 165, 250, ${0.1 + ratio * 0.2})`,
      color: "#60A5FA",
    };
    return {
      background: `rgba(255,255,255, ${0.02 + ratio * 0.04})`,
      borderColor: `rgba(255,255,255, ${0.05 + ratio * 0.08})`,
      color: "#6B7280",
    };
  };

  return (
    <div>
      <div className="grid grid-cols-7 gap-1.5">
        {stats.map((stat) => {
          const style = getStyle(stat);
          const isHov = hovered === stat.numero;
          return (
            <div
              key={stat.numero}
              onMouseEnter={() => setHovered(stat.numero)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-lg flex flex-col items-center justify-center transition-all duration-150 cursor-default"
              style={{
                ...style,
                border:    `1px solid ${style.borderColor}`,
                padding:   "8px 0",
                transform: isHov ? "scale(1.08)" : "scale(1)",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, fontFamily: "monospace", color: style.color }}>
                {stat.numero}
              </span>
              <span style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 1 }}>
                {stat.frequence_totale}
              </span>
            </div>
          );
        })}
      </div>

      {/* Légende */}
      <div className="flex items-center gap-6 mt-4">
        {[
          { label: "Fréquent", color: "#F59E0B" },
          { label: "Neutre",   color: "#4B5563" },
          { label: "Rare",     color: "#3B82F6" },
        ].map((l) => (
          <div key={l.label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ background: l.color, opacity: 0.6 }} />
            <span className="text-xs text-gray-600">{l.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeatMap;