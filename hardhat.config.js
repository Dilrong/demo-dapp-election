require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.4",
  networks: {
    l1: {
      url: process.env["L1RPC"] || "",
      accounts: [process.env["DEVNET_PRIVKEY"]],
    },
    l2: {
      gasPrice: 0,
      chainId: 421611,
      url: "https://rinkeby.arbitrum.io/rpc",
      accounts: [process.env["DEVNET_PRIVKEY"]],
    },
  },
};
