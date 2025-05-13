import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import { ServiceEntity } from '../../entity/inventory.entity';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-inventory-view',
  standalone: true,
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css'],
  imports: [NgIf, NgFor, AsyncPipe, MatCardModule, MatButtonModule, RouterLink]
})
export class InventoryViewComponent implements OnInit {
  services: ServiceEntity[] = [];

  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventoryService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  onDelete(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este servicio?')) {
      this.inventoryService.deleteService(id).subscribe(() => {
        this.services = this.services.filter(service => service.id !== id);
      });
    }
  }
}
