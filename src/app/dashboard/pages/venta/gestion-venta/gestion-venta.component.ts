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
import { Venta } from '../../../../models/venta/venta';

@Component({
  selector: 'app-gestion-venta',
  templateUrl: './gestion-venta.component.html',
  styleUrls: ['./gestion-venta.component.css'],
  providers: [ConfirmationService]
})
export class GestionVentaComponent implements OnInit {

  public clientes: Cliente [] = [];
  public productos: Producto [] = [];
  public itemsVenta: DetalleVentaProducto [] = [];
  public showCliente?: Cliente | null;
  public showProducto?: Producto | null;

  public cantidad: number|string = '';
  public totalVenta: number = 0;
  public codVenta: string = ''

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
    this.getUltimaVenta();
  }

  getProductos = () => this._productoService.productosPorEstado().subscribe({
    next: (resp: RespuestaServer) => this.productos = resp.respuesta,
    error: (err: HttpErrorResponse) => console.log(err)
  });
  getClientes = () => this._clienteService.clientesPorEstado().subscribe({
    next: (resp: RespuestaServer) => this.clientes = resp.respuesta,
    error: (err: HttpErrorResponse) => console.log(err)
  });
  getUltimaVenta = () => this._ventaService.getUltimaVenta().subscribe({
    next: (resp: RespuestaServer) => {
      let venta: Venta = resp.respuesta;
      this.codVenta= venta.idVenta?.toString()!;
      console.log(this.codVenta);
      
    },
    error: (err: HttpErrorResponse) => {
      if (err.status === 404) {
        this.codVenta = '0'
      }
    }
  });
  
  mostrarNombre = (): string => {
    if (this.showCliente) {
      return `${this.showCliente?.persona?.nombresPersona} ${this.showCliente?.persona?.apellidosPersona}`
    }
    return ''
  }


  agregarItem = () => {
    if (this.cantidad > 0 && this.showProducto) {
      let itemVenta: DetalleVentaProducto = {};
      if (this.verificarStockProducto()) {        
        return;
      }
      itemVenta!.cantidadDetalleProductoVenta = +this.cantidad;
      itemVenta!.precioDetalleProductoVenta = this.showProducto?.precioVentaProducto;
      itemVenta!.totalDetalleProductoVenta = +(+this.cantidad * this.showProducto?.precioVentaProducto!).toFixed(2);
      itemVenta!.producto = this.showProducto!;
      if (this.existeItem(this.showProducto.idProducto!)) {
        this.incrementaCantidad(this.showProducto.idProducto!);
      } else {
        this.itemsVenta.push(itemVenta);
        this.actualizarStockArrarProd();
      }
      this.calcularTotalFooter();
      this.showProducto = null;
      this.cantidad = '';
    } else {
      this.showProducto ?
      this._msgSweetAlertService.mensajeIfo('Por favor', 'Ingrese una catidad mayor a 0')
      :
      this._msgSweetAlertService.mensajeIfo('Por favor', 'Seleccione el producto');
    }
  }

  verificarStockProducto = (): boolean => {
    if (this.showProducto?.stockProducto! < this.cantidad) {
      this._msgSweetAlertService.mensajeAdvertencia('Upss!', `Stock insuficiente, solo hay ${this.showProducto?.stockProducto} en Stock`);
      return true;
    } 
    return false
  }

  existeItem = ( id :  number):boolean => {
    let existe = false;
    this.itemsVenta.forEach((item: DetalleVentaProducto) => {
      if ( id === item.producto?.idProducto) {
        existe = true;
      }
    });
    return existe;
  }
  
  incrementaCantidad = ( id :  number): void => {
    this.itemsVenta = this.itemsVenta.map((item: DetalleVentaProducto) => {
      if ( id === item.producto?.idProducto) {
        item.cantidadDetalleProductoVenta! += +this.cantidad;
        item.totalDetalleProductoVenta! = +(item.cantidadDetalleProductoVenta! * this.showProducto?.precioVentaProducto!).toFixed(2);
        this.actualizarStockArrarProd();
      }
      return item;
    });
  }

  actualizarStockArrarProd = () => {
    this.productos= this.productos.map( prod => {
      if (prod.idProducto === this.showProducto?.idProducto) {
        prod.stockProducto! -= +this.cantidad; 
        return prod;
      }
      return prod;
    });
  }

  calcularTotalFooter  = () => {
    this.totalVenta = 0
    for (const item of this.itemsVenta) {
      this.totalVenta += item.totalDetalleProductoVenta!;
    }
  }

  quitarProductoItem = (id: number) => {
    this.itemsVenta = this.itemsVenta.filter( detalle => detalle.producto?.idProducto != id);
    this.calcularTotalFooter();
  }

  limpiar = () => {
    this.itemsVenta = [];
    this.showProducto = null;
    this.showCliente = null;
    this.cantidad = '';
    this.totalVenta = 0;
  }

}
