import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { IssuedCoupon } from '../entities/issued.entity';
import { BaseEntity } from 'src/base.entity/base.entity';

type CouponType = 'percent' | 'fixed';

@Entity()
export class Coupon extends BaseEntity {
  @Column({ type: 'varchar', length: 50 })
  type: CouponType;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  value: number;

  @OneToMany(() => IssuedCoupon, (issuedCoupon) => issuedCoupon.coupon)
  issuedCoupons: Relation<IssuedCoupon[]>;
}
