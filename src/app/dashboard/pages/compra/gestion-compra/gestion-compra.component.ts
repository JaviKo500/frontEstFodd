import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../services/validator.service';
import { Patter } from '../../../../models/patters';
import { ConfirmationService } from 'primeng/api';
import { FormaPagoService } from '../../../../services/forma-pago.service';
import { FormaPago } from '../../../../models/compra/formaPago';
import { RespuestaServer } from '../../../../models/response';
import { HttpErrorResponse } from '@angular/common/http';
import { ProveedorService } from '../../../../services/proveedor.service';
import { Proveedor } from '../../../../models/proveedor/proveedor';
import { ProductoService } from '../../../../services/producto.service';
import { Producto } from '../../../../models/producto/producto';
import { DetalleCompraProducto } from '../../../../models/compra/detalleCompra.Producto';

@Component({
  selector: 'app-gestion-compra',
  templateUrl: './gestion-compra.component.html',
  styleUrls: ['./gestion-compra.component.css'],
  providers: [ConfirmationService]
})
export class GestionCompraComponent implements OnInit {
  
  public proveedorForm: FormGroup = this._formBuilder.group({
    nombreProveedor: [ , [ Validators.required ] ],
    rucProveedor: [ , [ Validators.required, this._validatorService.validadorDeRuc ]],
    emailProveedor: [ , [ Validators.required, Validators.pattern(Patter.emailPattern) ]],
    telefonoProveedor: [ , [  Validators.pattern(Patter.telefonoPattern) ]],
    movilProveedor: [, [ Validators.pattern(Patter.movilPattern)]],
    direccionProveedor: [ , [ Validators.required ]],
  });

  public detalleCompraForm: FormGroup = this._formBuilder.group({
    producto: [, [ Validators.required]],
    cantidadDetalleCompraProducto: [ , [ Validators.required ] ],
    precioDetalleCompraProducto: [ , [ Validators.required ]],
    ivaDetalleCompraProducto: [ 12 , [ Validators.required ]],
  });
  
  
  public displayDetalles: boolean= false;
  
  public formasPago:  FormaPago [] = [];
  public proveedores: Proveedor [] = [];
  public productos:   Producto [] = [];
  public detallesCompra: DetalleCompraProducto [] = [];

  constructor(
    private _formBuilder: FormBuilder,
    private _validatorService: ValidatorService,
    private _confirmationService: ConfirmationService,
    private _formaPagoService: FormaPagoService,
    private _proveedorService: ProveedorService,
    private _productosService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.getFormasPago();
    this.getProveedores();
    this.getProductos();
  }

  getFormasPago = () => this._formaPagoService.compras().subscribe({
      next: (resp: RespuestaServer) =>  this.formasPago = resp.respuesta, 
      error: (err: HttpErrorResponse) => this.formasPago = []
  });
  getProveedores = () => this._proveedorService.proveedoresPorEstado().subscribe({
      next: (resp: RespuestaServer) =>  this.proveedores = resp.respuesta, 
      error: (err: HttpErrorResponse) => this.proveedores = []
  });
  getProductos = () => this._productosService.productosPorEstado().subscribe({
      next: (resp: RespuestaServer) =>  this.productos = resp.respuesta, 
      error: (err: HttpErrorResponse) => this.productos = []
  });

  // agregar items
  agregarItem = () => {
    if (this.detalleCompraForm.valid) {
      let item: DetalleCompraProducto = this.detalleCompraForm.value;
      item.totalDetalleCompraProducto = this.calcularTotal(item);
      this.quitarProductoItem(item.producto?.idProducto!);
      this.detallesCompra.push(item);
      this.detalleCompraForm.reset();
      console.log(this.detallesCompra);
    } else {
      this.detalleCompraForm.markAllAsTouched();
    }
  }

  editarDetalle = (item: DetalleCompraProducto) => {
    this.detalleCompraForm.patchValue(item);
  }
  quitarProductoItem = (id: number) => {
    this.detallesCompra = this.detallesCompra.filter( detalle => detalle.producto?.idProducto != id);
    console.log(this.detallesCompra);
  }
  eliminarDetalle = (index: number) => {
    this.detallesCompra.slice(index, 1);
    console.log('hola');
    
  }
  
  calcularTotal  = (detalle: DetalleCompraProducto): number => {
    if ( detalle.ivaDetalleCompraProducto! > 0 ) {
      let subTotal = detalle.precioDetalleCompraProducto! * detalle.cantidadDetalleCompraProducto!;
      let iva = (subTotal * detalle.ivaDetalleCompraProducto!) / 100;
      return subTotal + iva;
    } 
    return detalle.cantidadDetalleCompraProducto! * detalle.precioDetalleCompraProducto!;
  }

  verificarCampo  = ( campo: string , form: FormGroup ): boolean => {
    return ( form.controls?.[campo].invalid || false) && ( form.controls?.[campo].touched || false );
  }
}
