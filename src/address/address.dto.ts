import { OmitId } from 'src/types/common.type';
import { Address } from './address.entity';

export type AddressCreateData = OmitId<Address>;
export type AddressUpdateData = Partial<OmitId<Address>>;
