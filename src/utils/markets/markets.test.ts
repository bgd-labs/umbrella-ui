import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

describe("markets utils", () => {
  let originalEnv: string | undefined;

  beforeEach(() => {
    originalEnv = process.env.NEXT_PUBLIC_TESTNETS_ENABLED;
    vi.resetModules();
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_TESTNETS_ENABLED = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_TESTNETS_ENABLED;
    }
    vi.resetModules();
  });

  describe("findMarketByChainId", () => {
    it("should find market by chainId", async () => {
      const { findMarketByChainId } = await import("./markets");
      const market = findMarketByChainId(1);
      expect(market).toBeDefined();
      expect(market?.chainId).toBe(1);
      expect(market?.name).toBe("Ethereum");
    });

    it("should return undefined for non-existent chainId", async () => {
      const { findMarketByChainId } = await import("./markets");
      const market = findMarketByChainId(999);
      expect(market).toBeUndefined();
    });

    it("should find Base Sepolia when testnets are enabled", async () => {
      process.env.NEXT_PUBLIC_TESTNETS_ENABLED = "true";
      const { findMarketByChainId } = await import("./markets");
      const market = findMarketByChainId(84532);
      expect(market).toBeDefined();
      expect(market?.chainId).toBe(84532);
      expect(market?.name).toBe("Base Sepolia");
    });

    it("should not find Base Sepolia when testnets are disabled", async () => {
      process.env.NEXT_PUBLIC_TESTNETS_ENABLED = "false";
      const { findMarketByChainId } = await import("./markets");
      const market = findMarketByChainId(84532);
      expect(market).toBeUndefined();
    });
  });

  describe("findMarketById", () => {
    it("should find Base Sepolia market by id when testnets are enabled", async () => {
      process.env.NEXT_PUBLIC_TESTNETS_ENABLED = "true";
      const { findMarketById } = await import("./markets");
      const market = findMarketById("84532-0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27");
      expect(market).toBeDefined();
      expect(market?.id).toBe("84532-0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27");
      expect(market?.name).toBe("Base Sepolia");
    });

    it("should not find Base Sepolia market by id when testnets are disabled", async () => {
      process.env.NEXT_PUBLIC_TESTNETS_ENABLED = "false";
      const { findMarketById } = await import("./markets");
      const market = findMarketById("84532-0x8bAB6d1b75f19e9eD9fCe8b9BD338844fF79aE27");
      expect(market).toBeUndefined();
    });

    it("should return undefined for non-existent id", async () => {
      const { findMarketById } = await import("./markets");
      const market = findMarketById("999");
      expect(market).toBeUndefined();
    });
  });
});
