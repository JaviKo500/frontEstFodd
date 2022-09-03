import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth.service';
import { MsgSweetAlertService } from '../../services/msg-sweet-alert.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit {

  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  items: MenuItem[] = [];

    ngOnInit() {
        let nombre = `${this._authService.usuario.persona?.nombresPersona?.toUpperCase() || ''} ${this._authService.usuario.persona?.apellidosPersona?.toUpperCase() || ''}`;
        this.items = [
            {
                label: nombre,
                disabled: true
            },
            {
                label: 'Perfil',
                icon: 'pi pi-fw pi-user-edit',
                routerLink: `usuario/gestion/editar/${this._authService.usuario.idUsuario || ''}`
            },
            {
                label: 'Cerrar Sesión',
                icon: 'pi pi-fw pi-sign-out',
                command: () => this.cerrarSesion()
            }
        ];
    }

    cerrarSesion = () => {
        this._msgSweetAlertService.showLoading(false, 'Cerrando sessión', 'Espere por favor');
        this._authService.logOut();
        setTimeout(() => {
          Swal.close();
          this._router.navigate(['/auth']);
        }, 200);
      }

}
