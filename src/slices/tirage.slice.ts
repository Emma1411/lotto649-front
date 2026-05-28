import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Tirage } from "../interfaces";

interface TirageState {
  tirages: Tirage[];
  dernier: Tirage | null;
  total: number;
  loading: boolean;
  error: string | null;
}

const initialState: TirageState = {
  tirages: [],
  dernier: null,
  total: 0,
  loading: false,
  error: null,
};

const tirageSlice = createSlice({
  name: "tirage",
  initialState,
  reducers: {

    // loading API
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // liste des tirages
    setTirages: (state, action: PayloadAction<Tirage[]>) => {
      state.tirages = action.payload;
    },

    // dernier tirage
    setDernier: (state, action: PayloadAction<Tirage>) => {
      state.dernier = action.payload;
    },

    // total tirages
    setTotal: (state, action: PayloadAction<number>) => {
      state.total = action.payload;
    },

    // erreur API
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setLoading,
  setTirages,
  setDernier,
  setTotal,
  setError,
} = tirageSlice.actions;

export default tirageSlice.reducer;