import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderCreateData, OrderUpdateData } from './order.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';
import { AddressService } from 'src/address/address.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  getAllOrders() {
    try {
      return this.orderService.getAll();
    } catch (error) {
      throw new InternalServerError('Erro pegar todos os pedidos');
    }
  }

  @Get(':id')
  async getOrder(@Param() params: any) {
    const id = params.id;

    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    return { message: 'Pedido encontrado', order: foundOrder };
  }

  @Post()
  async createOrder(@Body() data: OrderCreateData) {
    const createdOrder = await this.orderService.create(data);
    return {
      message: 'Pedido criado com sucesso',
      order: createdOrder,
    };
  }

  @Put(':id')
  async updateOrder(@Param() params: any, @Body() data: OrderUpdateData) {
    const id = params.id;

    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    const result = await this.orderService.update(+id, data);
    if (result.affected === 0) {
      throw new NotModifiedError('Pedido não atualizado');
    }

    return {
      message: 'Pedido atualizado com sucesso',
      order: { ...foundOrder, ...data },
    };
  }

  @Delete(':id')
  async deleteOrder(@Param() params: any) {
    const id = params.id;

    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    const result = await this.orderService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Pedido não atualizado');
    }

    return { message: 'Pedido removido com sucesso', order: foundOrder };
  }
}
