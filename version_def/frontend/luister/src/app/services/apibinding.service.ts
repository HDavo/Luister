import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApibindingService {
  private ID = '228337ef0a124d5ebe912338d8050e03';
  private SID = 'be4da263ec534f46bdf841e70bcf5f94';
  private URL = 'https://api.spotify.com/v1/';
  private spotifyTokenReq = {
    url: '/api/token/',
    body: `grant_type=client_credentials&client_id=${this.ID}&client_secret=${this.SID}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  }

  constructor(private http:HttpClient) { }

  generateAuthToken():Promise<any>{
    let result;
    return new Promise((resolve)=>{
      if(!this.isValidAuthToken()){
        this.http.post(this.spotifyTokenReq.url, this.spotifyTokenReq.body, { headers: this.spotifyTokenReq.headers })
        .subscribe((res:any) => {
          localStorage.setItem('token_value', res.access_token);
          localStorage.setItem('token_timestamp', new Date().getTime().toString());
          resolve(res.access_token);
        })
      }else {
        result = localStorage.getItem('token_value') || '';
        resolve(result);
      }
    })
  }

  isValidAuthToken(){
    const TTL = 3300000;
    let tokenTimeStamp = parseInt(localStorage.getItem('token_timestamp') || '0'), 
        response = false;
    if(localStorage.getItem('token_value') && ((new Date().getTime() - tokenTimeStamp) <= TTL)) response = true;
    return response;
  }

  searchForData(query:string, type:string='album,artist,track'){
    return this.generateAuthToken()
      .then((token) =>{
        return this.http.get(`${this.URL}search?q=${query}&type=${type}&offset=0&limit=20`,{
          headers: {
            Authorization: 'Bearer '+token
          }
        });
      });
  }

  getArtists(){
    return this.generateAuthToken()
    .then((token) =>{
      return this.http.get(`${this.URL}search?query=abcd&type=artist&market=ES&locale=es-ES%2Ces%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=5&limit=10`,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
    });
  }

  getAlbums(){
    return this.generateAuthToken()
    .then((token) =>{
      return this.http.get(`${this.URL}search?query=meteor&type=album&market=ES&locale=es-ES%2Ces%3Bq%3D0.9%2Cen%3Bq%3D0.8&offset=5&limit=10`,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
    });
  }

  getNewReleaseAlbums(url:string=`${this.URL}browse/new-releases/`){
    return this.generateAuthToken()
    .then((token) =>{
      return this.http.get(url,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
    });
  }

  getCategories(limit=10, offset=0){
    return this.generateAuthToken()
    .then((token) =>{
      return this.http.get(`${this.URL}browse/categories?limit=${limit}&offset=${offset}`,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
    });
  }

  getAvailableGenreseeds(){
    return this.generateAuthToken()
    .then((token) =>{
      return this.http.get(`${this.URL}recommendations/available-genre-seeds`,{
        headers: {
          Authorization: 'Bearer '+token
        }
      });
    });
  }
}
