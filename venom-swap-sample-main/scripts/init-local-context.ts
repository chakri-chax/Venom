import { TIP3_WALLET_ABI, TIP3Abi, USDT_DATA } from "../external_abi/TIP3";
import { Address, Contract, toNano, WalletTypes } from "locklift";
import { CreateAccountOutput } from "locklift/types";
import { DexPairAbi } from "../external_abi/DexPair";
import { factorySource } from "../build/factorySource";

export const initializeExchangeContracts = async ({
  usdt,
  dexPair,
  usdtOwner,
}: {
  usdt: Address;
  dexPair: Address;
  usdtOwner: Address;
}): Promise<{
  userUsdtWallet: Contract<typeof TIP3_WALLET_ABI>;
  user: CreateAccountOutput["account"];
  pairContract: Contract<(typeof factorySource)["DexPair"]>;
  usdtContract: Contract<typeof TIP3Abi>;
}> => {
  const pairContract = locklift.factory.getDeployedContract("DexPair", dexPair);
  const usdtContract = locklift.network.insertAccount({
    address: usdt,
    type: "accountStuffBoc",
    abi: TIP3Abi,
    boc: USDT_DATA,
  });

  locklift.network.insertWallet(usdtOwner);

  const user = await locklift.factory.accounts.addNewAccount({
    type: WalletTypes.EverWallet,
    publicKey: await locklift.keystore.getSigner("0").then(res => res!.publicKey),
    value: toNano(50000000),
  });

  const { traceTree } = await locklift.tracing.trace(
    usdtContract.methods
      .mint({
        amount: 100 * 10 ** 6,
        deployWalletValue: toNano(1),
        notify: false,
        payload: "",
        recipient: user.account.address,
        remainingGasTo: user.account.address,
      })
      .send({
        amount: toNano(20),
        from: usdtOwner,
      }),
    { raise: false },
  );
  await traceTree?.beautyPrint();

  const userUsdtWallet = await usdtContract.methods
    .walletOf({
      answerId: 0,
      walletOwner: user.account.address,
    })
    .call()
    .then(res => new locklift.provider.Contract(TIP3_WALLET_ABI, res.value0));

  const balance = await userUsdtWallet.methods
    .balance({
      answerId: 0,
    })
    .call();

  console.log("User USDT balance:", balance.value0 / 10 ** 6);

  return {
    userUsdtWallet,
    user: user.account,
    pairContract: pairContract,
    usdtContract: usdtContract,
  };
};
