import { APIRequest } from "./apiClient";

const StatsService = {

  //  Récupérer toutes les stats globales
  list: async () => {
    const response = await APIRequest({
      url: "/stats",
      requestMethod: "GET",
    });

    return response;
  },

  // Récupérer la heatmap des numéros
  heatmap: async () => {
    const response = await APIRequest({
      url: "/stats/heatmap",
      requestMethod: "GET",
    });

    return response;
  },

  // Récupérer les numéros les plus chauds
  chauds: async (limit = 15) => {
    const response = await APIRequest({
      url: `/stats/chauds?limit=${limit}`,
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer les numéros les plus froids
  froids: async (limit = 15) => {
    const response = await APIRequest({
      url: `/stats/froids?limit=${limit}`,
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer les stats d’un numéro précis
  read: async (numero: number) => {
    const response = await APIRequest({
      url: `/stats/${numero}`,
      requestMethod: "GET",
    });

    return response;
  },
};

export default StatsService;