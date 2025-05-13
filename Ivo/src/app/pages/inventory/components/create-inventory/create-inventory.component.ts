import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { InventoryService } from '../../services/inventory.service';
import { Router } from '@angular/router';
import { ServiceEntity } from '../../entity/inventory.entity';

@Component({
  selector: 'app-create-inventory',
  standalone: true,
  templateUrl: './create-inventory.component.html',
  styleUrls: ['./create-inventory.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ]
})
export class CreateInventoryComponent {
  service: ServiceEntity = {
    id: 0,
    name: '',
    description: '',
    basePrice: 0,
    estimatedDuration: 0,
    inclusions: [],
    category: '',
    associatedComponents: []
  };

  newInclusion: string = '';
  newComponent = {
    componentID: 0,
    name: '',
    model: '',
    manufacturer: '',
    installationDate: '',
    lastMaintenanceDate: '',
    status: ''
  };

  constructor(
    private inventoryService: InventoryService,
    private router: Router
  ) {}

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
    // Asegura que serviceID tenga un valor único
    this.service.id = Date.now();

    // Envía el objeto, agregando explícitamente un campo 'id'
    const serviceToSend = {
      ...this.service,
      id: this.service.id  // json-server necesita este campo
    };

    console.log('Servicio que se enviará:', serviceToSend); // (opcional) para verificar en consola

    this.inventoryService.createService(serviceToSend).subscribe(() => {
      alert('Servicio agregado con éxito');
      this.router.navigate(['/inventory']);
    });
  }

}
