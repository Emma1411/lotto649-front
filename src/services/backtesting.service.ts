import { APIRequest } from "./apiClient";

const BacktestingService = {

  //  Liste paginée des backtests
  list: async (page = 1, per_page = 20) => {
    const response = await APIRequest({
      url: `/backtesting?page=${page}&per_page=${per_page}`,
      requestMethod: "GET",
    });

    return response;
  },

  //  Statistiques globales du backtesting
  stats: async () => {
    const response = await APIRequest({
      url: "/backtesting/stats",
      requestMethod: "GET",
    });

    return response;
  },

  //  Résultats de performances globales
  performances: async () => {
    const response = await APIRequest({
      url: "/backtesting/performances",
      requestMethod: "GET",
    });

    return response;
  },

  //  Dernière performance calculée
  derniere: async () => {
    const response = await APIRequest({
      url: "/backtesting/performances/derniere",
      requestMethod: "GET",
    });

    return response;
  },
};

export default BacktestingService;