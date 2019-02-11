import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PAGES_ROUTES } from './pages.routes';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

@NgModule({
  declarations: [ PagesComponent, DashboardComponent, ProgressComponent, Graficas1Component, IncrementadorComponent, GraficoDonaComponent, AccountSettingsComponent],
  exports: [PagesComponent, DashboardComponent, ProgressComponent, Graficas1Component],
  imports: [ SharedModule, FormsModule, ChartsModule, PAGES_ROUTES ]
})
export class PagesModule {}
