import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { ServiceEntity } from '../entity/inventory.entity';
import { InventoryAssembler } from '../assembler/inventory.assembler';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private endpoint = `${environment.serverBasePath}/services`;

  constructor(private http: HttpClient) {}

  // GET all services
  getServices(): Observable<ServiceEntity[]> {
    return this.http.get<any[]>(this.endpoint)
      .pipe(map(response => response.map(dto => InventoryAssembler.fromDto(dto))));
  }

  // GET one service by ID
  getServiceById(id: number): Observable<ServiceEntity> {
    return this.http.get<any>(`${this.endpoint}/${id}`)
      .pipe(map(dto => InventoryAssembler.fromDto(dto)));
  }

  // POST - create new service
  createService(service: ServiceEntity): Observable<ServiceEntity> {
    const adapted = {
      id: service.id, // json-server necesita 'id'
      name: service.name,
      description: service.description,
      basePrice: service.basePrice,
      estimatedDuration: service.estimatedDuration,
      inclusions: service.inclusions,
      category: service.category,
      associatedComponents: service.associatedComponents
    };

    return this.http.post<ServiceEntity>(this.endpoint, adapted);
  }


  // PUT - update existing service
  updateService(id: number, service: ServiceEntity): Observable<ServiceEntity> {
    return this.http.put<ServiceEntity>(`${this.endpoint}/${id}`, service);
  }

  // DELETE - remove service by ID
  deleteService(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}

