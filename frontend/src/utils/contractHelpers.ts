import { ethers } from "ethers";

import { ELECTION_ADDRESS, ELECTION_ABI } from "../config/abi/election";

const getContract = (
  abi: any,
  address: string,
  signer?: ethers.Signer | ethers.providers.Provider
) => {
  return new ethers.Contract(address, abi, signer);
};

export const getElection = (signer?: ethers.Signer) => {
  return getContract(ELECTION_ABI, ELECTION_ADDRESS, signer);
};
