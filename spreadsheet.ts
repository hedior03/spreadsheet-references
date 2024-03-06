import { coordsToCellRef } from "./src/coordsToCellRef.ts";
import { evaluateCell } from "./src/evaluateCell.ts";

const file = Deno.args[0];

const getSpreadsheet = async (filename: string): Promise<string[][]> => {
  const text = await Deno.readTextFile(filename);
  return text.split("\n").map((col) => col.split(/,\s+/));
};

const main = async () => {
  const spreadsheet = await getSpreadsheet(file);

  const valuesTable = spreadsheet.map((row, rowIndex): (string | number)[] => {
    return row.map(
      (cellValue: string | number, columnIndex): string | number => {
        // return evaluatePostfix(cell, spreadsheet);
        const currentCellRef = coordsToCellRef([columnIndex, rowIndex]);
        const result = evaluateCell(
          cellValue,
          currentCellRef,
          new Set<string>(),
          spreadsheet,
        ) ?? "#ERR";

        console.log("Cell:", currentCellRef, "value:", result);
        console.log("----------------");

        return result;
      },
    );
  });

  console.log(spreadsheet);
  console.log(valuesTable);
};

main();
