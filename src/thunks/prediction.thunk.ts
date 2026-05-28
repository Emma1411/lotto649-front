import type { AppDispatch } from "../store";
import PredictionService from "../services/prediction.service";
import {
  setLoading,
  setPrediction,
  setError,
} from "../slices/prediction.slice";

export const fetchPrediction =
  (nb_tickets: number, strategie: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res: any = await PredictionService.generer(nb_tickets, strategie);
      dispatch(setPrediction(res.data));
    } catch (e: any) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };