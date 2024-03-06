import { isCellRef } from "./isCellRef.ts";

export const cellToCoords = (cellReference: string): number[] => {
  if (isCellRef(cellReference)) {
    const match = cellReference.match(/^([a-z]+)([1-9]\d*)$/i);

    if (!match) return [];

    const [_, lettersColumns, numberRows] = match;

    const lettersArray = [...lettersColumns.toLocaleUpperCase()];

    let columnIndex = 0;
    lettersArray.reverse().forEach((letter, idx) => {
      columnIndex += idx * 26 + letter.charCodeAt(0) - "A".charCodeAt(0);
    });

    const rowIndex = Number.parseInt(numberRows) - 1;

    return [columnIndex, rowIndex];
  }

  return [];
};
