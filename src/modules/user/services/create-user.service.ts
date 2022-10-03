import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class CreateUserService {
  async execute(data: CreateUserDto): Promise<User> {
    const userRepository = new UserRepository();

    const newUser = await userRepository.createUser(data);

    return newUser;
  }
}
