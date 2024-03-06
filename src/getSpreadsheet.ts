export const getSpreadsheet = async (filename: string): Promise<string[][]> => {
  const text = (await Deno.readTextFile(filename)).trim();
  return text.split("\n").map((col) => col.split(/,\s+/));
};
