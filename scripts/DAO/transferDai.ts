import { Address, toNano, WalletTypes } from "locklift";
import { TIP3_WALLET_ABI, TIP3Abi, USDT_DATA } from "./TIP3";
import {TokenWalletAbi} from "../../build/TokenWalletAbi";
async function transferDaiToContract() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const walletAddress = `0:${signer.publicKey}`;
    console.log(" Signer address:", signer!);

    const account = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: "25d1567ab079ee2b031a163a8226c34dbbd29475bc56626fb4c49a1d30b71330",
    });

    const myAccount = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
    const DAI = new Address("0:cb944617a9a791a9df452c64a365cfaa8fd3c555b7db8b6fa54c5144b9bbf3be");



    // const deployedTokenRootContract = locklift.network.insertAccount({
    //     address: DAI,
    //     type: "accountStuffBoc",
    //     abi: TIP3Abi,
    //     boc: USDT_DATA,
    // });
    const deployedTokenRootContract = new locklift.provider.Contract(TIP3Abi, DAI);

    // await deployedTokenRootContract.methods.deployWallet({
    //     answerId: 0,
    //     walletOwner: myAccount,
    //     deployWalletValue: toNano(1),

    // }).send({
    //     from: account.address,
    //     amount: toNano(1),
    // })
    const myTokenWalletAddress = await deployedTokenRootContract.methods.walletOf({
        answerId: 0,
        walletOwner: myAccount //signer.publicKey,
    }).call();

    console.log("myTokenWallet", myTokenWalletAddress.value0.toString());
    
    const userDaiWallet = await deployedTokenRootContract.methods.walletOf({
        answerId: 0,
        walletOwner: myAccount //signer.publicKey,
    }).call().then(res => new locklift.provider.Contract(TIP3_WALLET_ABI, res.value0));
// 
    const tokenWalletContract = new locklift.provider.Contract(TokenWalletAbi, new Address(myTokenWalletAddress.value0.toString()));

    const balance = await tokenWalletContract.methods.walletCode({answerId: 0}).call().then(res => res.value0.toString());

    console.log("balance", balance);
}

transferDaiToContract()