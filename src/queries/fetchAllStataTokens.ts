import { ChainId } from "@/types/market";
import { Address, erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { Token, TokenPrice } from "@/types/token";
import { STATA_ABI } from "@/abis/stata";
import { formatBigInt } from "@/utils/formatBigInt";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { formatUSDPrice } from "@/utils/formatUSDPrice";

export const fetchAllStataTokens = ({
  chainId,
  owner,
  addresses,
}: {
  chainId: ChainId;
  owner?: Address;
  addresses: Address[];
}) => {
  return Promise.all(
    addresses.map(async (address) => {
      const commonParams = {
        chainId,
        address,
        abi: erc20Abi,
      };

      const name$ = readContract(config, {
        ...commonParams,
        functionName: "name",
      });
      const decimals$ = readContract(config, {
        ...commonParams,
        functionName: "decimals",
      });
      const symbol$ = readContract(config, {
        ...commonParams,
        functionName: "symbol",
      });
      const latestAnswer$ = readContract(config, {
        ...commonParams,
        abi: STATA_ABI,
        functionName: "latestAnswer",
      });
      const balance$ =
        owner &&
        readContract(config, {
          ...commonParams,
          functionName: "balanceOf",
          args: [owner],
        });

      const [name, decimals, symbol, latestAnswer, balance] = await Promise.all([
        name$,
        decimals$,
        symbol$,
        latestAnswer$,
        balance$,
      ]);

      return {
        address,
        type: "stata",
        name,
        balance,
        balanceFormatted: formatBigInt(balance, decimals),
        latestAnswer,
        latestAnswerFormatted: formatBigInt(latestAnswer, PRICE_FEED_DECIMALS),
        usdAmount: formatUSDPrice({ balance, decimals, usdPrice: latestAnswer }),
        decimals,
        symbol,
      } satisfies Token & TokenPrice;
    }),
  );
};
