import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducers";
import storage from "./utils/storage";

// permet de garder certaines données même après refresh du navigateur
const persistConfig = {
  key: "lotto649",
  storage,
  whitelist: ["ticket"],
};

// rend le store “persistant” avec localStorage
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store principal Redux de l’app (là où tout le state est stocké)
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// type du dispatch pour pouvoir envoyer des actions partout dans l’app
export type AppDispatch = typeof store.dispatch;

// gère la sauvegarde/restauration automatique du state persistant
export const persistor = persistStore(store);

export default store;