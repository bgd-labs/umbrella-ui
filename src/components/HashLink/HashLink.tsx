import { cn } from "@/utils/cn";
import { textCenterEllipsis } from "@/utils/formatting";
import Link from "next/link";
import { ComponentProps } from "react";
import { useAccount } from "wagmi";

export type HashLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  txHashAddress: string;
};

export const HashLink = ({ txHashAddress, target = "_blank", className, ...props }: HashLinkProps) => {
  const { chain } = useAccount();

  if (!chain) {
    return null;
  }

  return (
    <Link
      {...props}
      target={target}
      href={`${chain.blockExplorers?.default.url}/tx/${txHashAddress}`}
      className={cn("cursor-pointer underline underline-offset-2 hover:text-blue-500", className)}
    >
      {textCenterEllipsis(txHashAddress, 4, 4)}
    </Link>
  );
};
