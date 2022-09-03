import { Injectable } from '@angular/core';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(
    private _authService: AuthService
  ) { }
  public display = false;

  itemsMenu = (): MenuItem[] => {
    return [
      {
        label: 'Menú',
        styleClass: 'bg-color1',
        command: () => this.display = !this.display,
        routerLink: 'home'
      },
      {
        label: 'Productos', 
        icon: PrimeIcons.TH_LARGE,
        command: () => this.display = !this.display,
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR', 'ROLE_INVENTARIO']
        ),
        routerLink: 'producto'
      },
      {
        label: 'Proveedores', 
        icon: PrimeIcons.BRIEFCASE,
        command: () => this.display = !this.display,
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR', 'ROLE_VENDEDOR', 'ROLE_INVENTARIO']
        ),
        routerLink: 'proveedor'
      },
      {
        label: 'Compras', 
        icon: PrimeIcons.SHOPPING_CART,
        routerLink: 'compra/gestion/crear',
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR', 'ROLE_VENDEDOR']
        ),
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
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR', 'ROLE_VENDEDOR']
        ),
        routerLink: 'cliente'
      },
      {
        label: 'Ventas',
        icon: PrimeIcons.MONEY_BILL,
        routerLink: 'venta/gestion/crear',
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR', 'ROLE_VENDEDOR']
        ),
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
        routerLink: 'reporte/producto',
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR']
        ),
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
        routerLink: 'usuario/gestion/crear',
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR']
        ),
      },
      {
        label: 'Usuarios',
        routerLink: 'usuario',
        visible: this.hasRolUser(
          ['ROLE_ADMINISTRADOR']
        ),
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

  hasRolUser = (roles: string[]) => {
    for (let i = 0; i < roles.length; i++) {
        // vemos si un rol hace match con los del token
        if (this._authService.hasRole(roles[i])) {
            return true;
        }
    }
    return false;
}

itemsMenuVendedor = (): MenuItem[] => {
  return [
      {
        label: 'Menú',
        routerLink: 'home'
      },
      {
        label: 'Proveedores', 
        routerLink: 'proveedor'
      },
      {
        label: 'Compras', 
        routerLink: 'compra/gestion/crear',
      },
      {
        label: 'Clientes', 
        routerLink: 'cliente'
      },
      {
        label: 'Ventas',
        routerLink: 'venta/gestion/crear',
      },

      { 
        label: 'Reportes', 
        routerLink: 'reporte/venta',
      },
    ]
  }
  itemsMenuInventario = (): MenuItem[] => {
    return [
      {
        label: 'Menú',
        routerLink: 'home'
      },
      {
        label: 'Productos', 
        routerLink: 'producto'
      },
      {
        label: 'Proveedores', 
        routerLink: 'proveedor'
      },
      { 
        label: 'Reportes', 
        routerLink: 'reporte/producto'
      }
    ];
  }
}
