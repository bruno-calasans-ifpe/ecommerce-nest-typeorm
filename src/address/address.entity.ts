import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
