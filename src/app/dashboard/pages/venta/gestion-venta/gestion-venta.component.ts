import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormaPago } from '../../../../models/formaPago';
import { Producto } from '../../../../models/producto/producto';
import { DetalleVentaProducto } from '../../../../models/venta/detalleVentaProducto';
import { venta } from '../../../../models/venta/venta';
import { VentaService } from '../../../../services/venta.service';
import { RespuestaServer } from '../../../../models/response';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';
import { Route, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-gestion-venta',
  templateUrl: './gestion-venta.component.html',
  styleUrls: ['./gestion-venta.component.css'],
  providers: [ConfirmationService]
})
export class GestionVentaComponent implements OnInit {

  public ventaForm: FormGroup = this._formBuilder.group({
    codigoVenta: [ , [ Validators.required ]],
    fechaVenta : [ , [ Validators.required ]],
    formaPago   : [ , [ Validators.required ]],
  });
  public detalleVentaForm: FormGroup = this._formBuilder.group({
    producto: [, [ Validators.required]],
    cantidadDetalleProductoVenta: [ , [ Validators.required ] ],
    precioDetalleProductoVenta: [ , [ Validators.required ]],
    // ivaDetalleVentaProducto: [ 12 , [ Validators.required ]],
  });

  public formasPago:  FormaPago [] = [];
  public productos:   Producto [] = [];
  public detallesVenta: DetalleVentaProducto [] = [];
  public subTotal: number = 0;
  public ivaTotal: number = 0;
  public ivaGeneral: number = 0;
  public totalVenta: number = 0;

  public id?: number;
  public venta?: venta;
  public selectedVenta?: venta;
  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _ventaService: VentaService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
  }
  agregarItem = () => {
    if (this.detalleVentaForm.valid) {
      let item: DetalleVentaProducto = this.detalleVentaForm.value;
      item.totalDetalleProductoVenta = this.calcularTotal(item);
      // this.ivaGeneral = item.ivaDetalleCompraProducto!;
      this.quitarProductoItem(item.producto?.idProducto!);
      this.detallesVenta.push(item);
      this.CalcularTotalFooter();
      this.detalleVentaForm.reset();
      this.detalleVentaForm.get('ivaDetalleCompraProducto')?.patchValue(this.ivaGeneral);
    } else {
      this.detalleVentaForm.markAllAsTouched();
    }
  }
  editarDetalle = (item: DetalleVentaProducto) => {
    this.detalleVentaForm.patchValue(item);
  }
  
  quitarProductoItem = (id: number) => {
    this.detallesVenta = this.detallesVenta.filter( detalle => detalle.producto?.idProducto != id);
    this.CalcularTotalFooter();
  }
  calcularTotal  = (detalle: DetalleVentaProducto): number => {
    // if ( detalle.ivaDetalleCompraProducto! > 0 ) {
    //   let subTotal = detalle.precioDetalleCompraProducto! * detalle.cantidadDetalleCompraProducto!;
    //   return this.round(subTotal, 2);
    // } 
    return +(detalle.cantidadDetalleProductoVenta! * detalle.precioDetalleProductoVenta!).toFixed(2);
  }
  round = (num: number , decimalPlaces: number = 0) => {
    num = Math.round(+(num + 'e' + decimalPlaces));
    return Number(num + 'e' + -decimalPlaces);
  }

  CalcularTotalFooter  = () => {
    this.vaciarTotales();
    for (const detalle of this.detallesVenta) {
      let subTotal = detalle.precioDetalleProductoVenta! * detalle.cantidadDetalleProductoVenta!;
      this.subTotal += subTotal;
      // if ( detalle.ivaDetalleCompraProducto! > 0 ) {
      //   let iva = (subTotal * detalle.ivaDetalleCompraProducto!) / 100;
      //   this.ivaTotal += iva;
      // }
    }
    this.totalVenta += this.subTotal + this.ivaTotal; 
  }
  realizarAccion = () => {
    if (this.ventaForm.valid) {
      this.venta = this.ventaForm.value;
      // this.venta!.ivaCompra = this.ivaGeneral;
      this.venta!.totalVenta = this.round(this.totalVenta, 2);
      // this.venta!.ivaTotalCompra = this.round(this.ivaTotal, 2);
      // this.venta!.subTotalCompra = this.round(this.subTotal,2);
      if (this.id) {
        this.actualizarProducto();
      } else {
        this.crearVenta(this.venta!)
      }
    } else {
      this.ventaForm.markAllAsTouched();
    }
  }
  crearVenta = (venta: venta) => {
    venta.estadoVenta = true;
    if ( this.detallesVenta.length <= 0 ) {
      this._msgSweetAlertService.mensajeAdvertencia('Por favor', 'Ingrese items a la compra.');
    } else { 
      venta.items = this.detallesVenta;
      this._ventaService.crear(venta).subscribe({
        next: ( resp: RespuestaServer ) => {
          this.vaciarTotales();
          this.detallesVenta = [];
          this.ventaForm.reset();
          this.detalleVentaForm.get('ivaDetalleVentaProducto')?.patchValue(12);
          this._msgSweetAlertService.mensajeOk('Venta Guardada');
        },
        error: ( err: HttpErrorResponse ) => {
          if (err.status === 409) {
            this._msgSweetAlertService.mensajeAdvertencia('Upss!', 'Código  de venta repetido');
          } else {
            this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo guardar la venta');
          }
        }
      });
    }
  }
  actualizarProducto = () => {
    this.venta!.estadoVenta = this.selectedVenta?.estadoVenta;
    this.venta!.items = this.detallesVenta;
    this._ventaService.actualizar(this.id!, this.venta!).subscribe({
      next: (resp: RespuestaServer) => {
        this._msgSweetAlertService.mensajeOk('VentaGuardada');
        this._router.navigate(['/dashboard/venta']);
      }, 
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this._msgSweetAlertService.mensajeAdvertencia('Upss!', 'Código  de la venta repetido');
          return;
        } else if(err.status === 404){
          this._msgSweetAlertService.mensajeError('Upss!', 'Esa venta no existe');
          this._router.navigate(['/dashboard/venta']);
        } 
        this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo actualizar la venta');
        this._router.navigate(['/dashboard/venta']);
      }
    });
  }
  eliminar = (event: Event) => {    
    this._confirmationService.confirm({
        target: event.target!,
        message: '¿Desea eliminar esta venta?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
            this._ventaService.eliminar( this.id!).subscribe({
              next: (resp: RespuestaServer) => {
                this._msgSweetAlertService.mensajeOk('venta Eliminada')
                this._router.navigate(['/dashboard/venta']);
              }, 
              error: (err: HttpErrorResponse) => {
                this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo eliminar la venta');
              }
            });
        }
    });
  }
  vaciarTotales = () => {
    this.subTotal = 0;
    this.ivaTotal = 0;
    this.totalVenta = 0;
  }
  verificarCampo  = ( campo: string , form: FormGroup ): boolean => {
    return ( form.controls?.[campo].invalid || false) && ( form.controls?.[campo].touched || false );
  }

}
