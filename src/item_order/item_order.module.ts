import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrder } from './item_order.entity';
import { ItemOrderService } from './item_order.service';
import { ItemOrderController } from './item_order.controller';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';
import { OrderService } from 'src/order/order.service';
import { Order } from 'src/order/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemOrder]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([Order]),
  ],
  providers: [ItemOrderService, ProductService, OrderService],
  controllers: [ItemOrderController],
})
export class ItemOrderModule {}
