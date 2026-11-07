import { readFile } from "node:fs/promises";
import { join } from "node:path";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { COLORI, formePer, inchiostro, type Colore } from "./reel";

// Archivo ExtraBold statico (OFL, vedi OFL-Archivo.txt): satori non legge woff2 né font variabili.
// Percorso dalla radice del progetto: il bundle sposta il modulo.
const font = readFile(join(process.cwd(), "src/assets/fonts/Archivo-ExtraBold.ttf"));

const L = 1200;
const H = 630;
// Le forme vivono nella fascia alta: il titolo in basso resta sempre leggibile.
const FASCIA = 300;
const BASE = L / 2;
const FONDO: Colore = "blu";

type Nodo = { type: string; props: Record<string, unknown> };
const el = (type: string, style: Record<string, unknown>, children?: unknown): Nodo => ({
  type,
  props: { style: { display: "flex", ...style }, children },
});

export async function copertinaPng(opts: { titolo: string; cifra?: string; seme: string }): Promise<Buffer> {
  const ink = inchiostro(FONDO);
  const cifraPt = opts.cifra ? Math.min(400, Math.floor(560 / ([...opts.cifra].length * 0.62))) : 0;
  // Le forme stanno a sinistra della cifra (larghezza stimata come sopra), mai sui glifi.
  const libero = opts.cifra ? L - 80 - cifraPt * 0.62 * [...opts.cifra].length : L;
  const forme = formePer(opts.seme, Boolean(opts.cifra)).map((f) => {
    const colore = COLORI[f.colore === FONDO ? ink : f.colore];
    // Misure sulla mezza larghezza, come nel feed le forme sono una parte della composizione, non decorazioni.
    const w = (f.d / 100) * BASE * (f.tipo === "barra" ? 2 : 1);
    const h = (f.d / 100) * BASE * (f.tipo === "barra" ? 0.2 : 1);
    return el("div", {
      position: "absolute",
      left: Math.min((f.x / 100) * libero - w / 2, libero - w),
      top: (f.y / 100) * FASCIA - h / 2,
      width: w,
      height: h,
      background: colore,
      borderRadius: f.tipo === "cerchio" ? 9999 : 0,
    });
  });

  // Titolo a tre taglie, al massimo 4 righe: oltre, il testo viene tagliato (il titolo completo sta nella pagina).
  const n = [...opts.titolo].length;
  const corpo = n > 90 ? 46 : n > 60 ? 56 : 68;
  const righe = n > 90 ? 4 : 3;

  const albero = el("div", { position: "relative", width: L, height: H, background: COLORI[FONDO], overflow: "hidden", fontFamily: "Archivo" }, [
    el("div", { position: "absolute", left: 0, top: 0, width: L, height: FASCIA, overflow: "hidden" }, forme),
    // La cifra esce dal bordo alto di proposito: il glifo (da 0,133 a 0,846 em) perde il 18% della sua altezza.
    opts.cifra &&
      el("div", { position: "absolute", right: 40, top: -Math.round((0.133 + 0.18 * 0.713) * cifraPt), height: cifraPt, fontSize: cifraPt, lineHeight: 1, letterSpacing: -cifraPt / 20, color: COLORI.ocra }, opts.cifra),
    el("div", { position: "absolute", left: 64, bottom: 110, width: 820, maxHeight: righe * corpo * 1.05, overflow: "hidden", flexDirection: "column", justifyContent: "flex-end", fontSize: corpo, lineHeight: 1.05, letterSpacing: -2, color: COLORI.carta }, opts.titolo),
    el("div", { position: "absolute", left: 64, bottom: 44, fontSize: 28, letterSpacing: 3, color: COLORI.carta }, "LUCA BARONCINI"),
  ].filter(Boolean));

  const svg = await satori(albero as never, {
    width: L,
    height: H,
    fonts: [{ name: "Archivo", data: await font, weight: 800, style: "normal" }],
  });
  return Buffer.from(new Resvg(svg, { fitTo: { mode: "width", value: L } }).render().asPng());
}
