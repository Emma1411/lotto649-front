import { APIRequest } from "./apiClient";
import type { TicketCreate } from "../interfaces";

const TicketService = {

  list: async (page = 1, per_page = 20) => {
    return await APIRequest({
      url: "/tickets",
      requestMethod: "GET",
      params: { page, per_page },
    });
  },

  suivi: async () => {
    return await APIRequest({
      url: "/tickets/suivi",
      requestMethod: "GET",
    });
  },

  count: async () => {
    return await APIRequest({
      url: "/tickets/count",
      requestMethod: "GET",
    });
  },

  read: async (id: number) => {
    return await APIRequest({
      url: `/tickets/${id}`,
      requestMethod: "GET",
    });
  },

  create: async (data: TicketCreate) => {
    return await APIRequest({
      url: "/tickets/store",
      requestMethod: "POST",
      requestBody: data,
    });
  },

  update: async (id: number, statut: string) => {
    return await APIRequest({
      url: `/tickets/update/${id}`,
      requestMethod: "PUT",
      requestBody: { statut },
    });
  },

  delete: async (id: number) => {
    return await APIRequest({
      url: `/tickets/delete/${id}`,
      requestMethod: "DELETE",
    });
  },
};

export default TicketService;