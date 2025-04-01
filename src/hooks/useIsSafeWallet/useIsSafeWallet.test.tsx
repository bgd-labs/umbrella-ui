import { useSafeAppsSDK } from "@safe-global/safe-apps-react-sdk";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { useAccount, usePublicClient } from "wagmi";
import { useIsSafeWallet } from "./useIsSafeWallet";

vi.mock("@safe-global/safe-apps-react-sdk", () => ({
  useSafeAppsSDK: vi.fn(),
}));

vi.mock("wagmi", () => ({
  useAccount: vi.fn(),
  usePublicClient: vi.fn(),
}));

const useAccountMock = vi.mocked(useAccount, { partial: true });
const usePublicClientMock = vi.mocked(usePublicClient, { partial: true });
const useSafeAppsSDKMock = vi.mocked(useSafeAppsSDK, { partial: true });

describe("useIsSafeWallet", () => {
  const mockAddress = "0x1234567890123456789012345678901234567890";

  beforeEach(() => {
    vi.clearAllMocks();

    useAccountMock.mockReturnValue({ address: mockAddress });
    usePublicClientMock.mockReturnValue({
      getCode: vi.fn(),
      readContract: vi.fn(),
    });
  });

  const setup = () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );

    return renderHook(() => useIsSafeWallet(), { wrapper });
  };

  it("should return true when connected to Safe wallet through Safe Apps SDK", async () => {
    useSafeAppsSDKMock.mockReturnValue({
      safe: { safeAddress: mockAddress, chainId: 1, threshold: 1, owners: [], isReadOnly: false },
    });

    const { result } = setup();
    await waitFor(() => expect(result.current).toBe(true));
  });

  it("should return true when connected to smart contract wallet", async () => {
    useSafeAppsSDKMock.mockReturnValue({
      safe: undefined,
    });
    usePublicClientMock.mockReturnValue({
      getCode: vi.fn().mockResolvedValue("0x123"),
      readContract: vi.fn().mockResolvedValue(["0x123", "0x456"]),
    });

    const { result } = setup();

    await waitFor(() => expect(result.current).toBe(true));
  });

  it("should return false when not connected to smart contract wallet", async () => {
    useSafeAppsSDKMock.mockReturnValue({
      safe: undefined,
    });
    usePublicClientMock.mockReturnValue({
      getCode: vi.fn().mockResolvedValue("0x"),
      readContract: vi.fn().mockResolvedValue([]),
    });

    const { result } = setup();
    await waitFor(() => expect(result.current).toBe(false));
  });

  it("should return false when no wallet is connected", async () => {
    useAccountMock.mockReturnValue({ address: undefined });
    useSafeAppsSDKMock.mockReturnValue({ safe: undefined });

    const { result } = setup();
    await waitFor(() => expect(result.current).toBe(false));
  });

  it("should return false when contract check fails", async () => {
    useSafeAppsSDKMock.mockReturnValue({ safe: undefined });
    usePublicClientMock.mockReturnValue({
      getCode: vi.fn().mockRejectedValue(new Error("Failed to get code")),
    });

    const { result } = setup();
    await waitFor(() => expect(result.current).toBe(false));
  });

  it("should return false when getOwners call fails", async () => {
    useSafeAppsSDKMock.mockReturnValue({ safe: undefined });
    usePublicClientMock.mockReturnValue({
      getCode: vi.fn().mockResolvedValue("0x123"),
      readContract: vi.fn().mockRejectedValue(new Error("Failed to read contract")),
    });

    const { result } = setup();
    await waitFor(() => expect(result.current).toBe(false));
  });
});
