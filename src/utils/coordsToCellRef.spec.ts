import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { coordsToCellRef } from "./coordsToCellRef.ts";

Deno.test("a1", () => {
  // assertEquals(cellToCoords("a1"), [0, 0]);
  assertEquals(coordsToCellRef([0, 0]), "A1");
});

Deno.test("b2", () => {
  assertEquals(coordsToCellRef([1, 1]), "B2");
});

Deno.test("aa109", () => {
  assertEquals(coordsToCellRef([26, 108]), "AA109");
});

Deno.test("Invalid: a-1", () => {
  assertEquals(coordsToCellRef([]), "");
});
