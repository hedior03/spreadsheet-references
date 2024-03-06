import { isNumeric } from "./isNumeric.ts";
import { isCellRef } from "./isCellRef.ts";
import { cellToCoords } from "./cellToCoords.ts";
import { evaluateCell } from "./evaluateCell.ts";

export const ERROR_CELL = "#ERR";

export const evaluatePostfix = (
  expression: string | number,
  currentCellRef: string,
  visitedNodes: Set<string> = new Set(),
  table: (string | number)[][] = [[""]],
): number | string => {
  const stack: (number)[] = [];

  if (typeof expression === "number") return expression;

  const tokensArray = expression.split(/\s+/);

  tokensArray
    .map((token) => token.toLocaleUpperCase())
    .forEach((token) => {
      // console.log("Current stack", stack);
      if (isNumeric(token)) {
        stack.push(Number.parseFloat(token));
      } else if (typeof token === "string" && isCellRef(token)) {
        const [columnIndex, rowIndex] = cellToCoords(token);

        console.log(columnIndex, rowIndex);

        const referencedValue = table[rowIndex][columnIndex];

        console.log(
          `Reference: ${token} -> ${referencedValue}, type: ${typeof referencedValue}`,
        );

        // now I have to call the cell solver but it shouldn't be in the entrypoint file
        const evaluatedReference = evaluateCell(
          referencedValue,
          token,
          visitedNodes,
          table,
        );

        console.log(evaluatedReference);
        if (evaluatedReference === undefined || evaluatedReference === "#ERR") {
          return ERROR_CELL;
        }

        console.log("stacking", stack);
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
          default:
            // This should be an expression
            console.log(`Expression: ${token}`);
            evaluateCell(token, currentCellRef, visitedNodes, table);
        }
      }
    });

  // console.log(`result stack: ${stack}`);

  if (stack.length !== 1) {
    return ERROR_CELL;
  }

  console.log("Ref", currentCellRef, "RESULT:", stack[0]);
  return stack[0];
};
