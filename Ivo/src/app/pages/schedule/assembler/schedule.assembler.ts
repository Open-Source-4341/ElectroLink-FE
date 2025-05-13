import { ScheduleEntity, Client, ElectricalComponent } from '../entity/schedule.entity';
import { ServiceEntity } from '../../inventory/entity/inventory.entity';

export class ScheduleAssembler {
  static fromDto(dto: any): ScheduleEntity {
    return {
      id: dto.id,
      date: dto.date,
      client: dto.client as Client,
      service: dto.service as ServiceEntity,
      componentsUsed: dto.componentsUsed as ElectricalComponent[]
    };
  }

  static toDto(entity: ScheduleEntity): any {
    return {
      id: entity.id,
      date: entity.date,
      client: entity.client,
      service: entity.service,
      componentsUsed: entity.componentsUsed
    };
  }
}
