export const isNumeric = (value: string): boolean => {
  return /^[\+\-]?\d+\.?\d*$/.test(value);
};
