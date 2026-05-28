import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components";


const DefaultLayout: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",

        background: `
          radial-gradient(circle at top left, rgba(125,211,252,0.18), transparent 25%),
          radial-gradient(circle at top right, rgba(96,165,250,0.15), transparent 25%),
          radial-gradient(circle at bottom center, rgba(59,130,246,0.12), transparent 35%),
          linear-gradient(135deg, #F8FBFF 0%, #EEF5FF 35%, #E0ECFF 100%)
        `,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -180,
          left: -120,
          width: 450,
          height: 450,
          borderRadius: "50%",
          background: "rgba(56,189,248,0.18)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: -120,
          right: -100,
          width: 380,
          height: 380,
          borderRadius: "50%",
          background: "rgba(59,130,246,0.16)",
          filter: "blur(120px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: -250,
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "rgba(96,165,250,0.12)",
          filter: "blur(160px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 800,
          height: 300,
          background: "rgba(255,255,255,0.35)",
          filter: "blur(120px)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "42px 42px",
          maskImage:
            "radial-gradient(circle at center, black, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at center, black, transparent 90%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.25), transparent 30%, transparent 70%, rgba(255,255,255,0.18))",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 9999,
        }}
      >
        <Navbar />
      </div>

      <main
        style={{
          position: "relative",
          zIndex: 10,

          paddingTop: "30px",
          paddingLeft: "60px",
          paddingRight: "60px",
          paddingBottom: "20px",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;