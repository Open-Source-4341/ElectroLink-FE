import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../entity/review.entity';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit {
  @Input() technicianId!: number;
  reviews: Review[] = [];

  constructor(private reviewService: ReviewService) {}

  ngOnInit(): void {
    this.reviewService
      .getByTechnician(this.technicianId)
      .subscribe((data: Review[]) => this.reviews = data);
  }

  selectedReview: Review | null = null;

// Refresca reseñas (ya lo tienes, solo hazlo público para que otros componentes puedan usarlo)
refreshReviews(): void {
  this.reviewService
    .getByTechnician(this.technicianId)
    .subscribe((data: Review[]) => this.reviews = data);
}

// Eliminar reseña
deleteReview(id: number): void {
  if (confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
    this.reviewService.delete(id).subscribe(() => {
      this.refreshReviews();
    });
  }
}

// Seleccionar reseña para editar
editReview(review: Review): void {
  this.selectedReview = { ...review }; // copia para editar sin mutar la lista
}

// Confirmar edición
submitEdit(): void {
  if (this.selectedReview) {
    this.reviewService.update(this.selectedReview.id, this.selectedReview).subscribe(() => {
      this.selectedReview = null; // limpia
      this.refreshReviews();
    });
  }
}

}
