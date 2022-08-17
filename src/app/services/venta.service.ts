import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RespuestaServer } from '../models/response';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { venta } from '../models/venta/venta';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private _url: string = `${environment.baseUrl}/ventas`;

  constructor(
    private _http: HttpClient 
    ) { }
  
    ventas = (): Observable<RespuestaServer> => {    
      return this._http.get<RespuestaServer>(`${this._url}`);
    }
  
    getPorId = (id: number): Observable<RespuestaServer> => {
      return this._http.get<RespuestaServer>(`${this._url}/${id}`)
    }
  
    getPorTermino = (termino: string): Observable<RespuestaServer> => {
      return this._http.get<RespuestaServer>(`${this._url}/buscar/${termino}`)
    }
  
    crear = (ventas: venta): Observable<RespuestaServer> => {
      return this._http.post<RespuestaServer>(`${this._url}`, ventas);
    }
  
    actualizar = (id: number, ventas: venta): Observable<RespuestaServer> => {
      return this._http.put<RespuestaServer>(`${this._url}/${id}`, ventas);
    }
    actualizarEstado = (id: number): Observable<RespuestaServer> => {
      return this._http.put<RespuestaServer>(`${this._url}/estado/${id}`, {});
    }
    eliminar = (id: number): Observable<RespuestaServer> => {
      return this._http.delete<RespuestaServer>(`${this._url}/${id}`);
    }
   
}
