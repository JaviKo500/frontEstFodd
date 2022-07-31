import { Presentacion } from './presentacion';
import { Zona } from './zona';
import { Marca } from './marca';
export interface RespuestaProd {
    mensaje:  string;
    respuesta: any;
    ok:       boolean;
    error: any;
}

export class Producto {
    idProducto?:          number;
    descripcionProducto?: string;
    fechaIngreso?:        Date;
    codigoProducto?:      string;
    ivaProducto?:         number;
    precioVentaProducto?: number;
    stockProducto?:       number;
    estadoProducto?:      boolean;
    menuCliente?:         boolean;
    marca?:               Marca;
    presentacion?:        Presentacion;
    zona?:                Zona;
}