import { ProductCategory } from 'src/product_category/product_category.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ unsigned: true })
  price: number;

  @Column()
  img: string;

  @ManyToOne(() => ProductCategory, (category) => category.products, {
    nullable: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: ProductCategory;
}
