import { APIRequest } from "./apiClient";
import type { TicketCreate } from "../interfaces";

const TicketService = {

  // Récupère les tickets regroupés par date
  groupes: async (page = 1, per_page = 10) => {
    return await APIRequest({
        url: "/tickets/groupes",
        requestMethod: "GET",
        params: { page, per_page },
    });
},


  // Récupère les groupes de tickets pour une période donnée
 groupesFilter: async (
    start_date: string,
    end_date:   string,
    page = 1,
    per_page = 10
) => {
    return await APIRequest({
        url: "/tickets/groupes/filter",
        requestMethod: "GET",
        params: { start_date, end_date, page, per_page },
    });
},

  // Récupère les tickets associés à une date précise
  byDate: async (date: string) => {
    return await APIRequest({
      url: `/tickets/date/${date}`,
      requestMethod: "GET",
    });
  },

  // Récupère la liste paginée des tickets
  list: async (page = 1, per_page = 20) => {
    return await APIRequest({
      url: "/tickets",
      requestMethod: "GET",
      params: { page, per_page },
    });
  },

  // Récupère les informations de suivi financier
  suivi: async () => {
    return await APIRequest({
      url: "/tickets/suivi",
      requestMethod: "GET",
    });
  },

  // Récupère le nombre total de tickets
  count: async () => {
    return await APIRequest({
      url: "/tickets/count",
      requestMethod: "GET",
    });
  },

  // Filtre les tickets selon une plage de dates
  filterByDate: async (
    start_date: string,
    end_date: string,
    page = 1,
    per_page = 20
  ) => {
    return await APIRequest({
      url: "/tickets/filter",
      requestMethod: "GET",
      params: { start_date, end_date, page, per_page },
    });
  },

  // Récupère les détails d'un ticket
  read: async (id: number) => {
    return await APIRequest({
      url: `/tickets/${id}`,
      requestMethod: "GET",
    });
  },

  // Crée un nouveau ticket
  create: async (data: TicketCreate) => {
    return await APIRequest({
      url: "/tickets/store",
      requestMethod: "POST",
      requestBody: data,
    });
  },

  // Met à jour le statut d'un ticket
  update: async (id: number, statut: string) => {
    return await APIRequest({
      url: `/tickets/update/${id}`,
      requestMethod: "PUT",
      requestBody: { statut },
    });
  },

  // Supprime un ticket
  delete: async (id: number) => {
    return await APIRequest({
      url: `/tickets/delete/${id}`,
      requestMethod: "DELETE",
    });
  },
};

export default TicketService;