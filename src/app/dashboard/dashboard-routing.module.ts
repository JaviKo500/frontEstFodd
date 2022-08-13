import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { GestionProdComponent } from './pages/producto/gestion-prod/gestion-prod.component';
import { GestionProvComponent } from './pages/proveedor/gestion-prov/gestion-prov.component';
import { ListarProdComponent } from './pages/producto/listar-prod/listar-prod.component';
import { ListarProvComponent } from './pages/proveedor/listar-prov/listar-prov.component';
import { ListarCompraComponent } from './pages/compra/listar-compra/listar-compra.component';
import { GestionCompraComponent } from './pages/compra/gestion-compra/gestion-compra.component';
import { ListarClienteComponent } from './pages/cliente/listar-cliente/listar-cliente.component';
import { GestionClienteComponent } from './pages/cliente/gestion-cliente/gestion-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'producto',
        component: ListarProdComponent
      },
      {
        path: 'producto/gestion/crear',
        component: GestionProdComponent
      },
      {
        path: 'producto/gestion/editar/:id',
        component: GestionProdComponent
      },
      {
        path: 'proveedor',
        component: ListarProvComponent
      },
      {
        path: 'proveedor/gestion/crear',
        component: GestionProvComponent
      },
      {
        path: 'proveedor/gestion/editar/:id',
        component: GestionProvComponent
      },
      {
        path: 'compra',
        component: ListarCompraComponent
      },
      {
        path: 'compra/gestion/crear',
        component: GestionCompraComponent
      },
      {
        path: 'compra/gestion/editar/:id',
        component: GestionCompraComponent
      },
      {
        path: 'cliente',
        component: ListarClienteComponent
      },
      {
        path: 'cliente/gestion/crear',
        component: GestionClienteComponent
      },
      {
        path: 'cliente/gestion/editar/:id',
        component: GestionClienteComponent
      },
      {
        path: '**',
        redirectTo: 'producto'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
