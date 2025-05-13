export class Review {
  id: number;
  technicianId: number;
  user: string;
  comment: string;
  rating: number;
  date: string;

  constructor() {
    this.id = 0;
    this.technicianId = 0;
    this.user = '';
    this.comment = '';
    this.rating = 0;
    this.date = new Date().toISOString().split('T')[0];
  }
}
