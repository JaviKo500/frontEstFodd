import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../primeNg/prime-ng/prime-ng.module';

import { DashboardComponent } from './dashboard.component';
import { GestionProdComponent } from './pages/producto/gestion-prod/gestion-prod.component';
import { ListarProdComponent } from './pages/producto/listar-prod/listar-prod.component';
import { ListarProvComponent } from './pages/proveedor/listar-prov/listar-prov.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    GestionProdComponent, 
    ListarProdComponent, 
    ListarProvComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    PrimeNgModule,
    SharedModule
  ]
})
export class DashboardModule { }
