import { Address } from 'src/address/address.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column()
  tel: string;

  @Column()
  birth: Date;

  @OneToOne(() => Address, (address) => address.client, {
    cascade: true,
    eager: false,
    nullable: false,
  })
  @JoinColumn({ name: 'address_id' })
  address: Address;
}
