import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class LuisterApiService {

  @Output() deletedList:EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}

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
  getUserCustomList(userid:number){
    return this.http.get(`http://localhost:8000/customlists.php?userid=${userid}`);
  }
  addCustomList(customlist:any){
    return this.http.post('http://localhost:8000/newcustomlist.php', customlist);
  }
  deleteCustomList({clid='', userid=''}){
    return this.http.post('http://localhost:8000/deletelist.php', {
      customlistid: clid,
      userid: userid
    });
  }

  passwordResetRequest(email:string){
    return this.http.post('http://localhost:8000/resetpassword.php', {
      accountemail: email,
    });
  }
  
}
