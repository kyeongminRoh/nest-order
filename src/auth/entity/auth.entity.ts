import { Entity, Column, BaseEntity, OneToMany, PrimaryGeneratedColumn, Relation, ManyToOne } from 'typeorm';
import { AccessToken } from './access.token.entity';
import { RefreshToken } from './refresh.token.entity';
import { AccessLog } from './accesslog.entity';

@Entity()
export class UserEntity extends BaseEntity {

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => AccessToken, (token) => token.userEntity)
  accessToken:Relation< AccessToken[]>;

  @OneToMany(() => RefreshToken, (token) => token.userEntity)
  refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => AccessLog, (log) => UserEntity.userEntity)
  accessLogs?: Relation<AccessLog[]>;


}

