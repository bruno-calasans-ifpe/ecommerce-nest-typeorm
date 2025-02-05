import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemOrder } from './item_order.entity';
import { ItemOrderService } from './item_order.service';
import { ItemOrderController } from './item_order.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ItemOrder])],
  providers: [ItemOrderService],
  controllers: [ItemOrderController],
})
export class ItemOrderModule {}
