export const API_URL  = import.meta.env.VITE_API_URL;
export const APP_NAME = import.meta.env.VITE_APP_NAME ?? "Lotto 6/49";

export const STRATEGIES = [
  { value: "equilibre",  label: "Équilibré",        description: "Mix optimal chaud / tiède / froid" },
  { value: "chaud",      label: "Fréquence haute",  description: "Priorité aux numéros les plus sortis" },
  { value: "couverture", label: "Couverture max",   description: "Minimise les doublons entre grilles" },
];

export const STATUT_CONFIG: Record<string, { label: string; color: string }> = {
  en_attente: { label: "En attente",  color: "text-yellow-400" },
  gagnant:    { label: "Gagnant",     color: "text-green-400"  },
  perdant:    { label: "Perdu",       color: "text-gray-500"   },
  verifie:    { label: "Vérifié",     color: "text-indigo-400" },
};