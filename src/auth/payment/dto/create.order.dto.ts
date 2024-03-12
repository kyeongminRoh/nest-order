
export type CreateOrderDto = {
    userId: string;
    orderItems: OrderItem[];
    couponId?: string;
    pointAmountTouse?: number;
    shippingAddress?: string;
}