import { z, ZodType } from "zod";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";
import { SignableTxForm } from "@/types/form";

export type StakeNativeTokenFormValues = SignableTxForm & {
  wrappedAmount: bigint;
};

export const createStakeNativeTokenFormSchema = ({
  maxAmount,
  isSafeWallet,
}: {
  maxAmount: bigint;
  isSafeWallet: boolean;
}): ZodType<StakeNativeTokenFormValues> => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      wrappedAmount: isSafeWallet ? z.coerce.bigint() : z.coerce.bigint().positive().max(maxAmount),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }
    });
};
