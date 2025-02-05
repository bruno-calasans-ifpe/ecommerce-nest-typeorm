import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './client.entity';
import { ClientCreateData, ClientUpdateData } from './cliente.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clienteRepository: Repository<Client>,
  ) {}

  async create(client: ClientCreateData) {
    const newUser = this.clienteRepository.create(client);
    return this.clienteRepository.save(newUser);
  }

  async update(id: number, data: ClientUpdateData) {
    return this.clienteRepository.update(id, data);
  }

  async delete(id: number) {
    return this.clienteRepository.delete(id);
  }

  async get(id: number) {
    return this.clienteRepository.findOne({ where: { id } });
  }

  async getByEmail(email: string) {
    return this.clienteRepository.findOne({ where: { email } });
  }

  async getAll() {
    return this.clienteRepository.find();
  }
}
