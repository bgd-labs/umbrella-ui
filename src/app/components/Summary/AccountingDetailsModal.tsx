import { ModalBody, ModalClose, ModalRoot, ModalTitle, ModalTrigger } from "@/components/Modal/Modal";
import { Asset, StkToken } from "@/types/token";
import { Block } from "@/components/ui/Block";
import { useAccount } from "wagmi";
import { Download } from "lucide-react";
import { formatUnits } from "viem";
import { useState } from "react";
import { cn } from "@/utils/cn";

export type AccountingDetailsModalProps = {
  umbrellaTokens?: StkToken[];
  assets: Asset[];
};

export const AccountingDetailsModal = ({ umbrellaTokens, assets }: AccountingDetailsModalProps) => {
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<"summary" | "rewards">("summary");

  if (!address || !umbrellaTokens || !assets) {
    return null;
  }

  const filteredUmbrellaTokens = umbrellaTokens.filter((token) => token.balance && token.balance > 0n);

  const exportStakeCSV = () => {
    const headers = ["Asset", "Balance", "USD Value", "Supply Yield", "Rewards Yield", "Accrued Rewards Value"];
    const csvContent = [
      headers.join(","),
      ...filteredUmbrellaTokens.map((token) =>
        [
          token.symbol,
          token.balance ? formatUnits(token.balance, token.decimals) : "0",
          token.usdAmount || 0,
          token.apyData.pool.total || 0,
          token.apyData.rewards.total || 0,
          token.totalRewardsUSDAmount || 0,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "stake.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportRewardsCSV = () => {
    const headers = ["Reward Token", "Source Asset", "Accrued Balance", "USD Value"];
    const rewardsData = filteredUmbrellaTokens
      .flatMap((token) =>
        token.rewards.map((reward) => ({
          ...reward,
          sourceToken: token,
        })),
      )
      .filter((reward) => reward.balance && reward.balance > 0n);

    const csvContent = [
      headers.join(","),
      ...rewardsData.map((reward) =>
        [
          reward.symbol,
          reward.sourceToken.symbol,
          reward.balance ? formatUnits(reward.balance, reward.decimals) : "0",
          reward.usdAmount || 0,
        ].join(","),
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "rewards.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ModalRoot>
      <ModalTrigger asChild>
        <button className="cursor-pointer text-left text-sm text-white/60 underline hover:text-white">
          Accounting details
        </button>
      </ModalTrigger>
      <ModalBody className="w-full max-w-4xl">
        <Block className="p-0" elevation={3}>
          <div className="bg-main-100 dark:bg-main-950">
            <div className="bg-main-950 flex items-center justify-between p-6 text-white">
              <ModalTitle className="text-lg font-semibold text-white">Accounting details</ModalTitle>
              <div className="flex items-center gap-3">
                <ModalClose className="text-gray-400 hover:text-gray-600 dark:text-gray-300 dark:hover:text-gray-100" />
              </div>
            </div>

            <div className="bg-main-600 border-main-600 border-b">
              <div className="flex pr-6">
                <button
                  onClick={() => setActiveTab("summary")}
                  className={cn(
                    "cursor-pointer px-6 py-3 text-sm font-semibold transition-colors",
                    activeTab === "summary" ? "text-main-900 bg-white" : "text-white/60 hover:text-white",
                  )}
                >
                  Summary
                </button>
                <button
                  onClick={() => setActiveTab("rewards")}
                  className={cn(
                    "cursor-pointer px-6 py-3 text-sm font-semibold transition-colors",
                    activeTab === "rewards" ? "text-main-900 bg-white" : "text-white/60 hover:text-white",
                  )}
                >
                  Rewards Breakdown
                </button>
              </div>
            </div>

            {activeTab === "summary" && (
              <div className="dark:bg-main-900 border-main-800 dark:border-main-800 bg-white">
                <div>
                  <table className="w-full">
                    <thead className="text-sm">
                      <tr className="border-main-800 dark:border-main-800 border-b">
                        <th className="text-main-900 border-main-800 border-r p-3 pl-6 text-left dark:text-white">
                          Asset
                        </th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">Balance</th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">USD Value</th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">Supply Yield</th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">Rewards Yield</th>
                        <th className="text-main-900 p-3 dark:text-white">Accrued Rewards Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredUmbrellaTokens.map((token) => (
                        <tr
                          key={token.address}
                          className="border-main-800 dark:border-main-800 border-b last:border-b-0"
                        >
                          <td className="border-main-800 border-r p-3 pl-6">
                            <div className="flex items-center gap-3">
                              <div>
                                <div className="text-main-900 font-mono dark:text-white">{token.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="border-main-800 border-r p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              {token.balance ? formatUnits(token.balance, token.decimals) : "0"}
                            </span>
                          </td>
                          <td className="border-main-800 border-r p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              ${(token.usdAmount || 0).toFixed(2)}
                            </span>
                          </td>
                          <td className="border-main-800 border-r p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              {(token.apyData.pool.total || 0).toFixed(4)}%
                            </span>
                          </td>
                          <td className="border-main-800 border-r p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              {(token.apyData.rewards.total || 0).toFixed(4)}%
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-main-900 font-mono select-all dark:text-white">
                              ${(token.totalRewardsUSDAmount || 0).toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      ))}
                      <tr className="">
                        <td
                          colSpan={5}
                          className="bg-main-100 dark:bg-main-800 border-main-800 border-r px-6 font-semibold"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              className="text-main-600 hover:text-main-900 flex cursor-pointer items-center gap-2 text-xs"
                              onClick={exportStakeCSV}
                            >
                              <Download className="size-4" />
                              Download CSV
                            </button>
                            <div className="ml-auto">Total</div>
                          </div>
                        </td>
                        <td className="border-main-800 p-3 text-center font-semibold">
                          <span className="text-main-900 font-mono select-all dark:text-white">
                            $
                            {(
                              filteredUmbrellaTokens.reduce((acc, token) => acc + token.totalRewardsUSDAmount, 0) || 0
                            ).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "rewards" && (
              <div className="dark:border-main-800 dark:bg-main-900 bg-white">
                <div>
                  <table className="w-full">
                    <thead className="text-sm">
                      <tr className="border-main-800 dark:border-main-800 border-b">
                        <th className="text-main-900 border-main-800 border-r p-3 pl-6 text-left dark:text-white">
                          Reward Token
                        </th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">Source Asset</th>
                        <th className="text-main-900 border-main-800 border-r p-3 dark:text-white">Accrued Balance</th>
                        <th className="text-main-900 p-3 dark:text-white">USD Value</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {filteredUmbrellaTokens
                        .flatMap((token) =>
                          token.rewards.map((reward) => ({
                            ...reward,
                            sourceToken: token,
                          })),
                        )
                        .filter((reward) => reward.balance && reward.balance > 0n)
                        .map((reward, index) => (
                          <tr
                            key={`${reward.address}-${index}`}
                            className="border-main-800 dark:border-main-800 border-b last:border-b-0"
                          >
                            <td className="border-main-800 border-r p-3 pl-6">
                              <div className="flex items-center gap-3">
                                <div>
                                  <div className="text-main-900 font-mono dark:text-white">{reward.symbol}</div>
                                </div>
                              </div>
                            </td>
                            <td className="border-main-800 border-r p-3">
                              <div className="text-main-900 text-center font-mono dark:text-white">
                                {reward.sourceToken.symbol}
                              </div>
                            </td>
                            <td className="border-main-800 border-r p-3 text-center">
                              <span className="text-main-900 font-mono select-all dark:text-white">
                                {reward.balance ? formatUnits(reward.balance, reward.decimals) : "0"}
                              </span>
                            </td>
                            <td className="p-3 text-center">
                              <span className="text-main-900 font-mono select-all dark:text-white">
                                ${(reward.usdAmount || 0).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        ))}
                      <tr className="">
                        <td
                          colSpan={3}
                          className="border-main-800 bg-main-100 dark:bg-main-800 border-r p-3 pl-6 text-right font-semibold"
                        >
                          <div className="flex items-center gap-2">
                            <button
                              className="text-main-600 hover:text-main-900 flex cursor-pointer items-center gap-2 text-xs"
                              onClick={exportRewardsCSV}
                            >
                              <Download className="size-4" />
                              Download CSV
                            </button>
                            <div className="ml-auto">Total</div>
                          </div>
                        </td>
                        <td className="border-main-800 p-3 text-center font-semibold">
                          <span className="text-main-900 font-mono select-all dark:text-white">
                            $
                            {(
                              filteredUmbrellaTokens
                                .flatMap((token) => token.rewards.map((reward) => reward.usdAmount || 0))
                                .reduce((acc, usdAmount) => acc + usdAmount, 0) || 0
                            ).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </Block>
      </ModalBody>
    </ModalRoot>
  );
};
