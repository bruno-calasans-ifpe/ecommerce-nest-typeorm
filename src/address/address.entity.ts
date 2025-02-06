import { Client } from 'src/client/client.entity';
import { Order } from 'src/order/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';

@Entity()
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  state: string;

  @Column()
  district: string;

  @Column()
  complement: string;

  @Column()
  zipCode: string;

  @OneToMany(() => Order, (order) => order.address, {
    cascade: true,
    eager: false,
  })
  orders: Order[];

  @OneToOne(() => Client, (client) => client.address)
  client: Client;
}
