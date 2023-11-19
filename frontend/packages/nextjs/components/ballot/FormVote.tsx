import { useState } from "react";
import * as tokenJson from "../assets/TokenizedBallot.json";
import { parseUnits } from "viem";
import { useContractWrite } from "wagmi";

const FormVote = () => {
  // State for the form
  const [selectedProposal, setSelectedProposal] = useState("");
  const [amount, setAmount] = useState("");

  const ballot_address = "0xb728bdeaCc467f22571D2bD234106ccD7b852e51";

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: ballot_address,
    abi: tokenJson.abi,
    functionName: "vote",
    args: [selectedProposal, parseUnits(amount, 18)],
  });

  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
      <div className="card-body">
        <h2 className="card-title">Vote </h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            write?.();
          }}
        >
          <div className="mb-2">
            <label>
              <input
                type="radio"
                value="0"
                key={0}
                checked={selectedProposal === "0"}
                onChange={() => setSelectedProposal("0")}
              />
              Vanilla
            </label>
            <label>
              <input
                type="radio"
                value="1"
                key={1}
                checked={selectedProposal === "1"}
                onChange={() => setSelectedProposal("1")}
              />
              Chocolate
            </label>
            <label>
              <input
                type="radio"
                value="3"
                key={3}
                checked={selectedProposal === "3"}
                onChange={() => setSelectedProposal("3")}
              />
              Chocolate Mint
            </label>

            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Amount?</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                value={amount}
                onChange={e => setAmount(e.target.value)}
              />
            </div>
          </div>

          <button className="btn btn-active btn-neutral" type="submit" disabled={!write || isLoading}>
            Submit Vote
          </button>
        </form>

        {isSuccess && (
          <div>
            <p>Submitted transaction:</p>
            <a href={`https://sepolia.etherscan.io/tx/${data?.hash}`} target="_blank">
              Etherscan
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default FormVote;
