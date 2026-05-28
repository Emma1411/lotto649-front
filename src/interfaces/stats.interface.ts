export interface NumeroStat {
  id:                  number;
  numero:              number;
  frequence_totale:    number;
  derniere_apparition: string;
  gap_moyen:           number;
  gap_actuel:          number;
  categorie:           "chaud" | "tiede" | "froid";
}