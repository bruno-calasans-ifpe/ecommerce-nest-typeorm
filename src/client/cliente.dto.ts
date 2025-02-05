import { OmitId } from 'src/types/common.type';
import { Client } from './client.entity';

export type ClientCreateData = OmitId<Client>;
export type ClientUpdateData = Partial<OmitId<Client>>;
