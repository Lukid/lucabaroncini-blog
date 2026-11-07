// "04/11/2026" negli elenchi, "4 novembre 2026" nelle pagine.
export const formatData = (date: Date, lungo = false): string =>
  date.toLocaleDateString("it-IT", lungo
    ? { day: "numeric", month: "long", year: "numeric" }
    : { day: "2-digit", month: "2-digit", year: "numeric" });
