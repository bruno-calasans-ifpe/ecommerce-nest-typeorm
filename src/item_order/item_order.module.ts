import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrder } from './item_order.entity';
import { ItemOrderService } from './item_order.service';
import { ItemOrderController } from './item_order.controller';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ItemOrder]),
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ItemOrderService, ProductService],
  controllers: [ItemOrderController],
})
export class ItemOrderModule {}
