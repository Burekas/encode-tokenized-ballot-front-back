import { useEffect, useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { ethers } from "ethers";
import { parseUnits } from "viem";
import { useContractRead, useContractReads, useContractWrite } from "wagmi";

export const Vote = () => {
  const [proposals, setProposals] = useState([]);
  const proposalCount = 3;

  const calls = Array.from({ length: proposalCount }, (_, i) => ({
    address: "0xDa7A230F9014Dc3cafBb05EFdA636617503FFEF6",
    contractInterface: tokenJson.abi,
    functionName: "proposals",
    args: [i],
  }));

  const { data, isError, isLoading } = useContractReads({
    contracts: calls,
  });

  const handleSubmit = event => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const selectedProposalIndex = formData.get("proposal");
    console.log("Selected proposal:", selectedProposalIndex);

    const { data, isLoading, isSuccess, write } = useContractWrite({
      address: "0xDa7A230F9014Dc3cafBb05EFdA636617503FFEF6",
      abi: tokenJson.abi,
      functionName: "vote",
      args: [selectedProposalIndex, parseUnits("100", 18)],
    });

    console.log(data);

    // TODO call the contract
  };

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Proposals </h2>
        {proposals.map((proposal, index) => (
          <div key={index}>{proposal}</div>
        ))}

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Choose a proposal to vote for:</legend>

            {data.map((proposal, index) => (
              <div key={index}>
                <input type="radio" id={`${index}`} name="proposal" value={index} />
                <label htmlFor={`${index}`}>{ethers.decodeBytes32String(proposal.result[0])}</label>
              </div>
            ))}
          </fieldset>

          <button className="btn btn-active btn-neutral" type="submit">
            Vote
          </button>
        </form>
      </div>
    </div>
  );
};
