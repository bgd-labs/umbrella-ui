//  P⋅(1 + r * t)
export const calculateLinearInterest = (initialBalance: number, apy: number, months: number) => {
  return initialBalance * (1 + (apy / 100) * (months / 12));
};
