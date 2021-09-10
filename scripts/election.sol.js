const hre = require("hardhat");
require("dotenv").config();

const requireEnvVariables = (envVars) => {
  for (const envVar of envVars) {
    if (!process.env[envVar]) {
      throw new Error(`Error: set your '${envVar}' environmental variable `);
    }
  }
  console.log("Environmental variables properly set 👍");
};

requireEnvVariables(["DEVNET_PRIVKEY", "L2RPC"]);

async function main() {
  const l2Wallet = (await hre.ethers.getSigners())[0];
  console.log("Your wallet address:", l2Wallet.address);

  const L2Election = await (
    await ethers.getContractFactory("Election")
  ).connect(l2Wallet);
  console.log("Deploying Election contract to L2");
  const l2election = await L2Election.deploy();
  await l2election.deployed();

  console.log(
    `Election contract is initialized with 3 candidates and deployed to ${l2election.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
