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

  constructor(
    private _formBuilder: FormBuilder,
    private _router: Router,
    private _confirmationService: ConfirmationService,
    private _ventaService: VentaService,
    private _msgSweetAlertService: MsgSweetAlertService,
  ) { }

  ngOnInit(): void {
  }
  

}
