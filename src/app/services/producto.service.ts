import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { RespuestaProd } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private _url: string = `${environment.baseUrl}/producto`;
  constructor(
    private _http: HttpClient
  ) { }

  productos = (): Observable<RespuestaProd> => {
    console.log(this._url);
    
    return this._http.get<RespuestaProd>(`${this._url}`);
  }
}
