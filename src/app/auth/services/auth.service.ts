import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {enviroment} from "../../../environments/environment";
import {Auth} from "../interfaces/auth.interface";
import {map, Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = enviroment.baseUrl
  private _auth: Auth | undefined;

  get auth() {
    return {...this._auth!}
  }

  constructor(private readonly http: HttpClient) {

  }

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false)
    }
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true
      })
    )


  }


  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`).pipe(
      tap(resp => {
        this._auth = resp;
        localStorage.setItem('token', resp.id);
      })
    )
  }
}
