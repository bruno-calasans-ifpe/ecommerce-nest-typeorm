import { OmitId } from 'src/types/common.type';
import { Product } from './product.entity';

export type ProductCreateData = OmitId<Product>;
export type ProductUpdateData = Partial<OmitId<Product>>;
