import { UserRole } from "../models/user.model"

export interface UserDTO {
  id?: string,
  name?: string,
  email?: string,
  password?: string,
  role?: UserRole,
  photo?: string,
  address?: string,
  token?: string
}

export interface UserRegisterDTO {
  name: string,
  email: string,
  password: string,
  role?: UserRole
}

export interface UserLoginDTO {
  email: string,
  password: string,
}

export interface UserUpdateDTO {
  name?: string,
  role?: UserRole,
  photo?: string,
  address?: string,
}