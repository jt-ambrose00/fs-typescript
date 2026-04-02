export const convertToNumber = (arg: string): number => {
  const num = Number(arg);
  if (isNaN(num)) {
    throw new Error('Provided arguments were not numbers.');
  }
  return num;
};
