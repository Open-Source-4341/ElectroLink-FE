import * as L from 'leaflet';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TechniciansService } from '../../services/technicians.service';
import { Technician } from '../../entity/technician.entity';
import { IpLocationService } from '../../services/ip-location.service';
import { ChangeDetectorRef } from '@angular/core';

import { MatSidenavModule, MatSidenav } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-technician-search',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    NgFor,
    NgIf,
    RouterModule
  ],
  templateUrl: './technician-search.component.html',
  styleUrls: ['./technician-search.component.css']
})
export class TechnicianSearchComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav, { static: true }) sidenav!: MatSidenav;

  technicians: Technician[] = [];
  filteredTechnicians: Technician[] = [];

  searchLocation: string = '';
  ipToSearch: string = '';
  locationData: any = null;

  map!: L.Map;
  marker!: L.Marker;
  mapInitialized = false;

  constructor(
    private technicianService: TechniciansService,
    private ipLocationService: IpLocationService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.technicianService.getAll().subscribe((data: Technician[]) => {
      this.technicians = data;
      this.filteredTechnicians = data;
    });
  }

  ngAfterViewInit(): void {
    // Nada aún, el mapa se genera dinámicamente
  }

  filtrarPorDistrito(): void {
    const filtro = this.searchLocation.trim().toLowerCase();
    this.filteredTechnicians = filtro === ''
      ? this.technicians
      : this.technicians.filter(tech =>
          tech.location.toLowerCase().includes(filtro)
        );
  }

  obtenerUbicacionPorIP(): void {
    const ip = this.ipToSearch.trim();
    if (!ip) return;

    this.ipLocationService.getLocationByIP(ip).subscribe((data: any) => {
      if (data.success) {
        this.locationData = {
          ip: data.ip,
          country: data.country,
          region: data.region,
          city: data.city,
          latitude: data.latitude,
          longitude: data.longitude
        };

        // Asegurarse de que el mapa se renderice después de que Angular actualice el DOM
        this.cdRef.detectChanges();
        setTimeout(() => {
          this.renderMap(data.latitude, data.longitude);
        }, 50);

        const prefijo = this.extraerPrefijoIP(data.ip);
        this.filteredTechnicians = this.technicians.filter(tech =>
          tech.ip && tech.ip.startsWith(prefijo)
        );
      } else {
        alert('IP inválida o no se pudo localizar');
      }
    });
  }

  private extraerPrefijoIP(ip: string): string {
    return ip.split('.').slice(0, 3).join('.');
  }

  private renderMap(lat: number, lng: number): void {
    if (this.mapInitialized) {
      this.map.setView([lat, lng], 14);
      if (this.marker) this.map.removeLayer(this.marker);
      this.marker = L.marker([lat, lng])
        .addTo(this.map)
        .bindPopup('Ubicación estimada por IP')
        .openPopup();
      return;
    }

    this.map = L.map('leaflet-map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.marker = L.marker([lat, lng])
      .addTo(this.map)
      .bindPopup('Ubicación estimada por IP')
      .openPopup();

    this.mapInitialized = true;
  }
}
