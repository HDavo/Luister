import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  // private ID=''; //no necesario token de autenticación salvo para inicios de sesión
  private URL = 'https://api.deezer.com/';


  constructor(
    private http: HttpClient
  ) { }

  searchForData(query: string, type: string = 'album, artist, track', offset=0, limit=20){

    return this.http.get(`${this.URL}search?q=${query}&type=${type}&offset=${offset}&limit=${limit}`);
  }

  getArtist(id: string){
    return this.http.get(`${this.URL}artist/${id}`);
  }

  getTrack(id: string){
    return this.http.get(`${this.URL}track/${id}`);
  }
}
