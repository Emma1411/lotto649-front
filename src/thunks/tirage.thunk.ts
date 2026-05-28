import type { AppDispatch } from "../store";
import TirageService from "../services/tirage.service";
import {
  setLoading,
  setTirages,
  setDernier,
  setTotal,
  setError,
} from "../slices/tirage.slice";

export const fetchTirages =
  (page = 1, per_page = 20) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res: any = await TirageService.list(page, per_page);
      dispatch(setTirages(res.data));
      dispatch(setTotal(res.pagination?.total || 0));
    } catch (e: any) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchDernier = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res: any = await TirageService.dernier();
    dispatch(setDernier(res.data));
  } catch (e: any) {
    dispatch(setError(e.message));
  } finally {
    dispatch(setLoading(false));
  }
};