import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './cliente.service';
import { ClientCreateData, ClientUpdateData } from './cliente.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

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

    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    return { message: 'Cliente encontrado', client: foundClient };
  }

  @Post()
  async createClient(@Body() data: ClientCreateData) {
    const emailAlreadyInUse = await this.clientService.getByEmail(data.email);
    if (emailAlreadyInUse) throw new ConflictError('Email já em uso');

    const createdClient = await this.clientService.create(data);
    return {
      message: 'Cliente criado com sucesso',
      client: createdClient,
    };
  }

  @Put(':id')
  async updateClient(@Param() params: any, @Body() data: ClientUpdateData) {
    const id = params.id;

    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    const result = await this.clientService.update(+id, data);
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

    const foundClient = await this.clientService.get(+id);
    if (!foundClient) throw new NotFoundError('Cliente não encontrado');

    const result = await this.clientService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Cliente não atualizado');
    }

    return { message: 'Cliente removido com sucesso', client: foundClient };
  }
}
