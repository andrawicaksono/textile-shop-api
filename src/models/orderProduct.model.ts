import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'orderproducts',
})
export class OrderProduct extends Model {
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
    field: "orderId"
  })
  orderId?: string;

  @Column({
    type: DataType.INTEGER,
    allowNull:false,
    field: "productId"
  })
  productId?: number
}
