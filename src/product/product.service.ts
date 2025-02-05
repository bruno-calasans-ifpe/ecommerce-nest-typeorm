import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateData, ProductUpdateData } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(product: ProductCreateData) {
    const newUser = this.productRepository.create(product);
    return this.productRepository.save(newUser);
  }

  async update(id: number, data: ProductUpdateData) {
    return this.productRepository.update(id, data);
  }

  async delete(id: number) {
    return this.productRepository.delete(id);
  }

  async get(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: { itemOrders: true, category: true },
    });
  }

  async getByName(name: string) {
    return this.productRepository.findOne({ where: { name } });
  }

  async getAll() {
    return this.productRepository.find({
      relations: { itemOrders: true, category: true },
    });
  }
}
