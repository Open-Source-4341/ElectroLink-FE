import { ServiceEntity, ElectricalComponent } from '../entity/inventory.entity';

export class InventoryAssembler {
  static fromDto(dto: any): ServiceEntity {
    return {
      id: dto.id,
      name: dto.name,
      description: dto.description,
      basePrice: dto.basePrice,
      estimatedDuration: dto.estimatedDuration,
      inclusions: dto.inclusions,
      category: dto.category,
      associatedComponents: dto.associatedComponents as ElectricalComponent[]
    };
  }
}
