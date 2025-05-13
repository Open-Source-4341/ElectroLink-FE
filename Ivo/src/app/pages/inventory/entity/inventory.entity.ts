export interface ElectricalComponent {
  componentID: number;
  name: string;
  model: string;
  manufacturer: string;
  installationDate: string;
  lastMaintenanceDate: string;
  status: string;
}

export interface ServiceEntity {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  estimatedDuration: number;
  inclusions: string[];
  category: string;
  associatedComponents: ElectricalComponent[];
}
