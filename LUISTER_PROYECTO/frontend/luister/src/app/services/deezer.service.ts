import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeezerService {

  private URL = '/api2/';

  constructor(private http: HttpClient) {}

  searchForData(data:string){
    let result = {
      albums: '',
      tracks: '',
      artists: '',
    };
    return new Promise((resolve)=>{
      this.searchForAlbum(data)
      .subscribe((response:any)=> {
        result.albums = response;
        this.searchForArtist(data)
        .subscribe((response:any)=> {
          result.artists = response;
          this.searchForTrack(data)
          .subscribe((response:any)=> {
            result.tracks = response;
            resolve(result);
          });
        });
      });
    })
  }

  searchForArtist(query: string, offset=0, limit=22){
    return this.http.get(`${this.URL}search/artist?q=:${query}&offset=${offset}&limit=${limit}`);
  }
  searchForAlbum(query: string, offset=0, limit=22){
    return this.http.get(`${this.URL}search/album?q=${query}&offset=${offset}&limit=${limit}`);
  }
  searchForTrack(query: string, offset=0, limit=22){
    return this.http.get(`${this.URL}search/track?q=${query}&offset=${offset}&limit=${limit}`);
  }
  getElement(id: string, element:string){
    return this.http.get(`${this.URL}${element}/${id}`);
  }
  getArtistTopTracks(id:string, limit:number = 20){
    return this.http.get(`${this.URL}artist/${id}/top?limit=${limit}`);
  }
}
