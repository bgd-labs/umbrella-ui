import { Reserve, StataToken, UnderlyingToken } from "@/types/token";

export const isReserve = (data: Reserve | StataToken | UnderlyingToken): data is Reserve => {
  return data.type === "a";
};
