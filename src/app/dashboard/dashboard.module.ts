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
import { ListarCompraComponent } from './pages/compra/listar-compra/listar-compra.component';
import { GestionCompraComponent } from './pages/compra/gestion-compra/gestion-compra.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { GestionClienteComponent } from './pages/cliente/gestion-cliente/gestion-cliente.component';
import { GestionUsuaComponent } from './pages/usuario/gestion-usua/gestion-usua.component';
import { ListarUsuaComponent } from './pages/usuario/listar-usua/listar-usua.component';



@NgModule({
  declarations: [
    DashboardComponent, 
    GestionProdComponent, 
    ListarProdComponent, 
    ListarProvComponent, 
    GestionProvComponent, 
    ListarCompraComponent, 
    GestionCompraComponent, 
    ListarClienteComponent, 
    GestionClienteComponent, 
    GestionUsuaComponent, 
    ListarUsuaComponent, 
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
