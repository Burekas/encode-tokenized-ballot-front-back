import { Controller, Get, Query, Body, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { MintTokenDto } from './dtos/MintToken.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('contract-address')
  getContractAddress(){
    return {address: this.appService.getContractAddress()};
  }

  @Post('mint-tokens')
  async mintTokens(@Body() body: MintTokenDto ) {
    return {hash: await this.appService.mintTokens(body.signature)};
  }
}

