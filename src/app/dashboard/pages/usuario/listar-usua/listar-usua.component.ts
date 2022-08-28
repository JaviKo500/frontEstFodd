import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../../../models/usuario/usuario';
import { UsuarioService } from '../../../../services/usuario.service';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';
import { RespuestaServer } from '../../../../models/response';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-listar-usua',
  templateUrl: './listar-usua.component.html',
  styleUrls: ['./listar-usua.component.css']
})
export class ListarUsuaComponent implements OnInit {

  public usuarios: Usuario [] = [];

  public termino: string = '';

  public selectedUsuario?: Usuario | null;
  constructor(
    private _usuarioService: UsuarioService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  listarUsuarios = () => {
    this._usuarioService.usuarios().subscribe({
      next: ( resp : RespuestaServer ) => {        
        this.usuarios = resp.respuesta as Usuario[];        
      },
      error: (err) => this.usuarios= []
    })
  }

  verificarTermino = () => {
    if(this.termino.length === 0) this.listarUsuarios();
  }

  buscarPorTermino = () => {
    if (this.termino.length > 0) {
      this._usuarioService.getPorTermino(this.termino.toLowerCase()).subscribe({
        next: (resp: RespuestaServer) => {
          this.usuarios = resp.respuesta;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.listarUsuarios();
            this._msgSweetAlertService.mensajeInfo('Upps!', 'No hay usuarios con ese nombre');
          }else {
            this.listarUsuarios();
          }
          this.termino = '';
        }
      })
    }
  }

  actualizarEstado = (usuario: Usuario) => {
    this._usuarioService.actualizarEstado( usuario.idUsuario! ).subscribe({
      next: ( resp: RespuestaServer ) => {
        this._msgSweetAlertService.mensajeOk( usuario.estadoUsuario? 'El usuario se encuentra disponible' : 'Usuario dado de baja');
      },
      error: (err) => {
        this._msgSweetAlertService.mensajeAdvertencia('Upps!', 'No se pudo cambiar el estado');
      }
    })
  }

}
