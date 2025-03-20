import { RefinementCtx, z } from "zod";
import { Address, isAddress, isHash } from "viem";
import { Permit } from "@/types/permit";
import { Approval } from "@/types/approval";

export const AddressSchema = z.custom<Address>((val) => {
  return typeof val === "string" ? isAddress(val) : false;
});

export const HashSchema = z.custom<Address>((val) => {
  return typeof val === "string" ? isHash(val) : false;
});

export const ApprovalSchema = z.object({
  txHash: HashSchema.optional(),
  allowance: z.bigint(),
});

export const PermitSchema = z.object({
  token: AddressSchema,
  owner: AddressSchema,
  spender: AddressSchema,
  value: z.bigint(),
  deadline: z.bigint(),
  nonce: z.bigint(),
  v: z.number(),
  r: HashSchema,
  s: HashSchema,
});

export const validatePermitAndApproval = (
  val: { amount: bigint; permit?: Permit; approval?: Approval },
  ctx: RefinementCtx,
) => {
  if (!val.permit && !val.approval) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Either permit of approval should be granted",
      path: ["permit", "approval"],
      fatal: true,
    });

    return z.NEVER;
  }

  if (val.permit && val.permit.value !== val.amount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["permit"],
      message: "Signed permit does not cover current amount",
    });
  }

  if (val.approval && val.approval.allowance < val.amount) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["approval"],
      message: "Current allowance is less than amount",
    });
  }
};
