import { useWeb3React } from "@web3-react/core";
import { useMemo } from "react";
import { getElection } from "../utils/contractHelpers";

export const useElection = () => {
  const { library } = useWeb3React();
  return useMemo(() => getElection(library?.getSigner()), [library]);
};
