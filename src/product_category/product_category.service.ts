import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './product_category.entity';
import {
  ProductCategoryCreateData,
  ProductCategoryUpdateData,
} from './product_category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(product: ProductCategoryCreateData) {
    const newUser = this.productCategoryRepository.create(product);
    return this.productCategoryRepository.save(newUser);
  }

  async update(id: number, data: ProductCategoryUpdateData) {
    return this.productCategoryRepository.update(id, data);
  }

  async delete(id: number) {
    return this.productCategoryRepository.delete(id);
  }

  async get(id: number) {
    return this.productCategoryRepository.findOne({ where: { id } });
  }

  async getByName(name: string) {
    return this.productCategoryRepository.findOne({ where: { name } });
  }

  async getAll() {
    return this.productCategoryRepository.find();
  }
}
