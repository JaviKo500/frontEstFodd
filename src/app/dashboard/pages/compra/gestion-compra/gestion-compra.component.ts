import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../services/validator.service';
import { Patter } from '../../../../models/patters';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-gestion-compra',
  templateUrl: './gestion-compra.component.html',
  styleUrls: ['./gestion-compra.component.css'],
  providers: [ConfirmationService]
})
export class GestionCompraComponent implements OnInit {
  public displayDetalles: boolean= false;

  public proveedorForm: FormGroup = this._formBuilder.group({
    nombreProveedor: [ , [ Validators.required ] ],
    rucProveedor: [ , [ Validators.required, this._validatorService.validadorDeRuc ]],
    emailProveedor: [ , [ Validators.required, Validators.pattern(Patter.emailPattern) ]],
    telefonoProveedor: [ , [  Validators.pattern(Patter.telefonoPattern) ]],
    movilProveedor: [, [ Validators.pattern(Patter.movilPattern)]],
    direccionProveedor: [ , [ Validators.required ]],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _validatorService: ValidatorService,
    private _confirmationService: ConfirmationService,
  ) { }

  ngOnInit(): void {
  }

}
