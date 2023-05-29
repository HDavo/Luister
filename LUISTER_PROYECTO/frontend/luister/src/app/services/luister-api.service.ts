import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LuisterApiService {

  @Output() deletedList:EventEmitter<any> = new EventEmitter();
  @Output() updateList: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}

  signIn(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/login.php', data)
  }
  signUp(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/register.php', data)
  }
  logOut(session:string):Observable<any>{
    return this.http.post('http://localhost:8000/logout.php', { session })
  }
  getUserCustomList(userid:number):Observable<any>{
    return this.http.get(`http://localhost:8000/customlists.php?userid=${userid}`);
  }
  addCustomList(customlist:any):Observable<any>{
    return this.http.post('http://localhost:8000/newcustomlist.php', customlist);
  }
  deleteCustomList({clid='', userid=''}):Observable<any>{
    return this.http.post('http://localhost:8000/deletelist.php', {
      customlistid: clid,
      userid: userid
    });
  }
  passwordResetRequest(email:string):Observable<any>{
    return this.http.post('http://localhost:8000/resetpassword.php', {
      accountemail: email,
    });
  }
  setNewPassword(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/setnewpassword.php', data);
  }
  addTrackToList(data:any):Observable<any>{
    return this.http.post('http://localhost:8000/addtracktolist.php', data);
  }
  isValidSession(data: string):Observable<any>{
    return this.http.post('http://localhost:8000/validsession.php', {
      sessiontoken: data
    });
  }
  getFavTracks(userid:number):Observable<any>{
    return this.http.post(`http://localhost:8000/favtracks.php`, {userid});
  }
  addFavTracks(data:any):Observable<any>{
    return this.http.post(`http://localhost:8000/addfavtrack.php`, data);
  }
  removeFavTracks(data:any):Observable<any>{
    return this.http.post(`http://localhost:8000/removefavtrack.php`, data);
  }
}
