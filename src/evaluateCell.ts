import { evaluatePostfix } from "./evaluatePostfix.ts";
import { isNumeric } from "./isNumeric.ts";

const computedCells = new Map<string, number>();

export const evaluateCell = (
  cellValue: string | number,
  currentCellRef: string,
  visitedNodes: Set<string> = new Set(),
  table: (string | number)[][] = [[""]],
) => {
  if (visitedNodes.has(currentCellRef)) {
    // Circular dependency
    console.log("Circular dependency, visited", visitedNodes);
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

    if (currentCellRef === "B1") console.log(computedCells);
    if (currentCellRef === "B1") console.log(cellValue);
    computedCells.set(currentCellRef, numericValue);
    if (currentCellRef === "B1") console.log(computedCells);

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
  } else {
    // shouldn't get here
    console.error(currentCellRef, evaluatedExpression);
  }
};
