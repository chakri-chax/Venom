import { use } from "chai";
import { Address, toNano, WalletTypes } from "locklift";

async function mainS() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const walletAddress = `0:${signer.publicKey}`;
    console.log(" Signer address:", signer!);
    
    const account = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: signer.publicKey,
    });

    const DAI = new Address("0:0447c738d8549c5ea92f1c945628367db4adcc706685f760c93f8b236bf8e7e4");
    const USDT = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced")
    const WVENOM = new Address("0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e")
    // const RECIPIENT = new Address("0:7179e9aeb58d6fe97610ffcf605eded4f3a161cee84bc0d67bfdf55e6a6a6491")
    const OWNER = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")

    // const DAI = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced");
    // const USDT = new Address("0:fc7ca85500f1efcf8b3ef7e0f90f184344bfe4bb6e916d6492c6fef7b29f52e2");
    const WETH = new Address("0:60b3ebf994515df7985cb62a9d141467edf2f869272baf507dc83d9ba2e1b199");

    const deedNFT = new Address("0:a75719da389ed281dfa6182418ede140415441a0fc564c5788b24baba19ced9d");
    // const walletAddress = "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081";
    console.log(" Signer address:", signer.publicKey!);

    const { contract: treasuryContractInstance, tx } = await locklift.factory.deployContract({
        contract: "Tokensale",
        publicKey: signer.publicKey,
        initParams: {
            _nonce: locklift.utils.getRandomNonce(),
            _owner: OWNER
        },
        constructorParams: {
            distributedTokenRoot:WVENOM,
            supply:toNano(1),
            rate:2,
            sendRemainingGasTo: OWNER


            // _assets: [USDT, WVENOM, DAI, USDT, WVENOM],
            // _assetsdecimals: [6, 9, 6, 6, 9],
            // _assetAllocations: [5, 10, 20, 40, 25],
            // _owner: OWNER,
            // _deedNFT: deedNFT,
            // _founderNFT: deedNFT,
            // _mainWallet: OWNER,
            // _priceFeed: [USDT, DAI,WVENOM , DAI, USDT],
            // _deedToken: USDT,
            // _DaiToEthPriceFeed: new Address("0:72a4629b7c0f9ffdffa141521658cdbba2e66aac2d70f640e504e60ea0a9b4dd"),
            // _depositingAddress: OWNER,
            // _WETH: WETH,
            // _nonce: locklift.utils.getRandomNonce(),
            // userAssetZeroTokenWallet:new Address("")
        },
        value: locklift.utils.toNano(13),
    });

    console.log(`TokenSale deployed at :: ${treasuryContractInstance.address.toString()}`);

    //

    const TreasuryArtifacts = locklift.factory.getContractArtifacts("Treasury");
    const treasuryContract = await locklift.factory.getDeployedContract("Treasury", await treasuryContractInstance.address);


    // // owner 
    // // wait 5 sec
    // console.log("waiting 5 sec...");
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // console.log("done");

   

}

mainS()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        //   console.log("transaction",e.transaction);

        process.exit(1);
    });



