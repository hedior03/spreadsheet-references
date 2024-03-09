export const isNumeric = (value: string): boolean => {
  return /^[\+\-]?\d+\.?\d*(?:e[\+\-]?\d+)?$/i.test(value);
};
