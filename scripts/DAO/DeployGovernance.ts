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
       
        treasuryAddress:new Address("0:98f6da4d2c283018b9174d2c6863d458bc925fb84a52697dc129f618a9f84e13"),
        _deedNFT:new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
        _founderNFT:new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
        _admin:chakri,
        _complianers:[chakri]
    
    },
    value: locklift.utils.toNano(1),
  });

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
