export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("fr-CA", {
    year: "numeric", month: "long", day: "numeric"
  });
};

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat("fr-CA", {
    style: "currency", currency: "CAD"
  }).format(amount);
};

export const getBallColor = (categorie: string): string => {
  switch (categorie) {
    case "chaud": return "from-orange-500 to-red-500";
    case "tiede": return "from-yellow-400 to-orange-400";
    case "froid": return "from-blue-400 to-cyan-500";
    default:      return "from-gray-400 to-gray-500";
  }
};