import { assertEquals } from "https://deno.land/std@0.218.2/assert/mod.ts";
import { evaluatePostfix } from "./evaluatePostfix.ts";

Deno.test("Basic Operation", () => {
  assertEquals(evaluatePostfix("1 3 +", ""), 4);
});

Deno.test("Double operation", () => {
  assertEquals(evaluatePostfix("1 2 + 3 +", ""), 6);
});

Deno.test("Double operation in different order", () => {
  assertEquals(evaluatePostfix("1 2 3 + +", ""), 6);
});

Deno.test("Multiple operations", () => {
  assertEquals(evaluatePostfix("4 5 + 7 2 - *", ""), 45);
});

Deno.test("Multiple operations, 5 operands", () => {
  assertEquals(evaluatePostfix("4 2 3 5 1 - + * +", ""), 18);
});

Deno.test("ERROR: Division by Zero", () => {
  assertEquals(evaluatePostfix("10 0 /", ""), "#ERR");
});

Deno.test("ERROR: Invalid expression, 3 numbers", () => {
  assertEquals(evaluatePostfix("10 0 2", ""), "#ERR");
});

Deno.test("ERROR: Invalid expression, only an operator", () => {
  assertEquals(evaluatePostfix("+", ""), "#ERR");
});

Deno.test("ERROR: Invalid expression, multiple operator", () => {
  assertEquals(evaluatePostfix("+ - /", ""), "#ERR");
});

Deno.test("Reference: Simple", () => {
  assertEquals(
    evaluatePostfix("a1 1 +", "", new Set<string>(), [["1"]]),
    2,
  );
});

Deno.test("Reference: 2 references", () => {
  assertEquals(
    evaluatePostfix("a1 b1 +", "c1", new Set<string>(), [["1", "2"]]),
    3,
  );
});
