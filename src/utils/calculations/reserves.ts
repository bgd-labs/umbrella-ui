import { parseUnits } from "viem";
import { StkToken } from "@/types/token";

export const calculateMaxSupply = (stkToken: StkToken, totalSupplied?: bigint) => {
  const { reserve, underlying } = stkToken;
  const { balance = 0n } = underlying;

  if (!reserve) {
    return balance;
  }

  const { decimals, supplyCap, accruedToTreasury } = reserve;

  if (supplyCap === 0n || !totalSupplied) {
    return balance;
  }

  const scaledSupplyCap = parseUnits(String(supplyCap), decimals);
  const totalSupplyWithAccrued = totalSupplied + accruedToTreasury;
  const availableSupply =
    scaledSupplyCap > totalSupplyWithAccrued ? scaledSupplyCap - totalSupplyWithAccrued : 0n;

  return availableSupply >= balance ? balance : availableSupply;
};
