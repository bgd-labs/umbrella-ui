import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { describe, expect, it } from "vitest";
import { calculateRewardApy } from "./apy";

describe("calculateEmissionPerYear", () => {
  const PRICE_BASE = 10n ** BigInt(PRICE_FEED_DECIMALS);

  it("should return 0 when total assets is 0", () => {
    const result = calculateRewardApy({
      maxEmissionPerSecond: 0n,
      targetLiquidity: 0n,
      distributionEnd: 0n,
      totalAssets: 0n,
      price: 1000n * PRICE_BASE,
      priceFeedDecimals: PRICE_FEED_DECIMALS,
      decimals: 6,
      token: {
        price: 1n * PRICE_BASE,
        priceFeedDecimals: PRICE_FEED_DECIMALS,
        decimals: 18,
      },
    });
    expect(result).toBe(0);
  });
});
