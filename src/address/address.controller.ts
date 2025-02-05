import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressCreateData, AddressUpdateData } from './address.dto';
import { InternalServerError } from 'src/errors/InternalServerErrorError';
import { NotFoundError } from 'src/errors/NotFoundError';
import { ConflictError } from 'src/errors/ConflictError';
import { NotModifiedError } from 'src/errors/NotModifiedError';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  getAllAddresss() {
    try {
      return this.addressService.getAll();
    } catch (error) {
      throw new InternalServerError('Erro pegar todos os endereços');
    }
  }

  @Get(':id')
  async getAddress(@Param() params: any) {
    const id = params.id;

    const foundAddress = await this.addressService.get(+id);
    if (!foundAddress) throw new NotFoundError('Endereço não encontrado');

    return { message: 'Endereço encontrado', address: foundAddress };
  }

  @Post()
  async createAddress(@Body() data: AddressCreateData) {
    const createdAddress = await this.addressService.create(data);
    return {
      message: 'Endereço criado com sucesso',
      address: createdAddress,
    };
  }

  @Put(':id')
  async updateAddress(@Param() params: any, @Body() data: AddressUpdateData) {
    const id = params.id;

    const foundAddress = await this.addressService.get(+id);
    if (!foundAddress) throw new NotFoundError('Endereço não encontrado');

    const result = await this.addressService.update(+id, data);
    if (result.affected === 0) {
      throw new NotModifiedError('Endereço não atualizado');
    }

    return {
      message: 'Endereço atualizado com sucesso',
      address: { ...foundAddress, ...data },
    };
  }

  @Delete(':id')
  async deleteAddress(@Param() params: any) {
    const id = params.id;

    const foundAddress = await this.addressService.get(+id);
    if (!foundAddress) throw new NotFoundError('Endereço não encontrado');

    const result = await this.addressService.delete(+id);
    if (result.affected === 0) {
      throw new NotModifiedError('Endereço não atualizado');
    }

    return { message: 'Endereço removido com sucesso', address: foundAddress };
  }
}
