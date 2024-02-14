export interface UserDTO {
  id?: string,
  name?: string,
  email?: string,
  password?: string,
  role?: string,
  photo?: string,
  token?: string
}

export interface UserRegisterDTO {
  name: string,
  email: string,
  password: string,
}

export interface UserLoginDTO {
  email: string,
  password: string,
}

export interface UserUpdateDTO {
  name?: string,
  role?: string,
  photo?: string
}