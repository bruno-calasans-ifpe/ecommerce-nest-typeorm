import { Address } from 'src/address/address.entity';
import { ItemOrder } from 'src/item_order/item_order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ unsigned: true })
  totalValue: number;

  @OneToMany(() => ItemOrder, (itemOrder) => itemOrder.order, {
    cascade: true,
    eager: false,
  })
  itemOrders: ItemOrder[];

  @ManyToOne(() => Address, (address) => address.orders, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
