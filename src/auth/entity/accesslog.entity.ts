import { Entity, Column, BaseEntity, ManyToOne, JoinColumn, Relation } from 'typeorm';
import { UserEntity } from './auth.entity';

@Entity()
export class AccessLog extends BaseEntity {

  @Column({ type: 'varchar', length: 512, nullable: true })
  ua: string;

  @Column()
  endpoint: string;

  @Column()
  ip: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  accessedAt: Date;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.accessLogs, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  userEntity?: Relation<UserEntity>;

}
