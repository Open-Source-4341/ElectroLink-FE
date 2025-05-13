import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProfileEntity } from '../entity/profile.entity';
import { ProfileAssembler } from '../assembler/profile.assembler';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private endpoint = `${environment.serverBasePath}/profile`;

  constructor(private http: HttpClient) {}

  getProfile(): Observable<ProfileEntity> {
    return this.http.get<any>(this.endpoint)
      .pipe(map(dto => ProfileAssembler.fromJson(dto))); // ← Aquí el cambio
  }
}

