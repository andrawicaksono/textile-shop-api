import { Model, Column, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'products',
})
export class Product extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id"
  })
  id?: number;

  @Column({
    type: DataType.BIGINT,
    allowNull: false,
    field: "fabricId"
  })
  fabricId?: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: "name"
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: "description"
  })
  description?: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'thickness'
  })
  thickness?: string

  
  @Column({
    type: DataType.STRING,
    allowNull: true,
    field: 'colour'
  })
  colour?: string;
  
  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
    field: 'price'
  })
  price?: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    field: 'stock'
  })
  stock?: number;
}
