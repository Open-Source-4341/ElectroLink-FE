import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IpLocationService {
  private apiUrl = 'https://ipwho.is/';

  constructor(private http: HttpClient) {}

  getLocationByIP(ip?: string) {
    const url = ip ? `${this.apiUrl}${ip}` : this.apiUrl;
    return this.http.get(url);
  }
}
