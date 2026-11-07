export const STAZIONI = ["tesi", "passaggio", "evidenza", "limite", "domanda"] as const;
export type Stazione = (typeof STAZIONI)[number];

export const COLORI = {
  blu: "#1c2b5a",
  ocra: "#f0a202",
  rosso: "#b81f33",
  verde: "#5fb37f",
  carta: "#f5f1e8",
} as const;
export type Colore = keyof typeof COLORI;

export type Schermata = { stazione: Stazione; testo: string; cifra?: string; colore?: Colore };
export type Forma = { tipo: "cerchio" | "quadrato" | "barra"; x: number; y: number; d: number; colore: Colore };

const ROTAZIONE: Colore[] = ["blu", "ocra", "rosso", "verde"];

export const inchiostro = (fondo: Colore): Colore =>
  fondo === "blu" || fondo === "rosso" ? "carta" : "blu";

const luminanza = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

export const contrasto = (a: string, b: string): number => {
  const [x, y] = [luminanza(a), luminanza(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};

export const evidenzia = (testo: string): { t: string; accento: boolean }[] =>
  testo
    .split("*")
    .map((t, i) => ({ t, accento: i % 2 === 1 }))
    .filter((s) => s.t !== "");

// mulberry32 su hash FNV-1a del seme
const prng = (seme: string) => {
  let h = 2166136261;
  for (const c of seme) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

export function formePer(seme: string, conCifra: boolean): Forma[] {
  const r = prng(seme);
  const tipi: Forma["tipo"][] = ["cerchio", "quadrato", "barra"];
  const n = 2 + Math.floor(r() * 2);
  return Array.from({ length: n }, (_, i) => ({
    tipo: tipi[Math.floor(r() * 3)],
    x: Math.round(r() * 100),
    y: Math.round(r() * 100),
    // senza cifra la prima forma prende il posto del numero: grande
    d: i === 0 && !conCifra ? 40 + Math.round(r() * 20) : 8 + Math.round(r() * 24),
    colore: ROTAZIONE[Math.floor(r() * 4)],
  }));
}

export const coloreDi = (s: Schermata, i: number): Colore =>
  s.stazione === "domanda" ? "blu" : (s.colore ?? ROTAZIONE[i % ROTAZIONE.length]);

// Forme ancorate al glifo: un disco nell'occhiello, una barra al posto di un tratto, un quadrato su un angolo.
// Misure in em sul riquadro del glifo (Archivo 900, cifre tabulari, interlinea 1).
// ponytail: misurate a mano sul font; se cambia il font vanno rimisurate (scratchpad glifi/misura.mjs).
export type Ancora = { tipo: "cerchio" | "rett"; x: number; y: number; w: number; h: number };
const disco = (x: number, y: number, d: number): Ancora => ({ tipo: "cerchio", x, y, w: d, h: d });
const rett = (x: number, y: number, w: number, h: number): Ancora => ({ tipo: "rett", x, y, w, h });
export const ANCORE: Record<string, Ancora> = {
  "0": disco(0.237, 0.393, 0.193),
  "1": rett(0.105, 0.677, 0.52, 0.155),
  "2": rett(0.05, 0.68, 0.57, 0.153),
  "3": rett(0.03, 0.12, 0.26, 0.26),
  "4": rett(0.05, 0.565, 0.49, 0.107), // dentro la traversa, fino al filo destro dell'asta: mai oltre
  "5": rett(0.1, 0.145, 0.475, 0.165),
  "6": disco(0.242, 0.515, 0.195),
  "7": rett(0.045, 0.145, 0.58, 0.16),
  "8": disco(0.2515, 0.545, 0.165),
  "9": disco(0.23, 0.268, 0.195),
  "×": rett(0.245, 0.483, 0.17, 0.17),
  "%": disco(0.175, 0.2525, 0.12),
  "-": rett(0.04, 0.477, 0.253, 0.16),
};

// Le prime due forme ancorabili della cifra, per indice del glifo.
export const ancorePer = (cifra: string): number[] =>
  [...cifra].flatMap((c, i) => (ANCORE[c] ? [i] : [])).slice(0, 2);
