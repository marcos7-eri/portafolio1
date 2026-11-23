import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';

@Controller('api')
export class PortfolioController {
  constructor(@Inject(PortfolioService) private readonly portfolio: PortfolioService) {}
  @Get('health') health() { return {status:'ok'}; }
  @Get('profile') profile() { return this.portfolio.profile(); }
  @Get('projects') projects() { return this.portfolio.projects(); }
  @Post('contact') contact(@Body() body: {name?:string; email?:string; message?:string}) { return this.portfolio.contact(body); }
}
