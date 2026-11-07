import { test } from "node:test";
import assert from "node:assert/strict";
import { COLORI, contrasto, inchiostro, evidenzia, formePer, coloreDi, ANCORE, ancorePer } from "./reel.ts";

test("inchiostro ha contrasto AA su ogni fondo", () => {
  for (const f of Object.keys(COLORI) as (keyof typeof COLORI)[]) {
    assert.ok(contrasto(COLORI[f], COLORI[inchiostro(f)]) >= 4.5, f);
  }
});
test("evidenzia i tratti fra asterischi", () => {
  assert.deepEqual(evidenzia("da *6,7%* a *68,3%*"), [
    { t: "da ", accento: false },
    { t: "6,7%", accento: true },
    { t: " a ", accento: false },
    { t: "68,3%", accento: true },
  ]);
  assert.deepEqual(evidenzia("niente"), [{ t: "niente", accento: false }]);
});
test("formePer è deterministica e nei limiti", () => {
  const a = formePer("harness-o-modello", true);
  assert.deepEqual(a, formePer("harness-o-modello", true));
  assert.ok(a.length >= 2 && a.length <= 3);
  for (const f of a) assert.ok(f.x >= 0 && f.x <= 100 && f.y >= 0 && f.y <= 100);
});
test("senza cifra una forma è grande", () => {
  for (const s of ["a", "b", "harness", "x1", "zz"]) {
    assert.ok(formePer(s, false).some((f) => f.d >= 40), s);
  }
});
test("la domanda è sempre blu", () => {
  assert.equal(coloreDi({ stazione: "domanda", testo: "?" }, 2), "blu");
});
test("ogni cifra ha una forma ancorata, dentro il glifo", () => {
  for (const c of "0123456789") assert.ok(ANCORE[c], c);
  for (const a of Object.values(ANCORE)) assert.ok(a.x >= 0 && a.y >= 0 && a.x + a.w <= 1 && a.y + a.h <= 1);
  for (const c of ["68", "2×", "64", "59", "2", "0", "0,039", "-0,008", "29.000"]) assert.ok(ancorePer(c).length >= 1, c);
  assert.deepEqual(ancorePer("0,039"), [0, 2]);
  // la traversa del 4 (0,545-0,692 em) contiene la barra anche con l'abbondanza di 0,01 em del disegno
  const q = ANCORE["4"];
  assert.ok(q.y - 0.01 >= 0.545 && q.y + q.h + 0.01 <= 0.692 && q.x + q.w + 0.01 <= 0.55);
});
