import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { isNumeric } from "./isNumeric.ts";

Deno.test("simple number", () => {
  assertEquals(isNumeric("3"), true);
});

Deno.test("float", () => {
  assertEquals(isNumeric("3.12234134"), true);
});

Deno.test("exp 1", () => {
  assertEquals(isNumeric("1e1"), true);
});
Deno.test("exp 2", () => {
  assertEquals(isNumeric("-3.5e10"), true);
});
Deno.test("exp 3", () => {
  assertEquals(isNumeric("3.5e+10"), true);
});
Deno.test("exp 4", () => {
  assertEquals(isNumeric("+3.5e+10"), true);
});
Deno.test("exp 5", () => {
  assertEquals(isNumeric("3.5e-10"), true);
});
Deno.test("exp 6", () => {
  assertEquals(isNumeric("-3.5e-10"), true);
});
Deno.test("invalid exp", () => {
  assertEquals(isNumeric("-3.5e"), false);
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
