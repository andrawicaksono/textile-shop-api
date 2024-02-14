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
    allowNull:false,
    field: "address"
  })
  address?: string

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    field: "totalAmount",
    defaultValue: 0
  })
  totalAmount?: number
}
