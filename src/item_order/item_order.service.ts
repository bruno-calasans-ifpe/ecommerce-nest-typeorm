import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemOrder } from './item_order.entity';
import { ItemOrderCreateData, ItemOrderUpdateData } from './item_order.dto';

@Injectable()
export class ItemOrderService {
  constructor(
    @InjectRepository(ItemOrder)
    private itemordereRepository: Repository<ItemOrder>,
  ) {}

  async create(itemorder: ItemOrderCreateData) {
    const newUser = this.itemordereRepository.create(itemorder);
    return this.itemordereRepository.save(newUser);
  }

  async update(id: number, data: ItemOrderUpdateData) {
    return this.itemordereRepository.update(id, data);
  }

  async delete(id: number) {
    return this.itemordereRepository.delete(id);
  }

  async get(id: number) {
    return this.itemordereRepository.findOne({
      where: { id },
      relations: { product: true, order: true },
    });
  }

  async getAll() {
    return this.itemordereRepository.find({
      relations: { product: true, order: true },
    });
  }
}
