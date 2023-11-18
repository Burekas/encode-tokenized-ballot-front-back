import { useState } from "react";
import { signMessage } from "@wagmi/core"

export const RequestTokens = () => {
    const [data, setData] = useState<{ result: string }>();
    const [isLoading, setLoading] = useState(false);
    const [signature, setSignature] = useState("");
    const body = { signature: signature };
  
    if (isLoading) return <p>Loading...</p>;
    if (!signature)
    return (
      <button
        className="btn btn-active btn-neutral"
        onClick={async () => {
          setLoading(true);
          signMessage({
            message: "Sign message to get free tokens",
          }).then((value) => {
            setSignature(value);
            setLoading(false);
          });
        }}
      >
        Sign Message
      </button>
    );
    if (!data && signature)
      return (
        <button
          className="btn btn-active btn-neutral"
          onClick={async () => {
            setLoading(true);
            fetch("http://localhost:3001/mint-tokens", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            })
              .then((res) => res.json())
              .then((data) => {
                setData(data);
                setLoading(false);
              });
          }}
        >
          Request tokens
        </button>
      );

    return (
      <div>
        <p>Minted: {data?.result ? "Yes" : "No"}</p>
        <p>{data?.result}</p>
      </div>
    );
  };