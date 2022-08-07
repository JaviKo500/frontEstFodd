import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PrimeNgModule } from '../primeNg/prime-ng/prime-ng.module';

import { DashboardComponent } from './dashboard.component';
import { GestionProdComponent } from './pages/producto/gestion-prod/gestion-prod.component';
import { ListarProdComponent } from './pages/producto/listar-prod/listar-prod.component';
import { ListarProvComponent } from './pages/proveedor/listar-prov/listar-prov.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionProvComponent } from './pages/proveedor/gestion-prov/gestion-prov.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    GestionProdComponent, 
    ListarProdComponent, 
    ListarProvComponent, GestionProvComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    PrimeNgModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class DashboardModule { }
