import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateData, ProductUpdateData } from './product.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';
import { ProductCategoryService } from 'src/product_category/product_category.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productCategoryService: ProductCategoryService,
  ) {}

  @Get()
  getAllProducts() {
    try {
      return this.productService.getAll();
    } catch (error) {
      throw new InternalServerError('Erro pegar todos os produtos');
    }
  }

  @Get(':id')
  async getProduct(@Param() params: any) {
    const id = params.id;

    const foundProduct = await this.productService.get(+id);
    if (!foundProduct) throw new NotFoundError('Produto não encontrado');

    return { message: 'Produto encontrado', product: foundProduct };
  }

  @Post()
  async createProduct(
    @Body() data: ProductCreateData & { category_id: string },
  ) {
    const productNameAlreadyInUse = await this.productService.getByName(
      data.name,
    );
    if (productNameAlreadyInUse)
      throw new ConflictError('Nome de produto já existe');

    const foundCategory = await this.productCategoryService.get(
      +data.category_id,
    );
    if (!foundCategory) throw new NotFoundError('Categoria não encontrada');

    data.category = foundCategory;
    const createdProduct = await this.productService.create(data);
    return {
      message: 'Produto criado com sucesso',
      product: createdProduct,
    };
  }

  @Put(':id')
  async updateProduct(@Param() params: any, @Body() data: ProductUpdateData) {
    const id = params.id;

    const foundProduct = await this.productService.get(+id);
    if (!foundProduct) throw new NotFoundError('Produto não encontrado');

    const result = await this.productService.update(+id, data);
    if (result.affected === 0) {
      throw new NotModifiedError('Produto não atualizado');
    }

    return {
      message: 'Produto atualizado com sucesso',
      product: { ...foundProduct, ...data },
    };
  }

  @Delete(':id')
  async deleteProduct(@Param() params: any) {
    const id = params.id;

    const foundProduct = await this.productService.get(+id);
    if (!foundProduct) throw new NotFoundError('Produto não encontrado');

    const result = await this.productService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Produto não atualizado');
    }

    return { message: 'Produto removido com sucesso', product: foundProduct };
  }
}
