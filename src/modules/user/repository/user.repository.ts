import { NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { handleError } from '../../../shared/utils/handle-error.util';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../util/roleUser';

export class UserRepository extends PrismaClient {
  private userSelect = {
    id: true,
    name: true,
    email: true,
    role: true,
    passwordHash: false,
  };
  async createUser(data: CreateUserDto) {
    const newUser = await this.user
      .create({
        data: {
          name: data.name,
          email: data.email,
          passwordHash: await bcrypt.hash(data.passwordHash, 10),
          role: UserRole.USER,
        },
      })
      .catch(handleError);

    delete newUser.passwordHash;

    return newUser;
  }

  async findAllUsers() {
    const users = await this.user
      .findMany({
        select: this.userSelect,
      })
      .catch(handleError);

    if (users.length === 0) {
      throw new NotFoundException('No a users found');
    }

    return users;
  }

  async findOneUser(userId: number) {
    const user = await this.user
      .findFirst({
        where: { id: userId },
      })
      .catch(handleError);

    if (!user) {
      throw new NotFoundException(`User with Id '${userId}' not found!`);
    }

    delete user.passwordHash;

    return user;
  }

  async updateUser(userId: number, data: UpdateUserDto): Promise<User> {
    const updatedUser = await this.user
      .update({
        where: { id: userId },
        data: {
          name: data.name,
          email: data.email,
          passwordHash: data.passwordHash,
          role: UserRole.USER,
        },
      })
      .catch(handleError);

    delete updatedUser.passwordHash;

    return updatedUser;
  }

  async deleteUser(userId: number): Promise<object> {
    await this.user
      .delete({
        where: { id: userId },
      })
      .catch(handleError);

    return { message: 'User deleted successfully' };
  }
}
