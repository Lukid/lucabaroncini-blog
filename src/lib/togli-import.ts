// Toglie solo il blocco di import in testa al corpo MDX (anche su più righe, anche CRLF).
// Le righe "import" più avanti (es. dentro un blocco di codice) restano.
export function togliImport(body: string): string {
  const righe = body.replace(/\r\n/g, "\n").split("\n");
  let i = 0;
  while (i < righe.length) {
    if (righe[i].trim() === "") {
      i++;
    } else if (/^import\b/.test(righe[i])) {
      // l'istruzione finisce alla riga con la stringa del modulo (from "x" o import "x") o con il ";",
      // qualunque cosa segua (commento, clausola with {…})
      while (i < righe.length && !/(\bfrom\s*|^import\s*)["'][^"']*["']|;/.test(righe[i])) i++;
      i++;
    } else break;
  }
  return righe.slice(i).join("\n");
}
