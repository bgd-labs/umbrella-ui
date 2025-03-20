import { WithdrawalMethod } from "@/types/withdraw";

export const WITHDRAWAL_METHODS: WithdrawalMethod[] = [
  "withdrawToAave",
  "withdrawToStata",
  "withdrawToUnderlying",
] as const;
