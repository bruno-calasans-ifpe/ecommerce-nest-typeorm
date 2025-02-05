import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Address } from './address.entity';
import { AddressCreateData, AddressUpdateData } from './address.dto';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
  ) {}

  async create(address: AddressCreateData) {
    const newUser = this.addressRepository.create(address);
    return this.addressRepository.save(newUser);
  }

  async update(id: number, data: AddressUpdateData) {
    return this.addressRepository.update(id, data);
  }

  async delete(id: number) {
    return this.addressRepository.delete(id);
  }

  async get(id: number) {
    return this.addressRepository.findOne({ where: { id } });
  }

  async getAll() {
    return this.addressRepository.find();
  }
}
