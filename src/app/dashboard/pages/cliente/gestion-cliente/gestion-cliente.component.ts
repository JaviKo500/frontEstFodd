import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ValidatorService } from '../../../../services/validator.service';
import { Patter } from '../../../../models/patters';

@Component({
  selector: 'app-gestion-cliente',
  templateUrl: './gestion-cliente.component.html',
  styleUrls: ['./gestion-cliente.component.css']
})
export class GestionClienteComponent implements OnInit {

  public clienteForm: FormGroup = this._formBuilder.group({
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
  ) { }

  ngOnInit(): void {
  }

}
