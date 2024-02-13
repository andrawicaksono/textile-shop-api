import { Model, Column, Table, DataType } from 'sequelize-typescript';

export enum UserRole {
  SELLER='seller',
  BUYER='buyer'
}

@Table({
  timestamps: true,
  tableName: 'users',
})
export class User extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: "id"
  })
  id?: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
    field: "email"
  })
  email?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "password"
  })
  password?: string;

  @Column({
    type: DataType.STRING,
    allowNull:true,
    field: "address"
  })
  address?: string

  @Column({
    type: DataType.ENUM({values: Object.keys(UserRole)}),
    allowNull: false,
    validate: {
      isIn: [Object.values(UserRole)],
    },
    defaultValue: UserRole.BUYER,
    field: "role"
  })
  role?: UserRole;
}
