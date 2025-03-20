import { ChainId } from "@/types/market";
import { Address, erc20Abi } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { Token } from "@/types/token";
import { formatBigInt } from "@/utils/formatBigInt";

export const fetchAllTokensInfo = ({
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
      const balance$ =
        owner &&
        readContract(config, {
          ...commonParams,
          functionName: "balanceOf",
          args: [owner],
        });

      const [name, decimals, symbol, balance] = await Promise.all([
        name$,
        decimals$,
        symbol$,
        balance$,
      ]);

      return {
        address,
        name,
        balance,
        balanceFormatted: formatBigInt(balance, decimals),
        decimals,
        symbol,
      } satisfies Omit<Token, "type">;
    }),
  );
};
