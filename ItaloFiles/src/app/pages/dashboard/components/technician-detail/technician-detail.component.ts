import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TechniciansService } from '../../services/technicians.service';
import { Technician } from '../../entity/technician.entity';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-technician-detail',
  standalone: true,
  imports: [NgIf],
  templateUrl: './technician-detail.component.html',
  styleUrls: ['./technician-detail.component.css']
})
export class TechnicianDetailComponent implements OnInit {
  technician: Technician | undefined;

  constructor(
    private route: ActivatedRoute,
    private technicianService: TechniciansService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.technicianService.getAll().subscribe((data) => {
      this.technician = data.find(t => t.id === id);
    });
  }
}
