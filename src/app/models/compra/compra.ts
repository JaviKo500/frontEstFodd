import { FormaPago } from './formaPago';
import { Proveedor } from '../proveedor/proveedor';
import { DetalleCompraProducto } from './detalleCompra.Producto';
export class Compra{
    idCompra?:     number;
    codigoCompra?: string;
    totalCompra?:  number;
    estadoCompra?: boolean;
    fechaCompra?:  Date;

    formaPago?:    FormaPago;
    proveedor?:    Proveedor;
    items?:        DetalleCompraProducto[];

}