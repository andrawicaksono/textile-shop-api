import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/user.repository';
import { ApplicationError } from '../errors/error';
import { UserDTO, UserLoginDTO, UserRegisterDTO } from '../dto/user.dto';
import { jwtConfig } from '../config/jwt.config';

export class AuthService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(userData: UserRegisterDTO): Promise<[UserDTO | null, Error | null]> {
    try {
      const [existingUser, existingUserError] = await this.userRepository.findUserByEmail(userData.email || "");
      if (existingUserError) {
        throw existingUserError;
      }
      if (existingUser) {
        throw new ApplicationError('User with the same email already exists', 400);
      }

      const hashedPassword = await bcrypt.hash(userData.password || "", 10);

      const [newUser, createUserError] = await this.userRepository.createUser({
        email: userData.email,
        password: hashedPassword,
        name: userData.name
      });
      if (createUserError) {
        throw createUserError;
      }

      return [{
        id: newUser?.id,
        email: newUser?.email,
        name: newUser?.name,
        role: newUser?.role
      }, null];
    } catch (error: any) {
      return [null, error]
    }
  }

  async loginUser(loginData: UserLoginDTO): Promise<[UserDTO | null, Error | null]> {
    try {
      const [user, findUserError] = await this.userRepository.findUserByEmail(loginData.email || "");
      
      if (findUserError) {
        throw findUserError;
      }

      if (!user) {
        throw new ApplicationError('User not found', 404);
      }

      const passwordMatch = await bcrypt.compare(loginData.password || "", user.password || "");
      if (!passwordMatch) {
        throw new ApplicationError('Invalid password', 401);
      }

      const token = jwt.sign({ userId: user.id, email: user.email }, jwtConfig.jwtSecret || "", { expiresIn: jwtConfig.jwtExpiresIn });

      return [{
        id: user?.id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        token: token
      }, null];
    } catch (error: any) {
      return [null, error]
    }
  }
}
