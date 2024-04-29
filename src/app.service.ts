import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { OperationDto } from './dto/operation.dto';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}
  async getOperations() {
    try {
      return await this.prisma.operations.findMany();
    } catch (error) {
      throw new BadRequestException('Something went wrong');
    }
  }

  async depositOperation(body: OperationDto) {
    try {
      const totalAmount = await this.getMoneyAmount();
      const newBalance = totalAmount.amount + Number(body.amount);

      await this.prisma.money.update({
        where: { id: totalAmount.id },
        data: { amount: newBalance },
      });

      return await this.prisma.operations.create({
        data: {
          amount: Number(body.amount),
          balance: newBalance,
        },
      });
    } catch (error) {
      throw new BadRequestException('Deposit operation went wrong');
    }
  }

  async withdrawOperation(body: OperationDto) {
    try {
      const totalAmount = await this.getMoneyAmount();
      const newBalance = totalAmount.amount - Number(body.amount);

      await this.prisma.money.update({
        where: { id: totalAmount.id },
        data: { amount: newBalance },
      });

      return await this.prisma.operations.create({
        data: {
          amount: -Number(body.amount),
          balance: newBalance,
        },
      });
    } catch (error) {
      throw new BadRequestException('Withdraw operation went wrong');
    }
  }

  async sendOperation(body: OperationDto) {
    try {
      const totalAmount = await this.getMoneyAmount();
      const newBalance = totalAmount.amount - Number(body.amount);

      await this.prisma.money.update({
        where: { id: totalAmount.id },
        data: { amount: newBalance },
      });

      return await this.prisma.operations.create({
        data: {
          amount: -Number(body.amount),
          balance: newBalance,
        },
      });
    } catch (error) {
      throw new BadRequestException('Send operation went wrong');
    }
  }

  async getMoneyAmount() {
    try {
      const moneyAmount = await this.prisma.money.findFirst();

      if (!moneyAmount) {
        const createdMoney = await this.prisma.money.create({
          data: {
            amount: 1000,
          },
        });
        return createdMoney;
      } else {
        return moneyAmount;
      }
    } catch (error) {
      throw new BadRequestException('Error getting money amount:');
    }
  }
}
