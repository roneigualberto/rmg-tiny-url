import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from 'src/user/user.model';

@Table({
  tableName: 'urls',
})
export class UrlModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id!: string;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'owner_id',
    type: DataType.UUID,
    allowNull: false,
  })
  ownerId: string;

  @BelongsTo(() => UserModel, 'owner_id')
  owner: UserModel;

  @Column({
    field: 'short_url',
    unique: true,
  })
  shortUrl: string;

  @Column({
    field: 'long_url',
  })
  longUrl: string;

  @Column({
    field: 'description',
    allowNull: true,
  })
  description: string;
}
