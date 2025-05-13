import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Review } from '../../entity/review.entity';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})
export class ReviewFormComponent {
  @Input() technicianId!: number;
  review: Review = new Review();

  constructor(private reviewService: ReviewService) {}

  submit(): void {
    this.review.technicianId = this.technicianId;
    this.reviewService.create(this.review).subscribe(() => {
      alert('Reseña guardada ✅');
      window.location.reload(); // O usar observable para actualizar
    });
  }
}
