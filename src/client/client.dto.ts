import { OmitId } from 'src/types/common.type';
import { Client } from './client.entity';

export type ClientCreateData = OmitId<Client> & { address_id: number };
export type ClientUpdateData = Partial<ClientCreateData>;
