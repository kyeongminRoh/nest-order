import { BaseEntity, Column, Entity, ManyToOne, Relation } from 'typeorm';
import { UserEntity } from './auth.entity';

@Entity()
export class RefreshToken extends BaseEntity {
  @ManyToOne(() => UserEntity)
  user: Relation<UserEntity>;

  @Column()
  jti: string;

  @Column()
  token: string;

  @Column({ type: 'timestamp' })
  expiresAt: Date;

  @Column({ default: false })
  isRevoked: boolean;
  UserEntity: any;
}
