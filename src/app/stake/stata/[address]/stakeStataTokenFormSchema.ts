import { SignableTxForm } from "@/types/form";
import { z, ZodType } from "zod";
import { ApprovalSchema, PermitSchema, validatePermitAndApproval } from "@/utils/shemas";

export type StakeStataFormValues = SignableTxForm;

export const createStakeStataFormSchema = ({
  maxAmount,
  isSafeWallet,
}: {
  maxAmount: bigint;
  isSafeWallet: boolean;
}): ZodType<StakeStataFormValues> => {
  return z
    .object({
      amount: z.coerce.bigint().positive().max(maxAmount),
      permit: PermitSchema.optional(),
      approval: ApprovalSchema.optional(),
    })
    .superRefine((val, ctx) => {
      if (!isSafeWallet) {
        validatePermitAndApproval(val, ctx);
      }
    });
};
