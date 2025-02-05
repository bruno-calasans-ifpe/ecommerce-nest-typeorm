import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductCategoryService } from './product_category.service';
import {
  ProductCategoryCreateData,
  ProductCategoryUpdateData,
} from './product_category.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';

@Controller('product-category')
export class ProductCategoryController {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  getAllProdutCategories() {
    try {
      return this.productCategoryService.getAll();
    } catch (error) {
      throw new InternalServerError(
        'Erro pegar todos os categorias de produto',
      );
    }
  }

  @Get(':id')
  async getProductCategory(@Param() params: any) {
    const id = params.id;

    const foundProduct = await this.productCategoryService.get(+id);
    if (!foundProduct)
      throw new NotFoundError('Categoria de produto não encontrado');

    return {
      message: 'Categoria de produto encontrado',
      product: foundProduct,
    };
  }

  @Post()
  async createProductCategory(@Body() data: ProductCategoryCreateData) {
    const productNameAlreadyInUse = await this.productCategoryService.getByName(
      data.name,
    );

    if (productNameAlreadyInUse)
      throw new ConflictError('Nome de categoria produto já existe');

    const createdProduct = await this.productCategoryService.create(data);
    return {
      message: 'Categoria de produto criado com sucesso',
      productCategory: createdProduct,
    };
  }

  @Put(':id')
  async updateProductCategory(
    @Param() params: any,
    @Body() data: ProductCategoryUpdateData,
  ) {
    const id = params.id;

    const foundProduct = await this.productCategoryService.get(+id);
    if (!foundProduct)
      throw new NotFoundError('Categoria de produto não encontrado');

    const result = await this.productCategoryService.update(+id, data);
    if (result.affected === 0) {
      throw new NotModifiedError('Categoria de produto não atualizada');
    }

    return {
      message: 'Categoria de produto atualizada com sucesso',
      productCategory: { ...foundProduct, ...data },
    };
  }

  @Delete(':id')
  async deleteProductCategory(@Param() params: any) {
    const id = params.id;

    const foundProduct = await this.productCategoryService.get(+id);
    if (!foundProduct)
      throw new NotFoundError('Categoria de produto não encontrado');

    const result = await this.productCategoryService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Categoria de produto não atualizada');
    }

    return {
      message: 'Categoria de produto removido com sucesso',
      productCategory: foundProduct,
    };
  }
}
