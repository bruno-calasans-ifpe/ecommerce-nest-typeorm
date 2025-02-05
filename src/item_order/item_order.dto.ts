import { OmitId } from 'src/types/common.type';
import { ItemOrder } from './item_order.entity';

export type ItemOrderCreateData = OmitId<ItemOrder>;
export type ItemOrderUpdateData = Partial<OmitId<ItemOrder>>;
