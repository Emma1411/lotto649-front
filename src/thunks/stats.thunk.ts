import type { AppDispatch } from "../store";
import StatsService from "../services/stats.service";
import {
  setLoading,
  setStats,
  setHeatmap,
  setChauds,
  setFroids,
  setError,
} from "../slices/stats.slice";

// charge toutes les stats globales
export const fetchStats =
  () =>
  async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoading(true));

      const res = await StatsService.list();
      const data = res.data;

      dispatch(setStats(data));
    } catch (err: any) {
      dispatch(setError(err.message || "Erreur chargement stats"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// heatmap des numéros
export const fetchHeatmap =
  () =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await StatsService.heatmap();
      const data = res.data;

      dispatch(setHeatmap(data));
    } catch (err: any) {
      dispatch(setError("Erreur heatmap"));
    }
  };

// numéros chauds
export const fetchChauds =
  (limit = 15) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await StatsService.chauds(limit);
      const data = res.data;

      dispatch(setChauds(data));
    } catch (err: any) {
      dispatch(setError("Erreur stats chauds"));
    }
  };

// numéros froids
export const fetchFroids =
  (limit = 15) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await StatsService.froids(limit);
      const data = res.data;

      dispatch(setFroids(data));
    } catch (err: any) {
      dispatch(setError("Erreur stats froids"));
    }
  };

// stats d’un numéro précis
export const fetchStatByNumber =
  (numero: number) =>
  async (dispatch: AppDispatch) => {
    try {
      const res = await StatsService.read(numero);
      const data = res.data;

      dispatch(setStats(data));
    } catch (err: any) {
      dispatch(setError("Erreur stat numéro"));
    }
  };