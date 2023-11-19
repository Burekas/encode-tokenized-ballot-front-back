import { useEffect, useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { ethers } from "ethers";
import { parseUnits } from "viem";
import { useContractRead, useContractReads, useContractWrite } from "wagmi";

export const ShowProposals = () => {
  const [proposals, setProposals] = useState([]);

  const proposalCount = 3; // @todo add a count inside the contract

  const calls = Array.from({ length: proposalCount }, (_, i) => ({
    address: "0xDa7A230F9014Dc3cafBb05EFdA636617503FFEF6",
    contractInterface: tokenJson.abi,
    functionName: "proposals",
    args: [i],
  }));

  const { data, isError, isLoading } = useContractReads({
    contracts: calls,
  });

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!data) return <p>No token address information</p>;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Proposals </h2>
        {data.map((proposal, index) => (
          <p>{ethers.decodeBytes32String(proposal.result[0])}</p> // HELP TYPESCRIPT
        ))}
      </div>
    </div>
  );
};
