import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
