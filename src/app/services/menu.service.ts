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
        items: [
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
              command: () => this.display = !this.display,
              routerLink: 'compra'
            },
            {
              label: 'Clientes', 
              icon: PrimeIcons.SHOPPING_CART,
              command: () => this.display = !this.display,
              routerLink: 'cliente'
            },
            {label: 'Ventas', icon: PrimeIcons.MONEY_BILL},
            {label: 'Clientes', icon: PrimeIcons.USERS},
            {label: 'Reportes', icon: PrimeIcons.CHART_BAR},
        ]
      },
      {
        label: 'Configuración',
        items: [
            {label: 'Administrar Usuarios', icon: PrimeIcons.USER},
        ]
      }
    ];
  }
}
