import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { APIs } from '../constants/endpoints';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private httpClient: HttpClient) { }


  public getById(id: Number): Observable<any>
  {
    return this.httpClient.get<Usuario>(APIs.usuarios.usuarioById + id, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public usuariosAll(): Observable<any>
  {
    return this.httpClient.get<Usuario[]>(APIs.usuarios.usuarioAll, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public save(usuario: Usuario): Observable<any>
  {
    return this.httpClient.post<any>(APIs.usuarios.usuarioCreate, usuario, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public saveAll(usuarios: Array<any>): Observable<any>
  {
    return this.httpClient.post<any>(APIs.usuarios.usuarioCreateAll, usuarios, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public update(id: Number, usuario: Usuario): Observable<any>
  {
    return this.httpClient.put<any>(APIs.usuarios.usuariotUpdateById + id, usuario, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }

  public delete(id: Number): Observable<any>
  {
    return this.httpClient.delete<any>(APIs.usuarios.usuarioDeleteById + id, {observe: 'response'}).pipe(
      map((response: any) => {
        return response;
      }),catchError((error: HttpErrorResponse) => {
        return new Promise((resolve) => {
          resolve(error);
        })
      })
    );
  }
}
