import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Address]),
  ],
  providers: [OrderService, AddressService],
  controllers: [OrderController],
})
export class OrderModule {}
