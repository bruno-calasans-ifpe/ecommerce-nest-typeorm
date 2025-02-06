import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './client.entity';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { AddressService } from 'src/address/address.service';
import { Address } from 'src/address/address.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    TypeOrmModule.forFeature([Address]),
  ],
  providers: [ClientService, AddressService],
  controllers: [ClientController],
})
export class ClienteModule {}
