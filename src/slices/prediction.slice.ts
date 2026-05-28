import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Prediction } from "../interfaces";


interface PredictionState {
  prediction: Prediction | null;
  loading: boolean;
  error: string | null;
}

const initialState: PredictionState = {
  prediction: null,
  loading: false,
  error: null,
};

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    // active/désactive le loader pendant les appels API de prédiction
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // stocke le résultat de la prédiction retournée par l’API
    setPrediction: (state, action: PayloadAction<Prediction>) => {
      state.prediction = action.payload;
    },

    // enregistre un message d’erreur si l’appel échoue
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setPrediction, setError } = predictionSlice.actions;
export default predictionSlice.reducer;