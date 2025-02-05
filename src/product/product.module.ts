import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductCategoryService } from 'src/product_category/product_category.service';
import { ProductCategory } from 'src/product_category/product_category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductCategory]),
  ],
  providers: [ProductService, ProductCategoryService],
  controllers: [ProductController],
})
export class ProductModule {}
