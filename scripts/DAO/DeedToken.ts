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
    const DeedTokenRootAddress = new Address("0:70061d6dff4577fa563cea2224958f057d600adf7caf0a327cc15aea36fe93a2");
    const { contract: treasuryContractInstance, tx } = await locklift.factory.deployContract({
        contract: "DeedToken",
        publicKey: signer.publicKey,
        initParams: {
            nonce_: locklift.utils.getRandomNonce(),
        },
        constructorParams: {
          _deedTokenRoot : DeedTokenRootAddress
        },
        value: locklift.utils.toNano(2),
    });

    console.log(`DeedToken deployed at :: ${treasuryContractInstance.address.toString()}`);


}

mainS()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });