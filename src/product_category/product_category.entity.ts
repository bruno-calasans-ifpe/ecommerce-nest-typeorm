import { Product } from 'src/product/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true,
    eager: false,
  })
  products: Product[];
}
