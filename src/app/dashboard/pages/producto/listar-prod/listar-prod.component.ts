import { Component, OnInit } from '@angular/core';
import { Producto, RespuestaProd } from '../../../../models/producto';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-listar-prod',
  templateUrl: './listar-prod.component.html',
  styleUrls: ['./listar-prod.component.css']
})
export class ListarProdComponent implements OnInit {
  public productos: Producto [] = [];
  constructor(
    private _productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.listarProductos()
  }

  listarProductos = () => {
    this._productoService.productos().subscribe({
      next: ( resp : RespuestaProd ) => {
        console.log(resp);
        
        this.productos = resp.respuesta as Producto[];
        console.log(this.productos);
        
      },
      error: (err) => console.log(err)
    })
  }

}
