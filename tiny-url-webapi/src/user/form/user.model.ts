import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  tableName: 'users',
})
export class UserModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @Column
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column
  password: string;

  @Column({ defaultValue: true })
  active: boolean;
}
