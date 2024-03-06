import { evaluatePostfix } from "./evaluatePostfix.ts";
import { isNumeric } from "./validation/isNumeric.ts";

const computedCells = new Map<string, number>();

export const evaluateCell = (
  cellValue: string | number,
  currentCellRef: string,
  visitedNodes: Set<string> = new Set(),
  table: (string | number)[][] = [[""]],
) => {
  if (visitedNodes.has(currentCellRef)) {
    // Circular dependency
    return "#ERR";
  }

  if (computedCells.has(currentCellRef)) {
    // calculated value
    return computedCells.get(currentCellRef);
  }

  // store visited node
  visitedNodes.add(currentCellRef);

  if (typeof cellValue === "number") {
    return cellValue;
  }

  // happy path
  if (isNumeric(cellValue)) {
    const numericValue = Number.parseFloat(cellValue);

    computedCells.set(currentCellRef, numericValue);

    return numericValue;
  }

  // ...... evaluate postfix...... // (*)
  const evaluatedExpression = evaluatePostfix(
    cellValue,
    currentCellRef,
    visitedNodes,
    table,
  );

  if (typeof evaluatedExpression === "number") {
    computedCells.set(currentCellRef, evaluatedExpression);
    return evaluatedExpression;
  }
};
