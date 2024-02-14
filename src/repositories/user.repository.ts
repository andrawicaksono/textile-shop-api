import { UserDTO, UserRegisterDTO, UserUpdateDTO } from '../dto/user.dto';
import { User } from '../models/user.model';

export class UserRepository {
  createUser = async (userData: UserRegisterDTO): Promise<[UserDTO | null, Error | null]> => {
    try {
      const user = await User.create({
        name: userData.name,
        email: userData.email,
        password: userData.password,
        role: userData?.role
      });

      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  findUserByEmail = async (email: string): Promise<[UserDTO | null, Error | null]> => {
    try {
      const user = await User.findOne({ where: { email } });

      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  findUserById = async (id: string): Promise<[UserDTO | null, Error | null]> => {
    try {
      const user = await User.findByPk(id);

      return [user, null];
    } catch (error:any) {
      return [null, error];
    }
  }

  updateUserById = async (id: string, userData: UserUpdateDTO): Promise<[UserDTO | null, Error | null]> => {
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

  deleteUserById = async (id: string): Promise<[boolean, Error | null]> => {
    try {
      const rowsDeleted = await User.destroy({ where: { id } });

      return [rowsDeleted > 0, null];
    } catch (error:any) {
      return [false, error];
    }
  }

  findAllUsers = async (): Promise<[User[] | null, Error | null]> => {
    try {
      const users = await User.findAll();
      return [users, null];
    } catch (error:any) {
      return [null, error];
    }
  }
}
