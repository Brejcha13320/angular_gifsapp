import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey = 'ktqU2ptJzIT4ytvQdXWIWZJcggwMoI10';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    /* Devuelve otro arreglo nuevo, rompiendo la referencia,
       para evitar posibles ediciones en la variable, dado
       que esta es importante y solo se puede cambiar desde
       este servicio por metodos. */
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = '') {
    query = query.trim().toLowerCase();

    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);

    this.http
      .get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
      .pipe(
        map((mapResponse) => {
          return mapResponse.data;
        })
      )
      .subscribe((response) => {
        this.resultados = response;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
