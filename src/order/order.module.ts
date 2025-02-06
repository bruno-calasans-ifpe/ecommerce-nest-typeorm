import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/address.entity';
import { Client } from 'src/client/client.entity';
import { ClientService } from 'src/client/client.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Address]),
    TypeOrmModule.forFeature([Client]),
  ],
  providers: [OrderService, AddressService, ClientService],
  controllers: [OrderController],
})
export class OrderModule {}
