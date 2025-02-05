import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  HttpException,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { ClientService } from './cliente.service';
import { ClientCreateData, ClientUpdateData } from './cliente.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Get()
  getAllClients() {
    try {
      return this.clientService.getAll();
    } catch (error) {
      throw new HttpException(
        'Erro pegar todos os clientes',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async getClient(@Param() params: any) {
    const id = params.id;
    if (!id)
      throw new HttpException('Nenhum id fornecido', HttpStatus.BAD_REQUEST);

    const foundClient = await this.clientService.get(+id);
    if (!foundClient)
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

    return foundClient;
  }

  @Post()
  async createClient(@Body() data: ClientCreateData) {
    const emailAlreadyInUse = await this.clientService.getByEmail(data.email);
    if (emailAlreadyInUse)
      throw new HttpException('Email já em uso', HttpStatus.CONFLICT);

    const createdClient = await this.clientService.create(data);
    return {
      message: 'Cliente criado com sucesso',
      client: createdClient,
    };
  }

  @Put(':id')
  async updateClient(@Param() params: any, @Body() data: ClientUpdateData) {
    const id = params.id;

    if (!id)
      throw new HttpException('Nenhum id fornecido', HttpStatus.BAD_REQUEST);

    const foundClient = await this.clientService.get(+id);
    if (!foundClient)
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

    const result = await this.clientService.update(+id, data);
    if (result.affected === 0) {
      throw new HttpException(
        'Cliente não atualizado',
        HttpStatus.NOT_MODIFIED,
      );
    }

    return {
      message: 'Cliente atualizado com sucesso',
      client: { ...foundClient, ...data },
    };
  }

  @Delete(':id')
  async deleteClient(@Param() params: any) {
    const id = params.id;
    if (!id)
      throw new HttpException('Nenhum id fornecido', HttpStatus.BAD_REQUEST);

    const foundClient = await this.clientService.get(+id);
    if (!foundClient)
      throw new HttpException('Cliente não encontrado', HttpStatus.NOT_FOUND);

    const result = await this.clientService.delete(+id);
    if (result.affected === 0) {
      throw new HttpException('Cliente não removido', HttpStatus.NOT_MODIFIED);
    }

    return { message: 'Cliente removido com sucesso', client: foundClient };
  }
}
