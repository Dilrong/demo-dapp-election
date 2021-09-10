const { expect } = require("chai");

describe("Election contract", function () {
  it("should be candidates count 3.", async function () {
    const l2Wallet = (await hre.ethers.getSigners())[0];

    const L2Election = await (
      await ethers.getContractFactory("Election")
    ).connect(l2Wallet);

    const l2election = await L2Election.deploy();
    await l2election.deployed();

    count = await l2election.candidatesCount();
    expect(count.toNumber()).to.equal(3);
  });

  it("should be candidates infomation correct values", async function () {
    const l2Wallet = (await hre.ethers.getSigners())[0];

    const L2Election = await (
      await ethers.getContractFactory("Election")
    ).connect(l2Wallet);

    const l2election = await L2Election.deploy();
    await l2election.deployed();

    const candidate1 = await l2election.candidates(1);
    expect(candidate1[0].toNumber()).to.equal(1);
    expect(candidate1[1]).to.equal("dilrong");
    expect(candidate1[2].toNumber()).to.equal(0);
  });

  it("should be vote for dilrong", async function () {
    const l2Wallet = (await hre.ethers.getSigners())[0];

    const L2Election = await (
      await ethers.getContractFactory("Election")
    ).connect(l2Wallet);

    const l2election = await L2Election.deploy();
    await l2election.deployed();

    let candidateId;
    let candidate;
    let voteCount;
    candidateId = 1;

    const voteTx1 = await l2election.vote(candidateId);
    const vote1Rec = await voteTx1.wait();
    expect(vote1Rec.status).to.equal(1);

    const voted = await l2election.voters(l2Wallet.address);
    expect(voted).to.be.true;

    //Fetch the candidate1 voteCount and make sure it's equal to 1
    candidate = await l2election.candidates(candidateId);
    voteCount = candidate[2];
    expect(voteCount.toNumber()).to.equal(1);

    //Fetch Candidate2 and make sure it did not receive any votes yet
    candidate = await l2election.candidates(2);
    voteCount = candidate[2];
    expect(voteCount.toNumber()).to.equal(0);
  });
});
