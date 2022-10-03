import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from '../../../prisma/service/prisma.service';
import {
  CreateUserService,
  DeleteUserService,
  FindAllUsersServices,
  FindOneUserService,
  UpdateUserService,
} from './services';
import { UserController } from './user.controller';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [UserController],
  providers: [
    PrismaService,
    FindAllUsersServices,
    CreateUserService,
    FindOneUserService,
    UpdateUserService,
    DeleteUserService,
  ],
})
export class UserModule {}
