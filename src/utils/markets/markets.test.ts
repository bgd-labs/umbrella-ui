import { describe, expect, it } from "vitest";
import { findMarketByChainId, findMarketById } from "./markets";

describe("markets utils", () => {
  describe("findMarketByChainId", () => {
    it("should find market by chainId", () => {
      const market = findMarketByChainId(1);
      expect(market).toBeDefined();
      expect(market?.chainId).toBe(1);
      expect(market?.name).toBe("Ethereum");
    });

    it("should return undefined for non-existent chainId", () => {
      const market = findMarketByChainId(999);
      expect(market).toBeUndefined();
    });
  });

  describe("findMarketById", () => {
    it("should find market by id", () => {
      const market = findMarketById("84532-0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27");
      expect(market).toBeDefined();
      expect(market?.id).toBe("84532-0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27");
      expect(market?.name).toBe("Base Sepolia");
    });

    it("should return undefined for non-existent id", () => {
      const market = findMarketById("999");
      expect(market).toBeUndefined();
    });
  });
});
