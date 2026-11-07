import { test } from "node:test";
import assert from "node:assert/strict";
import { togliImport } from "./togli-import.ts";

test("toglie gli import singoli in testa", () => {
  assert.equal(togliImport('import a from "a";\nimport b from "b"\n\nTesto'), "Testo");
});

test("toglie un import su più righe in testa", () => {
  assert.equal(togliImport('import {\n  a,\n  b,\n} from "x";\n\nTesto'), "Testo");
});

test("tiene l'import dentro un blocco di codice", () => {
  const corpo = 'import a from "a";\n\nEcco:\n\n```ts\nimport x from "y";\n```';
  assert.equal(togliImport(corpo), 'Ecco:\n\n```ts\nimport x from "y";\n```');
});

test("gestisce CRLF", () => {
  assert.equal(togliImport('import a from "a";\r\n\r\nTesto\r\nriga'), "Testo\nriga");
});

test("un commento dopo l'import non si mangia il corpo", () => {
  assert.equal(togliImport('import a from "a"; // nota\nimport b from "b" with { type: "json" }\n\nTesto\naltro'), "Testo\naltro");
});
