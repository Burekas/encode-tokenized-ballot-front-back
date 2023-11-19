import { useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { ShowProposals } from "./ShowProposals";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export const CheckHasVotingPower = (params: { address: `0x${string}` }) => {
  const { data, isError, isLoading } = useContractRead({
    address: "0xDa7A230F9014Dc3cafBb05EFdA636617503FFEF6", // @TODO get this from API OR .env ?
    abi: tokenJson.abi,
    functionName: "votingPower",
    args: [params.address],
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Error</p>;

  return (
    <>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">Has voting power ? </h2>
          <p>Curent voting power : {formatUnits(data as bigint, 18)}</p>
        </div>
      </div>
      <ShowProposals></ShowProposals>
    </>
  );
};
