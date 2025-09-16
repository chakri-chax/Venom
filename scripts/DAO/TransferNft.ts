import { Address, toNano } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;


  const chakri = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
  const chakri2 = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
  
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "TransferNft",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: locklift.utils.getRandomNonce(),
    },
    constructorParams: {

    },
    value: locklift.utils.toNano(1),
  });

  console.log(
    `Transfer  Contract deployed at: ${sample.address.toString()}`
  );

}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
