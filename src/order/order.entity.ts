import { ItemOrder } from 'src/item_order/item_order.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

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
}
