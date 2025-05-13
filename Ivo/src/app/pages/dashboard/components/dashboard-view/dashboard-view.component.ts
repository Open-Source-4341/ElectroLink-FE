import { Component } from '@angular/core';
import { ProfileCardComponent } from '../../../../public/components/dashboard/profile-card/profile-card.component';
import { ScheduleCardComponent } from '../../../../public/components/dashboard/schedule-card/schedule-card.component';
import { InventoryCardComponent } from '../../../../public/components/dashboard/inventory-card/inventory-card.component';
import { ClientsHistoryCardComponent } from '../../../../public/components/dashboard/clients-history-card/clients-history-card.component';
import { PortfolioCardComponent } from '../../../../public/components/dashboard/portfolio-card/portfolio-card.component';
import { MetricsCardComponent } from '../../../../public/components/dashboard/metrics-card/metrics-card.component';
import { ZonesCardComponent } from '../../../../public/components/dashboard/zones-card/zones-card.component';
import { CertifiedForumsCardComponent } from '../../../../public/components/dashboard/certified-forums-card/certified-forums-card.component';

@Component({
  selector: 'app-dashboard-view',
  standalone: true,
  imports: [ProfileCardComponent, ScheduleCardComponent, InventoryCardComponent,ClientsHistoryCardComponent, PortfolioCardComponent, MetricsCardComponent, ZonesCardComponent,CertifiedForumsCardComponent],
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent {}
