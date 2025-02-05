import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ItemOrderService } from './item_order.service';
import { ItemOrderCreateData, ItemOrderUpdateData } from './item_order.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';
import { ProductService } from 'src/product/product.service';

@Controller('item-order')
export class ItemOrderController {
  constructor(
    private readonly itemOrderService: ItemOrderService,
    private readonly productService: ProductService,
  ) {}

  @Get()
  getAllItemOrders() {
    try {
      return this.itemOrderService.getAll();
    } catch (error) {
      throw new InternalServerError('Erro pegar todos os item pedidos');
    }
  }

  @Get(':id')
  async getItemOrder(@Param() params: any) {
    const id = params.id;

    const foundItemOrder = await this.itemOrderService.get(+id);
    if (!foundItemOrder) throw new NotFoundError('Item Pedido não encontrado');

    return { message: 'Item Pedido encontrado', itemorder: foundItemOrder };
  }

  @Post()
  async createItemOrder(
    @Body() data: ItemOrderCreateData & { product_id: string },
  ) {
    const foundProduct = await this.productService.get(+data.product_id);
    if (!foundProduct) throw new NotFoundError('Produto não encontrado');

    data.product = foundProduct;
    const createdItemOrder = await this.itemOrderService.create(data);

    return {
      message: 'Item Pedido criado com sucesso',
      itemorder: createdItemOrder,
    };
  }

  @Put(':id')
  async updateItemOrder(
    @Param() params: any,
    @Body() data: ItemOrderUpdateData,
  ) {
    const id = params.id;

    const foundItemOrder = await this.itemOrderService.get(+id);
    if (!foundItemOrder) throw new NotFoundError('Item Pedido não encontrado');

    if (data.amount || data.price) {
      data = {
        ...data,
        totalValue:
          (data.amount ?? foundItemOrder.amount) *
          (data.price ?? foundItemOrder.price),
      };
    }

    const result = await this.itemOrderService.update(+id, data);
    if (result.affected === 0) {
      throw new NotModifiedError('Item Pedido não atualizado');
    }

    return {
      message: 'Item Pedido atualizado com sucesso',
      itemorder: { ...foundItemOrder, ...data },
    };
  }

  @Delete(':id')
  async deleteItemOrder(@Param() params: any) {
    const id = params.id;

    const foundItemOrder = await this.itemOrderService.get(+id);
    if (!foundItemOrder) throw new NotFoundError('Item Pedido não encontrado');

    const result = await this.itemOrderService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Item Pedido não atualizado');
    }

    return {
      message: 'Item Pedido removido com sucesso',
      itemorder: foundItemOrder,
    };
  }
}
