import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages
import Dashboard from "../pages/dashboard/Dashboard";
import Tickets from "../pages/tickets/Tickets";
import Predictions from "../pages/predictions/Predictions";
import Historique from "../pages/historique/Historique";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* page par défaut */}
        <Route path="/" element={<Dashboard />} />

        {/* autres pages */}
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/predictions" element={<Predictions />} />
        <Route path="/historique" element={<Historique />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;