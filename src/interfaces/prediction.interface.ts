export interface Grille {
  ticket:  number;
  numeros: number[];
}

export interface Prediction {
  strategie:  string;
  nb_tickets: number;
  cout_total: number;
  grilles:    Grille[];
}