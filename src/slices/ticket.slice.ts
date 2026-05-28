import { createSlice, } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Ticket } from "../interfaces";

interface TicketState {
  tickets: Ticket[];
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  tickets: [],
  total: 0,
  loading: false,
  error: null,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    // active/désactive le chargement des tickets (API, actions async, etc.)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // remplace la liste complète des tickets
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },

    // met à jour le nombre total de tickets (utile pour pagination ou stats)
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },

    // stocke un message d’erreur si quelque chose échoue
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },

    // ajoute un nouveau ticket en haut de la liste
    addTicket: (state, action: PayloadAction<Ticket>) => {
      state.tickets.unshift(action.payload);
    },

    // supprime un ticket via son id
    removeTicket: (state, action: PayloadAction<number>) => {
      state.tickets = state.tickets.filter(t => t.id !== action.payload);
    },
  },
});

export const {
  setLoading,
  setTickets,
  setTotal,
  setError,
  addTicket,
  removeTicket,
} = ticketSlice.actions;

export default ticketSlice.reducer;