import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DefaultLayout from "./layouts/default.layout";
import Dashboard     from "./pages/dashboard/Dashboard";
import Historique    from "./pages/historique/Historique";
import Predictions   from "./pages/predictions/Predictions";
import Tickets       from "./pages/tickets/Tickets";
import TicketAdd     from "./pages/tickets/TicketAdd";
import Backtesting   from "./pages/backtesting/Backtesting";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/"            element={<Dashboard />} />
            <Route path="/historique"  element={<Historique />} />
            <Route path="/predictions" element={<Predictions />} />
            <Route path="/tickets"     element={<Tickets />} />
            <Route path="/tickets/add" element={<TicketAdd />} />
            <Route path="/backtesting" element={<Backtesting />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        toastStyle={{
          background: "#13131A",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#F0EFEA",
        }}
      />
    </>
  );
}