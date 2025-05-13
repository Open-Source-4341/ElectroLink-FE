import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleEntity } from '../../entity/schedule.entity';
import { AsyncPipe, NgFor, NgIf, DatePipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schedule-view',
  standalone: true,
  templateUrl: './schedule-view.component.html',
  styleUrls: ['./schedule-view.component.css'],
  imports: [
    NgIf,
    NgFor,
    AsyncPipe,
    DatePipe,         // 👈 Añade esto
    MatCardModule,
    MatButtonModule,RouterLink // 👈 AÑADE ESTO
  ]
})
export class ScheduleViewComponent implements OnInit {
  schedules: ScheduleEntity[] = [];

  constructor(private scheduleService: ScheduleService) {}

  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(data => {
      this.schedules = data;
    });
  }
  onDelete(id: number): void {
  if (confirm('¿Estás seguro de eliminar este servicio agendado?')) {
    this.scheduleService.deleteSchedule(id).subscribe(() => {
      this.schedules = this.schedules.filter(s => s.id !== id);
    });
  }
}

}
