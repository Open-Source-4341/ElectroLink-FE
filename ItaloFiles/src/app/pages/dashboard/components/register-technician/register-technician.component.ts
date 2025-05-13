import { Component, OnInit } from '@angular/core';
import { Technician } from '../../entity/technician.entity';
import { TechniciansService } from '../../services/technicians.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register-technician',
  standalone: true,
  templateUrl: './register-technician.component.html',
  styleUrls: ['./register-technician.component.css'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    NgIf
  ]
})
export class RegisterTechnicianComponent implements OnInit {
  technician: Technician = new Technician();
  technicians: Technician[] = [];
  displayedColumns: string[] = ['index', 'name', 'specialty', 'location', 'ip', 'latitude', 'longitude', 'actions'];

  constructor(
    private technicianService: TechniciansService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.obtenerTecnicos();
  }

  registrar(): void {
    this.technicianService.create(this.technician).subscribe(() => {
      this.obtenerTecnicos();
      this.technician = new Technician();
    });
  }

  obtenerTecnicos(): void {
    this.technicianService.getAll().subscribe((data: Technician[]) => {
      this.technicians = data;
    });
  }

  eliminarTecnico(id: number): void {
    if (confirm('¿Eliminar este técnico?')) {
      this.technicianService.delete(id).subscribe(() => {
        this.obtenerTecnicos();
      });
    }
  }
}
