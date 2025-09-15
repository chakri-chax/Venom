import { Address,toNano } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;
  

  const chakri = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
 
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "GovernanceToken",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: locklift.utils.getRandomNonce(),
    },
    constructorParams: {
       
        treasuryAddress:new Address("0:f0daf39ff1e0b6f0e40a8ec3c023aa01386ac939f5a09e68d179a2ed8e6efe89"),
        _deedNFT:new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
        _founderNFT:new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
        _admin:chakri,
        _complianers:[chakri]
    
    },
    value: locklift.utils.toNano(1),
  });
// 0:f0daf39ff1e0b6f0e40a8ec3c023aa01386ac939f5a09e68d179a2ed8e6efe89 treasury address on sep1 2025
// 0:8f19e4ab14fd2e9f4e44174441dc86c3883477bac4b76fb51e9518c5806c69c1 governance address on sep1 2025  
console.log(
    `Governance  Contract deployed at: ${sample.address.toString()}`
  );

  // create a proposal 
console.log("create a proposal",new Date().getTime());

   {
        const { traceTree } = await locklift.tracing.trace(
          sample.methods
                .createProposalRequest({
                  _title: "My First Proposal ",
                  _description: "This is my first proposal",
                  _vote_start: 0, 
                  _vote_end: 10,
                  _ptype: 2,
                  _minVoters: 1,
                  _minPercent: 20,
                  amount: (0),
                  _blockAddress: new Address("0:0000000000000000000000000000000000000000000000000000000000000000"),

                })
                .send({
                    from: chakri,
                    amount: toNano(1),
                }),
        );

        await traceTree?.beautyPrint();
    }
  
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
