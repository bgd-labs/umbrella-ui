import { PRICE_FEED_DECIMALS } from "@/constants/oracle";
import { formatBigInt } from "@/utils/formatBigInt";

export const formatUSDPrice = ({
  balance,
  decimals,
  usdPrice,
  priceFeedDecimals = PRICE_FEED_DECIMALS,
}: {
  balance?: bigint;
  decimals?: number;
  usdPrice?: bigint;
  priceFeedDecimals?: number;
}) => {
  try {
    const formattedBalance = formatBigInt(balance, decimals);
    const formattedUSDPrice = formatBigInt(usdPrice, priceFeedDecimals);

    return formattedBalance * formattedUSDPrice;
  } catch (error) {
    console.error("Error formatting USD balance:", error);
    return 0;
  }
};
