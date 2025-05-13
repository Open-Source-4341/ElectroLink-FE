import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ScheduleEntity } from '../../entity/schedule.entity';
import { ScheduleService } from '../../services/schedule.service';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-create-schedule',
  standalone: true,
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
    NgFor,
    RouterLink,
    AsyncPipe
  ]
})
export class CreateScheduleComponent {
  formData = {
    clientName: '',
    clientPhone: '',
    serviceName: '',
    serviceDescription: '',
    date: '',
    time: ''
  };




  constructor(
  private scheduleService: ScheduleService,
  private router: Router
  ) {}

  private combineDateTime(date: string | Date, time: string): string {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined.toISOString();
  }

   onSubmit() {
     const schedule: ScheduleEntity = {
       id: 0,
       date: this.combineDateTime(this.formData.date, this.formData.time),
       client: {
         userID: 1,
         firstName: this.formData.clientName.split(' ')[0],
         lastName: this.formData.clientName.split(' ')[1] || '',
         phoneNumber: this.formData.clientPhone,
         email: 'cliente@ejemplo.com',
         password: '123456',
         registrationDate: new Date().toISOString(),
         isVerified: true,
         type: 'cliente'
       },
       service: {
         id: 1,
         name: this.formData.serviceName,
         description: this.formData.serviceDescription,
         basePrice: 100,
         estimatedDuration: 60,
         inclusions: ['Cableado', 'Instalación'],
         category: 'Eléctrico',
         associatedComponents: []
       },
       componentsUsed: []
     };
    console.log('Objeto enviado al servidor:', schedule);
     this.scheduleService.createSchedule(schedule).subscribe(() => {
       alert('Tarea registrada exitosamente');
       setTimeout(() => {
         this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
           this.router.navigate(['/schedule']);
         });
       }, 100); // ⏱ pequeña pausa de 100ms
     });

   }


}
