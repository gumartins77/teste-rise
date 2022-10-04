import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  NotEquals,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 45)
  @ApiProperty({
    description: 'The name of the event.',
    example: 'Rock in Rio',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The description of the event.',
    example: 'Very Rock in city',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The image url of the event.',
    example: '',
  })
  imageGallery: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 45)
  @ApiProperty({
    description: 'The date of the event.',
    example: '28/01/2023-20:00:00',
  })
  eventDataTime: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The location of the event.',
    example: '',
  })
  eventLocation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The location coordinates of the event.',
    example: '',
  })
  locationCoordinates: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The important informations of the event.',
    example: '',
  })
  importantInformation: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The image map of the event.',
    example: '',
  })
  eventMap: string;
}
