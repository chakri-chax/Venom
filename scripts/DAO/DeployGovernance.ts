import { Address, toNano } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;


  const chakri = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
  const chakri2 = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
  
  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "GovernanceToken",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: locklift.utils.getRandomNonce(),
    },
    constructorParams: {

      treasuryAddress: new Address("0:d057a09fb20826c425bb86751cac9d71feafd47a106c9f31ad6eb8f8bda5820b"),
      _deedNFT: new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
      _founderNFT: new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
      _admin: chakri,
      _complianers: [chakri]

    },
    value: locklift.utils.toNano(1),
  });

  console.log(
    `Governance  Contract deployed at: ${sample.address.toString()}`
  );

  // create a proposal 
  console.log("create a proposal --> BLOCK USER", new Date().getTime());

  {
    const { traceTree } = await locklift.tracing.trace(
      sample.methods
        .createProposalRequest({
          _title: "Blocking Address ",
          _description: "Blocking proposal",
          _vote_start: 0,
          _vote_end: 10,
          _ptype: 4, // ProposalType.BLOCK_USER
          _minVoters: 2,
          _minPercent: 50,
          amount: (0),
          _blockAddress: new Address("0:7179e9aeb58d6fe97610ffcf605eded4f3a161cee84bc0d67bfdf55e6a6a6491"),

        })
        .send({
          from: chakri,
          amount: toNano(1),
        }),
    );

    await traceTree?.beautyPrint();
  }
  console.log("create a proposal -->UN BLOCK USER", new Date().getTime());

  {
    const { traceTree } = await locklift.tracing.trace(
      sample.methods
        .createProposalRequest({
          _title: "UnBlocking Address ",
          _description: "This is my first proposal",
          _vote_start: 0,
          _vote_end: 10,
          _ptype: 5, // ProposalType.UNBLOCK_USER
          _minVoters: 2,
          _minPercent: 50,
          amount: (0),
          _blockAddress: new Address("0:7179e9aeb58d6fe97610ffcf605eded4f3a161cee84bc0d67bfdf55e6a6a6491"),

        })
        .send({
          from: chakri,
          amount: toNano(1),
        }),
    );

    await traceTree?.beautyPrint();
  }
  // vote on the proposal
  console.log("vote on the proposal --> BLOCK USER", new Date().getTime());

  {
    const { traceTree } = await locklift.tracing.trace(
      sample.methods
        .voteByUser({
          _propID: 0,
          _supports: true,
        })
        .send({
          from: chakri,
          amount: toNano(1),
        }),
    );

    await traceTree?.beautyPrint();
  }

  // console.log("vote on the proposal --> UN BLOCK USER", new Date().getTime());

  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .voteByUser({
  //         _propID: 1,
  //         _supports: true,
  //       })
  //       .send({
  //         from: chakri,
  //         amount: toNano(1),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }


  // create a proposal for complaince 
  // console.log("create a proposal --> COMPLAINCE USER", new Date().getTime());

  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .createProposalRequest({
  //         _title: "Complaince Address ",
  //         _description: "Complaince proposal",
  //         _vote_start: 0,
  //         _vote_end: 10,
  //         _ptype: 2, // ProposalType.COMPLIANCE
  //         _minVoters: 1,
  //         _minPercent: 50,
  //         amount: (0),
  //         _blockAddress: new Address("0:0000000000000000000000000000000000000000000000000000000000000000"),

  //       })
  //       .send({
  //         from: chakri2,
  //         amount: toNano(1),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
