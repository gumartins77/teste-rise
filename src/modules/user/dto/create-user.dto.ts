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
import { UserRole } from '../util/roleUser';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 45)
  @ApiProperty({
    description: 'The name of the user.',
    example: 'Charles Xavier',
  })
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @Length(5, 45)
  @ApiProperty({
    description: 'The email of the user.',
    example: 'user@email.com',
  })
  email: string;

  @IsString()
  @Length(8, 50)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  @ApiProperty({
    description: 'The password of the user.',
    example: 'Rise12@#',
  })
  passwordHash: string;
}
