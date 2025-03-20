export const getReserveIdByCollateralBitMap = (bitMap: bigint) => {
  let rightMostSetBit = bitMap & -bitMap;

  let reserveId = 0;
  while ((rightMostSetBit >>= 1n) !== 0n) {
    reserveId++;
  }

  return Number(reserveId);
};
