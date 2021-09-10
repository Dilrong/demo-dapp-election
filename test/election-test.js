const { expect } = require("chai");

describe("Election contract", function () {
  it("should be candidates count 2.", async function () {
    const Election = await hre.ethers.getContractFactory("Election");

    const election = await Election.deploy();

    await election.setElection();
    expect(await election.candidatesCount()).to.equal(2);
  });

  it("should be candidates infomation correct values", async function () {
    const Election = await hre.ethers.getContractFactory("Election");

    const election = await Election.deploy();

    await election.setElection();
    const candidate = await election.candidates(1);
    expect(candidate[0]).to.equal(1);
    expect(candidate[1]).to.equal("Candidate 1");
    expect(candidate[2]).to.equal(0);
  });
});
