import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
const { hashMessage } = require("@ethersproject/hash");
import * as tokenJson from './assets/MyToken.json';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  
  contract: ethers.Contract;
  provider: ethers.Provider;
  wallet: ethers.Wallet;

  constructor(private configService: ConfigService) {
    this.provider = new ethers.JsonRpcProvider(
      this.configService.get<string>('RPC_ENDPOINT_URL'),
    );
    this.wallet = new ethers.Wallet(
      this.configService.get<string>('PRIVATE_KEY'),
      this.provider,
    );
    this.contract = new ethers.Contract(
      this.configService.get<string>('TOKEN_ADDRESS'),
      tokenJson.abi,
      this.wallet,
    );
  }

  getContractAddress(): string {
    return process.env.TOKEN_ADDRESS;
  }

  async mintTokens(signature: string) {
    const message = 'Sign message to get free tokens';
    const signer = ethers.recoverAddress(hashMessage(message), signature);
    const mintTx = await this.contract.mint(signer, ethers.parseUnits('100000000000000000'));
    await mintTx.wait();
    return mintTx.hash;
  }
}
