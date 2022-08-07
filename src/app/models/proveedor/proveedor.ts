import { Ciudad } from './ciudad';

export class Proveedor {
    idProveedor?:           number;
    descripcionProveedor?:  string;
    nombreProveedor?:       string;
    rucProveedor?:          string;
    direccionProveedor?:    string;
    estadoProveedor?:       boolean;
    fechaIngresoProveedor?: Date;
    ciudad?:                Ciudad;
}


