import { coordsToCellRef } from "./utils/coordsToCellRef.ts";
import { evaluateCell } from "./evaluateCell.ts";
import { getSpreadsheet } from "./getSpreadsheet.ts";

export const prettyPrintSpreadsheet = (
  spreadsheet: (string | number)[][],
): void => {
  const output = spreadsheet.map((row) => (
    row.join(",\t")
  )).join("\n");

  console.log(output.trim());
};

export const main = async (filename: string) => {
  const spreadsheet = await getSpreadsheet(filename);

  const valuesTable = spreadsheet.map((row, rowIndex): (string | number)[] => {
    return row.map(
      (cellValue: string | number, columnIndex): string | number => {
        const currentCellRef = coordsToCellRef([columnIndex, rowIndex]);
        const result = evaluateCell(
          cellValue,
          currentCellRef,
          new Set<string>(),
          spreadsheet,
        ) ?? "#ERR";

        return result;
      },
    );
  });

  prettyPrintSpreadsheet(valuesTable);
};
