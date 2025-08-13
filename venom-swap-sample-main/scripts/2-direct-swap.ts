import { Address, toNano } from "locklift";

import { initializeExchangeContracts } from "./init-local-context";

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
  const { userUsdtWallet, user, pairContract } = await initializeExchangeContracts({
    dexPair: dexPairAddress,
    usdt,
    usdtOwner,
  });
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
      _recipient: user.address,
    })
    .call()
    .then(res => res.value0);

  const { traceTree } = await locklift.tracing.trace(
    userUsdtWallet.methods
      .transfer({
        payload: swapPayload,
        amount: 50 * 10 ** 6, // 50 USDT
        notify: true,
        recipient: pairContract.address,
        deployWalletValue: 0,
        remainingGasTo: user.address,
      })
      .send({
        amount: toNano(5),
        from: user.address,
      }),
  );

  await traceTree?.beautyPrint();

  const dexTokenVault = await pairContract.methods
    .getRoot({
      answerId: 0,
    })
    .call()
    .then(res =>
      locklift.factory
        .getDeployedContract("DexRoot", res.dex_root)
        .methods.getExpectedTokenVaultAddress({
          answerId: 0,
          _tokenRoot: wrappedVenom,
        })
        .call(),
    )
    .then(res => locklift.factory.getDeployedContract("DexTokenVault", res.value0));

  const swapEvent = traceTree?.findEventsForContract({
    contract: dexTokenVault,
    name: "PairTransferTokens" as const,
  })[0]!;
  console.log(
    `Swap executed successfully! ${50} USDT swapped for ${(swapEvent.amount as unknown as number) / 10 ** 9} Wrapped Venom`,
  );
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e);
    process.exit(1);
  });
