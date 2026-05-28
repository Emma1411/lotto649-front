import type { AppDispatch } from "../store";
import type { TicketCreate } from "../interfaces";
import TicketService from "../services/ticket.service";
import {
  setLoading,
  setTickets,
  setTotal,
  setError,
  addTicket,
  removeTicket,
} from "../slices/ticket.slice";

export const fetchTickets =
  (page = 1, per_page = 20) =>
  async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res: any = await TicketService.list(page, per_page);
      dispatch(setTickets(res.data));
      dispatch(setTotal(res.pagination?.total || 0));
    } catch (e: any) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const createTicket =
  (data: TicketCreate) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res: any = await TicketService.create(data);
      dispatch(addTicket(res.data));
      return res;
    } catch (e: any) {
      dispatch(setError(e.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTicket =
  (id: number) => async (dispatch: AppDispatch) => {
    try {
      await TicketService.delete(id);
      dispatch(removeTicket(id));
    } catch (e: any) {
      dispatch(setError(e.message));
    }
  };