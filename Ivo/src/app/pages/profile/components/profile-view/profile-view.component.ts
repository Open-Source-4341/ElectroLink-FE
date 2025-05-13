import { Component, OnInit } from '@angular/core';
import { ProfileEntity } from '../../entity/profile.entity';
import { ProfileService } from '../../services/profile.service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
  profile: ProfileEntity = new ProfileEntity(); // ✅ Propiedad declarada

  constructor(private profileService: ProfileService) {} // ✅ Inyección del servicio

  ngOnInit(): void {
    this.profileService.getProfile().subscribe((data: ProfileEntity) => { // ✅ Tipado explícito
      this.profile = data;
    });
  }
}
