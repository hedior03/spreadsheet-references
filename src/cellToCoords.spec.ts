import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { cellToCoords } from "./cellToCoords.ts";

Deno.test("a1", () => {
  assertEquals(cellToCoords("a1"), [0, 0]);
});

Deno.test("b2", () => {
  assertEquals(cellToCoords("b2"), [1, 1]);
});

Deno.test("aa109", () => {
  assertEquals(cellToCoords("aa109"), [26, 108]);
});

Deno.test("aa109 uppercase", () => {
  assertEquals(cellToCoords("AA109"), [26, 108]);
});

Deno.test("a-1", () => {
  assertEquals(cellToCoords("a-1"), []);
});
