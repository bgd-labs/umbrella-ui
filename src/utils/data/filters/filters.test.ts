import { Reward } from "@/types/token";
import { withAtLeastOneActiveReward, withPositiveBalance } from "./filters";

describe("filters", () => {
  describe("withPositiveBalance", () => {
    it("should return true for positive balance", () => {
      expect(withPositiveBalance({ balance: 100n })).toBe(true);
    });

    it("should return false for zero balance", () => {
      expect(withPositiveBalance({ balance: 0n })).toBe(false);
    });

    it("should return false for undefined balance", () => {
      expect(withPositiveBalance({ balance: undefined })).toBe(false);
    });

    it("should return false for negative balance", () => {
      expect(withPositiveBalance({ balance: -100n })).toBe(false);
    });
  });

  describe("withAtLeastOneActiveReward", () => {
    it("should return true when there is at least one active reward", () => {
      const rewards: Reward[] = [
        {
          address: "0x123",
          type: "underlying",
          name: "Test Token",
          decimals: 18,
          symbol: "TEST",
          latestAnswer: 100n,
          latestAnswerFormatted: 100,
          apy: 5,
        },
      ];
      expect(withAtLeastOneActiveReward({ rewards })).toBe(true);
    });

    it("should return false when there are no rewards", () => {
      expect(withAtLeastOneActiveReward({ rewards: [] })).toBe(false);
    });

    it("should return false when all rewards have zero emission", () => {
      const rewards: Reward[] = [
        {
          address: "0x123",
          type: "underlying",
          name: "Test Token",
          decimals: 18,
          symbol: "TEST",
          latestAnswer: 100n,
          latestAnswerFormatted: 100,
          apy: 0,
        },
      ];
      expect(withAtLeastOneActiveReward({ rewards })).toBe(false);
    });

    it("should return true when at least one reward has positive emission", () => {
      const rewards: Reward[] = [
        {
          address: "0x123",
          type: "underlying",
          name: "Test Token",
          decimals: 18,
          symbol: "TEST",
          currentEmissionPerSecondScaled: 0n,
          latestAnswer: 100n,
          latestAnswerFormatted: 100,
          apy: 5,
        },
        {
          address: "0x456",
          type: "underlying",
          name: "Test Token 2",
          decimals: 18,
          symbol: "TEST2",
          currentEmissionPerSecondScaled: 100n,
          latestAnswer: 100n,
          latestAnswerFormatted: 100,
          apy: 5,
        },
      ];
      expect(withAtLeastOneActiveReward({ rewards })).toBe(true);
    });
  });
});
