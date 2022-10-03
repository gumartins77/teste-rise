import { UserRepository } from '../repository/user.repository';

export class FindAllUsersServices {
  async execute() {
    const userRepository = new UserRepository();

    const users = await userRepository.findAllUsers();

    return users;
  }
}
