import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard    from "../pages/dashboard/Dashboard";
import Tickets      from "../pages/tickets/Tickets";
import TicketAdd    from "../pages/tickets/TicketAdd";
import Predictions  from "../pages/predictions/Predictions";
import Historique   from "../pages/historique/Historique";
import TirageDetail from "../pages/historique/TirageDetail";
import Backtesting  from "../pages/backtesting/Backtesting";
import DefaultLayout from "../layouts/default.layout";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/"                       element={<Dashboard />}    />
          <Route path="/tickets"                element={<Tickets />}      />
          <Route path="/tickets/add"            element={<TicketAdd />}    />
          <Route path="/predictions"            element={<Predictions />}  />
          <Route path="/historique"             element={<Historique />}   />
          <Route path="/historique/:date"       element={<TirageDetail />} />
          <Route path="/backtesting"            element={<Backtesting />}  />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;