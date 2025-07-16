import { Address } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts =
    await locklift.factory.getContractArtifacts("IndexBasis");

  const owner = new Address(
    "0:41d0f5b6e283001fe430f9ccc71cd04f0ed8f2962220b5a5ec21c7c007dc9f2a"
  );

  const burner = new Address("0:52f753f74a0bff42ad26d76a9c1a648a8964459aa5f239268ab83b607658afed");
  const warehouse = new Address("0:8a614d32625c62af8ebd2cad97e257991043aa6ce6c937bfbf0cd18ad7f0d813");
// const warehouseWallet = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
// const routingWallet = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
// const jsonPayload = {
  //   type: "DEED",
  //   name: "DEED NFT",
  //   description:
  //     "Mprofy DEED NFTs Mprofy DEED NFTs lie at the center of the whole Mprofy ecosystem. DEED NFTs verify ownership of your identity and social capital in all engagements and interactions in the Mprofy dApp and member platform. DEED NFTs represent so much more than art or other digital assets. They epitomize the concept of utility NFTs. They unlock the full range of what Mprofy has to offer. They signify the inherent value of the individual that extends to the infinite worth of human associations and connections, ownership of which is each person’s inalienable right and privilege. DEED NFTs are an immutable claim to this property, immortalized on blockchain – hence the name “DEED.” How to Obtain DEED NFTs While available for direct purchase, DEED NFTs can also be obtained as an upgrade on our entry-level SEED NFTs by personally inviting five SEED NFT holders. Data transfer: The data is transferred from the SEED to the DEED. Burning: The SEED NFT is burned upon upgrading. 🚀 DEED NFTs represent your true ownership in the Mprofy ecosystem and are your gateway to the full potential of Web3.",
  //   preview: {
  //     source:
  //       "https://mprofy-web2.s3.us-east-2.amazonaws.com/uploads/1749582231984-NFT_DEED_DISCOVERY.jpg",
  //     mimetype: "image/jpeg",
  //   },
  //   files: [
  //     {
  //       source:
  //         "https://mprofy-web2.s3.us-east-2.amazonaws.com/uploads/1749582231984-NFT_DEED_DISCOVERY.jpg",
  //       mimetype: "image/jpeg",
  //     },
  //   ],
  //   external_url: "https://mprofy.com/",
  // };
  
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "FounderNFTCollection",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
      codeNft: nftArtifacts.code,
      codeIndex: indexArtifacts.code,
      codeIndexBasis: indexBasisArtifacts.code,
      owner: burner,
      remainOnNft: locklift.utils.toNano(0.2),
      baseNftUrl: `https://purple-definite-trout-798.mypinata.cloud/ipfs/QmNT6pU4kLmQ9AKJ9WWjyqsoemNPecCbbRsjJNKUv4MN9j/`, // 	string baseNftUrl,
      collectionUrl: `https://coral-naval-clam-30.mypinata.cloud/ipfs/bafkreibjex2gx4xhkelgihafsv6i7c5enfsm4c3ks32d23ydeqvd3gelua`, //     string collectionUrl,
     
      _warehouseWallet: warehouse,
      _routingWallet: burner,
      _baseTokenURI: `https://purple-definite-trout-798.mypinata.cloud/ipfs/QmNT6pU4kLmQ9AKJ9WWjyqsoemNPecCbbRsjJNKUv4MN9j/`,
      _nonce: locklift.utils.getRandomNonce(),
    },
    value: locklift.utils.toNano(1.5),
  });

  console.log(
    `Founder NFT Collection deployed at: ${sample.address.toString()}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
