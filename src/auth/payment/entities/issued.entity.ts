import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToOne,
    Relation,
  } from 'typeorm';
  import { Coupon } from './coupon.entity';
  import { UserEntity } from '../../entity/auth.entity';
  import { Order } from './order.entity';
import { BaseEntity } from 'src/base.entity/base.entity';
  
  @Entity()
  export class IssuedCoupon extends BaseEntity {
    @ManyToOne(() => UserEntity)
    @JoinColumn()
    user: Relation<UserEntity>;
  
    @ManyToOne(() => Coupon)
    @JoinColumn()
    coupon: Relation<Coupon>;
  
    @OneToOne(() => Order, (order) => order.usedIssuedCoupon, { nullable: true })
    usedOrder: Relation<Order>;
  
    @Column({ type: 'timestamp', nullable: false })
    validFrom: Date;
  }
  