import { UserEntity } from "src/auth/entity";
import { Column, Entity, ManyToOne, OneToMany, Relation } from "typeorm";
import { OrderItem } from "./order.item.entity";

@Entity()
export class Order {
    @ManyToOne(() => UserEntity, (user) => user.orders)
    user: UserEntity;

    @Column()
    orderNo: string;

    @Column()
    amount: number;

    @Column({ type: 'varchar', length: 50 })
    status: OrderStatus;

    @OneToMany(() => OrderItem, (item) => item.order)
    item: Relation<OrderItem[]>;
}