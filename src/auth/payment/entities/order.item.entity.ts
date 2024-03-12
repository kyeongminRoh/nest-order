import { Column, Entity, ManyToOne, Relation } from "typeorm";
import { Order } from "./order.entity";

@Entity()
export class OrderItem {
    @ManyToOne(() => OrderItem, (order) => order.items)
    order: Relation<Order>;

    @Column()
    productId: string;

    @Column()
    quntity: number;
}