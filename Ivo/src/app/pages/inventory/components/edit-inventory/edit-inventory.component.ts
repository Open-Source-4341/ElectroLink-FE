import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../services/inventory.service';
import { ServiceEntity, ElectricalComponent } from '../../entity/inventory.entity';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-edit-inventory',
  standalone: true,
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class EditInventoryComponent implements OnInit {
  id!: number;
  service!: ServiceEntity;
  newInclusion = '';
  newComponent: ElectricalComponent = {
    componentID: 0,
    name: '',
    model: '',
    manufacturer: '',
    installationDate: '',
    lastMaintenanceDate: '',
    status: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private inventoryService: InventoryService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

  if (idParam && !isNaN(Number(idParam))) {
    this.id = Number(idParam);
    this.inventoryService.getServiceById(this.id).subscribe(service => {
      this.service = service;
    });
  } else {
    console.error('ID inválido o no proporcionado');
    this.router.navigate(['/inventory']);
  }
  }

  addInclusion() {
    if (this.newInclusion.trim()) {
      this.service.inclusions.push(this.newInclusion.trim());
      this.newInclusion = '';
    }
  }

  addComponent() {
    if (this.newComponent.name.trim()) {
      this.service.associatedComponents.push({ ...this.newComponent });
      this.newComponent = {
        componentID: 0,
        name: '',
        model: '',
        manufacturer: '',
        installationDate: '',
        lastMaintenanceDate: '',
        status: ''
      };
    }
  }

  onSubmit() {
    this.inventoryService.updateService(this.id, this.service).subscribe(() => {
      alert('Servicio actualizado correctamente');
      this.router.navigate(['/inventory']);
    });
  }
}
