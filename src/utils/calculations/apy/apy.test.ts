import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { describe, expect, it } from "vitest";
import { calculateRewardsApy } from "./apy";

describe("calculateEmissionPerYear", () => {
  const SCALING_FACTOR = 18;
  const BASE_10 = 10n ** BigInt(SCALING_FACTOR);
  const PRICE_BASE = 10n ** BigInt(PRICE_FEED_DECIMALS);

  it("should return 0 when total assets is 0", () => {
    const result = calculateRewardsApy({
      totalAssets: 0n,
      usdPrice: 1000n * PRICE_BASE,
      decimals: 6,
      reward: {
        usdPrice: 1n * PRICE_BASE,
        currentEmissionPerSecondScaled: 1n * BASE_10,
      },
    });
    expect(result).toBe(0);
  });

  it("should return 0 when emission is 0", () => {
    const result = calculateRewardsApy({
      totalAssets: 572640140n,
      usdPrice: 100216836n,
      decimals: 6,
      reward: {
        usdPrice: 100001778n,
        currentEmissionPerSecondScaled: 0n,
      },
    });
    expect(result).toBe(0);
  });

  it("should calculate APY correctly", () => {
    // - Total assets of 572.640140 tokens with 6 decimals (572640140n)
    // - Asset price of ~$1.00 (100216836n with 8 decimals = 1.00216836)
    // - Reward token price of ~$1.00 (100001778n with 8 decimals = 1.00001778)
    // - Emission rate of 0.000003664875909329 tokens per second (3664875909329n with 18 decimals)
    const result = calculateRewardsApy({
      totalAssets: 572640140n, // 572.640140 * 10^6
      usdPrice: 100216836n, // 1.00216836 USD
      decimals: 6,
      reward: {
        usdPrice: 100001778n, // 1.00001778 USD
        currentEmissionPerSecondScaled: 3664875909329n, // 0.000003664875909329 tokens/sec
      },
    });

    // Expected result is ~20.14% APY
    expect(result.toFixed(6)).toBe("20.139613");
  });

  it("should handle large numbers with different decimals correctly", () => {
    const result = calculateRewardsApy({
      totalAssets: 94400000000000000n, // 0.0944 tokens with 18 decimals
      usdPrice: 188868811800n, // ~$1888.69 USD with 8 decimals
      decimals: 18,
      reward: {
        usdPrice: 206661019818n, // ~$2066.61 USD with 8 decimals
        currentEmissionPerSecondScaled: 283198663n, // ~0.000000283 tokens/sec with 18 decimals
      },
    });

    // Expected result is ~10.35% APY
    expect(result.toFixed(6)).toBe("10.351997");
  });
});
