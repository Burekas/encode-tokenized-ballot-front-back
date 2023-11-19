import { TokenAddressFromApi } from "./TokenAddressFromApi";
import { RequestTokens } from "./RequestTokens";

export const  ApiData = () => {
    return (
      <div className="card lg:card-side bg-base-300 shadow-xl mb-4">
        <div className="card-body">
          <h2 className="card-title">API Data</h2>
          <TokenAddressFromApi></TokenAddressFromApi>
          <h3 className="mt-0">Request Tokens:</h3>
          <RequestTokens></RequestTokens>
        </div>
      </div>
    );
};