import { Component, OnInit } from '@angular/core';
import { Producto, RespuestaProd } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MsgSweetAlertService } from '../../../../services/msg-sweet-alert.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-listar-prod',
  templateUrl: './listar-prod.component.html',
  styleUrls: ['./listar-prod.component.css']
})
export class ListarProdComponent implements OnInit {
  public productos: Producto [] = [];

  public termino: string = '';

  public displayDetalles: boolean= false;
  public displayCustom: boolean = false;

  public selectedProducto?: Producto | null;

  public baseUrl: string = `${environment.baseUrl}/uploads/img`;
  responsiveOptions:any[] = [
    {
        breakpoint: '1024px',
        numVisible: 5
    },
    {
        breakpoint: '768px',
        numVisible: 3
    },
    {
        breakpoint: '560px',
        numVisible: 1
    }
];
  constructor(
    private _productoService: ProductoService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
    this.listarProductos()
  }

  listarProductos = () => {
    this._productoService.productos().subscribe({
      next: ( resp : RespuestaProd ) => {        
        this.productos = resp.respuesta as Producto[];        
      },
      error: (err) => this.productos = []
    })
  }

  verificarTermino = () => {
    if(this.termino.length === 0) this.listarProductos();
  }

  buscarPorTermino = () => {
    if (this.termino.length > 0) {
      this._productoService.getPorTermino(this.termino.toLowerCase()).subscribe({
        next: (resp: RespuestaProd) => {
          this.productos = resp.respuesta;
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.listarProductos();
            this._msgSweetAlertService.mensajeIfo('Upps!', 'No hay productos con ese nombre');
          }else {
            this.listarProductos();
          }
          this.termino = '';
        }
      })
    }
    
  }

  imageClick() {
    this.displayCustom = true;
  }
  showDialog = (producto: Producto) => {
    this.displayDetalles = true;
    this.selectedProducto = producto;
  }
  
  closeDialog = () => {
    this.displayDetalles = false;
    this.selectedProducto = null;
  }

}
