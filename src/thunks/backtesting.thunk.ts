import type { AppDispatch } from "../store";
import BacktestingService from "../services/backtesting.service";
import { setError } from "../slices/tirage.slice";

export const fetchBacktesting = () => async (dispatch: AppDispatch) => {
  try {
    const response = await BacktestingService.list();
    return response.data;
  } catch {
    dispatch(setError("Erreur backtesting"));
  }
};