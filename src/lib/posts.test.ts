import { test } from "node:test";
import assert from "node:assert/strict";
import { pubblicato, ordinaPerData } from "./posts.ts";

test("in produzione la bozza non è pubblicata", () => {
  assert.equal(pubblicato({ draft: true }, true), false);
  assert.equal(pubblicato({ draft: false }, true), true);
});
test("in sviluppo la bozza è visibile", () => {
  assert.equal(pubblicato({ draft: true }, false), true);
});
test("ordina dal più recente", () => {
  const a = { data: { pubDate: new Date("2026-01-01") } };
  const b = { data: { pubDate: new Date("2026-11-04") } };
  assert.deepEqual(ordinaPerData([a, b]), [b, a]);
});
