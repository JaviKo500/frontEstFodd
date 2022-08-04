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
    imgProducto?:         string;
    fechaIngreso?:        Date;
    codigoProducto?:      string;
    ivaProducto?:         number;
    precioVentaProducto?: number;
    stockProducto?:       number;
    estadoProducto?:      boolean;
    menuClienteProducto?: boolean;
    marca?:               Marca;
    presentacion?:        Presentacion;
    zona?:                Zona;
}