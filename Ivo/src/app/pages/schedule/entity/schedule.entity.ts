import { ServiceEntity } from '../../inventory/entity/inventory.entity';

export interface ElectricalComponent {
  componentID: number;
  name: string;
  model: string;
  manufacturer: string;
  installationDate: string;
  lastMaintenanceDate: string;
  status: string;
}



export interface Client {
  userID: number;
  email: string;
  password: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  registrationDate: string;
  isVerified: boolean;
  type: string;
}

export interface ScheduleEntity {
  id: number;
  date: string;
  client: Client;
  service: ServiceEntity;
  componentsUsed: ElectricalComponent[];
}
