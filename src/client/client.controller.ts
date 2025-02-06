import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientCreateData, ClientUpdateData } from './client.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';
import { AddressService } from 'src/address/address.service';

@Controller('client')
export class ClientController {
  constructor(
    private readonly clientService: ClientService,
    private readonly addressService: AddressService,
  ) {}

  @Get()
  getAllClients() {
    try {
      return this.clientService.getAll();
    } catch (error) {
      throw new InternalServerError('Erro pegar todos os clientes');
    }
  }

  @Get(':id')
  async getClient(@Param() params: any) {
    const id = params.id;

    // Verifica se o cliente existe
    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    return { message: 'Cliente encontrado', client: foundClient };
  }

  @Post()
  async createClient(@Body() data: ClientCreateData) {
    // Verifica se o email não está em uso
    const emailAlreadyInUse = await this.clientService.getByEmail(data.email);
    if (emailAlreadyInUse) throw new ConflictError('Email já em uso');

    // Verifica se o o endereço existe
    const addressExists = await this.addressService.get(data.address_id);
    if (!addressExists) throw new NotFoundError('Endereço não encontrado');

    // Adiciona o endereço aos dados enviados
    data.address = addressExists;

    const createdClient = await this.clientService.create(data);

    return {
      message: 'Cliente criado com sucesso',
      client: createdClient,
    };
  }

  @Put(':id')
  async updateClient(@Param() params: any, @Body() data: ClientUpdateData) {
    const id = params.id;

    // Verifica se o cliente existe
    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    // Se for atualizar endereço, verifica se o endereço existe
    if (data.address_id) {
      const addressExists = await this.addressService.get(data.address_id);
      if (!addressExists) throw new NotFoundError('Endereço não encontrado');
      data.address = addressExists;
      delete data.address_id;
    }

    const result = await this.clientService.update(+id, data);

    // Verifica se algo mudou depois de atualizar o cliente
    if (result.affected === 0) {
      throw new NotModifiedError('Cliente não atualizado');
    }

    return {
      message: 'Cliente atualizado com sucesso',
      client: { ...foundClient, ...data },
    };
  }

  @Delete(':id')
  async deleteClient(@Param() params: any) {
    const id = params.id;

    // Verifica se o cliente existe
    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    const result = await this.clientService.delete(+id);

    // Verifica se algo mudou depois de remover o cliente
    if (result.affected === 0) {
      throw new NotModifiedError('Cliente não removido');
    }

    return { message: 'Cliente removido com sucesso', client: foundClient };
  }
}
