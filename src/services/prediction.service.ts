import { APIRequest } from "./apiClient";

const PredictionService = {

  //  Générer des tickets de prédiction
  generer: async (nb_tickets: number, strategie: string) => {
    const response = await APIRequest({
      url: `/predictions/generer?nb_tickets=${nb_tickets}&strategie=${strategie}`,
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer le pool de prédictions disponibles
  pool: async () => {
    const response = await APIRequest({
      url: "/predictions/pool",
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer la dernière prédiction générée
  derniere: async () => {
    const response = await APIRequest({
      url: "/predictions/derniere",
      requestMethod: "GET",
    });

    return response;
  },
};

export default PredictionService;