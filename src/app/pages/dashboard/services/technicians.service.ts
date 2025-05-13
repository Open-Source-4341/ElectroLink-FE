import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Technician } from '../entity/technician.entity';
import { BaseService } from '../../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class TechniciansService extends BaseService<Technician> {
  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/technicians';
  }
}
