export const isCellRef = (value: string) => {
  return /^[a-z]+[1-9]\d*$/i.test(value);
};
