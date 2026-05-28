import type { ReactNode } from "react";

interface Props {
  title: string;
  value?: string | number;
  icon: ReactNode;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  icon,
  color = "#3b82f6",
}: Props) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg,#1f2937,#111827)",
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "0.3s",
      }}
    >
      <div>
        <div
          style={{
            color: "#9ca3af",
            fontSize: 14,
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontSize: 22,
            marginTop: 5,
            color: "white",
            fontWeight: 700,
          }}
        >
          {value ?? "--"}
        </div>
      </div>

      <div
        style={{
          color,
          fontSize: 28,
        }}
      >
        {icon}
      </div>
    </div>
  );
}