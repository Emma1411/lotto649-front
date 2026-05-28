export interface Tirage {
  id:              number;
  date_tirage:     string;
  jour_semaine:    string;
  n1: number; n2: number; n3: number;
  n4: number; n5: number; n6: number;
  complementaire:  number;
  jackpot_montant: number | null;
}