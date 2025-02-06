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
import { ClientService } from 'src/client/client.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly addressService: AddressService,
    private readonly clientService: ClientService,
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

    // Verifica se pedido existe
    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    return { message: 'Pedido encontrado', order: foundOrder };
  }

  @Post()
  async createOrder(@Body() data: OrderCreateData) {
    // Verifica se cliente existe
    const clientExists = await this.clientService.get(data.client_id);
    if (!clientExists) throw new NotFoundError('Cliente não encontrado');

    // Verifica se endereço existe
    const addressExists = await this.addressService.get(data.address_id);
    if (!addressExists) throw new NotFoundError('Endereço não encontrado');

    // Atualiza dado enviado
    data.client = clientExists;
    data.address = addressExists;

    // Cria pedido
    const createdOrder = await this.orderService.create(data);

    return {
      message: 'Pedido criado com sucesso',
      order: createdOrder,
    };
  }

  @Put(':id')
  async updateOrder(@Param() params: any, @Body() data: OrderUpdateData) {
    const id = params.id;

    // Verifica se o pedido existe
    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    // Se for atualizar o endereço, verifica se ele existe
    if (data.address_id) {
      const addressExists = await this.addressService.get(data.address_id);
      if (!addressExists) throw new NotFoundError('Endereço não encontrado');
      data.address = addressExists;
      delete data.address_id;
    }

    // Se for atualizar o cliente, verifica se ele existe
    if (data.client_id) {
      const clientExists = await this.clientService.get(data.client_id);
      if (!clientExists) throw new NotFoundError('Cliente não encontrado');
      data.client = clientExists;
      delete data.client_id;
    }

    // Cria pedido
    const result = await this.orderService.update(+id, data);

    // Verifica se atualizou algo
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

    // Verifica se o pedido existe
    const foundOrder = await this.orderService.get(+id);
    if (!foundOrder) throw new NotFoundError('Pedido não encontrado');

    // Remove pedido
    const result = await this.orderService.delete(+id);

    // Verifica se algo mudou
    if (result.affected === 0) {
      throw new NotModifiedError('Pedido não atualizado');
    }

    return { message: 'Pedido removido com sucesso', order: foundOrder };
  }
}
