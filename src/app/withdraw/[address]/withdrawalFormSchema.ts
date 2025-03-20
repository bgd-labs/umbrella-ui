import { WithdrawalMethod } from "@/types/withdraw";
import { z, ZodType } from "zod";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";
import { SignableTxForm } from "@/types/form";

export type WithdrawalFormValues = SignableTxForm & {
  withdrawalMethod: WithdrawalMethod;
};

export const createWithdrawalFormSchema = ({
  maxAmount,
  isSafeWallet,
}: {
  maxAmount: bigint;
  isSafeWallet: boolean;
}): ZodType<WithdrawalFormValues> => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      withdrawalMethod: z.enum(["withdrawToAave", "withdrawToStata", "withdrawToUnderlying"]),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }
    });
};
