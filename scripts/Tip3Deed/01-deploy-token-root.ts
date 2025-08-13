import { Address, getRandomNonce, toNano, zeroAddress } from "locklift"
import BigNumber from "bignumber.js"
// import { TokenRoot } from "@broxus/tip3/build/"
async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!
  const address = `0:${signer.publicKey}`
  // Address of initial token supply recipient (write your own)

  const wallet = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
  // const initialSupplyTo   = new Address(address)
  // Address of token owner (write your own)
  // const rootOwner         = new Address(address)

  const rootOwner         = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
  const initialSupplyTo   = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081")
  // Name of the token     
  const name              = "DAI Token"
  // Symbol of the token
  const symbol            = "DAI"
  // How many token will be issued instantly after deploy                
  const initialSupply     = 1000000000
  // The number of decimals the token uses        
  const decimals          = 18
  // If `true`, disables token minting
  const disableMint       = false
  // If `true`, disables token burning by root                
  const disableBurnByRoot = false
  // If `true`, pauses token burning                
  const pauseBurn         = false
                  
  
  /* 
    Returns compilation artifacts based on the .tsol file name
      or name from value config.externalContracts[pathToLib].
  */
  const TokenWallet_ = locklift.factory.getContractArtifacts("TokenWallet");
  
  // const { code: TokenWallet } =
  // locklift.factory.getContractArtifacts('TokenWallet');
  /* 
    Deploy the TIP-3 Token Root contract.
    @params deployWalletValue: Along with the deployment of the root token,
      the wallet will be automatically deployed to the owner. 
      This is the amount of EVERs that will be sent to the wallet.
  */
  const { contract: DAI } = await locklift.factory.deployContract({
    contract: "TokenRoot",
    publicKey: signer.publicKey,
    initParams: {
      deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)
      randomNonce_: getRandomNonce(),
      rootOwner_: rootOwner,
      name_: name,
      symbol_: symbol,
      decimals_: decimals,
      walletCode_: TokenWallet_.code,
    },
    constructorParams: {
      initialSupplyTo: initialSupplyTo,
      initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
      deployWalletValue: toNano(1),
      mintDisabled: disableMint,
      burnByRootDisabled: disableBurnByRoot,
      burnPaused: pauseBurn,
      remainingGasTo: zeroAddress,
    },
    value: toNano(3),
  })
  // const { contract: USDT } = await locklift.factory.deployContract({
  //   contract: "TokenRoot",
  //   publicKey: signer.publicKey,
  //   initParams: {
  //     deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)
  //     randomNonce_: getRandomNonce(),
  //     rootOwner_: rootOwner,
  //     name_: "USDT",
  //     symbol_: "USDT",
  //     decimals_: decimals,
  //     walletCode_: TokenWallet_.code,
  //   },
  //   constructorParams: {
  //     initialSupplyTo: initialSupplyTo,
  //     initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
  //     deployWalletValue: toNano(1),
  //     mintDisabled: disableMint,
  //     burnByRootDisabled: disableBurnByRoot,
  //     burnPaused: pauseBurn,
  //     remainingGasTo: zeroAddress,
  //   },
  //   value: toNano(5),
  // })
  // const { contract: WETH } = await locklift.factory.deployContract({
  //   contract: "TokenRoot",
  //   publicKey: signer.publicKey,
  //   initParams: {
  //     deployer_: zeroAddress, // this field should be zero address if deploying with public key (see source code)
  //     randomNonce_: getRandomNonce(),
  //     rootOwner_: rootOwner,
  //     name_: "WETH",
  //     symbol_: "WETH",
  //     decimals_: decimals,
  //     walletCode_: TokenWallet_.code,
  //   },
  //   constructorParams: {
  //     initialSupplyTo: initialSupplyTo,
  //     initialSupply: new BigNumber(initialSupply).shiftedBy(decimals).toFixed(),
  //     deployWalletValue: toNano(1),
  //     mintDisabled: disableMint,
  //     burnByRootDisabled: disableBurnByRoot,
  //     burnPaused: pauseBurn,
  //     remainingGasTo: zeroAddress,
  //   },
  //   value: toNano(5),
  // })

  console.log(`DAI: ${DAI.address}`)
  // console.log(`USDT: ${USDT.address}`)
  // console.log(`WETH: ${WETH.address}`)
}

main()
  .then(() => process.exit(0))
  .catch(e => {
    console.log(e)
    process.exit(1)
  })
