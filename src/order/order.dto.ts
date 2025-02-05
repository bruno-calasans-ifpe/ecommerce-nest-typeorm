import { OmitId } from 'src/types/common.type';
import { Order } from './order.entity';

export type OrderCreateData = OmitId<Order>;
export type OrderUpdateData = Partial<OmitId<Order>>;
