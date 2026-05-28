import { combineReducers } from "@reduxjs/toolkit";
import tirageReducer     from "./slices/tirage.slice";
import predictionReducer from "./slices/prediction.slice";
import ticketReducer     from "./slices/ticket.slice";

const rootReducer = combineReducers({
  tirage:     tirageReducer,
  prediction: predictionReducer,
  ticket:     ticketReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;