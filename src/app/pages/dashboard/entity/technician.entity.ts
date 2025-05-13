export class Technician {
  id: number;
  name: string;
  specialty: string;
  distance: string;
  rating: number;
  available: string;
  location: string;
  date: string;
  ip: string;
  latitude: number;
  longitude: number;
  price?: number;
  duration?: string;
  paymentMethod?: string;
  descriptions?: { [key: string]: string };

  constructor() {
    this.id = 0;
    this.name = '';
    this.specialty = '';
    this.distance = '';
    this.rating = 0;
    this.available = '';
    this.location = '';
    this.date = '';
    this.ip = '';
    this.latitude = 0;
    this.longitude = 0;
    this.price = 0;
    this.duration = '';
    this.paymentMethod = '';
    this.descriptions = {};
  }
}
