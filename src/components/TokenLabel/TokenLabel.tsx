import React from "react";
import { TokenType } from "@/types/token";

export const mapTokenTypeToLabel = (type?: TokenType) => {
  switch (type) {
    case "a":
      return "rebasing";
    case "stata":
      return "non-rebasing";
    case "stk":
      return "staked";
    default:
      return undefined;
  }
};

const getLabel = (type: TokenType | "native") => {
  if (type === "a") {
    return "Rebasing";
  }
  if (type === "stata") {
    return "Non-rebasing";
  }
  return "Staked";
};

export type TokenLabelProps = {
  type?: TokenType | "native";
};

export const TokenLabel = ({ type }: TokenLabelProps) => {
  if (!type || type === "underlying" || type === "native") {
    return null;
  }

  return <div className="text-main-500 text-sm leading-4">{getLabel(type)}</div>;
};
