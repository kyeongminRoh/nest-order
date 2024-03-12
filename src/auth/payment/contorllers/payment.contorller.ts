import { Body, Controller, Post } from "@nestjs/common";
import { CreateOrderDto } from "../dto/create.order.dto";

@Controller('orders')
export class paymentController {
    constructor(
        private readonly paymentService: PaymentService,
    ) {}

    @Post('init')
    async initOrder(@Body() createOrderDto: CreateOrderDto): Promise<order> {
        return this.paymentService.initOrder(createOrderDto);
    }

    
}