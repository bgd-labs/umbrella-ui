import { TooltipProvider } from "@/components/Tooltip/Tooltip";
import { MarketProvider } from "@/providers/MarketProvider/MarketProvider";
import { Reward } from "@/types/token";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { APYBreakdown } from "./APYBreakdown";

vi.mock("@/components/AssetIcon/AssetIcon", () => ({
  AssetIcon: ({ symbol }: { symbol: string }) => (
    <div data-testid="asset-icon">{symbol}</div>
  ),
}));

vi.mock("@/components/RewardAssetIcon/RewardAssetIcon", () => ({
  RewardAssetIcon: ({ reward }: { reward: Reward }) => (
    <div data-testid="reward-icon">{reward.symbol}</div>
  ),
}));

describe("APYBreakdown", () => {
  const mockRewards: Reward[] = [
    {
      address: "0x123",
      name: "Reward Token 1",
      symbol: "RWD1",
      apy: 5.5,
      currentEmissionPerSecondScaled: 3664875909329n,
      decimals: 18,
      type: "underlying",
      latestAnswer: 100000000n,
      latestAnswerFormatted: 1,
    },
    {
      address: "0x456",
      name: "Reward Token 2",
      symbol: "RWD2",
      apy: 3.2,
      currentEmissionPerSecondScaled: 3664875909329n,
      decimals: 18,
      type: "underlying",
      latestAnswer: 100000000n,
      latestAnswerFormatted: 1,
    },
  ];

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <MarketProvider>
        <TooltipProvider>{ui}</TooltipProvider>
      </MarketProvider>,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render total APY", () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={1.8}
        rewards={[]}
      />,
    );

    expect(screen.getByRole("button")).toHaveTextContent("10.5");
  });

  it("should render reward icons when displayRewards is true", () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={1.8}
        rewards={mockRewards}
      />,
    );

    const rewardIcons = screen.getAllByTestId("reward-icon");
    expect(rewardIcons.length).toBe(mockRewards.length);
  });

  it("should not render reward icons when displayRewards is false", () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={1.8}
        rewards={mockRewards}
        displayRewards={false}
      />,
    );

    const rewardIcons = screen.queryAllByTestId("reward-icon");
    expect(rewardIcons.length).toBe(0);
  });

  it("should show tooltip with breakdown on hover", async () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={1.8}
        rewards={mockRewards}
      />,
    );

    const button = screen.getByRole("button");

    expect(screen.queryByText("Supply APY")).not.toBeInTheDocument();
    expect(screen.queryByText("Reward Token 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Reward Token 2")).not.toBeInTheDocument();

    await userEvent.hover(button);

    await waitFor(() => {
      const supplyApyElements = screen.getAllByText("Supply APY");
      expect(supplyApyElements[0]).toBeVisible();

      const reward1Elements = screen.getAllByText("Reward Token 1");
      expect(reward1Elements[0]).toBeVisible();

      const reward2Elements = screen.getAllByText("Reward Token 2");
      expect(reward2Elements[0]).toBeVisible();
    });
  });

  it("should filter out rewards with zero emission", async () => {
    const rewardsWithZero: Reward[] = [
      ...mockRewards,
      {
        address: "0x789",
        name: "Zero Reward",
        symbol: "ZERO",
        apy: 0,
        currentEmissionPerSecondScaled: 0n,
        decimals: 18,
        type: "underlying",
        latestAnswer: 100000000n, // 1 USD with 8 decimals
        latestAnswerFormatted: 1,
      },
    ];

    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={1.8}
        rewards={rewardsWithZero}
      />,
    );

    const button = screen.getByRole("button");

    expect(screen.queryByText("Zero Reward")).not.toBeInTheDocument();

    await userEvent.hover(button);

    await waitFor(() => {
      expect(screen.getAllByText("Reward Token 1")[0]).toBeVisible();
      expect(screen.getAllByText("Reward Token 2")[1]).toBeVisible();
      expect(screen.queryByText("Zero Reward")).not.toBeInTheDocument();
    });
  });

  it("should render supply APY icon only when supplyApy is non-zero", async () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.5}
        supplyApy={0}
        rewards={mockRewards}
      />,
    );

    expect(screen.queryByText("ETH")).not.toBeInTheDocument();
  });

  it("should format APY values with correct decimals", async () => {
    renderWithProviders(
      <APYBreakdown
        symbol="ETH"
        totalApy={10.56789}
        supplyApy={1.23456}
        rewards={[]}
      />,
    );

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent(/10.56%/);

    await userEvent.hover(button);

    await waitFor(() => {
      expect(screen.getAllByText(/1.23%/)[0]).toBeVisible();
    });
  });
});
