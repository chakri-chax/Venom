import { toNano, WalletTypes, Address,getRandomNonce } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;


  const nftArtifacts = await locklift.factory.getContractArtifacts("Nft");
  const indexArtifacts = await locklift.factory.getContractArtifacts("Index");
  const indexBasisArtifacts =
    await locklift.factory.getContractArtifacts("IndexBasis");


  const owner = new Address(
    "0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081"
  );




  const json = {
    type: "DEED",
    name: "DEED NFT",
    description:
      "Mprofy DEED NFTs Mprofy DEED NFTs lie at the center of the whole Mprofy ecosystem. DEED NFTs verify ownership of your identity and social capital in all engagements and interactions in the Mprofy dApp and member platform. DEED NFTs represent so much more than art or other digital assets. They epitomize the concept of utility NFTs. They unlock the full range of what Mprofy has to offer. They signify the inherent value of the individual that extends to the infinite worth of human associations and connections, ownership of which is each person’s inalienable right and privilege. DEED NFTs are an immutable claim to this property, immortalized on blockchain – hence the name “DEED.” How to Obtain DEED NFTs While available for direct purchase, DEED NFTs can also be obtained as an upgrade on our entry-level SEED NFTs by personally inviting five SEED NFT holders. Data transfer: The data is transferred from the SEED to the DEED. Burning: The SEED NFT is burned upon upgrading. 🚀 DEED NFTs represent your true ownership in the Mprofy ecosystem and are your gateway to the full potential of Web3.",
    preview: {
      source:
        "https://mprofy-web2.s3.us-east-2.amazonaws.com/uploads/1749582231984-NFT_DEED_DISCOVERY.jpg",
      mimetype: "image/jpeg",
    },
    files: [
      {
        source:
          "https://mprofy-web2.s3.us-east-2.amazonaws.com/uploads/1749582231984-NFT_DEED_DISCOVERY.jpg",
        mimetype: "image/jpeg",
      },
    ],
    external_url: "https://mprofy.com/",
  };
  
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "Collection",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: getRandomNonce(),
    },
    constructorParams: {
      codeNft: nftArtifacts.code,
      codeIndex: indexArtifacts.code,
      codeIndexBasis: indexBasisArtifacts.code,
      owner: owner, //   address owner,
      json : JSON.stringify(json), // 	string json,
      remainOnNft: locklift.utils.toNano(0.2), // 	uint128 remainOnNft,
      baseNftUrl: `https://coral-naval-clam-30.mypinata.cloud/ipfs/bafkreibjex2gx4xhkelgihafsv6i7c5enfsm4c3ks32d23ydeqvd3gelua`, // 	string baseNftUrl,
      collectionUrl: `https://coral-naval-clam-30.mypinata.cloud/ipfs/bafkreibjex2gx4xhkelgihafsv6i7c5enfsm4c3ks32d23ydeqvd3gelua`, //     string collectionUrl,
      genesisNftOwner: owner, // 	address genesisNftOwner,
      genesisNickName: `Mprofy`, // 	string genesisNickName
      nonce: getRandomNonce(), // 	uint64 nonce,
    },

    value: locklift.utils.toNano(1.5),
  });
  

  console.log(`Collection deployed at: ${sample.address.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
