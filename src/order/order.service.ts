import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { OrderCreateData, OrderUpdateData } from './order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private ordereRepository: Repository<Order>,
  ) {}

  async create(order: OrderCreateData) {
    const newUser = this.ordereRepository.create(order);
    return this.ordereRepository.save(newUser);
  }

  async update(id: number, data: OrderUpdateData) {
    return this.ordereRepository.update(id, data);
  }

  async delete(id: number) {
    return this.ordereRepository.delete(id);
  }

  async get(id: number) {
    return this.ordereRepository.findOne({ where: { id } });
  }

  async getAll() {
    return this.ordereRepository.find();
  }
}
