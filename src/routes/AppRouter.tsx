import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DefaultLayout    from "../layouts/default.layout";
import Dashboard        from "../pages/dashboard/Dashboard";
import Historique       from "../pages/historique/Historique";
import TirageDetail     from "../pages/historique/TirageDetail";
import Predictions      from "../pages/predictions/Predictions";
import Tickets          from "../pages/tickets/Tickets";
import TicketAdd        from "../pages/tickets/TicketAdd";
import TicketsParDate   from "../pages/tickets/TicketsParDate";
import Backtesting      from "../pages/backtesting/Backtesting";

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/"                     element={<Dashboard />}      />
        <Route path="/historique"           element={<Historique />}     />
        <Route path="/historique/:date"     element={<TirageDetail />}   />
        <Route path="/predictions"          element={<Predictions />}    />
        <Route path="/tickets"              element={<Tickets />}        />
        <Route path="/tickets/add"          element={<TicketAdd />}      />
        <Route path="/tickets/date/:date"   element={<TicketsParDate />} />
        <Route path="/backtesting"          element={<Backtesting />}    />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;