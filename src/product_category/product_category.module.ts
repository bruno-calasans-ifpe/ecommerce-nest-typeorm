import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './product_category.entity';
import { ProductCategoryService } from './product_category.service';
import { ProductCategoryController } from './product_category.controller';
import { ProductService } from 'src/product/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [ProductCategoryService],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
