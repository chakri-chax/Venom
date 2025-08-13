import { Address } from "locklift";

async function mainS() {
    const signer = (await locklift.keystore.getSigner("0"))!;
    const walletAddress = `0:${signer.publicKey}`;
    console.log(" Signer address:", signer!);
    const asset1 = new Address("0:a75719da389ed281dfa6182418ede140415441a0fc564c5788b24baba19ced9d")
    const deedNFT = new Address("0:a75719da389ed281dfa6182418ede140415441a0fc564c5788b24baba19ced9d");
    // const walletAddress = "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081";
    console.log(" Signer address:", signer.publicKey!);
    
    const { contract: treasuryContract, tx } = await locklift.factory.deployContract({
      contract: "Treasury",
      publicKey: signer.publicKey,
      initParams: {
        nonce_: locklift.utils.getRandomNonce(),
      },
      constructorParams: {
        _assets:[asset1,asset1,asset1,asset1,asset1],
        _assetsdecimals:[6,6,6,6,6],
        _assetAllocations:[5,10,20,40,25],
        _owner: new Address(walletAddress),
        _deedNFT: deedNFT,
        _founderNFT: deedNFT,
        _mainWallet: new Address(walletAddress),
        _priceFeed:[asset1,asset1,asset1,asset1,asset1],
        _deedToken: asset1,
        _DaiToEthPriceFeed : asset1,
        _depositingAddress:new Address(walletAddress),
        _WETH: asset1,
        _nonce: locklift.utils.getRandomNonce(),
      },
      value: locklift.utils.toNano(1.5),
    });
  
    console.log(`Treasury deployed at :: ${ treasuryContract.address.toString()}`);
  }
  
  mainS()
    .then(() => process.exit(0))
    .catch(e => {
      console.log(e);
    //   console.log("transaction",e.transaction);

      process.exit(1);
    });
  
  
    
  