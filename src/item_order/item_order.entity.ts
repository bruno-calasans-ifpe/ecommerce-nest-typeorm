import { Product } from 'src/product/product.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class ItemOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unsigned: true })
  amount: number;

  @Column({ unsigned: true })
  price: number;

  @Column({ unsigned: true })
  totalValue: number;

  @ManyToOne(() => Product, (product) => product.itemOrders, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
