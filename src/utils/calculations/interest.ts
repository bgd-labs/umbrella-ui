//  P⋅(1 + r * t)
export const calculateSimpleInterest = (
  initialBalance: number,
  apy: number,
  months: number,
) => {
  return initialBalance * (1 + (apy / 100) * (months / 12));
};

export const calculateAPYEarnings = (
  initialAmount: number,
  apy: number,
  years: number = 1,
) => {
  const decimalAPY = apy / 100;
  const finalAmount = initialAmount * Math.pow(1 + decimalAPY, years);
  return finalAmount - initialAmount;
};
