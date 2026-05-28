import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import {
  RiDashboardLine,
  RiHistoryLine,
  RiRobot2Line,
  RiTicket2Line,
  RiBarChartBoxLine,
  RiMenuLine,
  RiCloseLine,
} from "react-icons/ri";

const links = [
  {
    to: "/",
    label: "Vue d'ensemble",
    Icon: RiDashboardLine,
  },
  {
    to: "/historique",
    label: "Historique",
    Icon: RiHistoryLine,
  },
  {
    to: "/predictions",
    label: "Prédictions IA",
    Icon: RiRobot2Line,
  },
  {
    to: "/tickets",
    label: "Mes tickets",
    Icon: RiTicket2Line,
  },
  {
    to: "/backtesting",
    label: "Backtesting",
    Icon: RiBarChartBoxLine,
  },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        fixed top-0 left-0 right-0 w-full z-50
        border-b border-white/10
      "
      style={{
        background:
          "linear-gradient(to right, rgba(10,14,23,0.92), rgba(15,23,42,0.88))",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
      }}
    >
      {/* Top Bar */}
      <div
        className=" mx-auto"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 40px",
          width: "100%",
          boxSizing: "border-box",
          height: "72px",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "12px",
              fontWeight: "bold",
              color: "white",
              background:
                "linear-gradient(135deg,#38BDF8 0%,#2563EB 45%,#6366F1 100%)",
              boxShadow:
                "0 0 20px rgba(59,130,246,0.45)",
            }}
          >
            6/49
          </div>

          <span
            style={{
              fontSize: "15px",
              fontWeight: 700,
              color: "white",
              letterSpacing: "-0.4px",
            }}
          >
            Lotto Intelligence
          </span>
        </div>

        {/* Desktop Navigation */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "12px",
          }}
        >
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className="group relative"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "10px",

                padding: "10px 16px",
                borderRadius: "14px",

                fontSize: "14px",
                fontWeight: 500,

                textDecoration: "none",

                transition: "all 0.35s ease",

                position: "relative",
                overflow: "hidden",

                color: isActive
                  ? "white"
                  : "#94A3B8",

                background: isActive
                  ? "linear-gradient(135deg, rgba(59,130,246,0.20), rgba(99,102,241,0.18))"
                  : "transparent",

                border: isActive
                  ? "1px solid rgba(125,211,252,0.18)"
                  : "1px solid transparent",

                boxShadow: isActive
                  ? "0 0 25px rgba(59,130,246,0.18)"
                  : "none",

                backdropFilter: "blur(10px)",
              })}
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
                    "linear-gradient(135deg, rgba(56,189,248,0.10), rgba(99,102,241,0.10))",
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex items-center gap-2">
                <Icon
                  size={18}
                  className="
                    transition-all duration-300
                    group-hover:scale-110
                    group-hover:text-cyan-300
                  "
                />

                <span>{label}</span>
              </div>
            </NavLink>
          ))}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            transition-all duration-300
            hover:scale-110
          "
          style={{
            color: "#CBD5E1",
            background: "rgba(255,255,255,0.04)",
            border:
              "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "10px",
            backdropFilter: "blur(10px)",
            cursor: "pointer",
          }}
        >
          {open ? (
            <RiCloseLine size={24} />
          ) : (
            <RiMenuLine size={24} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          className="md:hidden"
          style={{
            padding: "16px 24px",

            display: "flex",
            flexDirection: "column",
            gap: "10px",

            borderTop:
              "1px solid rgba(255,255,255,0.06)",

            background:
              "linear-gradient(to bottom, rgba(15,23,42,0.96), rgba(10,14,23,0.98))",

            backdropFilter: "blur(18px)",
          }}
        >
          {links.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className="group relative"
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: "12px",

                padding: "12px 16px",
                borderRadius: "14px",

                fontSize: "14px",
                fontWeight: 500,

                textDecoration: "none",

                transition: "all 0.3s ease",

                color: isActive
                  ? "white"
                  : "#94A3B8",

                background: isActive
                  ? "linear-gradient(135deg, rgba(59,130,246,0.20), rgba(99,102,241,0.18))"
                  : "rgba(255,255,255,0.02)",

                border: isActive
                  ? "1px solid rgba(125,211,252,0.18)"
                  : "1px solid rgba(255,255,255,0.04)",
              })}
            >
              <Icon
                size={18}
                className="
                  transition-all duration-300
                  group-hover:text-cyan-300
                "
              />

              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;