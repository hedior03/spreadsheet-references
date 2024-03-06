import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { isNumeric } from "./isNumeric.ts";

Deno.test("simple number", () => {
  assertEquals(isNumeric("3"), true);
});

Deno.test("float", () => {
  assertEquals(isNumeric("3.12234134"), true);
});

Deno.test("error number", () => {
  assertEquals(isNumeric("3 1"), false);
});

Deno.test("error float", () => {
  assertEquals(isNumeric("3.3.5"), false);
});

Deno.test("operator", () => {
  assertEquals(isNumeric("-"), false);
});

Deno.test("expression", () => {
  assertEquals(isNumeric("1 + 3"), false);
});
