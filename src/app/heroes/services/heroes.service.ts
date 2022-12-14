import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Heroe} from "../interfaces/heroes.interface";
import {enviroment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private baseUrl: string = enviroment.baseUrl

  constructor(private readonly http: HttpClient) {
  }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    const params = new HttpParams().set('q', termino).set('_limit', '6');
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`, {params});
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.put<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<{}> {
    return this.http.delete<{}>(`${this.baseUrl}/heroes/${id}`);
  }

}
