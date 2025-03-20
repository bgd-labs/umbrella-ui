export const UMBRELLA_ABI = [
  { inputs: [], name: "cooldown", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "user", type: "address" }],
    name: "getStakerCooldown",
    outputs: [
      {
        components: [
          { internalType: "uint192", name: "amount", type: "uint192" },
          { internalType: "uint32", name: "endOfCooldown", type: "uint32" },
          { internalType: "uint32", name: "withdrawalWindow", type: "uint32" },
        ],
        internalType: "struct IERC4626StakeToken.CooldownSnapshot",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalAssets",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "asset",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
] as const;
