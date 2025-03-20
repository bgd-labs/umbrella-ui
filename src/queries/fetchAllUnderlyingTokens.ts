import { fetchAllTokensInfo } from "@/queries/fetchAllTokensInfo";
import { ChainId } from "@/types/market";
import { Address } from "viem";
import { readContract } from "@wagmi/core";
import { config } from "@/configs/wagmi";
import { ORACLE_ABI } from "@/abis/oracle";
import { formatUSDPrice } from "@/utils/formatUSDPrice";
import { formatBigInt } from "@/utils/formatBigInt";
import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { Token, TokenPrice } from "@/types/token";

const fetchLatestAnswers = ({
  chainId,
  oracle,
  addresses,
}: {
  chainId: ChainId;
  oracle: Address;
  addresses: Address[];
}) => {
  return readContract(config, {
    chainId,
    address: oracle,
    abi: ORACLE_ABI,
    functionName: "getAssetsPrices",
    args: [addresses],
  });
};

export const fetchAllUnderlyingTokens = async ({
  chainId,
  owner,
  oracle,
  addresses,
}: {
  chainId: ChainId;
  owner?: Address;
  oracle: Address;
  addresses: Address[];
}) => {
  const tokens$ = fetchAllTokensInfo({ chainId, owner, addresses });
  const latestAnswers$ = fetchLatestAnswers({ chainId, oracle, addresses });

  const [tokens, latestAnswers] = await Promise.all([tokens$, latestAnswers$]);

  return tokens.map((token, index) => {
    const latestAnswer = latestAnswers[index];
    return {
      ...token,
      type: "underlying",
      latestAnswer,
      latestAnswerFormatted: formatBigInt(latestAnswer, PRICE_FEED_DECIMALS),
      usdAmount: formatUSDPrice({
        balance: token.balance,
        decimals: token.decimals,
        usdPrice: latestAnswer,
      }),
    } satisfies Token & TokenPrice;
  });
};
