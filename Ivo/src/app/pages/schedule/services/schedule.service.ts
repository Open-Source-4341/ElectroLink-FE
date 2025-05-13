import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map } from 'rxjs';
import { ScheduleEntity } from '../entity/schedule.entity';
import { ScheduleAssembler } from '../assembler/schedule.assembler';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private endpoint = `${environment.serverBasePath}/schedules`;

  constructor(private http: HttpClient) {}

  getSchedules(): Observable<ScheduleEntity[]> {
    return this.http.get<any[]>(this.endpoint)
      .pipe(map(response => response.map(dto => ScheduleAssembler.fromDto(dto))));
  }

  getScheduleById(id: number): Observable<ScheduleEntity> {
    return this.http.get<any>(`${this.endpoint}/${id}`)
      .pipe(map(dto => ScheduleAssembler.fromDto(dto)));
  }

  createSchedule(schedule: ScheduleEntity): Observable<ScheduleEntity> {
    return this.http.post<ScheduleEntity>(this.endpoint, schedule);
  }

  updateSchedule(id: number, schedule: ScheduleEntity): Observable<ScheduleEntity> {
    return this.http.put<ScheduleEntity>(`${this.endpoint}/${id}`, schedule);
  }

  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }
}
