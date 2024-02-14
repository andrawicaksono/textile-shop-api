import { UserRepository } from '../repositories/user.repository';
import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { ApplicationError } from '../utils/error';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getUserById(id: string): Promise<[UserDTO | null, Error | null]> {
    try {
      const [user, error] = await this.userRepository.findUserById(id);
      if (error) throw error;
      if (!user) throw new ApplicationError('User not found', 404);
      return [{
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        photo:user?.photo,
        address: user?.address
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  async updateUserDetails(id: string, userData: UserUpdateDTO): Promise<[UserDTO | null, Error | null]> {
    try {
      const [existingUser, error] = await this.userRepository.findUserById(id);
      if (error) throw error;
      if (!existingUser) throw new ApplicationError('User not found', 404);

      const updatedUser = { ...existingUser, ...userData };
      const [updated, updateError] = await this.userRepository.updateUserById(id, updatedUser);
      if (updateError) throw updateError;
      
      return [{
        id: updated?.id,
        name: updated?.name,
        email: updated?.email,
        role: updated?.role
      }, null];
    } catch (error: any) {
      return [null, error];
    }
  }

  async deleteUserById(id: string): Promise<[boolean, Error | null]> {
    try {
      const [userDeleted, error] = await this.userRepository.deleteUserById(id);
      if (error) throw error;
      if (!userDeleted) {
        throw new ApplicationError("User not found", 404);
      }
      return [true, null];
    } catch (error: any) {
      return [false, error];
    }
  }

  async getAllUsers(): Promise<[UserDTO[] | null, Error | null]> {
    try {
      const [users, error] = await this.userRepository.findAllUsers();
      if (error) throw error;
      if (!users) return [null, new ApplicationError('Users is empty', 404)];

      return [users.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })), null];
    } catch (error: any) {
      return [null, error];
    }
  }
}
