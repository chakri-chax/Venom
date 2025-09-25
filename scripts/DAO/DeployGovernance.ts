import { Address, toNano } from "locklift";

async function main() {
  const signer = (await locklift.keystore.getSigner("0"))!;


  const chakri = new Address("0:777fa2283eea7b1364b015571c4d3649f4f501d83d24e4f8876e753fc3ab5081");
  const chakri2 = new Address("0:1c91894d1170cc8b9465b45d2aaaa0110ec3c0bb9e450aba57f0361408fb5263");
  
  const treasuryAddress_ = new Address("0:ab2b7c3e557524adeffb446e1d2380c3765499e999d97a9e641d5d385c564d9c");

  const { contract: sample, tx } = await locklift.factory.deployContract({
    contract: "GovernanceToken",
    publicKey: signer.publicKey,
    initParams: {
      nonce_: locklift.utils.getRandomNonce(),
    },
    constructorParams: {

      treasuryAddress:treasuryAddress_,
      _deedNFT: new Address("0:9fae74f1be8463f2d707946ef0ec041a36e74bf93e1d3d8ec7556c3d316dc33f"),
      _founderNFT: new Address("0:63e1aac8fa36ab60ba041b09888da2eda43b4d1489480fcd9f0b2e86e0a1270a"),
      _admin: chakri,
      _complianers: [chakri]
    

    },
    value: locklift.utils.toNano(1),
  });

  console.log(
    `Governance  Contract deployed at: ${sample.address.toString()}`
  );


  // update governance to treasury

  const treasury = locklift.factory.getDeployedContract("Treasury", treasuryAddress_);
  {
    const { traceTree } = await locklift.tracing.trace(
      treasury.methods
        .updateGovernance({
          _newGovernance: sample.address,
        })
        .send({
          from: chakri,
          amount: toNano(1),
        }),
    );

    await traceTree?.beautyPrint();
  }


  // release funds from governance token

  // try{
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .releaseFundsFromProposal({
  //         amount: (5),
  //         to: chakri,
  //       })
  //       .send({
  //         from: chakri,
  //         amount: toNano(5),
  //       }),
  //   );
  // }catch(e){}
  // ******************************* create a proposal BLOCK USER ****************************** 
  console.log("create a proposal --> BLOCK USER", new Date().getTime());

  {
    const { traceTree } = await locklift.tracing.trace(
      sample.methods
        .createProposalRequest({
          _title: "Blocking Address ",
          _description: "Blocking proposal",
          _vote_start: 0,
          _vote_end: 1, // 1 day
          _ptype: 4, // ProposalType.BLOCK_USER
          _minVoters: 1,
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

  // ******************************* create a proposal Funding ****************************** 
  // const endTime = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 1 week from now
  // console.log("create a proposal --> FUNDING", new Date().getTime());
  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .createProposalRequest({
  //         _title: "Funding proposal ",
  //         _description: "Funding proposal",
  //         _vote_start: 0,
  //         _vote_end: endTime,
  //         _ptype: 4, // ProposalType.BLOCK_USER
  //         _minVoters: 2,
  //         _minPercent: 50,
  //         amount: (1),
  //         _blockAddress: new Address("0:0000000000000000000000000000000000000000000000000000000000000000"),

  //       })
  //       .send({
  //         from: chakri,
  //         amount: toNano(1),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }
  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .setFundingParams({
  //         _proposalId: 0,
  //         Interval:10,
  //         _claimPercemt:100
  //       })
  //       .send({
  //         from: chakri,
  //         amount: toNano(1),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }
  // console.log("create a proposal -->UN BLOCK USER", new Date().getTime());

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

  // ****************************** vote on the proposal ******************************

  // console.log("vote on the proposal --> BLOCK USER", new Date().getTime());

  // {
  //   const { traceTree } = await locklift.tracing.trace(
  //     sample.methods
  //       .voteByUser({
  //         _propID: 0,
  //         _supports: true,
  //       })
  //       .send({
  //         from: chakri,
  //         amount: toNano(1),
  //       }),
  //   );

  //   await traceTree?.beautyPrint();
  // }

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


    // ******************************* Get Callback ************************************************
    // try {
    //     {
    //         const { traceTree } = await locklift.tracing.trace(
    //             sample.methods
    //                 .getCallbackAmount({

    //                 })
    //                 .send({
    //                     from: chakri,
    //                     amount: toNano(2),
    //                 }),
    //         );

    //         await traceTree?.beautyPrint();
    //     }
    // } catch (error) {
    //     console.log('====================================');
    //     console.log(error);
    //     console.log('====================================');
    // }

}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
