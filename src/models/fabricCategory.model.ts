import { Model, Column, Table, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'fabriccategories',
})
export class FabricCategory extends Model {
  @Column({
    type: DataType.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    field: "id"
  })
  id?: number;
  
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
}
