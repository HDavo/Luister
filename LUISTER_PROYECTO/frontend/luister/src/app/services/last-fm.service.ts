import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LastFmArtist } from '../interfaces/last-fm.interace';

@Injectable({
  providedIn: 'root'
})
export class LastFmService {

  private apiKey: string = 'e6ecb63ac11f019d2196c8a10c2279bd';
  // private SecretId: string = ''; //no parece ser necesaria para la consulta de información
  private URL: string = 'http://ws.audioscrobbler.com/2.0/';
  private searchParameter: string = 'method=artist.getinfo';

  constructor(
    private http: HttpClient
  ){ }


  //El token tiene un validez temporal ilimitada, por lo que no es necesario poner los métodos de renovación¿

  getArtistInfo(name: string, lang: string='es'){
    return this.http.get<LastFmArtist>(`${this.URL}?${this.searchParameter}&artist=${name}&api_key=${this.apiKey}&format=json&lang=${lang}`);

  }
}
