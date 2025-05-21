import { config } from "@/configs/wagmi";
import { ChainId } from "@/types/market";
import { ClaimRewardsPermit } from "@/types/permit";
import { addDays, toUnix } from "@/utils/date";
import { ensureCorrectChainForTx } from "@/utils/web3";
import { IUmbrellaRewardsController_ABI } from "@bgd-labs/aave-address-book/abis";
import { readContract, signTypedData } from "@wagmi/core";
import { Address, parseSignature } from "viem";

export const signRewardsClaiming = async ({
  owner,
  address,
  batchHelper,
  asset,
  rewards,
  chainId,
}: {
  owner: Address;
  address: Address;
  batchHelper: Address;
  asset: Address;
  rewards: Address[];
  chainId: ChainId;
}) => {
  const inOneDay = addDays(new Date(), 1);
  const deadline = BigInt(toUnix(inOneDay));
  const [[, name, version], nonce] = await Promise.all([
    readContract(config, {
      chainId,
      address,
      abi: IUmbrellaRewardsController_ABI,
      functionName: "eip712Domain",
    }),
    readContract(config, {
      chainId,
      address,
      abi: IUmbrellaRewardsController_ABI,
      functionName: "nonces",
      args: [owner],
    }),
  ]);

  const domain = {
    name,
    version,
    chainId,
    verifyingContract: address,
  };

  const types = {
    ClaimSelectedRewards: [
      { name: "asset", type: "address" },
      { name: "rewards", type: "address[]" },
      { name: "user", type: "address" },
      { name: "receiver", type: "address" },
      { name: "caller", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
    ],
  };

  const message = {
    asset,
    rewards,
    user: owner,
    receiver: owner,
    caller: batchHelper,
    nonce,
    deadline,
  };

  await ensureCorrectChainForTx(chainId);
  const signature = await signTypedData(config, {
    domain,
    types,
    primaryType: "ClaimSelectedRewards",
    message,
  });

  const { r, s, v } = parseSignature(signature);

  return {
    stakeToken: asset,
    receiver: owner,
    restake: false,
    rewards,
    deadline,
    nonce,
    v: Number(v),
    r,
    s,
  } satisfies ClaimRewardsPermit;
};
