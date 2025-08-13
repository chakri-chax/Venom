import { Address, Contract, toNano, WalletTypes } from "locklift";
import { TIP3_WALLET_ABI, TIP3Abi, USDT_DATA } from "./TIP3";
import { TokenWalletAbi } from "../../build/TokenWalletAbi";

const DAI = new Address("0:0447c738d8549c5ea92f1c945628367db4adcc706685f760c93f8b236bf8e7e4");
const USDT = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced")
const WVENOM = new Address("0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e")
const RECIPIENT = new Address("0:a4159a711459861d13e38719791a8f630baab3a3023200340b8e63293329d45d")

async function transferTokenToContract(tokenAddress:Address) {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const walletAddress = `0:${signer.publicKey}`;
    // console.log(" Signer address:", signer!);

    const account = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: "25d1567ab079ee2b031a163a8226c34dbbd29475bc56626fb4c49a1d30b71330",
    });



    const myAccount = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");


    const deployedTokenRootContractUSDT = await tokenRootInstanceTIP3(tokenAddress)

    if (!deployedTokenRootContractUSDT) {
        console.error("[Error for Contract Instance")
    }



    const myTokenWalletAddress = await deployedTokenRootContractUSDT.methods.walletOf({
        answerId: 0,
        walletOwner: myAccount
    }).call();

    console.log("myTokenWallet", myTokenWalletAddress.value0.toString());


    const tokenWalletContract = await tokenWalletInstanceTIP3(new Address(myTokenWalletAddress.value0.toString()))

    const owner = await tokenWalletContract.methods.owner({answerId:0}).call()
    console.log("owner",owner.value0.toString());

    const addr = new Address(owner.value0.toString())
    
    console.log("addr....",addr);

    let balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call().then(res => res.value0.toString());

    console.log("balance before",`${tokenAddress}`, balance,Number(balance) / 10 ** 6);


// transfer tokens

   const tx =  await tokenWalletContract.methods.transfer({
        amount:1000,
        recipient:RECIPIENT,
        deployWalletValue:toNano(1),
        remainingGasTo:myAccount,
        notify:true,
        payload:"te6ccgEBAQEAAgAAAA=="
    }).send({
        from:addr,
        amount:toNano(2)
    })
    // console.log("tx:::",tx);
    

     balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call().then(res => res.value0.toString());

    console.log("balance after",`${tokenAddress}`, Number(balance) / 10 ** 6);



}


async function tokenRootInstanceTIP3(address: Address) {
    // const deployedTokenRootContract = locklift.network.insertAccount({
    //     address: DAI,
    //     type: "accountStuffBoc",
    //     abi: TIP3Abi,
    //     boc: USDT_DATA,
    // });
    const contract = new locklift.provider.Contract(TIP3Abi, address);
    return contract
}

async function tokenWalletInstanceTIP3(tokenWallet: Address) {

    // const userTokenWallet = await deployedTokenRootContract.methods.walletOf({
    //     answerId: 0,
    //     walletOwner: myAccount //signer.publicKey,
    // }).call().then(res => new locklift.provider.Contract(TIP3_WALLET_ABI, res.value0));
    // // 

    const tokenWalletContract = new locklift.provider.Contract(TokenWalletAbi, (tokenWallet));
    return tokenWalletContract;
}
async function deployWallet(contractTIP3: Contract<typeof TIP3Abi>, ownerWallet: Address) {
    await contractTIP3.methods.deployWallet({
        answerId: 0,
        walletOwner: ownerWallet,
        deployWalletValue: toNano(1),

    }).send({
        from: ownerWallet,
        amount: toNano(1),
    })
}
transferTokenToContract(USDT)