import { use } from "chai";
import { Address, toNano, WalletTypes } from "locklift";

async function mainS() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    console.log(" Signer address:", signer!);

    const walletAddress = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
   

    const mainnetAccout = await locklift.factory.accounts.addExistingAccount({
        type: WalletTypes.WalletV3,
        publicKey: "25d1567ab079ee2b031a163a8226c34dbbd29475bc56626fb4c49a1d30b71330",
    })


    const DAI = new Address("0:b88e2678563333957717472373828bc82e4205ade28ddcc87a4f3aa8f75a30ec");
   
    // const walletAddress = "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081";
    console.log(" Signer address:", signer.publicKey!);

   



    const deployedTokenRootContract =
        await locklift.factory.getDeployedContract(
            "TokenRoot",
            DAI
        )

    await deployedTokenRootContract.methods.deployWallet({
        walletOwner: new Address(walletAddress),
        answerId: 0,
        deployWalletValue: "5000000000"
    }).send({
        from: mainnetAccout.address,
        amount: toNano(1),
        bounce: true
    })

    const ownerWallet = await deployedTokenRootContract.methods
        .walletOf({
            walletOwner: new Address(walletAddress),
            answerId: 0,
        })
        .call();

    console.log("DAI ownerWallet ::", ownerWallet);


    const tokenWalletContract = await locklift.factory.getDeployedContract("TokenWallet", new Address(ownerWallet?.value0.toString()));
    let balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call();
    console.log("DAI balance :: of owner", balance);



    // ******************************* WRITE FUNCTIONS ************************************************

    //    deposit_admin
    const user2 = (await locklift.keystore.getSigner("1"))!;
    const walletAddress2 = new Address(`0:${user2.publicKey}`);

    const user3 = (await locklift.keystore.getSigner("2"))!;
    const walletAddress3 = new Address(`0:${user3.publicKey}`);

    const users = [walletAddress2, walletAddress3]
    const daiAmounts = [10, 20]
    const payload = "te6ccgEBAQEAAgAAAA=="

    // wallet transfer
    const txS = await tokenWalletContract.methods.transfer({
        amount: "100",
        recipient: (walletAddress2),
        deployWalletValue: toNano(0.1),
        remainingGasTo: (account.address),
        notify: true,
        payload:payload

    }).send({ from: account.address, amount: toNano(2), bounce: true, });

    console.log("tx", txS);

    balance = await tokenWalletContract.methods.balance({ answerId: 0 }).call();
    console.log("DAI balance :: of owner", balance);


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


    //     const deposit_admin = await treasuryContract.methods
    //         .deposit_admin({ users, daiAmounts, payload })
    //         .send({ from: account.address, amount: toNano(5) });

    //     console.log("deposit_admin ::", deposit_admin);

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



