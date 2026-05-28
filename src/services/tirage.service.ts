import { APIRequest } from "./apiClient";

const TirageService = {

  // Récupérer la liste des tirages avec pagination
  list: async (page = 1, per_page = 20) => {
    const response = await APIRequest({
      url: `/tirages?page=${page}&per_page=${per_page}`,
      requestMethod: "GET",
    });

    return response;
  },

  //  Compter le nombre total de tirages
  count: async () => {
    const response = await APIRequest({
      url: "/tirages/count",
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer le dernier tirage
  dernier: async () => {
    const response = await APIRequest({
      url: "/tirages/dernier",
      requestMethod: "GET",
    });

    return response;
  },

  //  Récupérer un tirage précis par son ID
  read: async (id: number) => {
    const response = await APIRequest({
      url: `/tirages/${id}`,
      requestMethod: "GET",
    });

    return response;
  },
};

export default TirageService;