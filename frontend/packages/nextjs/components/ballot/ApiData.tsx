import { useEffect, useState } from "react";
import { RequestTokens } from "./RequestTokens";
import { DelegateVotingPower } from "./DelegateVotingPower";

export const  ApiData = () => {
  const [data, setData] = useState<{ address: string }>();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/contract-address")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading token address from API...</p>;
  if (!data) return <p>No token address information</p>;

  return (
    <div>
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">API Data</h2>
          <p className="mt-0">Token address: {data.address}</p>
          <h3 className="mt-0">Request Tokens:</h3>
          <RequestTokens></RequestTokens>
        </div>
      </div>
      <DelegateVotingPower contractAddress={data?.address as `0x${string}`}></DelegateVotingPower>
    </div>
    
  );
};