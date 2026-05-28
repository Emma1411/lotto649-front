export interface Ticket {
  id:             number;
  date_achat:     string;
  strategie:      string;
  numeros_joues:  number[];
  cout_ticket:    number;
  date_tirage:    string | null;
  statut:         "en_attente" | "verifie" | "gagnant" | "perdant";
}

export interface TicketCreate {
  date_achat:    string;
  strategie:     string;
  numeros_joues: number[];
  cout_ticket:   number;
  date_tirage?:  string;
}