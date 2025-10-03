import { use } from "chai";
import { Address, toNano, WalletTypes } from "locklift";
import { TIP3_WALLET_ABI, TIP3_ROOT_ABI } from "./TIP3";
async function mainS() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const walletAddress = `0:${signer.publicKey}`;
    // console.log(" Signer address:", signer!);

    const account = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: signer.publicKey,
    });

    const DAI = new Address("0:0447c738d8549c5ea92f1c945628367db4adcc706685f760c93f8b236bf8e7e4");
    const USDT = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced")
    const WVENOM = new Address("0:77d36848bb159fa485628bc38dc37eadb74befa514395e09910f601b841f749e")
    const W3W = new Address("0:a53178ec8c6fe0c62413edd9eed25508f357cfba8bf8a7dbfad9290413b2e6be")
    // const RECIPIENT = new Address("0:7179e9aeb58d6fe97610ffcf605eded4f3a161cee84bc0d67bfdf55e6a6a6491")
    const OWNER = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
    const addr2 = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
    // const DAI = new Address("0:8a4ed4483500caf2d4bb4b56c84df41009cc3d0ed6a9de05d853e26a30faeced");
    // const USDT = new Address("0:fc7ca85500f1efcf8b3ef7e0f90f184344bfe4bb6e916d6492c6fef7b29f52e2");
    const WETH = new Address("0:60b3ebf994515df7985cb62a9d141467edf2f869272baf507dc83d9ba2e1b199");
    const USDT_WVENOM_DEX_PAIR = new Address("0:56a3f53b5d07da8266c38eb7b4fe1b0e3f3dac6b88ef23a1634d4b9bd4eb2bbe")
    const USDT_DAI_DEX_PAIR = new Address("0:e8391c9a68a6325211297004ed20e0f0571e68a5526c93ebd6fcb858cc3f8555")
    const USDT_W3W_DEX_PAIR = new Address("0:16b5e7dceb434fb5cdccd6d992987af207d50f20566a1439cb80f9d3e7d1fafd")
    const USDT_WETH_DEX_PAIR = new Address("0:72a4629b7c0f9ffdffa141521658cdbba2e66aac2d70f640e504e60ea0a9b4dd")

    const FounderNFT = new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a");
    const deedNFT = new Address("0:9fae74f1be8463f2d707946ef0ec041a36e74bf93e1d3d8ec7556c3d316dc33f");
    // const walletAddress = "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081";
    const usdtTokenOwnerWallet = new Address("0:9cd81b2945fe1ae23548ff4f34c73bb5c4a6e1f2faa9610c4b446b36b8d54c29");
    const userDaiTokenWalletAddress = new Address("0:d1bef2b6244fa6896ebdeb9d95ff4299ce3e486e297ddcd18cb3ec20e1cdea08")
    // const userUsdtTokenWallet = new Address("0:9cd81b2945fe1ae23548ff4f34c73bb5c4a6e1f2faa9610c4b446b36b8d54c29")
    const userWvenomTokenWalletAddress = new Address("0:9b264e76f3b413c0001d57bb5c7885de3db88e6df7f78f10b81315b6865de3b6")
    const userW3wTokenWalletAddress = new Address("0:f4c410f546e61cfd583cf245ba539e0baf8fd557f08513a5ac14648754615036")
    const userWethTokenWalletAddress = new Address("0:16ddab5fbe9bd9a592b536dd7209504d2f7b45cba535ea88ec1347e32fa4c092")

    console.log(" Signer address:", signer.publicKey!);

    const { contract: treasuryContractInstance, tx } = await locklift.factory.deployContract({
        contract: "Treasury",
        publicKey: signer.publicKey,
        initParams: {
            nonce_: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
            _assets: [USDT, WVENOM],
            _assetsdecimals: [6, 9],
            _assetAllocations: [0, 100],
            _assetsDexPairs: [USDT_WVENOM_DEX_PAIR],
            _owner: OWNER,
            _deedNFT: deedNFT,
            _founderNFT: FounderNFT,
            _mainWallet: OWNER,
            _priceFeed: [USDT, WVENOM],
            _deedToken: USDT,
            _DaiToEthPriceFeed: new Address("0:72a4629b7c0f9ffdffa141521658cdbba2e66aac2d70f640e504e60ea0a9b4dd"),
            _depositingAddress: OWNER,
            _WETH: WETH,
            _nonce: locklift.utils.getRandomNonce(),
            exchangeContractAddress: new Address("0:0ec4f4d06dd7abd671f272bb5429426c98971cb2227a5d1b80344e066efdbddd"),
            _assetPriceFeed: [
                {
                    asset: USDT,
                    rate: 1000000,
                    decimals: 6,
                    lastUpdatedTimeStamp: Math.floor(Date.now() / 1000),
                },
                {
                    asset: WVENOM,
                    rate: 7316096730,
                    decimals: 9,
                    lastUpdatedTimeStamp: Math.floor(Date.now() / 1000),
                }
            ]
            // exchangeContractAddress: new Address("0:0ec4f4d06dd7abd671f272bb5429426c98971cb2227a5d1b80344e066efdbddd") --- IGNORE ---
            // userAssetZeroTokenWallet:new Address("")
        },
        value: locklift.utils.toNano(6),
    });

    console.log(`Treasury deployed at :: ${treasuryContractInstance.address.toString()}`);

    //

    const TreasuryArtifacts = locklift.factory.getContractArtifacts("Treasury");
    const treasuryContract = await locklift.factory.getDeployedContract("Treasury", await treasuryContractInstance.address);

    const userUsdtWallet = new locklift.provider.Contract(TIP3_WALLET_ABI, usdtTokenOwnerWallet);
    {
        const { traceTree } = await locklift.tracing.trace(
            userUsdtWallet.methods
                .transfer({
                    amount: 50,
                    deployWalletValue: toNano(1),
                    notify: true,
                    payload: "",
                    recipient: treasuryContractInstance.address,
                    remainingGasTo: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
                })
                .send({
                    from: OWNER,
                    amount: toNano(2),
                }),
        );

        await traceTree?.beautyPrint();
    }

    // ******************************* transfer usdt from contract  ************************************************

    // try {

    //     {
    //         const { traceTree } = await locklift.tracing.trace(
    //             treasuryContract.methods
    //                 .swapUsdt({
    //                     amountIn: 10,
    //                     receiver: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //                 })
    //                 .send({
    //                     from: OWNER,
    //                     amount: toNano(8),
    //                 }),
    //         );
    // }} catch (error) {

    // }
    // *******************************transfer funds to governance ************************************************

    // try {
    //     {
    //         const { traceTree } = await locklift.tracing.trace(
    //             treasuryContract.methods
    //                 .transferUsdtToGovernance({
    //                     answerId: 0,
    //                     amount: 10,
    //                     receiver: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //                 })
    //                 .send({
    //                     from: OWNER,
    //                     amount: toNano(8),
    //                 }),
    //         );

    //         await traceTree?.beautyPrint();
    //     }
    // } catch (error) {

    // }
    // ******************************* Get Callback ************************************************
    // try {
    //     {
    //         const { traceTree } = await locklift.tracing.trace(
    //             treasuryContract.methods
    //                 .getCallbackAmount({

    //                 })
    //                 .send({
    //                     from: OWNER,
    //                     amount: toNano(2),
    //                 }),
    //         );

    //         await traceTree?.beautyPrint();
    //     }
    // } catch (error) {
    //     console.log('====================================');
    //     console.log(error);
    //     console.log('====================================');
    // }

    // deposit admin func 
    try {
        const users = [OWNER, addr2]
        const daiAmounts = [10, 11]


        const { traceTree } = await locklift.tracing.trace(
            treasuryContract.methods
                .deposit_admin({
                    users: users,
                    usdtAmounts: daiAmounts
                })
                .send({
                    from: OWNER,
                    amount: toNano(8),
                }),
        );

        await traceTree?.beautyPrint();
    } catch (error) {

    }
     try {
        const users = [OWNER, addr2]
        const daiAmounts = [10, 11]


        const { traceTree } = await locklift.tracing.trace(
            treasuryContract.methods
                .withdraw({
                   indices: [0]
                })
                .send({
                    from: OWNER,
                    amount: toNano(13),
                }),
        );

        await traceTree?.beautyPrint();
    } catch (error) {

    }

    // const userDaiTokenWallet = new locklift.provider.Contract(TIP3_WALLET_ABI, userDaiTokenWalletAddress);
    // {
    //     const { traceTree } = await locklift.tracing.trace(
    //         userDaiTokenWallet.methods
    //             .transfer({
    //                 amount: 2,
    //                 deployWalletValue: toNano(1),
    //                 notify: true,
    //                 payload: "",
    //                 recipient: treasuryContractInstance.address,
    //                 remainingGasTo: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //             })
    //             .send({
    //                 from: OWNER,
    //                 amount: toNano(2),
    //             }),
    //     );

    //     await traceTree?.beautyPrint();
    // }

    // const userW3wTokenWallet = new locklift.provider.Contract(TIP3_WALLET_ABI, userW3wTokenWalletAddress);
    // {
    //     const { traceTree } = await locklift.tracing.trace(
    //         userW3wTokenWallet.methods
    //             .transfer({
    //                 amount: 5000000,
    //                 deployWalletValue: toNano(1),
    //                 notify: true,
    //                 payload: "",
    //                 recipient: treasuryContractInstance.address,
    //                 remainingGasTo: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //             })
    //             .send({
    //                 from: OWNER,
    //                 amount: toNano(2),
    //             }),
    //     );

    //     await traceTree?.beautyPrint();
    // }

    // const userWvenomTokenWallet = new locklift.provider.Contract(TIP3_WALLET_ABI, userWvenomTokenWalletAddress);
    // {
    //     const { traceTree } = await locklift.tracing.trace(
    //         userWvenomTokenWallet.methods
    //             .transfer({
    //                 amount: 50000000 ,
    //                 deployWalletValue: toNano(1),
    //                 notify: true,
    //                 payload: "",
    //                 recipient: treasuryContractInstance.address,
    //                 remainingGasTo: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //             })
    //             .send({
    //                 from: OWNER,
    //                 amount: toNano(2),
    //             }),
    //     );

    //     await traceTree?.beautyPrint();
    // }

    // const userWethTokenWallet = new locklift.provider.Contract(TIP3_WALLET_ABI, userWethTokenWalletAddress);
    // {
    //     const { traceTree } = await locklift.tracing.trace(
    //         userWethTokenWallet.methods
    //             .transfer({
    //                 amount: 2,
    //                 deployWalletValue: toNano(1),
    //                 notify: true,
    //                 payload: "",
    //                 recipient: treasuryContractInstance.address,
    //                 remainingGasTo: new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"),
    //             })
    //             .send({
    //                 from: OWNER,
    //                 amount: toNano(2),
    //             }),
    //     );

    //     await traceTree?.beautyPrint();
    // }

    // // owner 
    // // wait 5 sec
    // console.log("waiting 5 sec...");
    // await new Promise(resolve => setTimeout(resolve, 5000));
    // console.log("done");

    // const owner = await treasuryContractInstance.methods.owner().call();
    // console.log("Owner ::", owner);

    // const mainWallet = await treasuryContractInstance.methods.mainWallet().call();
    // console.log("mainWallet ::", await mainWallet);

    // const deedToken = await treasuryContractInstance.methods.deedToken().call();
    // console.log("deedToken ::", deedToken);


    // const deedNFT_ = await treasuryContractInstance.methods.deedNFT().call();
    // console.log("deedNFT ::", deedNFT_);

    // const deployedTokenRootContract =
    //     await locklift.factory.getDeployedContract(
    //         "TokenRoot",
    //         DAI
    //     )

    // await deployedTokenRootContract.methods.deployWallet({
    //     walletOwner: new Address(walletAddress),
    //     answerId: 0,
    //     deployWalletValue: toNano(1)
    // }).send({
    //     from: account.address,
    //     amount: toNano(2),
    //     bounce: true
    // })


    // const ownerWallet = await deployedTokenRootContract.methods
    //     .walletOf({
    //         walletOwner: new Address(walletAddress),
    //         answerId: 0,
    //     })
    //     .call();

    // console.log("DAI ownerWallet ::", ownerWallet);


    // const tokenWalletContract = await locklift.factory.getDeployedContract("TokenWallet", new Address(ownerWallet?.value0.toString()));
    // let balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call();
    // console.log("DAI balance :: of owner", balance);



    // // ******************************* WRITE FUNCTIONS ************************************************

    // //    deposit_admin
    // const user2 = (await locklift.keystore.getSigner("1"))!;
    // const walletAddress2 = new Address(`0:${user2.publicKey}`);

    // const user3 = (await locklift.keystore.getSigner("2"))!;
    // const walletAddress3 = new Address(`0:${user3.publicKey}`);





    // const payload = "te6ccgEBAQEAAgAAAA=="

    // // wallet transfer
    // // const txS = await tokenWalletContract.methods.transfer({
    // //     amount: "100",
    // //     recipient: (walletAddress2),
    // //     deployWalletValue: toNano(1),
    // //     remainingGasTo: (account.address),
    // //     notify: true,
    // //     payload:payload

    // // }).send({ from: account.address, amount: toNano(5), bounce: false, });
    // const txS = await tokenWalletContract.methods.transferToWallet({
    //     amount: "100",
    //     recipientTokenWallet: walletAddress2,
    //     remainingGasTo: (account.address),
    //     payload: payload,
    //     notify: true
    // }).send({ from: account.address, amount: toNano(5), bounce: false, });
    // console.log("tx", txS);

    // balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call();
    // console.log("DAI balance :: of owner", balance);


    //     const userWallet = await deployedTokenRootContract.methods
    //     .walletOf({
    //         walletOwner: walletAddress2,
    //         answerId: 0,
    //     })
    //     .call();

    //     console.log("DAI userWallet ::", userWallet);


    //     const tokenWalletContract2 = await locklift.factory.getDeployedContract("TokenWallet", new Address(userWallet?.value0.toString()));
    //     const balance2 = await tokenWalletContract2.methods.balance({ answerId: 0 }).call();
    //     console.log("DAI balance :: of user2", balance2);

    // let totalTreasuryPoints = await treasuryContract.methods.totalTreasuryPoints().call();
    // console.log("totalTreasuryPoints ::", totalTreasuryPoints);



    //     totalTreasuryPoints = await treasuryContract.methods.totalTreasuryPoints().call();
    //     console.log("totalTreasuryPoints  after::", totalTreasuryPoints);

}

mainS()
    .then(() => process.exit(0))
    .catch(e => {
        console.log(e);
        //   console.log("transaction",e.transaction);

        process.exit(1);
    });



