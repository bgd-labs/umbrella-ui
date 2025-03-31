import { config } from "@/configs/wagmi";
import { getAccount, switchChain, type Connector } from "@wagmi/core";
import { vi } from "vitest";
import { mainnet } from "wagmi/chains";
import { ensureCorrectChainForTx } from "./ensureCorrectChainForTx";

vi.mock("@wagmi/core", () => ({
  getAccount: vi.fn(),
  switchChain: vi.fn(),
}));

const getAccountMock = vi.mocked(getAccount, { partial: true });
const switchChainMock = vi.mocked(switchChain, { partial: true });

describe("ensureCorrectChainForTx", () => {
  const mockAddress = "0x1234567890123456789012345678901234567890" as const;
  const mockConnector = {
    id: "mock",
    name: "mockConnector",
  } as Connector;
  const mockChain = mainnet;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should throw error when wallet is not connected", async () => {
    getAccountMock.mockReturnValue({
      address: undefined,
      chainId: undefined,
    });

    await expect(ensureCorrectChainForTx(84532)).rejects.toThrow("Wallet not connected");
  });

  it("should not switch chain when already on correct chain", async () => {
    getAccountMock.mockReturnValue({
      address: mockAddress,
      chainId: 84532,
      connector: mockConnector,
    });

    await ensureCorrectChainForTx(84532);

    expect(switchChainMock).not.toHaveBeenCalled();
  });

  it("should switch chain when on different chain", async () => {
    getAccountMock.mockReturnValue({
      address: mockAddress,
      chainId: 42161,
      connector: mockConnector,
    });
    switchChainMock.mockResolvedValue(mockChain);

    await ensureCorrectChainForTx(1);

    expect(switchChainMock).toHaveBeenCalledWith(config, { chainId: 1 });
  });

  it("should handle chain switch error", async () => {
    const mockError = new Error("Switch chain failed");
    getAccountMock.mockReturnValue({
      address: mockAddress,
      chainId: 42161,
      connector: mockConnector,
    });
    switchChainMock.mockRejectedValue(mockError);

    await expect(ensureCorrectChainForTx(1)).rejects.toThrow(
      "Error occured when switching chain. Check console log for more details.",
    );
  });

  it("should not attempt to switch chain when no connector is present", async () => {
    getAccountMock.mockReturnValue({
      address: mockAddress,
      chainId: 42161,
      connector: undefined,
    });

    await ensureCorrectChainForTx(1);

    expect(switchChainMock).not.toHaveBeenCalled();
  });
});
