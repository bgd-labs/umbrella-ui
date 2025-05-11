import { Market } from "@/types/market";
import { AaveV3BaseSepolia, AaveV3Ethereum } from "@bgd-labs/aave-address-book";

// TODO Take all addresses from the address book
export const MARKETS: Market[] = [
  {
    id: `${AaveV3Ethereum.CHAIN_ID}-${AaveV3Ethereum.POOL}`,
    name: "Ethereum",
    chainId: AaveV3Ethereum.CHAIN_ID,
    poolProvider: AaveV3Ethereum.POOL_ADDRESSES_PROVIDER,
    uiPoolDataProvider: AaveV3Ethereum.UI_POOL_DATA_PROVIDER,
    oracle: AaveV3Ethereum.ORACLE,
    rewardsController: "0x0000000000000000000000000000000000000000",
    umbrellaHelper: "0x0000000000000000000000000000000000000000",
    batchHelper: "0x0000000000000000000000000000000000000000",
    umbrellaDataAggregationHelper: "0x0000000000000000000000000000000000000000",
    wrapNativeTokenAddress: AaveV3Ethereum.ASSETS.WETH.UNDERLYING,
  },
  {
    id: `${AaveV3BaseSepolia.CHAIN_ID}-${AaveV3BaseSepolia.POOL}`,
    name: "Base Sepolia",
    chainId: AaveV3BaseSepolia.CHAIN_ID,
    poolProvider: AaveV3BaseSepolia.POOL_ADDRESSES_PROVIDER,
    uiPoolDataProvider: AaveV3BaseSepolia.UI_POOL_DATA_PROVIDER,
    oracle: AaveV3BaseSepolia.ORACLE,
    rewardsController: "0x412f8957f9A42FFe47B634AB73f89Ff4E0a29026",
    umbrellaHelper: "0x5AC6C5C70934939d7Ad4aAB253aFD760Ad5E5313",
    batchHelper: "0xcDfb3f2d924b02A78a51F43BC34610dC62ADCEC3",
    umbrellaDataAggregationHelper: "0xC4b9D54bA13156aD07A501d8C4D3f8B4d1827bE2",
    wrapNativeTokenAddress: AaveV3BaseSepolia.ASSETS.WETH.UNDERLYING,
  },
];
