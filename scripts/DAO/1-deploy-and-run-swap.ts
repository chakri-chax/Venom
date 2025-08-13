import { Address, toNano, Contract } from "locklift";

// import { initializeExchangeContracts } from "./init-local-context";

import { TIP3_WALLET_ABI, TIP3Abi, USDT_DATA } from "../../external_abi/TIP3";
import { DexPairAbi } from "../../external_abi/DexPair";
import { DexTokenVaultABI } from "../../external_abi/DexTokenVaultABI";
import { DexRootABI } from "../../external_abi/DexRootABI";

async function main() {
  //addresses
  const dexPairAddress = new Address("0:56a3f53b5d07da8266c38eb7b4fe1b0e3f3dac6b88ef23a1634d4b9bd4eb2bbe");
  const usdt = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced");
  const usdtOwner = new Address("0:cfaacde75ac726e818c7c764f5c91bb7264d1156a4b200817455d58d32781203");
  const wrappedVenom = new Address("0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e");

  // init context
  console.log("Initializing context...");
  /* Note: In real network, you don't need to do it, all of this entities should be available in the network
    - userUsdtWallet is a user wallet for USDT token
    - user is a user wallet e.g. EverWallet or other type of wallet
    - pairContract is a DexPair contract that is used for swapping tokens inside the ExchangeContract
   */
  // const { userUsdtWallet, user, pairContract } = await initializeExchangeContracts({
  //   dexPair: dexPairAddress,
  //   usdt,
  //   usdtOwner,
  // });


  const user = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
  // const userUsdtWalletAddress = new Address("0:9cd81b2945fe1ae23548ff4f34c73bb5c4a6e1f2faa9610c4b446b36b8d54c29")
  let pairContract: Contract<(typeof DexPairAbi)>;
  pairContract = new locklift.provider.Contract(DexPairAbi, dexPairAddress);
  const zeroAddress = new Address("0:0000000000000000000000000000000000000000000000000000000000000000");

  const swapPayload = await pairContract.methods
    .buildExchangePayloadV2({
      _id: 1,
      _toNative: false,
      _cancelPayload: null,
      _successPayload: null,
      _referrer: zeroAddress,
      _deployWalletGrams: toNano(1),
      _expectedAmount: 0,
      _recipient: user,
    })
    .call()
    .then(res => res.value0);

  console.log('swapPayload', swapPayload);


  const usdtContract = locklift.network.insertAccount({
    address: usdt,
    type: "accountStuffBoc",
    abi: TIP3Abi,
    boc: USDT_DATA,
  });
  const userUsdtWallet = await usdtContract.methods
    .walletOf({
      answerId: 0,
      walletOwner: user,
    })
    .call()
    .then(res => new locklift.provider.Contract(TIP3_WALLET_ABI, res.value0));

  const balance = await userUsdtWallet.methods
    .balance({
      answerId: 0,
    })
    .call();

  console.log("User USDT balance before:", Number(balance.value0) / 10 ** 6);


  console.log("Deploying ExchangeContract...");
  const { contract: exchangeContract } = await locklift.factory.deployContract({
    contract: "ExchangeContract",
    constructorParams: {},
    initParams: {},
    value: toNano(1),
    publicKey: await locklift.keystore.getSigner("0").then(res => res!.publicKey),
  });

  console.log("Depositing usdt to ExchangeContract...",exchangeContract.address);

  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     userUsdtWallet.methods
  //       .transfer({
  //         amount: 0.0002 * 10 ** 6,
  //         deployWalletValue: toNano(1),
  //         notify: true,
  //         payload: "",
  //         recipient: exchangeContract.address,
  //         remainingGasTo: user,
  //       })
  //       .send({
  //         from: user,
  //         amount: toNano(2),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }

  // console.log("Execute swap on ExchangeContract...");

  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     exchangeContract.methods
  //       .makeSwap({
  //         tokenIn: usdt,
  //         amountIn: 0.0001 * 10 ** 6, // 50 USDT
  //         deployWalletValue: toNano(1),
  //         queryId: 1,
  //         expectedAmountOut: 0,
  //         pair: pairContract.address,
  //         tokenOut: wrappedVenom,
  //       })
  //       .send({
  //         from: user,
  //         amount: toNano(5),
  //       }),
  //     {
  //       raise: false,
  //     },
  //   );

  //   await traceTree?.beautyPrint();

  //   const swapEvent = traceTree?.findEventsForContract({
  //     contract: exchangeContract,
  //     name: "SwapSuccess" as const,
  //   })[0];

  //   console.log(
  //     `Swap executed successfully! ${(swapEvent?.result.spent as unknown as number) / 10 ** 6} USDT for ${(swapEvent?.result.received as unknown as number) / 10 ** 9} WVENOM`,
  //   );
  // }
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
