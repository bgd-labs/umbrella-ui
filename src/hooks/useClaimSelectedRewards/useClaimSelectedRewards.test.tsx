import { useCurrentMarket } from "@/hooks/useCurrentMarket";
import { useWriteContract } from "@/hooks/useWriteContract";
import { useTrackTransaction } from "@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { waitForTransactionReceipt } from "@wagmi/core";
import { Address } from "viem";
import { vi } from "vitest";
import { useClaimSelectedRewards } from "./useClaimSelectedRewards";

vi.mock("@/hooks/useCurrentMarket", () => ({
  useCurrentMarket: vi.fn(),
}));

vi.mock("@/hooks/useWriteContract", () => ({
  useWriteContract: vi.fn(),
}));

vi.mock("@/providers/TransactionsTrackerProvider/TransactionsTrackerProvider", () => ({
  useTrackTransaction: vi.fn(),
}));

vi.mock("@wagmi/core", () => ({
  waitForTransactionReceipt: vi.fn(),
}));

const useCurrentMarketMock = vi.mocked(useCurrentMarket, { partial: true });
const useWriteContractMock = vi.mocked(useWriteContract, { partial: true });
const useTrackTransactionMock = vi.mocked(useTrackTransaction, { partial: true });
const waitForTransactionReceiptMock = vi.mocked(waitForTransactionReceipt, { partial: true });

describe("useClaimSelectedRewards", () => {
  const mockChainId = 1;
  const mockRewardsController = "0x1234567890123456789012345678901234567890" as Address;
  const mockWriteContractAsync = vi.fn();
  const mockTrackTransaction = vi.fn();
  const mockInvalidateQueries = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    useCurrentMarketMock.mockReturnValue({
      chainId: mockChainId,
      rewardsController: mockRewardsController,
    });

    useWriteContractMock.mockReturnValue({
      writeContractAsync: mockWriteContractAsync,
    });

    useTrackTransactionMock.mockReturnValue(mockTrackTransaction);

    waitForTransactionReceiptMock.mockResolvedValue({ status: "success" });
  });

  const setup = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    queryClient.invalidateQueries = mockInvalidateQueries;

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useClaimSelectedRewards(), { wrapper });
  };

  it("should claim rewards for a single asset", async () => {
    const mockHash = "0x123";
    const mockArgs = {
      assets: "0x1111111111111111111111111111111111111111" as Address,
      rewards: ["0x2222222222222222222222222222222222222222" as Address],
      receiver: "0x3333333333333333333333333333333333333333" as Address,
      description: "Test claim",
    };

    mockWriteContractAsync.mockResolvedValue(mockHash);

    const { result } = setup();
    const [claimRewards] = result.current;

    await claimRewards(mockArgs);

    expect(mockWriteContractAsync).toHaveBeenCalledWith({
      chainId: mockChainId,
      address: mockRewardsController,
      abi: expect.any(Array),
      functionName: "claimSelectedRewards",
      args: [mockArgs.assets, mockArgs.rewards, mockArgs.receiver],
    });

    expect(mockTrackTransaction).toHaveBeenCalledWith({
      chainId: mockChainId,
      hash: mockHash,
      description: mockArgs.description,
    });

    await waitFor(() => {
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
      });
    });
  });

  it("should claim rewards for multiple assets", async () => {
    const mockHash = "0x123";
    const mockArgs = {
      assets: [
        "0x1111111111111111111111111111111111111111" as Address,
        "0x2222222222222222222222222222222222222222" as Address,
      ],
      rewards: [
        ["0x3333333333333333333333333333333333333333" as Address],
        ["0x4444444444444444444444444444444444444444" as Address],
      ],
      receiver: "0x5555555555555555555555555555555555555555" as Address,
      description: "Test claim",
    };

    mockWriteContractAsync.mockResolvedValue(mockHash);

    const { result } = setup();
    const [claimRewards] = result.current;

    await claimRewards(mockArgs);

    expect(mockWriteContractAsync).toHaveBeenCalledWith({
      chainId: mockChainId,
      address: mockRewardsController,
      abi: expect.any(Array),
      functionName: "claimSelectedRewards",
      args: [mockArgs.assets, mockArgs.rewards, mockArgs.receiver],
    });

    expect(mockTrackTransaction).toHaveBeenCalledWith({
      chainId: mockChainId,
      hash: mockHash,
      description: mockArgs.description,
    });

    await waitFor(() => {
      expect(mockInvalidateQueries).toHaveBeenCalledWith({
        queryKey: ["readContract", { functionName: "getAllAggregatedData" }],
      });
    });
  });

  it("should not invalidate queries when transaction fails", async () => {
    const mockHash = "0x123";
    const mockArgs = {
      assets: "0x1111111111111111111111111111111111111111" as Address,
      rewards: ["0x2222222222222222222222222222222222222222" as Address],
      receiver: "0x3333333333333333333333333333333333333333" as Address,
      description: "Test claim",
    };

    mockWriteContractAsync.mockResolvedValue(mockHash);
    waitForTransactionReceiptMock.mockResolvedValue({ status: "reverted" });

    const { result } = setup();
    const [claimRewards] = result.current;

    await claimRewards(mockArgs);

    expect(mockWriteContractAsync).toHaveBeenCalledWith({
      chainId: mockChainId,
      address: mockRewardsController,
      abi: expect.any(Array),
      functionName: "claimSelectedRewards",
      args: [mockArgs.assets, mockArgs.rewards, mockArgs.receiver],
    });

    expect(mockTrackTransaction).toHaveBeenCalledWith({
      chainId: mockChainId,
      hash: mockHash,
      description: mockArgs.description,
    });

    await waitFor(() => {
      expect(mockInvalidateQueries).not.toHaveBeenCalled();
    });
  });
});
