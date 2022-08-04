import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { RespuestaProd, Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private _url: string = `${environment.baseUrl}/producto`;
  constructor(
    private _http: HttpClient
  ) { }

  productos = (): Observable<RespuestaProd> => {    
    return this._http.get<RespuestaProd>(`${this._url}`);
  }

  getPorId = (id: number): Observable<RespuestaProd> => {
    return this._http.get<RespuestaProd>(`${this._url}/${id}`)
  }

  getPorTermino = (termino: string): Observable<RespuestaProd> => {
    return this._http.get<RespuestaProd>(`${this._url}/buscar/${termino}`)
  }

  crear = (producto: Producto): Observable<RespuestaProd> => {
    return this._http.post<RespuestaProd>(`${this._url}`, producto);
  }

  actualizar = (id: number, producto: Producto): Observable<RespuestaProd> => {
    return this._http.put<RespuestaProd>(`${this._url}/${id}`, producto);
  }

  subirFoto = (archivo: File, id: number): Observable<HttpEvent<{}>> => {
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id.toString());
    const req = new HttpRequest('POST',`${this._url}/upload`, formData);
    return this._http.request(req);
  }
  eliminar = (id: number): Observable<RespuestaProd> => {
    return this._http.delete<RespuestaProd>(`${this._url}/${id}`);
  }


}
