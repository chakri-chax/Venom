export const TreasuryABI = {
	"ABI version": 2,
	"version": "2.2",
	"header": ["pubkey", "time", "expire"],
	"functions": [
		{
			"name": "constructor",
			"inputs": [
				{"name":"_assets","type":"address[]"},
				{"name":"_assetsdecimals","type":"uint256[]"},
				{"name":"_assetAllocations","type":"uint8[]"},
				{"name":"_owner","type":"address"},
				{"name":"_deedNFT","type":"address"},
				{"name":"_founderNFT","type":"address"},
				{"name":"_mainWallet","type":"address"},
				{"name":"_priceFeed","type":"address[]"},
				{"name":"_deedToken","type":"address"},
				{"name":"_DaiToEthPriceFeed","type":"address"},
				{"name":"_depositingAddress","type":"address"},
				{"name":"_WETH","type":"address"},
				{"name":"_nonce","type":"uint64"}
			],
			"outputs": [
			]
		},
		{
			"name": "onAcceptTokensTransfer",
			"inputs": [
				{"name":"tokenRoot","type":"address"},
				{"name":"amount","type":"uint128"},
				{"name":"sender","type":"address"},
				{"name":"senderWallet","type":"address"},
				{"name":"remainingGasTo","type":"address"},
				{"name":"payload","type":"cell"}
			],
			"outputs": [
			]
		},
		{
			"name": "calculateSumOfRatios",
			"inputs": [
				{"name":"_ratios","type":"uint8[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "getEligibleWithdrawDetails",
			"inputs": [
				{"name":"_userAddress","type":"address"}
			],
			"outputs": [
				{"name":"value0","type":"uint256[]"},
				{"components":[{"name":"treasuryDeposit","type":"uint256"},{"name":"firstDepositTime","type":"uint256"}],"name":"value1","type":"tuple[]"}
			]
		},
		{
			"name": "onDeployWallet",
			"inputs": [
				{"name":"_wallet","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "setMainTokenWallet",
			"inputs": [
				{"name":"_mainTokWallet","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "deposit_admin",
			"inputs": [
				{"name":"users","type":"address[]"},
				{"name":"daiAmounts","type":"uint256[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "calculateTotalDeposit",
			"inputs": [
				{"name":"users","type":"address[]"},
				{"name":"daiAmounts","type":"uint256[]"}
			],
			"outputs": [
				{"name":"totalAmount","type":"uint256"}
			]
		},
		{
			"name": "withdraw",
			"inputs": [
				{"name":"indices","type":"uint256[]"}
			],
			"outputs": [
			]
		},
		{
			"name": "fetchAssetPriceInUsd",
			"inputs": [
				{"name":"assetIndex","type":"uint256"},
				{"name":"assetAmount","type":"uint256"}
			],
			"outputs": [
				{"name":"value0","type":"uint256"}
			]
		},
		{
			"name": "owner",
			"inputs": [
			],
			"outputs": [
				{"name":"owner","type":"address"}
			]
		},
		{
			"name": "FULL_TERM_LOCK_PERIOD",
			"inputs": [
			],
			"outputs": [
				{"name":"FULL_TERM_LOCK_PERIOD","type":"uint256"}
			]
		},
		{
			"name": "WETH",
			"inputs": [
			],
			"outputs": [
				{"name":"WETH","type":"address"}
			]
		},
		{
			"name": "maxslippage",
			"inputs": [
			],
			"outputs": [
				{"name":"maxslippage","type":"uint256"}
			]
		},
		{
			"name": "mainTokenWallet",
			"inputs": [
			],
			"outputs": [
				{"name":"mainTokenWallet","type":"address"}
			]
		},
		{
			"name": "DEED_EMISSION_RATE",
			"inputs": [
			],
			"outputs": [
				{"name":"DEED_EMISSION_RATE","type":"uint256"}
			]
		},
		{
			"name": "governance",
			"inputs": [
			],
			"outputs": [
				{"name":"governance","type":"address"}
			]
		},
		{
			"name": "assets",
			"inputs": [
			],
			"outputs": [
				{"name":"assets","type":"address[]"}
			]
		},
		{
			"name": "assetsdecimals",
			"inputs": [
			],
			"outputs": [
				{"name":"assetsdecimals","type":"uint256[]"}
			]
		},
		{
			"name": "priceFeed",
			"inputs": [
			],
			"outputs": [
				{"name":"priceFeed","type":"address[]"}
			]
		},
		{
			"name": "assetAllocationRatio",
			"inputs": [
			],
			"outputs": [
				{"name":"assetAllocationRatio","type":"uint8[]"}
			]
		},
		{
			"name": "mainWallet",
			"inputs": [
			],
			"outputs": [
				{"name":"mainWallet","type":"address"}
			]
		},
		{
			"name": "deedToken",
			"inputs": [
			],
			"outputs": [
				{"name":"deedToken","type":"address"}
			]
		},
		{
			"name": "DaiToEthPriceFeed",
			"inputs": [
			],
			"outputs": [
				{"name":"DaiToEthPriceFeed","type":"address"}
			]
		},
		{
			"name": "depositingAddress",
			"inputs": [
			],
			"outputs": [
				{"name":"depositingAddress","type":"address"}
			]
		},
		{
			"name": "totalTreasuryPoints",
			"inputs": [
			],
			"outputs": [
				{"name":"totalTreasuryPoints","type":"uint256"}
			]
		},
		{
			"name": "topTreasuryHolders",
			"inputs": [
			],
			"outputs": [
				{"name":"topTreasuryHolders","type":"address[]"}
			]
		},
		{
			"name": "treasuryHolderIndex",
			"inputs": [
			],
			"outputs": [
				{"name":"treasuryHolderIndex","type":"map(address,uint256)"}
			]
		},
		{
			"name": "treasuryBalances",
			"inputs": [
			],
			"outputs": [
				{"name":"treasuryBalances","type":"map(address,uint256)"}
			]
		},
		{
			"name": "assetsZeroWallet",
			"inputs": [
			],
			"outputs": [
				{"name":"assetsZeroWallet","type":"address"}
			]
		},
		{
			"name": "userDeposits",
			"inputs": [
			],
			"outputs": [
				{"components":[{"name":"treasuryDeposit","type":"uint256"},{"name":"firstDepositTime","type":"uint256"}],"name":"userDeposits","type":"map(address,tuple[])"}
			]
		},
		{
			"name": "deedNFT",
			"inputs": [
			],
			"outputs": [
				{"name":"deedNFT","type":"address"}
			]
		},
		{
			"name": "founderNFT",
			"inputs": [
			],
			"outputs": [
				{"name":"founderNFT","type":"address"}
			]
		},
		{
			"name": "genesisNFT",
			"inputs": [
			],
			"outputs": [
				{"name":"genesisNFT","type":"address"}
			]
		},
		{
			"name": "forceUnlock",
			"inputs": [
			],
			"outputs": [
				{"name":"forceUnlock","type":"bool"}
			]
		},
		{
			"name": "lockedNFTs",
			"inputs": [
			],
			"outputs": [
				{"name":"lockedNFTs","type":"map(address,map(address,uint256[]))"}
			]
		},
		{
			"name": "contractlockedNFTs",
			"inputs": [
			],
			"outputs": [
				{"name":"contractlockedNFTs","type":"map(address,map(address,uint256[]))"}
			]
		},
		{
			"name": "isTopTreasuryHolder",
			"inputs": [
			],
			"outputs": [
				{"name":"isTopTreasuryHolder","type":"map(address,bool)"}
			]
		},
		{
			"name": "lockTimestamps",
			"inputs": [
			],
			"outputs": [
				{"name":"lockTimestamps","type":"map(address,map(address,map(uint256,uint256)))"}
			]
		}
	],
	"data": [
		{"key":1,"name":"nonce_","type":"uint64"}
	],
	"events": [
		{
			"name": "DepositBatch",
			"inputs": [
				{"name":"users","type":"uint256"},
				{"name":"totalamountdeposited","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "GovernanceUpdated",
			"inputs": [
				{"name":"oldGovernance","type":"address"},
				{"name":"newGovernance","type":"address"}
			],
			"outputs": [
			]
		},
		{
			"name": "NFTLocked",
			"inputs": [
				{"name":"user","type":"address"},
				{"name":"nftContract","type":"address"},
				{"name":"tokenId","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "NFTUnlocked",
			"inputs": [
				{"name":"user","type":"address"},
				{"name":"nftContract","type":"address"},
				{"name":"tokenId","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "Withdraw",
			"inputs": [
				{"name":"user","type":"address"},
				{"name":"deposits","type":"uint256"},
				{"name":"deedMinted","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "TreasuryIsDrained",
			"inputs": [
			],
			"outputs": [
			]
		},
		{
			"name": "fundsTransferred",
			"inputs": [
				{"name":"receiver","type":"address"},
				{"name":"totalamountinDai","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "assetpriceinusd",
			"inputs": [
				{"name":"assetpriceinusd","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "assetpriceindai",
			"inputs": [
				{"name":"assetpriceindai","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "slipageamoun",
			"inputs": [
				{"name":"slipageamount","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "minoutamt",
			"inputs": [
				{"name":"minoutamt","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "amountou",
			"inputs": [
				{"name":"amount","type":"uint256"}
			],
			"outputs": [
			]
		},
		{
			"name": "swaplog",
			"inputs": [
				{"name":"assets0","type":"address"},
				{"name":"assets1","type":"address"},
				{"name":"userShare","type":"uint256"}
			],
			"outputs": [
			]
		}
	],
	"fields": [
		{"name":"_pubkey","type":"uint256"},
		{"name":"_timestamp","type":"uint64"},
		{"name":"_constructorFlag","type":"bool"},
		{"name":"nonce_","type":"uint64"},
		{"name":"owner","type":"address"},
		{"name":"FULL_TERM_LOCK_PERIOD","type":"uint256"},
		{"name":"WETH","type":"address"},
		{"name":"maxslippage","type":"uint256"},
		{"name":"mainTokenWallet","type":"address"},
		{"name":"DEED_EMISSION_RATE","type":"uint256"},
		{"name":"governance","type":"address"},
		{"name":"assets","type":"address[]"},
		{"name":"assetsdecimals","type":"uint256[]"},
		{"name":"priceFeed","type":"address[]"},
		{"name":"assetAllocationRatio","type":"uint8[]"},
		{"name":"mainWallet","type":"address"},
		{"name":"deedToken","type":"address"},
		{"name":"DaiToEthPriceFeed","type":"address"},
		{"name":"depositingAddress","type":"address"},
		{"name":"poolFeeTier","type":"uint16[]"},
		{"name":"totalTreasuryPoints","type":"uint256"},
		{"name":"topTreasuryHolders","type":"address[]"},
		{"name":"treasuryHolderIndex","type":"map(address,uint256)"},
		{"name":"treasuryBalances","type":"map(address,uint256)"},
		{"name":"assetsZeroWallet","type":"address"},
		{"components":[{"name":"treasuryDeposit","type":"uint256"},{"name":"firstDepositTime","type":"uint256"}],"name":"userDeposits","type":"map(address,tuple[])"},
		{"name":"deedNFT","type":"address"},
		{"name":"founderNFT","type":"address"},
		{"name":"genesisNFT","type":"address"},
		{"name":"forceUnlock","type":"bool"},
		{"name":"lockedNFTs","type":"map(address,map(address,uint256[]))"},
		{"name":"contractlockedNFTs","type":"map(address,map(address,uint256[]))"},
		{"name":"isTopTreasuryHolder","type":"map(address,bool)"},
		{"name":"lockTimestamps","type":"map(address,map(address,map(uint256,uint256)))"}
	]
} as const;