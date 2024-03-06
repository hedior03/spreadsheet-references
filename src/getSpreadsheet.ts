export const getSpreadsheet = async (filename: string): Promise<string[][]> => {
  const text = await Deno.readTextFile(filename);
  return text.split("\n").map((col) => col.split(/,\s+/));
};
