import { ApiProperty } from "@nestjs/swagger"
import { IsString, IsNotEmpty, IsNumber } from "class-validator"
import { TypeTicket } from "../util/typeTicket"

export class CreateTicketDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the ticket.',
    example: TypeTicket.VIP,
  })
  type: TypeTicket

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The bar code of the ticket.',
    example: 'bar code',
  })
  barCode: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The qr code of the ticket.',
    example: 'qr code',
  })
  qrCode: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The price of the ticket.',
    example: 199.00,
  })
  price: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The event id of the ticket.',
    example: 1,
  })
  eventId: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The batch id of the ticket.',
    example: 1,
  })
  batchId: number
}