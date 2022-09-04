import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { MsgSweetAlertService } from '../services/msg-sweet-alert.service';

@Injectable({
  providedIn: 'root'
})
export class RolGuard implements CanActivate {
  constructor(
    private _router: Router,
    private _authService: AuthService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) {}
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean>  | boolean {
    if ( !this._authService.isAuthenticated() ) {
      this._router.navigate(['/auth']);
      return false;
    }
    let role = route.data['role'];
    if (!this._authService.usuario.roles) {
      this._router.navigate(['/dashboard/sinrol']);
      return false;
    }
    for (let i = 0; i < role.length; i++) {
      // vemos si un rol hace match con los del token
      if ( this._authService.hasRole(role[i])) {
        return true;
      }
    }
    // si no tiene ningun rol redireccionamos al home
    this._router.navigate(['/dashboard/home']);
    return false;
  }
  
}
