import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto, RespuestaProd } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-gestion-prod',
  templateUrl: './gestion-prod.component.html',
  styleUrls: ['./gestion-prod.component.css'],
  providers: [ConfirmationService]
})
export class GestionProdComponent implements OnInit {

  public productoForm: FormGroup = this._formBuilder.group({
    descripcionProducto :[ , [ Validators.required ] ],
    codigoProducto      :[ , [ Validators.required ] ],
    stockProducto       :[ , [ Validators.required, Validators.min(0) ] ],
    precioVentaProducto :[ , [ Validators.required, Validators.min(0)] ],
    ivaProducto         :[ 12 , [ Validators.required, Validators.min(0) ] ],
    fechaIngreso        :[ , [ Validators.required ] ],   
  });

  public detallesForm: FormGroup = this._formBuilder.group({
    marca               : this._formBuilder.group({
      nombreMarca             : [ , [ Validators.required] ],
      descripcionMarca        : [],
    }),        
    presentacion        : this._formBuilder.group({
      nombrePresentacion      : [ , [ Validators.required] ],
      descripcionPresentacion : [],
    }),    
    zona                : this._formBuilder.group({
      nombreZona              : [ , [ Validators.required] ],
      descripcionZona         : [],
    }), 
  });


  public displayDetalles: boolean= false;

  public producto?: Producto;
  public selectedProducto?: Producto;
  public id?: number;
  constructor(
    private _formBuilder: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _productoService: ProductoService,
    private _msgSweetAlertService: MsgSweetAlertService
  ) { }

  ngOnInit(): void {
    this.getProductoIdParam();
  }

  getProductoIdParam = () => {
    this._activatedRoute.paramMap.subscribe( params => {      
      this.id = +params.get('id')!;
      if ( this.id && !isNaN(this.id)) {
        this.getProductoPorId( this.id );
      } else {
        this._router.navigate(['/dashboard/producto/gestion/crear']);
      }
    });
  }

  getProductoPorId = (id: number) => {
    this._productoService.getPorId(id).subscribe({
      next: (resp: RespuestaProd) => {
        this.selectedProducto = resp.respuesta;
        this.productoForm.patchValue(resp.respuesta);
        this.verificarDetallesProducto(resp.respuesta);
      },
      error: (error: HttpErrorResponse) => {
        if (error.status === 404) {
          this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo encontrar ese producto',);
          this._router.navigate(['/dashboard/producto']);
        }
      }
    });
  }
  verificarDetallesProducto = (producto: Producto) => {
    if ( producto.marca ) {
      this.detallesForm.get('marca')?.patchValue(producto.marca);  
    } 
    if ( producto.presentacion ) {
      this.detallesForm.get('presentacion')?.patchValue(producto.presentacion);  
    } 
    if ( producto.zona ) {
      this.detallesForm.get('zona')?.patchValue(producto.zona);  
    } 
  }

  realizarAccion = () => {
    if (this.productoForm.valid) {
      this.producto = this.productoForm.value;
      this.verificarCamposDetalle();
      // TODO: verificar si tiene id
      if (this.id) {
        this.actualizarProducto();
      }else {
        this.producto!.estadoProducto = true;
        this.crearProducto(this.producto!);
      }
    } else {
      this.productoForm.markAllAsTouched();
    }
  }

  verificarCamposDetalle = () => {
    if ( this.detallesForm.get('marca')?.valid ) {
      this.producto!.marca = this.detallesForm.get('marca')?.value;
    } else {
      this.producto!.marca = undefined;
    }
    if ( this.detallesForm.get('presentacion')?.valid ) {
      this.producto!.presentacion = this.detallesForm.get('presentacion')?.value;  
    } else {
      this.producto!.presentacion = undefined;
    }
    if ( this.detallesForm.get('zona')?.valid) {
      this.producto!.zona = this.detallesForm.get('zona')?.value;  
    } else {
      this.producto!.zona = undefined;
    }
  }

  crearProducto = (producto: Producto) => {
    this._productoService.crear( producto ).subscribe({
      next: (resp: RespuestaProd) => {
        this.productoForm.reset();
        this.detallesForm.reset();
        this.productoForm.get('ivaProducto')?.patchValue(12);
        this._msgSweetAlertService.mensajeOk('Producto Guardado')
      }, 
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this._msgSweetAlertService.mensajeAdvertencia('Upss!', 'Código  del producto repetido');
        } else {
          this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo guardar el producto');
        }
        
      }
    });
    
  }

  actualizarProducto = () => {
    this.producto!.estadoProducto = this.selectedProducto?.estadoProducto;
    this._productoService.actualizar(this.id!, this.producto!).subscribe({
      next: (resp: RespuestaProd) => {
        this._msgSweetAlertService.mensajeOk('Producto Guardado')
        this._router.navigate(['/dashboard/producto']);
      }, 
      error: (err: HttpErrorResponse) => {
        if (err.status === 409) {
          this._msgSweetAlertService.mensajeAdvertencia('Upss!', 'Código  del producto repetido');
        } else if(err.status === 404){
          this._msgSweetAlertService.mensajeError('Upss!', 'Ese producto no existe');
          this._router.navigate(['/dashboard/producto']);
        } 
        this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo actualizar el producto');
        this._router.navigate(['/dashboard/producto']);
      }
    });
  }

  eliminar = (event: Event) => {    
    this._confirmationService.confirm({
        target: event.target!,
        message: '¿Desea eliminar este producto?',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Si',
        accept: () => {
            this._productoService.eliminar(this.id!).subscribe({
              next: (resp: RespuestaProd) => {
                this._msgSweetAlertService.mensajeOk('Producto Eliminado')
                this._router.navigate(['/dashboard/producto']);
              }, 
              error: (err: HttpErrorResponse) => {
                this._msgSweetAlertService.mensajeError('Upss!', 'No se pudo eliminar el producto');
              }
            });
        },
        reject: () => {
        }
    });
  }

  showDialog = () => {
    this.displayDetalles = true;
  }
  
  closeDialog = () => {
    this.displayDetalles = false;
    if (!this.id) {
      this.detallesForm.reset();
    }
  }
  GuardarDetalles = () => {
    this.displayDetalles = false;
  }

  verificarCampo  = ( campo: string ): boolean => {
    return ( this.productoForm.controls?.[campo].invalid || false) && ( this.productoForm.controls?.[campo].touched || false );
  }

  errorMsg(campo: string): string {
    const errors = this.productoForm.get(campo)?.errors;
    if (errors?.['required']) {
      return 'Campo requerido';
    } else if (errors?.['min']) {
      return `Ingrese solo valores positivos`;
    }
    return '';
  }
}
