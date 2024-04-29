import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OperationDto } from './dto/operation.dto';

@Controller('operations')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getOperations() {
    return this.appService.getOperations();
  }

  @Get('money-amount')
  getMoneyAmount() {
    return this.appService.getMoneyAmount();
  }

  @Post('deposit')
  depositOperation(@Body() body: OperationDto) {
    return this.appService.depositOperation(body);
  }

  @Post('withdraw')
  withdrawOperation(@Body() body: OperationDto) {
    return this.appService.withdrawOperation(body);
  }

  @Post('send')
  sendOperation(@Body() body: OperationDto) {
    return this.appService.sendOperation(body);
  }
}
