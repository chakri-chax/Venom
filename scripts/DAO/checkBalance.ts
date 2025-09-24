import { Address, Contract, toNano, WalletTypes } from "locklift";
import { TIP3_WALLET_ABI, TIP3Abi, USDT_DATA } from "./TIP3";
import { TokenWalletAbi } from "../../build/TokenWalletAbi";

const DAI = new Address("0:0447c738d8549c5ea92f1c945628367db4adcc706685f760c93f8b236bf8e7e4");
const USDT = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced")
const WVENOM = new Address("0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e")
const RECIPIENT = new Address("0:86d5d57a9e2f16475ba030126f186e7a30a3993607e12a25cbfe11ebe5572223")
const myAccount = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
const W3W = new Address("0:a53178ec8c6fe0c62413edd9eed25508f357cfba8bf8a7dbfad9290413b2e6be")
const WETH = new Address("0:60b3ebf994515df7985cb62a9d141467edf2f869272baf507dc83d9ba2e1b199");
const USDT_WVENOM_DEX_PAIR = new Address("0:56a3f53b5d07da8266c38eb7b4fe1b0e3f3dac6b88ef23a1634d4b9bd4eb2bbe")
const USDT_DAI_DEX_PAIR = new Address("0:e8391c9a68a6325211297004ed20e0f0571e68a5526c93ebd6fcb858cc3f8555")
const USDT_W3W_DEX_PAIR = new Address("0:16b5e7dceb434fb5cdccd6d992987af207d50f20566a1439cb80f9d3e7d1fafd")
const USDT_WETH_DEX_PAIR = new Address("0:72a4629b7c0f9ffdffa141521658cdbba2e66aac2d70f640e504e60ea0a9b4dd")

function truncateAddress(address: string) {
    return address.slice(0, 6) + "..." + address.slice(-3);
    // return address;
}

const getAllTokenWallets = async (contractAddress: Address) => {
    const DAIRootInstance = await tokenWalletInstanceTIP3(contractAddress, DAI);
    const USDTRootInstance = await tokenWalletInstanceTIP3(contractAddress, USDT);
    const WVENOMRootInstance = await tokenWalletInstanceTIP3(contractAddress, WVENOM);
    const W3WRootInstance = await tokenWalletInstanceTIP3(contractAddress, W3W);
    const WETHRootInstance = await tokenWalletInstanceTIP3(contractAddress, WETH);

    console.table({

        "USDT": {
            rootAddress: truncateAddress(USDT.toString()),
            walletAddress: truncateAddress(USDTRootInstance.address.toString()),
            pairWithUsdt: "--"
        },
        "DAI": {
            rootAddress: truncateAddress(DAI.toString()),
            walletAddress: truncateAddress(DAIRootInstance.address.toString()),
            pairWithUsdt: truncateAddress(USDT_DAI_DEX_PAIR.toString())
        },
        "WVENOM": {
            rootAddress: truncateAddress(WVENOM.toString()),
            walletAddress: truncateAddress(WVENOMRootInstance.address.toString()),
            pairWithUsdt: truncateAddress(USDT_WVENOM_DEX_PAIR.toString())
        },
        "W3W": {
            rootAddress: truncateAddress(W3W.toString()),
            walletAddress: truncateAddress(W3WRootInstance.address.toString()),
            pairWithUsdt: truncateAddress(USDT_W3W_DEX_PAIR.toString())
        },
        "WETH": {
            rootAddress: truncateAddress(WETH.toString()),
            walletAddress: truncateAddress(WETHRootInstance.address.toString()),
            pairWithUsdt: truncateAddress(USDT_WETH_DEX_PAIR.toString())
        },
    })
    // console.log("DAIRootInstanceContractAddress", DAIRootInstance.address.toString());

}


const checkBalance = async (userAddres: Address, tokenAddress: Address) => {
    let tokenName;
    switch (tokenAddress.toString()) {
        case DAI.toString():
            tokenName = "DAI"
            
            break;
    
        case USDT.toString():
            tokenName = "USDT"
            break;
    
        case WVENOM.toString():
            tokenName = "WVENOM"
            break;
    
        case W3W.toString():
            tokenName = "W3W"
            break;
    
        case WETH.toString():
            tokenName = "WETH"
            break;
    
        default:
            break;
    }
    // load contract 
    // const tokenRoot =await tokenRootInstanceTIP3(tokenAddress);

    const tokenWallet = await tokenWalletInstanceTIP3(userAddres, tokenAddress)
    console.log(`${tokenName} wallet of ${truncateAddress(userAddres.toString())} `, tokenWallet.address.toString());

    const balance = await tokenWallet.methods.balance({ answerId: 0 }).call()
    console.log(`${tokenName} balance of ${truncateAddress(userAddres.toString())}:`, balance);


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

async function tokenWalletInstanceTIP3(userAddres: Address, tokenAddress: Address) {
    const tokenRoot = await tokenRootInstanceTIP3(tokenAddress);

    const userTokenWallet = await tokenRoot.methods.walletOf({
        answerId: 0,
        walletOwner: userAddres //signer.publicKey,
    }).call()

    const userTokenWalletContract = new locklift.provider.Contract(TokenWalletAbi, userTokenWallet.value0)
    // console.log("userTokenWalletContractAddress", userTokenWallet);

    // const tokenWalletContract = new locklift.provider.Contract(TokenWalletAbi, (tokenWallet));
    return userTokenWalletContract;
}

const contrac = new Address("0:e3818c561ed5957373d03bded11b5fa2e5aa032952a544ea2ebe9a3493f4a3df")


checkBalance(contrac, USDT);
checkBalance(myAccount, USDT);
// getAllTokenWallets(contrac);


// console.log("DAI contract Balance");
// checkBalance(contrac, DAI);

// // console.log("W3W contract balance");
// checkBalance(contrac, W3W);


// console.log("Wvenom contract Balance");
// checkBalance(contrac, WVENOM);


// checkBalance(myAccount, WVENOM);


// tran ==> 12 usdt 
// we are utiltilze == =>  10 deposit admin ==>12-10 = 2
// 30 % ===> 3 usdt
// 70 % ===>7 usdt


// total usdt = 5
// toal daiInUsdt == 7 
// dai  = 60000000....
// 


/// deposit 10 usdt to the contract 
