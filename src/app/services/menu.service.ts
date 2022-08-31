import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }
  public display = false;

  itemsMenu = (): MenuItem[] => {
    return [
      {
        label: 'Menú',

      },
      {
        label: 'Productos', 
        icon: PrimeIcons.TH_LARGE,
        command: () => this.display = !this.display,
        routerLink: 'productos'
      },
      {
        label: 'Proveedores', 
        icon: PrimeIcons.BRIEFCASE,
        command: () => this.display = !this.display,
        routerLink: 'proveedor'
      },
      {
        label: 'Compras', 
        icon: PrimeIcons.SHOPPING_CART,
        expanded: true,
        items: [
            {
              label: 'Agregar Compras', 
              icon: PrimeIcons.SHOPPING_CART,
              command: () => this.display = !this.display,
              routerLink: 'compra/gestion/crear'
            },
            {
              label: 'Listar Compras', 
              icon: PrimeIcons.SHOPPING_CART,
              command: () => this.display = !this.display,
              routerLink: 'compra'
            }
        ]
      },
      {
        label: 'Clientes', 
        icon: PrimeIcons.USERS,
        command: () => this.display = !this.display,
        routerLink: 'cliente'
      },
      {
        label: 'Ventas',
        icon: PrimeIcons.MONEY_BILL,
        expanded: true,
        items: [
          {
            label: 'Agregar Venta',
            command: () => this.display = !this.display,
            routerLink: 'venta/gestion/crear'
          },
          {
            label: 'Listar Venta',
            command: () => this.display = !this.display,
            routerLink: 'venta'
          }
        ]
      },
       
      { 
        label: 'Reportes', 
        icon: PrimeIcons.CHART_BAR,
        items: [
          {
            label: 'Producto',
            command: () => this.display = !this.display,
            routerLink: 'reporte/producto'
          },
          {
            label: 'Venta',
            command: () => this.display = !this.display,
            routerLink: 'reporte/venta'
          },
          {
            label: 'Compra',
            command: () => this.display = !this.display,
            routerLink: 'reporte/compra'
          }
        ]
      },
      {
        label: 'Configuración',
      },
      {
        label: 'Usuarios',
        items: [
            { 
              label: 'Agregar Usuarios', 
              icon: PrimeIcons.USER,
              command: () => this.display = !this.display,
              routerLink: 'usuario/gestion/crear'
            },
            { 
              label: 'Listar Usuarios', 
              icon: PrimeIcons.USER,
              command: () => this.display = !this.display,
              routerLink: 'usuario'
            },
        ]
      }
    ];
  }
}
