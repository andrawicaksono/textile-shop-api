import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'orders',
})
export class Order extends Model {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataType.UUIDV4,
    field: "id"
  })
  id?: string;

  @Column({
    type: DataType.UUID,
    allowNull: false,
    field: "userId"
  })
  userId?: string;

  @Column({
    type: DataType.STRING,
    allowNull:true,
    field: "address"
  })
  address?: string
}
