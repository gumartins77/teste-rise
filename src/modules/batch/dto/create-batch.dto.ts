import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, Length, IsNumber } from "class-validator";

export class CreateBatchDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The name of the batch.',
    example: 'Sul',
  })
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The quantity sales of the batch.',
    example: 2,
  })
  batchSales: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The deadline of the batch.',
    example: '25/01/2023',
  })
  batchDeadline: string;
}