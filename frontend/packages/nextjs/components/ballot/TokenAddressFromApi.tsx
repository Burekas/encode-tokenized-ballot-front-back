import { useEffect, useState } from "react";

export const TokenAddressFromApi = () => {
    const [data, setData] = useState<{ result: string }>();
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
        <p className="mt-0">Token address: {data.result}</p>
      </div>
    );
};