import fs from "node:fs";

export const TIP3Abi = {
  "ABI version": 2,
  data: [
    {
      key: 1,
      name: "name_",
      type: "string",
    },
    {
      key: 2,
      name: "symbol_",
      type: "string",
    },
    {
      key: 3,
      name: "decimals_",
      type: "uint8",
    },
    {
      key: 4,
      name: "rootOwner_",
      type: "address",
    },
    {
      key: 5,
      name: "walletCode_",
      type: "cell",
    },
    {
      key: 6,
      name: "randomNonce_",
      type: "uint256",
    },
    {
      key: 7,
      name: "deployer_",
      type: "address",
    },
    {
      key: 8,
      name: "platformCode_",
      type: "cell",
    },
  ],
  events: [],
  fields: [
    {
      name: "_pubkey",
      type: "uint256",
    },
    {
      name: "_timestamp",
      type: "uint64",
    },
    {
      name: "_constructorFlag",
      type: "bool",
    },
    {
      name: "name_",
      type: "string",
    },
    {
      name: "symbol_",
      type: "string",
    },
    {
      name: "decimals_",
      type: "uint8",
    },
    {
      name: "rootOwner_",
      type: "address",
    },
    {
      name: "walletCode_",
      type: "cell",
    },
    {
      name: "totalSupply_",
      type: "uint128",
    },
    {
      name: "burnPaused_",
      type: "bool",
    },
    {
      name: "burnByRootDisabled_",
      type: "bool",
    },
    {
      name: "mintDisabled_",
      type: "bool",
    },
    {
      name: "randomNonce_",
      type: "uint256",
    },
    {
      name: "deployer_",
      type: "address",
    },
    {
      name: "platformCode_",
      type: "cell",
    },
    {
      name: "walletVersion_",
      type: "uint32",
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: "initialSupplyTo",
          type: "address",
        },
        {
          name: "initialSupply",
          type: "uint128",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "mintDisabled",
          type: "bool",
        },
        {
          name: "burnByRootDisabled",
          type: "bool",
        },
        {
          name: "burnPaused",
          type: "bool",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "constructor",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "interfaceID",
          type: "uint32",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "walletVersion",
      outputs: [
        {
          name: "value0",
          type: "uint32",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "platformCode",
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      inputs: [
        {
          name: "currentVersion",
          type: "uint32",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "requestUpgradeWallet",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "code",
          type: "cell",
        },
      ],
      name: "setWalletCode",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "code",
          type: "cell",
        },
      ],
      name: "upgrade",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "disableMint",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "mintDisabled",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "burnTokens",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "disableBurnByRoot",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "burnByRootDisabled",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "burnPaused",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "paused",
          type: "bool",
        },
      ],
      name: "setBurnPaused",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "newOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          components: [
            {
              name: "value",
              type: "uint128",
            },
            {
              name: "payload",
              type: "cell",
            },
          ],
          name: "callbacks",
          type: "map(address,tuple)",
        },
      ],
      name: "transferOwnership",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "name",
      outputs: [
        {
          name: "value0",
          type: "string",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "symbol",
      outputs: [
        {
          name: "value0",
          type: "string",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "decimals",
      outputs: [
        {
          name: "value0",
          type: "uint8",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "totalSupply",
      outputs: [
        {
          name: "value0",
          type: "uint128",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "walletCode",
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "rootOwner",
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "walletOwner",
          type: "address",
        },
      ],
      name: "walletOf",
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
      ],
      name: "deployWallet",
      outputs: [
        {
          name: "tokenWallet",
          type: "address",
        },
      ],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "mint",
      outputs: [],
    },
    {
      id: "0x192B51B1",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "walletOwner",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "acceptBurn",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "to",
          type: "address",
        },
      ],
      name: "sendSurplusGas",
      outputs: [],
    },
  ],
  header: ["pubkey", "time", "expire"],
  version: "2.2",
} as const;

export const TIP3_WALLET_ABI = {
  "ABI version": 2,
  data: [
    {
      key: 1,
      name: "root_",
      type: "address",
    },
    {
      key: 2,
      name: "owner_",
      type: "address",
    },
  ],
  events: [],
  fields: [
    {
      name: "_pubkey",
      type: "uint256",
    },
    {
      name: "_timestamp",
      type: "uint64",
    },
    {
      name: "_constructorFlag",
      type: "bool",
    },
    {
      name: "root_",
      type: "address",
    },
    {
      name: "owner_",
      type: "address",
    },
    {
      name: "balance_",
      type: "uint128",
    },
    {
      name: "version_",
      type: "uint32",
    },
    {
      name: "platformCode_",
      type: "cell",
    },
  ],
  functions: [
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
        {
          name: "interfaceID",
          type: "uint32",
        },
      ],
      name: "supportsInterface",
      outputs: [
        {
          name: "value0",
          type: "bool",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "platformCode",
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      id: "0x15A038FB",
      inputs: [
        {
          name: "value0",
          type: "cell",
        },
        {
          name: "value1",
          type: "uint32",
        },
        {
          name: "sender",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "onDeployRetry",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "version",
      outputs: [
        {
          name: "value0",
          type: "uint32",
        },
      ],
    },
    {
      inputs: [
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "upgrade",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "newCode",
          type: "cell",
        },
        {
          name: "newVersion",
          type: "uint32",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "acceptUpgrade",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "burnByRoot",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "remainingGasTo",
          type: "address",
        },
      ],
      name: "destroy",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "callbackTo",
          type: "address",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "burn",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "balance",
      outputs: [
        {
          name: "value0",
          type: "uint128",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "owner",
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "root",
      outputs: [
        {
          name: "value0",
          type: "address",
        },
      ],
    },
    {
      inputs: [
        {
          name: "answerId",
          type: "uint32",
        },
      ],
      name: "walletCode",
      outputs: [
        {
          name: "value0",
          type: "cell",
        },
      ],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipient",
          type: "address",
        },
        {
          name: "deployWalletValue",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "transfer",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "recipientTokenWallet",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "transferToWallet",
      outputs: [],
    },
    {
      id: "0x67A0B95F",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "sender",
          type: "address",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "acceptTransfer",
      outputs: [],
    },
    {
      id: "0x4384F298",
      inputs: [
        {
          name: "amount",
          type: "uint128",
        },
        {
          name: "remainingGasTo",
          type: "address",
        },
        {
          name: "notify",
          type: "bool",
        },
        {
          name: "payload",
          type: "cell",
        },
      ],
      name: "acceptMint",
      outputs: [],
    },
    {
      inputs: [
        {
          name: "to",
          type: "address",
        },
      ],
      name: "sendSurplusGas",
      outputs: [],
    },
    {
      inputs: [],
      name: "constructor",
      outputs: [],
    },
  ],
  header: ["pubkey", "time", "expire"],
  version: "2.2",
} as const;

export const USDT_DATA = fs.readFileSync("USDT_DATA.boc", "utf-8");
