import { OmitId } from 'src/types/common.type';
import { ProductCategory } from './product_category.entity';

export type ProductCategoryCreateData = OmitId<ProductCategory>;
export type ProductCategoryUpdateData = Partial<OmitId<ProductCategory>>;
