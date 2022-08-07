import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { GestionProdComponent } from './pages/producto/gestion-prod/gestion-prod.component';
import { GestionProvComponent } from './pages/proveedor/gestion-prov/gestion-prov.component';
import { ListarProdComponent } from './pages/producto/listar-prod/listar-prod.component';
import { ListarProvComponent } from './pages/proveedor/listar-prov/listar-prov.component';

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
