import { UserDTO, UserRegisterDTO, UserUpdateDTO } from '../dto/user.dto';
import { User } from '../models/user.model';

export class UserRepository {
  async createUser(userData: UserRegisterDTO): Promise<[UserDTO | null, Error | null]> {
    try {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password
      });
      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  async findUserByEmail(email: string): Promise<[UserDTO | null, Error | null]> {
    try {
      const user = await User.findOne({ where: { email } });
      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  async findUserById(id: string): Promise<[UserDTO | null, Error | null]> {
    try {
      const user = await User.findOne({ where: { id } });
      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  async updateUserById(id: string, userData: UserUpdateDTO): Promise<[UserDTO, null] | [null, Error]> {
    try {
      const updatedUser = await User.update(userData, {
        where: { id },
        returning: true
      });

      return [updatedUser[1][0], null];
    } catch (error:any) {
      return [null, error];
    }
  }

  async deleteUserById(id: string): Promise<[boolean, Error | null]> {
    try {
      const rowsDeleted = await User.destroy({ where: { id } });
      return [rowsDeleted > 1, null];
    } catch (error:any) {
      return [false, error];
    }
  }

  async findAllUsers(): Promise<[User[] | null, Error | null]> {
    try {
      const users = await User.findAll();
      return [users, null];
    } catch (error:any) {
      return [null, error];
    }
  }
}
