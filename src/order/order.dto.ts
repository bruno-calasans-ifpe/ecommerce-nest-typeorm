import { OmitId } from 'src/types/common.type';
import { Order } from './order.entity';

export type OrderCreateData = OmitId<Order> & {
  client_id: number;
  address_id: number;
};
export type OrderUpdateData = Partial<OrderCreateData>;
