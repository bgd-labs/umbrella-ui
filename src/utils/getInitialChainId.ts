"use client";

import { mainnet } from "viem/chains";
import { MarketState } from "@/store/market";
import { isServer } from "@tanstack/react-query";

export const getInitialChainId = () => {
  // TODO Fix me
  if (isServer) {
    return mainnet.id;
  }

  const rowData = localStorage.getItem("store:market");

  if (!rowData) {
    return mainnet.id;
  }

  try {
    const parsedData = JSON.parse(rowData) as { state: Pick<MarketState, "market"> };
    const chainId = parsedData.state?.market?.chainId;
    return chainId ?? mainnet.id;
  } catch (e) {
    return mainnet.id;
  }
};
