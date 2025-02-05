import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductCreateData, ProductUpdateData } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private producteRepository: Repository<Product>,
  ) {}

  async create(product: ProductCreateData) {
    const newUser = this.producteRepository.create(product);
    return this.producteRepository.save(newUser);
  }

  async update(id: number, data: ProductUpdateData) {
    return this.producteRepository.update(id, data);
  }

  async delete(id: number) {
    return this.producteRepository.delete(id);
  }

  async get(id: number) {
    return this.producteRepository.findOne({ where: { id } });
  }

  async getByName(name: string) {
    return this.producteRepository.findOne({ where: { name } });
  }

  async getAll() {
    return this.producteRepository.find();
  }
}
