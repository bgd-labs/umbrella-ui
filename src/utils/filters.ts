export const withPositiveBalance = ({ balance }: { balance?: bigint }) => {
  return balance && balance > 0n;
};
