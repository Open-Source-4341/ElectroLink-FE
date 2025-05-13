import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScheduleService } from '../../services/schedule.service';
import { ScheduleEntity } from '../../entity/schedule.entity';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [
    CommonModule,
    NgIf,
    NgFor,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.css']
})
export class EditScheduleComponent implements OnInit {
  scheduleId!: number;
  schedule!: ScheduleEntity;
  date = '';
  time = '';

  constructor(
    private route: ActivatedRoute,
    private scheduleService: ScheduleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.scheduleId = Number(this.route.snapshot.paramMap.get('id'));
    this.scheduleService.getScheduleById(this.scheduleId).subscribe(data => {
      this.schedule = data;
      const [d, t] = data.date.split('T');
      this.date = d;
      this.time = t.substring(0, 5);
    });
  }

  onSubmit(): void {
    const updatedSchedule: ScheduleEntity = {
      ...this.schedule,
      date: `${this.date}T${this.time}:00`
    };

    this.scheduleService.updateSchedule(this.scheduleId, updatedSchedule).subscribe(() => {
      alert('Tarea actualizada correctamente');
      this.router.navigate(['/schedule']);
    });
  }
}
