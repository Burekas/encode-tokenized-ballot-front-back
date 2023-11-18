import { TokenAddressFromApi } from "./TokenAddressFromApi";
import { RequestTokens } from "./RequestTokens";

export const  ApiData = () => {
    return (
      <div className="card lg:card-side bg-base-300 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">API Data</h2>
          <TokenAddressFromApi></TokenAddressFromApi>
          <RequestTokens></RequestTokens>
        </div>
      </div>
    );
};