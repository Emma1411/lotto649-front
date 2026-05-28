import React from "react";

interface Props {
  numero:     number;
  categorie?: "chaud" | "tiede" | "froid" | "default";
  size?:      "xs" | "sm" | "md" | "lg";
}

const palette = {
  chaud:   { bg: "#1C1008", border: "#92400E", text: "#F59E0B" },
  tiede:   { bg: "#111827", border: "#374151", text: "#9CA3AF" },
  froid:   { bg: "#0C1628", border: "#1E3A5F", text: "#60A5FA" },
  default: { bg: "#13111C", border: "#312E81", text: "#818CF8" },
};

const sizes = {
  xs: { outer: 28, font: 10 },
  sm: { outer: 34, font: 12 },
  md: { outer: 44, font: 14 },
  lg: { outer: 56, font: 18 },
};

const BallDisplay: React.FC<Props> = ({
  numero,
  categorie = "default",
  size = "md",
}) => {
  const c = palette[categorie];
  const s = sizes[size];

  return (
    <div
      style={{
        width:          s.outer,
        height:         s.outer,
        borderRadius:   "50%",
        background:     c.bg,
        border:         `1px solid ${c.border}`,
        color:          c.text,
        fontSize:       s.font,
        fontWeight:     600,
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        fontFamily:     "JetBrains Mono, monospace",
        letterSpacing:  "-0.02em",
        flexShrink:     0,
        transition:     "transform 0.15s ease",
        cursor:         "default",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {numero}
    </div>
  );
};

export default BallDisplay;