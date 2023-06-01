import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LuisterApiService {

  private port: number = 8000;
  private URL: string = `http://localhost:${this.port}`;

  @Output() deletedList:EventEmitter<any> = new EventEmitter();
  @Output() updateList: EventEmitter<any> = new EventEmitter();
  constructor(private http: HttpClient) {}

  signIn(data:any):Observable<any>{
    return this.http.post(`${this.URL}/login.php`, data)
  }
  signUp(data:any):Observable<any>{
    return this.http.post(`${this.URL}/register.php`, data)
  }
  logOut(session:string):Observable<any>{
    return this.http.post(`${this.URL}/logout.php`, { session })
  }
  getUserCustomList(userid:number):Observable<any>{
    return this.http.get(`${this.URL}/customlists.php?userid=${userid}`);
  }
  getCustomList(id:number):Observable<any>{
    return this.http.get(`${this.URL}/customlist.php?id=${id}`);
  }
  getCustomListTracks(id:number):Observable<any>{
    return this.http.get(`${this.URL}/customlisttracks.php?id=${id}`);
  }
  addCustomList(customlist:any):Observable<any>{
    return this.http.post(`${this.URL}/newcustomlist.php`, customlist);
  }
  deleteCustomList({clid='', userid=''}):Observable<any>{
    return this.http.post(`${this.URL}/deletelist.php`, {
      customlistid: clid,
      userid: userid
    });
  }
  passwordResetRequest(email:string):Observable<any>{
    return this.http.post(`${this.URL}/resetpassword.php`, {
      accountemail: email,
    });
  }
  setNewPassword(data:any):Observable<any>{
    return this.http.post(`${this.URL}/setnewpassword.php`, data);
  }
  addTrackToList(data:any):Observable<any>{
    return this.http.post(`${this.URL}/addtracktolist.php`, data);
  }
  isValidSession(data: string):Observable<any>{
    return this.http.post(`${this.URL}/validsession.php`, {
      sessiontoken: data
    });
  }
  getFavTracks(userid:number):Observable<any>{
    return this.http.post(`${this.URL}/favtracks.php`, {userid});
  }
  addFavTracks(data:any):Observable<any>{
    return this.http.post(`${this.URL}/addfavtrack.php`, data);
  }
  removeFavTracks(data:any):Observable<any>{
    return this.http.post(`${this.URL}/removefavtrack.php`, data);
  }
}
