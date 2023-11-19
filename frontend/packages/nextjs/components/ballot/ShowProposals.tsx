import { useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { ethers } from "ethers";
import { useContractReads } from "wagmi";

export const ShowProposals = () => {
  const [proposals, setProposals] = useState([]);

  const proposalCount = 3; // @todo add a count inside the contract

  const ballot_address = "0xb728bdeaCc467f22571D2bD234106ccD7b852e51"; // @todo get this from API OR .env ?

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        address: ballot_address,
        abi: tokenJson.abi,
        functionName: "proposals",
        args: [0],
      },
      {
        address: ballot_address,
        abi: tokenJson.abi,
        functionName: "proposals",
        args: [1],
      },
      {
        address: ballot_address,
        abi: tokenJson.abi,
        functionName: "proposals",
        args: [2],
      },
    ],
  });

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!data) return <p>No token address information</p>;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Proposals </h2>
        {data.map((proposal: any, index: number) => (
          <p key={index}>{ethers.decodeBytes32String(proposal.result[0])}</p>
        ))}
      </div>
    </div>
  );
};
