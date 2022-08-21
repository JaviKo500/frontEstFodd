import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

import { FormaPago } from '../../../../models/formaPago';
import { Producto } from '../../../../models/producto/producto';
import { DetalleVentaProducto } from '../../../../models/venta/detalleVentaProducto';
import { VentaService } from '../../../../services/venta.service';
import { RespuestaServer } from '../../../../models/response';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { ProductoService } from '../../../../services/producto.service';
import { FormaPagoService } from '../../../../services/forma-pago.service';
import { Cliente } from '../../../../models/cliente/cliente';
import { ClienteService } from '../../../../services/cliente.service';

@Component({
  selector: 'app-gestion-venta',
  templateUrl: './gestion-venta.component.html',
  styleUrls: ['./gestion-venta.component.css'],
  providers: [ConfirmationService]
})
export class GestionVentaComponent implements OnInit {

  public clientes: Cliente [] = [];
  public productos: Producto [] = [];
  public showCliente?: Cliente | null;
  public showProducto?: Producto | null;

  public detalleVentaProducto: DetalleVentaProducto[] = [];
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _productoService: ProductoService,
    private _clienteService: ClienteService,
    private _formaPagoService: FormaPagoService,
    private _ventaService: VentaService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
    this.getProductos();
    this.getClientes();
  }

  getProductos = () => this._productoService.productosPorEstado().subscribe({
    next: (resp: RespuestaServer) => this.productos = resp.respuesta,
    error: (err: HttpErrorResponse) => console.log(err)
  });
  getClientes = () => this._clienteService.clientesPorEstado().subscribe({
    next: (resp: RespuestaServer) => this.clientes = resp.respuesta,
    error: (err: HttpErrorResponse) => console.log(err)
  });
  
  seleccionCliente = (cliente: Cliente) => {
    if (cliente) {
      this.showCliente = cliente;
    } else {
      this.showCliente = null;
    }
  }
  mostrarNombre = (): string => {
    if (this.showCliente) {
      return `${this.showCliente?.persona?.nombresPersona} ${this.showCliente?.persona?.apellidosPersona}`
    }
    return ''
  }
  seleccionProducto = (producto: Producto) => {
    if (producto) {
      this.showProducto = producto;
    } else {
      this.showProducto = null;
    }
  }

  agregarItem = () => {
    
  }

}
