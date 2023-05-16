import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LuisterApiService {

  constructor(private http: HttpClient) { }

  signIn(data:any):any{
    return this.http.post('http://localhost:8000/login.php', {
      data: data,
      })
  }

  logOut(session:string){
    return this.http.post('http://localhost:8000/logout.php', {
        session,
        })
  }
}
