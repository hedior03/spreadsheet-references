export const coordsToCellRef = (coords: number[]): string => {
  if (coords.length !== 2) return "";

  const columnsIndex = coords[0];
  let columnLettersArray: string[] = [];

  let columnIndexRemaining = columnsIndex + 1;
  while (columnIndexRemaining > 0) {
    const mod = (columnIndexRemaining - 1) % 26;

    const letter = String.fromCharCode("A".charCodeAt(0) + mod);
    columnLettersArray = [letter, ...columnLettersArray];

    columnIndexRemaining = Math.floor((columnIndexRemaining - mod) / 26);
  }

  return `${columnLettersArray.join("")}${coords[1] + 1}`;
};
