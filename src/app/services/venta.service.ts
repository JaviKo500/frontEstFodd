import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaServer } from '../models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Venta } from '../models/venta/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private _url: string = `${environment.baseUrl}/venta`;

  constructor(
    private _http: HttpClient 
    ) { }
  
    ventas = (): Observable<RespuestaServer> => {    
      return this._http.get<RespuestaServer>(`${this._url}`);
    }
  
    getPorId = (id: number): Observable<RespuestaServer> => {
      return this._http.get<RespuestaServer>(`${this._url}/${id}`);
    }
    getUltimaVenta = (): Observable<RespuestaServer> => {
      return this._http.get<RespuestaServer>(`${this._url}/ultima`);
    }
  
    getPorTermino = (termino: string): Observable<RespuestaServer> => {
      return this._http.get<RespuestaServer>(`${this._url}/buscar/${termino}`);
    }
  
    crear = (ventas: Venta): Observable<RespuestaServer> => {
      return this._http.post<RespuestaServer>(`${this._url}`, ventas);
    }
  
    actualizar = (id: number, ventas: Venta): Observable<RespuestaServer> => {
      return this._http.put<RespuestaServer>(`${this._url}/${id}`, ventas);
    }
    actualizarEstado = (id: number): Observable<RespuestaServer> => {
      return this._http.put<RespuestaServer>(`${this._url}/estado/${id}`, {});
    }
    eliminar = (id: number): Observable<RespuestaServer> => {
      return this._http.delete<RespuestaServer>(`${this._url}/${id}`);
    }
   
}
