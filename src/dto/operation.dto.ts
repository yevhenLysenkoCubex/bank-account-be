import { IsString } from 'class-validator';

export class OperationDto {
  @IsString()
  amount: string;
}
