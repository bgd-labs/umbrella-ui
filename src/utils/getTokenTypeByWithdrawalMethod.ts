import { WithdrawalMethod } from "@/types/withdraw";
import { TokenType } from "@/types/token";

export const getTokenTypeByWithdrawalMethod = (withdrawalMethod?: WithdrawalMethod): TokenType => {
  switch (withdrawalMethod) {
    case "withdrawToStata":
      return "stata";
    case "withdrawToAave":
      return "a";
    default:
      return "underlying";
  }
};
