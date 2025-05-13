import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TechniciansService } from '../../services/technicians.service';
import { Technician } from '../../entity/technician.entity';
import { ReviewFormComponent } from '../reviews/review-form.component';
import { ReviewListComponent } from '../reviews/review-list.component';

@Component({
  selector: 'app-technician-detail',
  standalone: true,
  imports: [CommonModule, ReviewFormComponent, ReviewListComponent],
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.css']
})
export class TechnicianDetailComponent implements OnInit {
  technician: Technician | undefined;
  selectedTechnicians: Technician[] = [];
  cancelMessage: string = '';
  hasSelected = false;

  constructor(
    private route: ActivatedRoute,
    private technicianService: TechniciansService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); // ✅ si los IDs son numéricos
    this.technicianService.getAll().subscribe((data) => {
      console.log('Todos los técnicos:', data);
      this.technician = data.find(t => t.id === id); // ✅ comparación sin error de tipo
      console.log('Técnico encontrado:', this.technician);
    });
  }

  getDescriptions(): string[] {
    return this.technician?.descriptions
      ? Object.values(this.technician.descriptions)
      : [];
  }

  goBack() {
    window.history.back();
  }

  buyTechnician() {
    if (this.technician && !this.selectedTechnicians.includes(this.technician)) {
      this.selectedTechnicians.push(this.technician);
      this.cancelMessage = '';
      this.hasSelected = true;
    }
  }

  cancelTechnician(tech: Technician) {
    this.selectedTechnicians = this.selectedTechnicians.filter(t => t.id !== tech.id);
    this.cancelMessage = `Se ha cancelado tu orden para ${tech.name}.`;
  }

  confirmPurchaseTechnician() {
    alert(`Muchas gracias por comprar en Electrolink. ¡Gracias por tu confianza!`);
  }

  handleReviewSubmitted(): void {
    // Método opcional si quieres refrescar reviews desde el form
    const reviewList = document.querySelector('app-review-list') as any;
    reviewList?.refreshReviews?.();
  }
}
