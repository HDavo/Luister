import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'JSy9TgGsN9InForJt5TmeJKwVSEq3wx4';
  private apiUrl: string = 'https://api.giphy.com/v1/gifs';
  private term: string = '';

  public results: Gif [] = [];

  constructor(private http: HttpClient) { }

  generateGif( query: string ) {
    
    query = query.trim().toLowerCase();

    const params = new HttpParams().set('api_key', this.apiKey).set('limit','1').set('q', query);

    console.log(params)

    //---------------Petición usando params------------------------------------------

    this.http.get<SearchGifsResponse>(`${this.apiUrl}/search`, { params })
      .subscribe( (respuesta) => {
        // console.log(respuesta.data);
        this.results = respuesta.data;
      });
     

  }
}
