import { Model, Column, Table, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'fabrics',
})
export class Fabric extends Model {
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
    field: "fabricCategoryId"
  })
  fabricCategoryId?: number;
  
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
    field: 'material'
  })
  material?: string;
}
