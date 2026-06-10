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

  getDetails: async (date: string) => {
    return await APIRequest({
        url: `/tirages/${date}/details`,
        requestMethod: "GET",
    });
},

  filterByDate: async (
    start_date: string,
    end_date: string,
    page = 1,
    per_page = 20
  ) => {
    return await APIRequest({
      url: "/tirages/filter",
      requestMethod: "GET",
      params: { start_date, end_date, page, per_page },
    });
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