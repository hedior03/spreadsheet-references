import { isNumeric } from "./validation/isNumeric.ts";
import { isCellRef } from "./validation/isCellRef.ts";
import { cellToCoords } from "./utils/cellToCoords.ts";
import { evaluateCell } from "./evaluateCell.ts";

export const ERROR_CELL = "#ERR";

export const evaluatePostfix = (
  expression: string | number,
  visitedNodes: Set<string> = new Set(),
  table: (string | number)[][] = [[""]],
): number | string => {
  const stack: (number)[] = [];

  if (typeof expression === "number") return expression;
  if (expression === undefined) return ERROR_CELL;

  const tokensArray = expression.split(/\s+/);

  tokensArray
    .map((token) => token.toLocaleUpperCase())
    .forEach((token) => {
      if (isNumeric(token)) {
        stack.push(Number.parseFloat(token));
      } else if (typeof token === "string" && isCellRef(token)) {
        const [columnIndex, rowIndex] = cellToCoords(token);

        const referencedValue = table[rowIndex][columnIndex];

        // Simple reference to a Cell, Computed or just parse
        const evaluatedReference = evaluateCell(
          referencedValue,
          token,
          visitedNodes,
          table,
        );

        if (
          evaluatedReference === undefined || evaluatedReference === ERROR_CELL
        ) {
          return ERROR_CELL;
        }

        stack.push(evaluatedReference);
      } else {
        const right = stack.pop();
        const left = stack.pop();

        if (left === undefined || right === undefined) {
          return ERROR_CELL;
        }

        switch (token) {
          case "+":
            stack.push(left + right);
            break;
          case "-":
            stack.push(left - right);
            break;
          case "*":
            stack.push(left * right);
            break;
          case "/":
            if (right === 0) {
              // Division by zero
              return ERROR_CELL;
            }
            stack.push(left / right);
            break;
        }
      }
    });

  if (stack.length !== 1) {
    return ERROR_CELL;
  }

  return stack[0];
};
