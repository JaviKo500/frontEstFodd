import { Component, OnInit } from '@angular/core';
import { CompraService } from '../../../../services/compra.service';
import { RespuestaServer } from '../../../../models/response';
import { venta } from '../../../../models/venta/venta';
import { VentaService } from '../../../../services/venta.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';

@Component({
  selector: 'app-listar-venta',
  templateUrl: './listar-venta.component.html',
  styleUrls: ['./listar-venta.component.css']
})
export class ListarVentaComponent implements OnInit {
  public diaActual: Date = new Date();
  public ventas: venta [] = [];
  public termino: string = '';
  public displayDetalles: boolean= false;
  public selectedVenta?: venta| null;

  constructor(
    private _ventaService: VentaService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
  }

  listarVenta = () => {
    this._ventaService.ventas().subscribe({
      next: ( resp : RespuestaServer ) => {        
        this.ventas = resp.respuesta as venta[]; 
        console.log(this.ventas);
               
      },
      error: (err) => this.ventas= []
    })
  }
  verificarTermino = () => {
    if(this.termino.length === 0) this.listarVenta();
  }

  buscarPorTermino = () => {
    if (this.termino.length > 0) {
      this._ventaService.getPorTermino(this.termino.toLowerCase()).subscribe({
        next: (resp: RespuestaServer) => {
          this.ventas = resp.respuesta;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.listarVenta();
            this._msgSweetAlertService.mensajeIfo('Upps!', 'No existe ventas con ese código');
          }else {
            this.listarVenta();
          }
          this.termino = '';
        }
      })
    }
  }
  actualizarEstado = (venta: venta) => {
    this._ventaService.actualizarEstado( venta.idVenta! ).subscribe({
      next: ( resp: RespuestaServer ) => {
        this._msgSweetAlertService.mensajeOk( venta.estadoVenta? 'La venta se encuentra disponible' : 'Venta dada de baja');
      },
      error: (err) => {
        this._msgSweetAlertService.mensajeAdvertencia('Upps!', 'No se pudo cambiar el estado');
      }
    })
  }
  showDialog = (venta: venta) => {
    this.displayDetalles = true;
    this.selectedVenta= venta;
  }
  
  closeDialog = () => {
    this.displayDetalles = false;
    this.selectedVenta= null;
  }

}
