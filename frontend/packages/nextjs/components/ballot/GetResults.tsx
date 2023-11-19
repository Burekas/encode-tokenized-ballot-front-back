import { useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { BytesLike, ethers } from "ethers";
import { useContractRead, useContractReads, useContractWrite } from "wagmi";

export const GetResult = () => {
  const [triggerRead, setTriggerRead] = useState(false);
  const ballot_address = "0xb728bdeaCc467f22571D2bD234106ccD7b852e51"; // @todo get this from API OR .env ?

  const { data, isError, isLoading } = useContractRead({
    address: ballot_address, // @TODO get this from API OR .env ?
    abi: tokenJson.abi,
    functionName: "winnerName",
  });

  const handleButtonClick = () => {
    setTriggerRead(true);
  };

  if (isLoading) return <p>Loading ...</p>;
  if (!data) return <p>Error loading results</p>;

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Winner </h2>

        {!triggerRead && (
          <button className="btn btn-active btn-neutral" onClick={handleButtonClick}>
            Get winner
          </button>
        )}
        {triggerRead && (
          <div>
            <p>Winner is: {ethers.decodeBytes32String(data as BytesLike)}</p>
          </div>
        )}
      </div>
    </div>
  );
};
